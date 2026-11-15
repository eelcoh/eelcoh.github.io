module SchemaDiagram exposing (Document, Folding, format, parse, svg, view)

import Dict
import DiagramTheme exposing (Theme)
import Html exposing (Html)
import Json.Decode as Decode
import Json.Encode as Encode
import Json.Schema
import Json.Schema.Decode as Schema
import Render.Svg as Render
import SchemaSource
import SchemaSvg as Svg
import Set exposing (Set)


type alias Document =
    { model : Json.Schema.Model, initial : Set String, title : Maybe String }


type alias Folding =
    { overview : Bool, fixed : Bool, paths : Set String }


parse : String -> Result String Document
parse source =
    Decode.decodeString Decode.value (if String.startsWith "\u{FEFF}" source then String.dropLeft 1 source else source)
        |> Result.andThen
            (\value ->
                let
                    ( prepared, anchors ) =
                        SchemaSource.prepare value

                    definitions =
                        Dict.foldl
                            (\key child acc ->
                                case Decode.decodeValue Schema.decoder child of
                                    Ok model ->
                                        Dict.insert key model.schema acc

                                    Err _ ->
                                        acc
                            )
                            Dict.empty
                            anchors
                in
                Decode.decodeValue
                    (Decode.oneOf [ Decode.bool |> Decode.map (always ()), Decode.keyValuePairs Decode.value |> Decode.map (always ()) ]
                        |> Decode.andThen
                            (\_ ->
                                Decode.map3 Document Schema.decoder Schema.initialCollapsedPaths
                                    (Decode.maybe
                                        (Decode.oneOf
                                            [ Decode.field "title" Decode.string
                                            , Decode.at [ "info", "title" ] Decode.string
                                            ]
                                        )
                                        |> Decode.map (Maybe.map String.trim >> Maybe.andThen nonEmpty)
                                    )
                            )
                    )
                    prepared
                    |> Result.map
                        (\document ->
                            let
                                model =
                                    document.model
                            in
                            { document | model = { model | definitions = Dict.union model.definitions definitions } }
                        )
            )
        |> Result.mapError Decode.errorToString


nonEmpty : String -> Maybe String
nonEmpty value =
    if String.isEmpty value then Nothing else Just value


format : String -> Result String String
format source =
    Decode.decodeString Decode.value source
        |> Result.map (Encode.encode 4)
        |> Result.mapError Decode.errorToString


view : (Render.HoverState -> msg) -> msg -> Theme -> Folding -> Document -> Html msg
view hover leave theme folding document =
    render hover leave theme folding document |> Svg.toDom


svg : Bool -> Theme -> Folding -> Document -> String
svg interactive theme folding document =
    render (always ()) () theme folding document
        |> Svg.root [ Svg.attr "xmlns" "http://www.w3.org/2000/svg" ] []
        |> Svg.serialize interactive


render : (Render.HoverState -> msg) -> msg -> Theme -> Folding -> Document -> Svg.Svg msg
render hover leave theme folding document =
    Render.view folding.overview folding.fixed (theme.radius == 0) hover leave folding.paths document.model.definitions document.title document.model.schema
        |> Svg.root
            [ Svg.attr "class" "sequence-svg schema-svg"
            , Svg.attr "role" "group"
            , Svg.attr "aria-label" "JSON Schema diagram"
            , Svg.attr "data-can-collapse" (if folding.overview && Set.isEmpty folding.paths then "false" else "true")
            ]
            [ Svg.rect [ Svg.attr "width" "100%", Svg.attr "height" "100%", Svg.attr "fill" theme.background ] []
            , Svg.style (themeCss theme)
            ]


themeCss : Theme -> String
themeCss theme =
    let
        matchingFills =
            String.toLower theme.participant == String.toLower theme.background

        font =
            case theme.font of
                "sans" ->
                    "system-ui, sans-serif"

                "serif" ->
                    "Georgia, serif"

                _ ->
                    "Consolas, Menlo, monospace"
    in
    ".schema-svg { background: " ++ theme.background ++ "; font-family: " ++ font ++ ";"
        ++ String.concat
            (List.map (\( key, value ) -> "--schema-" ++ key ++ ":" ++ value ++ ";")
                [ ( "nodeBorder", theme.participantBorder )
                , ( "outlineOpacity", if matchingFills && theme.radius == 0 then "0.95" else "0.55" )
                , ( "background", theme.background )
                , ( "nodeBorderSubtle", theme.activationBorder )
                , ( "nodeText", theme.text )
                , ( "iconText", theme.participantText )
                , ( "iconChipBg", theme.participant )
                , ( "branchTint", if matchingFills then theme.participantBorder else theme.participant )
                , ( "branchOpacity", if matchingFills then "0.20" else "0.12" )
                , ( "connector", theme.lifeline )
                ]
            )
        ++ "} .schema-svg text { font-family: inherit; cursor: inherit; }"
        ++ ".schema-svg rect[rx=\"3\"] { rx: " ++ String.fromInt theme.radius ++ "px; ry: " ++ String.fromInt theme.radius ++ "px; }"
        ++ ".schema-fold[tabindex] { cursor: pointer; }"
        ++ ".schema-fold[tabindex] .schema-card:hover { stroke-opacity: .85; stroke-width: 1.2px; }"
        ++ ".schema-fold:focus { outline: none; }"
        ++ ".schema-fold:focus-visible .schema-card { stroke-opacity: 1; stroke-width: 2px; }"
