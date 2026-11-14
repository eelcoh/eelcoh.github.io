module Diagram exposing (foldableCalls, toSvg, view)

import DiagramTheme exposing (Theme)
import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes as Html
import Set exposing (Set)
import SequenceDiagram.Model exposing (Option(..), Sequence(..), Step(..))
import VirtualDom


columnInset : Int
columnInset =
    86


type alias Endpoint =
    { participant : String, depth : Int }


type Arrow
    = Call
    | AsyncCall
    | Return


type alias Message =
    { from : Endpoint, to : Endpoint, caption : List String, y : Int, arrow : Arrow, visible : Bool }


type alias Activation =
    { endpoint : Endpoint, start : Int, end : Int, visible : Bool, fold : Maybe ( String, Bool ) }


type alias Layout =
    { y : Int, messages : List Message, activations : List Activation }


view : Set String -> Bool -> Bool -> Theme -> Sequence -> Html msg
view collapsed fixed showReturns theme sequence =
    diagram (Just { collapsed = collapsed, fixed = fixed }) showReturns theme sequence |> toDom


toSvg : String -> Bool -> Theme -> Sequence -> String
toSvg stylesheet showReturns theme sequence =
    case diagram Nothing showReturns theme sequence of
        Element name attrs children ->
            Element name
                (( "xmlns", "http://www.w3.org/2000/svg" ) :: attrs)
                (Element "style" [] [ Text stylesheet ]
                    :: Element "rect" [ ( "width", "100%" ), ( "height", "100%" ), ( "fill", theme.background ) ] []
                    :: children
                )
                |> serialize

        Text _ ->
            ""


type alias Folding =
    { collapsed : Set String, fixed : Bool }


foldableCalls : Sequence -> Set String
foldableCalls (Sequence _ steps) =
    foldPaths "" steps |> Set.fromList


foldPaths : String -> List Step -> List String
foldPaths parent steps =
    steps
        |> List.indexedMap
            (\index (Step _ _ _ children) ->
                if List.isEmpty children then
                    []

                else
                    let
                        path = stepPath parent index
                    in
                    path :: foldPaths path children
            )
        |> List.concat


stepPath : String -> Int -> String
stepPath parent index =
    parent ++ "/" ++ String.fromInt index


diagram : Maybe Folding -> Bool -> Theme -> Sequence -> SvgNode
diagram folding showReturns theme (Sequence initiator steps) =
    let
        root =
            Endpoint initiator 0

        layout =
            List.foldl (placeStep folding showReturns root (Dict.singleton initiator 0) "" True)
                { y = 94, messages = [], activations = [] }
                (List.indexedMap Tuple.pair steps)

        activations =
            Activation root 58 (layout.y - 12) True Nothing :: layout.activations

        visible =
            Set.fromList (initiator :: List.map (.to >> .participant) layout.messages)

        names =
            unique (initiator :: List.concatMap stepNames steps)
                |> List.filter (\name -> Set.member name visible)

        depthPadding =
            8 * List.foldl (\bar largest -> max largest bar.endpoint.depth) 0 activations

        columnGap =
            182 + depthPadding

        columns =
            Dict.fromList (List.indexedMap (\index name -> ( name, columnInset + index * columnGap )) names)

        x endpoint =
            Dict.get endpoint.participant columns |> Maybe.withDefault columnInset |> (+) (8 * endpoint.depth)

        lastParticipant =
            List.reverse names |> List.head |> Maybe.withDefault initiator

        rightPadding =
            if List.any (\message -> message.from.participant == message.to.participant && message.to.participant == lastParticipant) layout.messages then
                226

            else
                columnInset

        width =
            columnInset + (List.length names - 1) * columnGap + rightPadding + depthPadding

        height =
            layout.y + 12
    in
    Element "svg"
        ([ attr "class" "sequence-svg"
        , attr "style" (DiagramTheme.styles theme |> List.map (\( name, value ) -> name ++ ": " ++ value) |> String.join "; ")
        , intAttr "width" width
        , intAttr "height" height
        , attr "viewBox" ("0 0 " ++ String.fromInt width ++ " " ++ String.fromInt height)
        , attr "role" (if folding == Nothing then "img" else "group")
        , attr "aria-label" "Sequence diagram"
        ]
            ++ (case folding of
                    Just state ->
                        [ attr "data-can-collapse" (if state.collapsed == Set.fromList (foldPaths "" steps) then "false" else "true") ]

                    Nothing ->
                        []
               )
        )
        (List.map (drawParticipant theme.radius columns (height - 20)) names
            ++ (activations |> List.filter .visible |> List.sortBy .start |> List.map (drawActivation x))
            ++ (layout.messages |> List.filter .visible |> List.reverse |> List.map (drawMessage x))
        )


