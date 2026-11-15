module SchemaSvg exposing (Svg, Attribute, attr, card, circle, fold, g, hasClass, hidden, line, on, path, rect, root, serialize, style, svg, text, text_, title, toDom)

import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Decode as Decode
import VirtualDom


type Svg msg
    = Element String (List (Attribute msg)) (List (Svg msg))
    | Card FoldAnchor (Svg msg)
    | Text String


type alias FoldAnchor =
    { right : Float, centerY : Float, foreground : String }


type Attribute msg
    = Attr String String
    | Event String (Decode.Decoder msg)


attr : String -> String -> Attribute msg
attr =
    Attr


on : String -> Decode.Decoder msg -> Attribute msg
on =
    Event


svg = Element "svg"
g = Element "g"
rect = Element "rect"
circle = Element "circle"
line = Element "line"
path = Element "path"
text_ = Element "text"
text = Text


card : FoldAnchor -> List (Attribute msg) -> Svg msg
card anchor attrs =
    Card anchor (rect (attr "class" "schema-card" :: attrs) [])


title : String -> Svg msg
title value =
    Element "title" [] [ Text value ]


hidden : Svg msg -> Svg msg
hidden node =
    g [ attr "display" "none" ] [ node ]


fold : String -> Bool -> Svg msg -> Svg msg
fold key collapsed node =
    if hasFold key node then
        node

    else
        let
            name =
                if collapsed then "Expand schema node" else "Collapse schema node"
        in
        g
            [ attr "class" "schema-fold"
            , attr "data-fold" key
            , attr "role" "button"
            , attr "tabindex" "0"
            , attr "aria-label" (name ++ " " ++ key)
            , attr "aria-expanded" (if collapsed then "false" else "true")
            ]
            (node :: List.map (foldMarker collapsed) (List.take 1 (cardAnchors node)))


cardAnchors : Svg msg -> List FoldAnchor
cardAnchors node =
    case node of
        Card anchor _ ->
            [ anchor ]

        Element _ _ children ->
            List.concatMap cardAnchors children

        Text _ ->
            []


foldMarker : Bool -> FoldAnchor -> Svg msg
foldMarker collapsed anchor =
    path
        [ attr "class" "schema-fold-marker"
        , attr "transform"
            ("translate(" ++ String.fromFloat (anchor.right - 9) ++ " " ++ String.fromFloat anchor.centerY ++ ")"
                ++ (if collapsed then "" else " rotate(90)")
            )
        , attr "d" "M -1.5 -2.75 L 1.5 0 L -1.5 2.75"
        , attr "fill" "none"
        , attr "stroke" anchor.foreground
        , attr "stroke-width" "1.4"
        , attr "stroke-linecap" "round"
        , attr "stroke-linejoin" "round"
        , attr "pointer-events" "none"
        , attr "aria-hidden" "true"
        ]
        []


hasFold : String -> Svg msg -> Bool
hasFold =
    hasAttribute "data-fold"


hasClass : String -> Svg msg -> Bool
hasClass =
    hasAttribute "class"


hasAttribute : String -> String -> Svg msg -> Bool
hasAttribute name value node =
    case node of
        Element _ attrs children ->
            List.any
                (\attribute ->
                    case attribute of
                        Attr attributeName attributeValue ->
                            name == attributeName && value == attributeValue

                        _ ->
                            False
                )
                attrs
                || List.any (hasAttribute name value) children

        _ ->
            False


root : List (Attribute msg) -> List (Svg msg) -> Svg msg -> Svg msg
root attrs extra node =
    case node of
        Element tag original children ->
            Element tag (original ++ attrs) (extra ++ children)

        _ ->
            node


toDom : Svg msg -> Html msg
toDom node =
    case node of
        Element tag attrs children ->
            VirtualDom.nodeNS "http://www.w3.org/2000/svg" tag (List.map domAttr attrs) (List.map toDom children)

        Card _ shape ->
            toDom shape

        Text value ->
            VirtualDom.text value


domAttr : Attribute msg -> Html.Attribute msg
domAttr attribute =
    case attribute of
        Attr name value ->
            Html.Attributes.attribute name value

        Event name decoder ->
            Html.Events.on name decoder


serialize : Bool -> Svg msg -> String
serialize interactive node =
    case node of
        Element tag attrs children ->
            "<" ++ tag ++ String.concat (List.filterMap (xmlAttr interactive) attrs) ++ ">"
                ++ String.concat (List.map (serialize interactive) children) ++ "</" ++ tag ++ ">"

        Card _ shape ->
            serialize interactive shape

        Text value ->
            escape value


xmlAttr : Bool -> Attribute msg -> Maybe String
xmlAttr interactive attribute =
    case attribute of
        Attr name value ->
            if not interactive && (List.member name [ "data-fold", "data-can-collapse", "tabindex", "aria-expanded" ] || (name == "role" && value == "button")) then
                Nothing

            else
                Just (" " ++ name ++ "=\"" ++ escape value ++ "\"")

        Event _ _ ->
            Nothing


escape : String -> String
escape =
    String.filter (\char -> Char.toCode char >= 32 || List.member char [ '\n', '\t', '\u{000D}' ])
        >> String.replace "&" "&amp;"
        >> String.replace "<" "&lt;"
        >> String.replace ">" "&gt;"
        >> String.replace "\"" "&quot;"


style : String -> Svg msg
style css =
    Element "style" [] [ Text css ]
