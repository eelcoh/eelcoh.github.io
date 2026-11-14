module DiagramTheme exposing (Theme, classic, dark, decode, encode, fonts, highContrastBlack, inverseMonochrome, monochrome, styles)

import Json.Decode as Decode
import Json.Encode as Encode


type alias Theme =
    { background : String
    , text : String
    , participant : String
    , participantText : String
    , activation : String
    , lifeline : String
    , activationBorder : String
    , font : String
    , radius : Int
    , participantBorder : String
    }


classic : Theme
classic =
    Theme "#ffffff" "#17382a" "#21543e" "#ffffff" "#c7ebd7" "#899d92" "#39815d" "mono" 3 "#17382a"


monochrome : Theme
monochrome =
    Theme "#ffffff" "#202521" "#323a34" "#ffffff" "#e1e6e2" "#929292" "#565656" "mono" 9 "#202521"


inverseMonochrome : Theme
inverseMonochrome =
    Theme "#202020" "#f4f4f4" "#ededed" "#202020" "#454545" "#929292" "#bdbdbd" "mono" 9 "#bdbdbd"


dark : Theme
dark =
    Theme "#172321" "#e4f0ea" "#315845" "#ffffff" "#436c57" "#80988c" "#9ccdaf" "mono" 9 "#80988c"


highContrastBlack : Theme
highContrastBlack =
    { background = "#000000"
    , text = "#fafffd"
    , participant = "#000000"
    , participantBorder = "#faf9f9"
    , participantText = "#ffffff"
    , activation = "#000000"
    , lifeline = "#ffffff"
    , activationBorder = "#ffffff"
    , font = "mono"
    , radius = 0
    }


fonts : List ( String, String )
fonts =
    [ ( "mono", "Monospace" ), ( "sans", "Sans serif" ), ( "serif", "Serif" ) ]


styles : Theme -> List ( String, String )
styles theme =
    [ ( "--diagram-background", theme.background )
    , ( "--diagram-ink", theme.text )
    , ( "--diagram-header", theme.participant )
    , ( "--diagram-header-border", theme.participantBorder )
    , ( "--diagram-header-text", theme.participantText )
    , ( "--diagram-active", theme.activation )
    , ( "--diagram-line", theme.lifeline )
    , ( "--diagram-active-edge", theme.activationBorder )
    , ( "--diagram-font"
      , case theme.font of
            "sans" ->
                "var(--diagram-sans)"

            "serif" ->
                "Georgia, serif"

            _ ->
                "var(--code)"
      )
    ]


encode : Theme -> String
encode theme =
    Encode.encode 2 <|
        Encode.object
            [ ( "background", Encode.string theme.background )
            , ( "text", Encode.string theme.text )
            , ( "participant", Encode.string theme.participant )
            , ( "participantBorder", Encode.string theme.participantBorder )
            , ( "participantText", Encode.string theme.participantText )
            , ( "activation", Encode.string theme.activation )
            , ( "lifeline", Encode.string theme.lifeline )
            , ( "activationBorder", Encode.string theme.activationBorder )
            , ( "font", Encode.string theme.font )
            , ( "radius", Encode.int theme.radius )
            ]


decode : String -> Result Decode.Error Theme
decode =
    Decode.decodeString <|
        Decode.map3 (\theme radius border -> theme radius border)
            (Decode.map8 Theme
                (Decode.field "background" color)
                (Decode.field "text" color)
                (Decode.field "participant" color)
                (Decode.field "participantText" color)
                (Decode.field "activation" color)
                (optionalColor "lifeline" classic.lifeline)
                (optionalColor "activationBorder" classic.activationBorder)
                (Decode.field "font" (Decode.string |> validate "Unknown font" (\font -> List.member font (List.map Tuple.first fonts))))
            )
            (Decode.field "radius" (Decode.int |> validate "Radius must be between 0 and 19" (\radius -> radius >= 0 && radius <= 19)))
            (Decode.field "participant" color |> Decode.andThen (optionalColor "participantBorder"))


optionalColor : String -> String -> Decode.Decoder String
optionalColor key fallback =
    Decode.maybe (Decode.field key Decode.value)
        |> Decode.andThen
            (\field ->
                case field of
                    Nothing ->
                        Decode.succeed fallback

                    Just _ ->
                        Decode.field key color
            )


color : Decode.Decoder String
color =
    Decode.string
        |> validate "Expected a six-digit hex color"
            (\value ->
                String.length value == 7
                    && String.startsWith "#" value
                    && String.all (\char -> String.contains (String.fromChar char) "0123456789abcdefABCDEF") (String.dropLeft 1 value)
            )


validate : String -> (a -> Bool) -> Decode.Decoder a -> Decode.Decoder a
validate message isValid decoder =
    decoder
        |> Decode.andThen
            (\value ->
                if isValid value then
                    Decode.succeed value

                else
                    Decode.fail message
            )