stepNames : Step -> List String
stepNames (Step name _ _ children) =
    name :: List.concatMap stepNames children


unique : List String -> List String
unique names =
    List.foldl
        (\name ( seen, ordered ) ->
            if Dict.member name seen then
                ( seen, ordered )

            else
                ( Dict.insert name () seen, name :: ordered )
        )
        ( Dict.empty, [] )
        names
        |> Tuple.second
        |> List.reverse


placeStep : Maybe Folding -> Bool -> Endpoint -> Dict String Int -> String -> Bool -> ( Int, Step ) -> Layout -> Layout
placeStep folding showReturns caller depths parent visible ( index, Step name options caption children ) layout =
    let
        depth =
            (Dict.get name depths |> Maybe.withDefault -1) + 1

        callee =
            Endpoint name depth

        path =
            stepPath parent index

        collapsed =
            Maybe.map (.collapsed >> Set.member path) folding |> Maybe.withDefault False

        fold =
            if List.isEmpty children then
                Nothing

            else
                Maybe.map (\_ -> ( path, collapsed )) folding

        asynchronous =
            List.member Async options

        labels =
            Maybe.withDefault "" caption |> wrapCaption

        y =
            layout.y + 16 * max 0 (List.length labels - 1)

        loopHeight =
            if caller.participant == name then 22 else 0

        called =
            { layout
                | y = y + loopHeight + 36
                , messages = Message caller callee labels y (if asynchronous then AsyncCall else Call) visible :: layout.messages
            }

        afterChildren =
            if collapsed && not (Maybe.map .fixed folding |> Maybe.withDefault False) then
                called

            else
                List.foldl (placeStep folding showReturns callee (Dict.insert name depth depths) path (visible && not collapsed))
                    called
                    (List.indexedMap Tuple.pair children)

        finished =
            if showReturns && not asynchronous then
                { afterChildren
                    | y = afterChildren.y + loopHeight + 36
                    , messages = Message callee caller [] afterChildren.y Return visible :: afterChildren.messages
                }

            else
                afterChildren

        activationEnd =
            if showReturns && not asynchronous then
                afterChildren.y + loopHeight

            else
                afterChildren.y - 14
    in
    { finished
        | activations =
            Activation callee (y + loopHeight) activationEnd visible fold :: finished.activations
    }


wrapCaption : String -> List String
wrapCaption caption =
    if String.isEmpty caption then
        []

    else
        let
            limit =
                19

            prefix =
                String.left (limit + 1) caption

            boundary =
                String.indexes " " prefix |> List.reverse |> List.head |> Maybe.withDefault limit

            size =
                if String.length caption <= limit then
                    String.length caption

                else if boundary > 0 then
                    boundary

                else
                    limit
        in
        String.left size caption :: wrapCaption (String.trimLeft (String.dropLeft size caption))


drawParticipant : Int -> Dict String Int -> Int -> String -> SvgNode
drawParticipant radius columns bottom name =
    let
        center =
            Dict.get name columns |> Maybe.withDefault columnInset

        visibleName =
            if String.length name > 16 then String.left 15 name ++ "…" else name
    in
    Element "g" []
        [ Element "title" [] [ Text name ]
        , line "sequence-lifeline" center 52 center bottom
        , box "sequence-participant" (center - 67) 14 134 38 radius
        , Element "text" [ attr "class" "sequence-name", intAttr "x" center, intAttr "y" 38, attr "text-anchor" "middle" ]
            [ Text visibleName ]
        ]


