module SchemaMarks exposing (card, connector, curve, downThenRight, requiredLegend)

import Char
import SchemaSvg as Svg exposing (Svg)


type alias Point =
    ( Float, Float )


type alias Node =
    { name : Maybe String
    , kind : Maybe String
    , weight : String
    , required : Bool
    , branch : Bool
    , origin : Bool
    , reference : Bool
    }


card : Float -> Node -> Point -> ( Svg msg, Point )
card height node ( x, y ) =
    let
        center =
            y + height / 2

        baseline =
            center + 3.8

        nameWidth =
            Maybe.withDefault 0 (Maybe.map (measure 6.8) node.name)

        typeWidth =
            Maybe.withDefault 0
                (Maybe.map (measure 5.6 >> (+) (if node.name == Nothing then 0 else 10)) node.kind)

        right =
            x + Basics.max 56 (10 + nameWidth + (if node.required then 8 else 0) + typeWidth + 17)

        bounds =
            [ number "x" x, number "y" y, number "width" (right - x), number "height" height, Svg.attr "rx" "3" ]

        foreground =
            if node.origin then "var(--schema-iconText)" else "var(--schema-nodeText)"

        fill =
            if node.origin then "var(--schema-iconChipBg)" else "var(--schema-background)"

        tint =
            if node.branch then
                [ Svg.rect (Svg.attr "fill" "var(--schema-branchTint)" :: Svg.attr "fill-opacity" "var(--schema-branchOpacity)" :: bounds) [] ]

            else
                []

        ( nameText, typeX, typeAnchor ) =
            case node.name of
                Just name ->
                    ( [ caption (x + 10) baseline "11" foreground node.weight "start" name ], right - 17, "end" )

                Nothing ->
                    ( [], x + 10, "start" )

        requiredMark =
            if node.required then
                [ Svg.text_
                    [ Svg.attr "class" "schema-required", Svg.attr "aria-label" "Required"
                    , number "x" (x + 12 + nameWidth), number "y" (baseline - 2)
                    , Svg.attr "font-size" "9", Svg.attr "fill" foreground
                    ]
                    [ Svg.text "*" ]
                ]

            else
                []

        typeText =
            node.kind
                |> Maybe.map
                    (caption typeX baseline "9" (if node.origin then foreground else "var(--schema-nodeBorderSubtle)") "500" typeAnchor)
                |> Maybe.map List.singleton
                |> Maybe.withDefault []

        outline =
            Svg.card { right = right, centerY = center, foreground = foreground }
                (bounds
                    ++ [ Svg.attr "fill" "transparent"
                       , Svg.attr "stroke" "var(--schema-nodeBorder)"
                       , Svg.attr "stroke-width" "1"
                       , Svg.attr "stroke-opacity" (if node.origin then "0.85" else "var(--schema-outlineOpacity)")
                       , Svg.attr "vector-effect" "non-scaling-stroke"
                       ]
                    ++ (if node.reference then [ Svg.attr "stroke-dasharray" "4 2" ] else [])
                )
    in
    ( Svg.g []
        ([ Svg.rect (Svg.attr "fill" fill :: bounds) [] ] ++ tint ++ nameText ++ requiredMark ++ typeText ++ [ outline ])
    , ( right, y + height )
    )


measure : Float -> String -> Float
measure unit value =
    String.foldl
        (\char width ->
            width
                + (if Char.toCode char >= 0x2E80 then
                    unit * 1.7

                   else
                    unit
                  )
        )
        0
        value


caption : Float -> Float -> String -> String -> String -> String -> String -> Svg msg
caption x y size fill weight anchor value =
    Svg.text_
        [ number "x" x, number "y" y, Svg.attr "font-size" size, Svg.attr "fill" fill
        , Svg.attr "font-weight" weight, Svg.attr "text-anchor" anchor
        ]
        [ Svg.text value ]


requiredLegend : Float -> Svg msg
requiredLegend bottom =
    caption 0 (bottom + 11) "9" "var(--schema-nodeText)" "400" "start" "* Required field"


curve : Bool -> Point -> Point -> String
curve square (( startX, startY ) as start) (( endX, endY ) as end) =
    let
        mid =
            (startX + endX) / 2
    in
    "M " ++ point start
        ++ (if square then
                " H " ++ String.fromFloat mid ++ " V " ++ String.fromFloat endY ++ " H " ++ String.fromFloat endX

            else
                " C " ++ point ( mid, startY ) ++ " " ++ point ( mid, endY ) ++ " " ++ point end
           )


downThenRight : Bool -> Point -> Point -> Svg msg
downThenRight square (( startX, startY ) as start) (( endX, endY ) as end) =
    let
        bend =
            min (abs (endY - startY)) (abs (endX - startX)) / 2

        turn =
            if square then
                " V " ++ String.fromFloat endY

            else
                " V " ++ String.fromFloat (endY - bend) ++ " Q " ++ point ( startX, endY ) ++ " " ++ point ( startX + bend, endY )
    in
    connector square ("M " ++ point start ++ turn ++ " H " ++ String.fromFloat endX) end


connector : Bool -> String -> Point -> Svg msg
connector square d ( endX, endY ) =
    Svg.g [ Svg.attr "class" "schema-connection", Svg.attr "aria-hidden" "true" ]
        [ Svg.path
            [ Svg.attr "d" d, Svg.attr "fill" "none", Svg.attr "stroke" "var(--schema-connector)"
            , Svg.attr "stroke-width" "0.85", Svg.attr "vector-effect" "non-scaling-stroke", Svg.attr "stroke-opacity" "0.72"
            ]
            []
        , if square then
            Svg.rect
                [ number "x" (endX - 2), number "y" (endY - 1), number "width" 2, number "height" 2, Svg.attr "fill" "var(--schema-connector)" ]
                []

          else
            Svg.circle
                [ number "cx" (endX - 1.15), number "cy" endY, number "r" 1.15, Svg.attr "fill" "var(--schema-connector)" ]
                []
        ]


point : Point -> String
point ( x, y ) =
    String.fromFloat x ++ " " ++ String.fromFloat y


number : String -> Float -> Svg.Attribute msg
number key value =
    Svg.attr key (String.fromFloat value)
