port module SchemaMain exposing (main)

import Browser
import DiagramTheme exposing (Theme)
import Html exposing (Html, a, button, code, details, div, h1, h2, header, input, label, main_, option, p, pre, section, select, span, summary, text, textarea)
import Html.Attributes exposing (attribute, checked, class, disabled, for, href, id, placeholder, selected, spellcheck, type_, value)
import Html.Events exposing (onCheck, onClick, onInput)
import Json.Highlight
import Process
import Render.Svg exposing (HoverState)
import SchemaDiagram exposing (Document, Folding)
import Set
import Task


port downloadDiagram : () -> Cmd msg


port openDiagramViewer : () -> Cmd msg


port foldDiagram : (String -> msg) -> Sub msg


port sourceFile : ({ ok : Bool, text : String } -> msg) -> Sub msg


port saveTheme : String -> Cmd msg


port themeFile : (Maybe String -> msg) -> Sub msg


type alias Model =
    { source : String
    , document : Maybe Document
    , error : String
    , themeError : String
    , generation : Int
    , folding : Folding
    , fit : Bool
    , preset : String
    , custom : Theme
    , hover : Maybe HoverState
    }


type Msg
    = Edit String
    | Parse Int
    | LoadExample
    | Format
    | ReadSource { ok : Bool, text : String }
    | ToggleFit
    | ToggleFixed Bool
    | Fold String
    | Hover HoverState
    | Leave
    | FullScreen
    | Download
    | SelectTheme String
    | Customize Theme
    | ImportTheme (Maybe String)
    | ExportTheme