drawActivation : (Endpoint -> Int) -> Activation -> SvgNode
drawActivation x activation =
    let
        center =
            x activation.endpoint

        height =
            max 4 (activation.end - activation.start)

        bar =
            box "sequence-activation" (center - 5) activation.start 10 height 0
    in
    case activation.fold of
        Nothing ->
            bar

        Just ( path, collapsed ) ->
            let
                label =
                    (if collapsed then "Expand call to " else "Collapse call to ") ++ activation.endpoint.participant

                markerY =
                    activation.start + min 10 (height // 2)
            in
            Element "g"
                [ attr "class" "sequence-fold"
                , attr "data-fold" path
                , attr "role" "button"
                , attr "tabindex" "0"
                , attr "aria-label" label
                , attr "aria-expanded" (if collapsed then "false" else "true")
                ]
                ([ Element "title" [] [ Text label ]
                 , bar
                 , box "sequence-fold-hit" (center - 9) activation.start 18 height 0
                 ]
                    ++ (if collapsed then
                            [ line "sequence-fold-mark" (center - 3) (markerY - 2) (center + 3) (markerY - 2)
                            , line "sequence-fold-mark" (center - 3) (markerY + 2) (center + 3) (markerY + 2)
                            ]

                        else
                            []
                       )
                )


drawMessage : (Endpoint -> Int) -> Message -> SvgNode
drawMessage x message =
    let
        from =
            x message.from

        to =
            x message.to

        y =
            message.y

        self =
            message.from.participant == message.to.participant

        direction =
            if to >= from then 1 else -1

        start =
            from + (if self then 5 else direction * 5)

        end =
            to + (if self then 5 else -direction * 5)

        tipY =
            if self then y + 22 else y

        tailX =
            end + (if self then 9 else -direction * 9)

        turnX =
            max start end + 42

        captionX =
            if self then
                turnX - 18

            else
                (start + end) // 2

        arrowClass =
            case message.arrow of
                Call ->
                    "sequence-arrow"

                AsyncCall ->
                    "sequence-arrow"

                Return ->
                    "sequence-arrow sequence-return"

        points =
            if self then
                [ ( start, y ), ( turnX, y ), ( turnX, tipY ), ( end, tipY ) ]

            else
                [ ( start, y ), ( end, y ) ]

        head =
            [ ( tailX, tipY - 5 ), ( end, tipY ), ( tailX, tipY + 5 ) ]
    in
    Element "g" []
        ([ Element "polyline" [ attr "class" arrowClass, attr "points" (svgPoints points) ] []
         , if message.arrow == Call then
            Element "polygon" [ attr "class" "sequence-arrowhead", attr "points" (svgPoints head) ] []

           else
            Element "polyline" [ attr "class" (arrowClass ++ " sequence-open-head"), attr "points" (svgPoints head) ] []
         ]
            ++ List.indexedMap
                (\index caption ->
                    Element "text"
                        [ attr "class" "sequence-caption", intAttr "x" captionX
                        , intAttr "y" (y - 9 - 16 * (List.length message.caption - index - 1))
                        , attr "text-anchor" (if self then "start" else "middle")
                        ]
                        [ Text caption ]
                )
                message.caption
        )


svgPoints : List ( Int, Int ) -> String
svgPoints =
    List.map (\( x, y ) -> String.fromInt x ++ "," ++ String.fromInt y) >> String.join " "


line : String -> Int -> Int -> Int -> Int -> SvgNode
line className x1 y1 x2 y2 =
    Element "line" [ attr "class" className, intAttr "x1" x1, intAttr "y1" y1, intAttr "x2" x2, intAttr "y2" y2 ] []


box : String -> Int -> Int -> Int -> Int -> Int -> SvgNode
box className x y width height radius =
    Element "rect" [ attr "class" className, intAttr "x" x, intAttr "y" y, intAttr "width" width, intAttr "height" height, intAttr "rx" radius ] []


intAttr : String -> Int -> ( String, String )
intAttr name value =
    ( name, String.fromInt value )


type SvgNode
    = Element String (List ( String, String )) (List SvgNode)
    | Text String


attr : String -> String -> ( String, String )
attr =
    Tuple.pair


toDom : SvgNode -> Html msg
toDom node =
    case node of
        Element name attrs children ->
            VirtualDom.nodeNS "http://www.w3.org/2000/svg" name
                (List.map (\( key, val ) -> Html.attribute key val) attrs)
                (List.map toDom children)

        Text value ->
            VirtualDom.text value


serialize : SvgNode -> String
serialize node =
    case node of
        Element name attrs children ->
            let
                attributes =
                    List.map (\( key, val ) -> " " ++ key ++ "=\"" ++ escape val ++ "\"") attrs
                        |> String.concat
            in
            "<" ++ name ++ attributes ++ ">" ++ String.concat (List.map serialize children) ++ "</" ++ name ++ ">"

        Text value ->
            escape value


escape : String -> String
escape =
    String.replace "&" "&amp;"
        >> String.replace "<" "&lt;"
        >> String.replace ">" "&gt;"
        >> String.replace "\"" "&quot;"
