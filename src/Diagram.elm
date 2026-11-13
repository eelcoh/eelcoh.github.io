module Diagram exposing (view)

import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes as Html
import SequenceDiagram.Model exposing (Option(..), Sequence(..), Step(..))
import Svg exposing (Svg)
import Svg.Attributes as A


type alias Endpoint =
    { participant : String, depth : Int }


type Arrow
    = Call
    | AsyncCall
    | Return


type alias Message =
    { from : Endpoint, to : Endpoint, caption : List String, y : Int, arrow : Arrow }


type alias Activation =
    { endpoint : Endpoint, start : Int, end : Int }


type alias Layout =
    { y : Int, messages : List Message, activations : List Activation }


view : Bool -> Bool -> Sequence -> Html msg
view showReturns monochrome (Sequence initiator steps) =
    let
        root =
            Endpoint initiator 0

        layout =
            List.foldl (placeStep showReturns root (Dict.singleton initiator 0))
                { y = 114, messages = [], activations = [] }
                steps

        activations =
            Activation root 68 (layout.y - 12) :: layout.activations

        names =
            unique (initiator :: List.concatMap stepNames steps)

        depthPadding =
            8 * List.foldl (\bar largest -> max largest bar.endpoint.depth) 0 activations

        columnGap =
            248 + depthPadding

        columns =
            Dict.fromList (List.indexedMap (\index name -> ( name, 112 + index * columnGap )) names)

        x endpoint =
            Dict.get endpoint.participant columns |> Maybe.withDefault 112 |> (+) (8 * endpoint.depth)

        lastParticipant =
            List.reverse names |> List.head |> Maybe.withDefault initiator

        rightPadding =
            if List.any (\message -> message.from.participant == message.to.participant && message.to.participant == lastParticipant) layout.messages then
                254

            else
                112

        width =
            112 + (List.length names - 1) * columnGap + rightPadding + depthPadding

        height =
            layout.y + 12
    in
    Svg.svg
        [ A.class (if monochrome then "sequence-svg sequence-monochrome" else "sequence-svg")
        , intAttr A.width width
        , intAttr A.height height
        , A.viewBox ("0 0 " ++ String.fromInt width ++ " " ++ String.fromInt height)
        , Html.attribute "role" "img"
        , Html.attribute "aria-label" "Sequence diagram"
        ]
        (List.map (drawParticipant columns (height - 20)) names
            ++ List.map (drawActivation x) (List.sortBy .start activations)
            ++ List.map (drawMessage x) (List.reverse layout.messages)
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


placeStep : Bool -> Endpoint -> Dict String Int -> Step -> Layout -> Layout
placeStep showReturns caller depths (Step name options caption children) layout =
    let
        depth =
            (Dict.get name depths |> Maybe.withDefault -1) + 1

        callee =
            Endpoint name depth

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
                | y = y + loopHeight + 46
                , messages = Message caller callee labels y (if asynchronous then AsyncCall else Call) :: layout.messages
            }

        afterChildren =
            List.foldl (placeStep showReturns callee (Dict.insert name depth depths)) called children

        finished =
            if showReturns && not asynchronous then
                { afterChildren
                    | y = afterChildren.y + loopHeight + 46
                    , messages = Message callee caller [] afterChildren.y Return :: afterChildren.messages
                }

            else
                afterChildren

        activationEnd =
            if showReturns && not asynchronous then
                afterChildren.y + loopHeight

            else
                afterChildren.y - 20
    in
    { finished | activations = Activation callee (y + loopHeight) activationEnd :: finished.activations }


wrapCaption : String -> List String
wrapCaption caption =
    if String.isEmpty caption then
        []

    else
        let
            limit =
                25

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


drawParticipant : Dict String Int -> Int -> String -> Svg msg
drawParticipant columns bottom name =
    let
        center =
            Dict.get name columns |> Maybe.withDefault 112

        visibleName =
            if String.length name > 21 then String.left 20 name ++ "…" else name
    in
    Svg.g []
        [ Svg.title [] [ Svg.text name ]
        , line "sequence-lifeline" center 58 center bottom
        , box "sequence-participant" (center - 84) 18 168 40 11
        , Svg.text_ [ A.class "sequence-name", intAttr A.x center, intAttr A.y 43, A.textAnchor "middle" ]
            [ Svg.text visibleName ]
        ]


drawActivation : (Endpoint -> Int) -> Activation -> Svg msg
drawActivation x activation =
    box "sequence-activation" (x activation.endpoint - 5) activation.start 10 (max 4 (activation.end - activation.start)) 3


drawMessage : (Endpoint -> Int) -> Message -> Svg msg
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
            end + (if self then 8 else -direction * 8)

        turnX =
            max start end + 42

        captionX =
            if self then
                turnX - 18

            else
                (start + end) // 2

        strokeClass =
            if message.arrow == Return then "sequence-arrow sequence-return" else "sequence-arrow"

        points =
            if self then
                [ ( start, y ), ( turnX, y ), ( turnX, tipY ), ( end, tipY ) ]

            else
                [ ( start, y ), ( end, y ) ]

        head =
            [ ( tailX, tipY - 4 ), ( end, tipY ), ( tailX, tipY + 4 ) ]
    in
    Svg.g []
        ([ Svg.polyline [ A.class strokeClass, A.points (svgPoints points) ] []
         , if message.arrow == Call then
            Svg.polygon [ A.class "sequence-arrowhead", A.points (svgPoints head) ] []

           else
            Svg.polyline [ A.class "sequence-arrow", A.points (svgPoints head) ] []
         ]
            ++ List.indexedMap
                (\index caption ->
                    Svg.text_
                        [ A.class "sequence-caption", intAttr A.x captionX
                        , intAttr A.y (y - 9 - 16 * (List.length message.caption - index - 1))
                        , A.textAnchor (if self then "start" else "middle")
                        ]
                        [ Svg.text caption ]
                )
                message.caption
        )


svgPoints : List ( Int, Int ) -> String
svgPoints =
    List.map (\( x, y ) -> String.fromInt x ++ "," ++ String.fromInt y) >> String.join " "


line : String -> Int -> Int -> Int -> Int -> Svg msg
line className x1 y1 x2 y2 =
    Svg.line [ A.class className, intAttr A.x1 x1, intAttr A.y1 y1, intAttr A.x2 x2, intAttr A.y2 y2 ] []


box : String -> Int -> Int -> Int -> Int -> Int -> Svg msg
box className x y width height radius =
    Svg.rect [ A.class className, intAttr A.x x, intAttr A.y y, intAttr A.width width, intAttr A.height height, intAttr A.rx radius ] []


intAttr : (String -> Svg.Attribute msg) -> Int -> Svg.Attribute msg
intAttr attr =
    String.fromInt >> attr