main : Program Bool Model Msg
main =
    Browser.document
        { init =
            \prefersDark ->
                ( { source = "", document = Nothing, error = "", themeError = "", generation = 0
                  , folding = { overview = False, fixed = False, paths = Set.empty }
                  , fit = True
                  , preset = if prefersDark then "dark" else "classic"
                  , custom = if prefersDark then DiagramTheme.dark else DiagramTheme.classic
                  , hover = Nothing
                  }
                , Cmd.none
                )
        , view = \model -> { title = "JSON Schema Viewer", body = [ view model ] }
        , update = update
        , subscriptions = \_ -> Sub.batch [ foldDiagram Fold, themeFile ImportTheme, sourceFile ReadSource ]
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        folding =
            model.folding

        finish next =
            ( next, Cmd.none )
    in
    case msg of
        Edit value_ ->
            let
                generation =
                    model.generation + 1
            in
            ( { model | source = value_, hover = Nothing, generation = generation }
            , Process.sleep 220 |> Task.perform (\_ -> Parse generation)
            )

        Parse generation ->
            if generation == model.generation then
                finish (parseSource model.source model)

            else
                finish model

        LoadExample ->
            finish (loadSource example model)

        Format ->
            case SchemaDiagram.format model.source of
                Ok formatted ->
                    finish (loadSource formatted model)

                Err error ->
                    finish { model | error = error }

        ReadSource result ->
            if result.ok then
                finish (loadSource result.text model)

            else
                finish { model | error = result.text }

        ToggleFit ->
            finish { model | fit = not model.fit }

        ToggleFixed fixed ->
            finish { model | folding = { folding | fixed = fixed } }

        Fold action ->
            let
                next =
                    case action of
                        "expand" ->
                            { folding | overview = False, paths = Set.empty }

                        "collapse" ->
                            { folding | overview = True, paths = Set.empty }

                        path ->
                            { folding
                                | paths =
                                    if Set.member path folding.paths then Set.remove path folding.paths else Set.insert path folding.paths
                            }
            in
            finish { model | folding = next, hover = Nothing }

        Hover hover ->
            finish { model | hover = Just hover }

        Leave ->
            finish { model | hover = Nothing }

        FullScreen ->
            ( { model | hover = Nothing }, openDiagramViewer () )

        Download ->
            ( model, downloadDiagram () )

        SelectTheme preset ->
            finish { model | preset = preset, themeError = "" }

        Customize custom ->
            finish { model | custom = custom, themeError = "" }

        ExportTheme ->
            ( model, saveTheme (DiagramTheme.encode (currentTheme model)) )

        ImportTheme contents ->
            case Maybe.andThen (DiagramTheme.decode >> Result.toMaybe) contents of
                Just theme ->
                    finish { model | preset = "custom", custom = theme, themeError = "" }

                Nothing ->
                    finish { model | themeError = "Could not load theme. Choose a theme JSON exported by the viewer." }


loadSource : String -> Model -> Model
loadSource source model =
    parseSource source { model | source = source, generation = model.generation + 1 }


parseSource : String -> Model -> Model
parseSource source model =
    let
        folding =
            model.folding
    in
    if String.isEmpty (String.trim source) then
        { model | document = Nothing, error = "" }

    else
        case SchemaDiagram.parse source of
            Ok document ->
                { model
                    | document = Just document
                    , error = ""
                    , folding =
                        if model.document == Just document then
                            folding

                        else
                            { overview = False, fixed = False, paths = document.initial }
                }

            Err error ->
                { model | document = Nothing, error = error }


view : Model -> Html Msg
view model =
    div [ class "page schema-page" ]
        [ header [ class "site-header" ]
            [ span [ class "brand" ] [ span [ class "brand-icon", attribute "aria-hidden" "true" ] [ text "{}" ], text "JSON Schema" ]
            , div [ class "tool-links" ]
                [ a [ href "../" ] [ text "Home" ]
                , a [ href "../sequence-diagram/" ] [ text "Sequence diagrams" ]
                , a [ href "https://github.com/eelcoh/jsonschema-viewer" ] [ text "GitHub ↗" ]
                ]
            ]
        , main_ []
            [ div [ class "intro" ]
                [ h1 [] [ text "JSON Schema ", span [] [ text "viewer" ] ]
                , p [] [ text "Explore JSON Schema and OpenAPI one branch at a time." ]
                ]
            , div [ class "workbench" ]
                [ section [ class "panel", attribute "aria-labelledby" "schema-source-heading" ]
                    [ div [ class "panel-header output-header" ]
                        [ h2 [ id "schema-source-heading" ] [ label [ for "source" ] [ text "Schema input" ] ]
                        , div [ class "diagram-tools" ]
                            [ label [ class "schema-file-button" ]
                                [ text "Open JSON", input [ id "schema-file", type_ "file", attribute "accept" ".json,application/json" ] [] ]
                            , button [ onClick Format, disabled (String.isEmpty (String.trim model.source)) ] [ text "Format" ]
                            , if String.isEmpty (String.trim model.source) && String.isEmpty model.error then
                                text ""

                              else
                                button [ onClick LoadExample ] [ text "Load example" ]
                            ]
                        ]
                    , div [ class "source-editor" ]
                        [ pre [ class "source-highlight", attribute "aria-hidden" "true" ]
                            (Json.Highlight.tokensToHtml (Json.Highlight.tokenize model.source) ++ [ text "\n" ])
                        , textarea
                            [ id "source", value model.source, onInput Edit, spellcheck False
                            , attribute "autocapitalize" "off", attribute "wrap" "off"
                            , placeholder "Paste JSON or load an example."
                            ]
                            []
                        ]
                    , details [ class "syntax-help schema-panel-footer" ]
                        [ summary [] [ text "Input help" ]
                        , p [] [ text "Paste JSON Schema or an OpenAPI or Swagger document in JSON format. Local references such as ", code [] [ text "#/$defs/Address" ], text " can be expanded in the diagram." ]
                        , p [] [ text "Tab indents. Shift+Tab outdents. Press Esc then Tab to move focus out of the editor." ]
                        ]
                    ]
                , section [ class "panel", attribute "aria-labelledby" "schema-preview-heading" ]
                    [ div [ class "panel-header output-header" ]
                        [ h2 [ id "schema-preview-heading" ] [ text "Preview" ]
                        , if model.document == Nothing then
                            text ""

                          else
                            div [ class "diagram-tools" ]
                                [ button [ onClick ToggleFit, attribute "aria-pressed" (if model.fit then "true" else "false") ] [ text "Fit to panel" ]
                                , button [ onClick Download ] [ text "Download SVG" ]
                                , button [ onClick FullScreen ] [ text "Full screen" ]
                                ]
                        ]
                    , preview model
                    ]
                ]
            , themeSettings model
            ]
        ]


preview : Model -> Html Msg
preview model =
    case model.document of
        Just document ->
            div []
                [ div
                    [ class (if model.fit then "diagram-preview local-diagram diagram-fit" else "diagram-preview local-diagram")
                    , attribute "tabindex" "0", attribute "aria-label" "Schema diagram preview"
                    ]
                    [ SchemaDiagram.view Hover Leave (currentTheme model) model.folding document ]
                , div [ class "fold-settings schema-panel-footer" ]
                    [ div [ class "diagram-tools" ]
                        [ button [ onClick (Fold "collapse") ] [ text "Collapse all" ]
                        , button [ onClick (Fold "expand") ] [ text "Expand all" ]
                        , label [] [ input [ type_ "checkbox", checked model.folding.fixed, onCheck ToggleFixed ] [], text "Keep positions fixed" ]
                        ]
                    , details [ class "walkthrough-help" ]
                        [ summary [] [ text "Diagram help" ]
                        , p [] [ text "Collapse all to start with an overview. Select a node with a chevron to reveal or hide its details. Keep positions fixed to preserve the layout while you explore." ]
                        ]
                    ]
                , case model.hover of
                    Just hover ->
                        div [ class "schema-tooltip", attribute "aria-hidden" "true"
                            , attribute "style" ("left:" ++ String.fromFloat hover.clientX ++ "px;top:" ++ String.fromFloat hover.clientY ++ "px")
                            ]
                            (List.filterMap identity
                                [ Maybe.map (text >> List.singleton >> p []) hover.meta.description
                                , Maybe.map (String.join ", " >> (++) "Values: " >> text >> List.singleton >> p []) hover.meta.enumValues
                                ]
                                ++ List.map (\( key, val ) -> p [] [ text (key ++ ": " ++ val) ]) hover.meta.constraints
                            )

                    Nothing ->
                        text ""
                ]

        Nothing ->
            if String.isEmpty model.error then
                div [ class "output-message output-empty" ]
                    [ p [ class "output-message-title" ] [ text "Your diagram starts here" ]
                    , p [] [ text "Paste a schema or open a JSON file to see its structure." ]
                    , button [ onClick LoadExample, class "example-button" ] [ text "Try an example" ]
                    ]

            else
                div [ class "output-message output-error schema-error", attribute "role" "status" ]
                    [ p [ class "output-message-title" ] [ text "Could not render this schema" ]
                    , pre [] [ text model.error ]
                    ]


currentTheme : Model -> Theme
currentTheme model =
    if model.preset == "custom" then model.custom else Maybe.withDefault DiagramTheme.classic (DiagramTheme.preset model.preset)


themeSettings : Model -> Html Msg
themeSettings model =
    let
        theme =
            model.custom

        color caption current setColor =
            label [] [ text caption, input [ type_ "color", value current, onInput (setColor >> Customize) ] [] ]
    in
    section [ class "theme-settings", attribute "aria-label" "Diagram theme settings" ]
        [ div [ class "theme-controls" ]
            [ choose "Diagram theme" model.preset SelectTheme
                [ ( "classic", "Classic" ), ( "monochrome", "Monochrome" ), ( "inverse-monochrome", "Inverse monochrome" )
                , ( "dark", "Dark" ), ( "high-contrast-black", "High Contrast Black" ), ( "custom", "Custom" )
                ]
            , div [ class "diagram-tools schema-theme-actions" ]
                [ label [ class "schema-file-button" ]
                    [ text "Import theme", input [ id "theme-file", type_ "file", attribute "accept" ".json,application/json" ] [] ]
                , button [ onClick ExportTheme ] [ text "Export theme" ]
                ]
            ]
        , if model.preset == "custom" then
            div [ class "theme-custom" ]
                [ color "Background" theme.background (\v -> { theme | background = v })
                , color "Labels" theme.text (\v -> { theme | text = v })
                , color "Root and branch fill" theme.participant (\v -> { theme | participant = v })
                , color "Root label" theme.participantText (\v -> { theme | participantText = v })
                , color "Node outline" theme.participantBorder (\v -> { theme | participantBorder = v })
                , color "Type labels" theme.activationBorder (\v -> { theme | activationBorder = v })
                , color "Connectors" theme.lifeline (\v -> { theme | lifeline = v })
                , choose "Font" theme.font (\v -> Customize { theme | font = v }) DiagramTheme.fonts
                , label []
                    [ text ("Node corner radius (" ++ String.fromInt theme.radius ++ " px)")
                    , input [ type_ "range", attribute "min" "0", attribute "max" "11", value (String.fromInt (min 11 theme.radius))
                            , onInput (\v -> Customize { theme | radius = Maybe.withDefault theme.radius (String.toInt v) }) ] []
                    ]
                ]

          else
            text ""
        , p [ class "theme-status", attribute "role" "status" ] [ text model.themeError ]
        ]


choose : String -> String -> (String -> Msg) -> List ( String, String ) -> Html Msg
choose caption current onChange choices =
    label []
        [ text caption
        , select [ onInput onChange ]
            (List.map (\( key, name ) -> option [ value key, selected (key == current) ] [ text name ]) choices)
        ]


example : String
example =
    """{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Order",
    "type": "object",
    "required": ["id", "items"],
    "properties": {
        "id": { "type": "string", "format": "uuid" },
        "status": {
            "type": "string",
            "enum": ["pending", "paid", "shipped"]
        },
        "shipping": { "$ref": "#/$defs/Address" },
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "sku": { "type": "string" },
                    "quantity": { "type": "integer", "minimum": 1 }
                }
            }
        }
    },
    "$defs": {
        "Address": {
            "type": "object",
            "properties": {
                "street": { "type": "string" },
                "city": { "type": "string" }
            }
        }
    }
}"""
