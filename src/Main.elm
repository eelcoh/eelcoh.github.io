port module Main exposing (main)

import Browser
import Diagram
import DiagramTheme exposing (Theme)
import Html exposing (Html, a, button, code, details, div, h1, h2, header, img, input, label, li, main_, option, p, pre, section, select, span, summary, text, textarea, ul)
import Html.Attributes exposing (alt, attribute, checked, class, disabled, for, hidden, href, id, placeholder, selected, spellcheck, src, type_, value)
import Html.Events exposing (on, onCheck, onClick, onInput)
import Json.Decode as Decode
import SequenceDiagram.Model exposing (Sequence)
import SequenceInput exposing (parse)
import Set exposing (Set)
import SequenceDiagram.Renderer exposing (toPlantUml)


port saveTheme : String -> Cmd msg


port themeFile : (Maybe String -> msg) -> Sub msg


port copyOutput : String -> Cmd msg


port downloadDiagram : () -> Cmd msg


port openDiagramViewer : () -> Cmd msg


port foldDiagram : (String -> msg) -> Sub msg


port copyResult : (Bool -> msg) -> Sub msg


port preparePreview : { request : Int, source : String } -> Cmd msg


port previewResult : ({ request : Int, url : Maybe String } -> msg) -> Sub msg


type OutputMode
    = Code
    | Diagram
    | ServerPreview


type Preview
    = NotRequested
    | Preparing
    | Loading String
    | Loaded String
    | Failed


type alias Model =
    { source : String
    , diagram : Maybe (Result String Sequence)
    , showReturns : Bool
    , includeTheme : Bool
    , diagramPreset : String
    , customTheme : Theme
    , themeStatus : String
    , copyStatus : String
    , outputMode : OutputMode
    , fitDiagram : Bool
    , collapsed : Set String
    , fixedDiagram : Bool
    , preview : Preview
    , previewRequest : Int
    }


type Msg
    = Edit String
    | LoadExample
    | LoadSyntaxExample
    | ShowReturns Bool
    | IncludeTheme Bool
    | SelectDiagramTheme String
    | EditTheme Theme
    | SaveTheme
    | LoadTheme (Maybe String)
    | Copy String
    | Copied Bool
    | SetOutputMode OutputMode
    | ToggleDiagramFit
    | FoldDiagram String
    | SetFixedDiagram Bool
    | DownloadDiagram
    | OpenDiagramViewer
    | RenderPreview String
    | PreviewPrepared { request : Int, url : Maybe String }
    | PreviewLoaded Int String
    | PreviewFailed Int


main : Program () Model Msg
main =
    Browser.document
        { init =
            \() ->
                ( { source = ""
                  , diagram = Nothing
                  , showReturns = True
                  , includeTheme = False
                  , diagramPreset = "classic"
                  , customTheme = DiagramTheme.classic
                  , themeStatus = ""
                  , copyStatus = ""
                  , outputMode = Diagram
                  , fitDiagram = True
                  , collapsed = Set.empty
                  , fixedDiagram = True
                  , preview = NotRequested
                  , previewRequest = 0
                  }
                , Cmd.none
                )
        , update = update
        , view = \model -> { title = "Sequence Diagram Generator", body = [ view model ] }
        , subscriptions = \_ -> Sub.batch [ copyResult Copied, previewResult PreviewPrepared, themeFile LoadTheme, foldDiagram FoldDiagram ]
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Edit source ->
            let
                diagram =
                    if String.isEmpty (String.trim source) then
                        Nothing

                    else
                        Just (parse source)
            in
            ( { model
                | source = source
                , diagram = diagram
                , collapsed = if diagram == model.diagram then model.collapsed else Set.empty
                , copyStatus = ""
                , preview = NotRequested
              }
            , Cmd.none
            )

        LoadExample ->
            update (Edit example) model

        LoadSyntaxExample ->
            update (Edit syntaxExample) model

        ShowReturns enabled ->
            ( { model | showReturns = enabled, copyStatus = "", preview = NotRequested }, Cmd.none )

        IncludeTheme enabled ->
            ( { model | includeTheme = enabled, copyStatus = "", preview = NotRequested }, Cmd.none )

        SelectDiagramTheme preset ->
            ( { model | diagramPreset = preset, themeStatus = "" }, Cmd.none )

        EditTheme theme ->
            ( { model | customTheme = theme, themeStatus = "" }, Cmd.none )

        SaveTheme ->
            ( model, saveTheme (DiagramTheme.encode (diagramTheme model)) )

        LoadTheme contents ->
            case Maybe.andThen (DiagramTheme.decode >> Result.toMaybe) contents of
                Just theme ->
                    ( { model | diagramPreset = "custom", customTheme = theme, themeStatus = "Theme loaded." }, Cmd.none )

                Nothing ->
                    ( { model | themeStatus = "Could not load theme. Choose a valid theme JSON file." }, Cmd.none )

        Copy output ->
            ( { model | copyStatus = "" }, copyOutput output )

        Copied ok ->
            ( { model
                | copyStatus =
                    if ok then
                        "Copied to clipboard."

                    else
                        "Copy failed. Select the output to copy it manually."
              }
            , Cmd.none
            )

        SetOutputMode mode ->
            ( { model | outputMode = mode, copyStatus = "" }, Cmd.none )

        ToggleDiagramFit ->
            ( { model | fitDiagram = not model.fitDiagram }, Cmd.none )

        SetFixedDiagram enabled ->
            ( { model | fixedDiagram = enabled }, Cmd.none )

        FoldDiagram target ->
            let
                collapsed =
                    case target of
                        "expand" ->
                            Set.empty

                        "collapse" ->
                            foldableCalls model

                        path ->
                            if Set.member path model.collapsed then
                                Set.remove path model.collapsed

                            else
                                Set.insert path model.collapsed
            in
            ( { model | collapsed = collapsed }, Cmd.none )

        DownloadDiagram ->
            ( model, downloadDiagram () )

        OpenDiagramViewer ->
            ( model, openDiagramViewer () )

        RenderPreview source ->
            let
                request =
                    model.previewRequest + 1
            in
            ( { model | preview = Preparing, previewRequest = request }
            , preparePreview { request = request, source = source }
            )

        PreviewPrepared result ->
            if result.request == model.previewRequest && model.preview == Preparing then
                ( { model | preview = Maybe.withDefault Failed (Maybe.map Loading result.url) }, Cmd.none )

            else
                ( model, Cmd.none )

        PreviewLoaded request url ->
            if request == model.previewRequest && model.preview == Loading url then
                ( { model | preview = Loaded url }, Cmd.none )

            else
                ( model, Cmd.none )

        PreviewFailed request ->
            case model.preview of
                Loading _ ->
                    if request == model.previewRequest then
                        ( { model | preview = Failed }, Cmd.none )

                    else
                        ( model, Cmd.none )

                _ ->
                    ( model, Cmd.none )


view : Model -> Html Msg
view model =
    let
        output =
            model.diagram
                |> Maybe.andThen Result.toMaybe
                |> Maybe.map (toPlantUml model.showReturns model.includeTheme)
    in
    div [ class "page" ]
        [ header [ class "site-header" ]
            [ span [ class "brand" ]
                [ span [ class "brand-icon", attribute "aria-hidden" "true" ] [ text "⇄" ]
                , text "Sequence diagrams"
                ]
            , a [ href "https://github.com/eelcoh/plantuml-generator" ] [ text "View on GitHub ↗" ]
            ]
        , main_ []
            [ div [ class "intro" ]
                [ h1 [] [ text "Sequence diagram", span [] [ text " generator" ] ]
                , p [] [ text "Describe a sequence with indented text and see the diagram as you type." ]
                ]
            , div [ class "workbench" ]
                [ section [ class "panel", attribute "aria-labelledby" "source-heading" ]
                    [ div [ class "panel-header" ]
                        [ h2 [ id "source-heading" ] [ label [ for "source" ] [ text "Sequence input" ] ]
                        , button [ class "example-button", onClick LoadExample ] [ text "Load example" ]
                        ]
                    , editor model.source
                    , syntaxHelp
                    ]
                , section [ class "panel", attribute "aria-labelledby" "output-heading" ]
                    [ div [ class "panel-header output-header" ]
                        [ h2 [ id "output-heading" ] [ text "Preview" ]
                        , div [ class "output-actions" ]
                            [ if model.outputMode == Diagram && output /= Nothing then
                                div [ class "diagram-tools", attribute "role" "group", attribute "aria-label" "Diagram controls" ]
                                    [ button
                                        [ onClick ToggleDiagramFit
                                        , attribute "aria-pressed" (if model.fitDiagram then "true" else "false")
                                        ]
                                        [ text "Fit to panel" ]
                                    , button [ onClick DownloadDiagram ] [ text "Download SVG" ]
                                    , button [ onClick OpenDiagramViewer ] [ text "Full screen" ]

                                    ]

                              else
                                text ""
                            , modeButton model.outputMode Diagram "Diagram"
                            ]
                        ]
                    , outputView model output
                    , if model.outputMode == Diagram && not (Set.isEmpty (foldableCalls model)) then
                        div [ class "fold-settings" ]
                            [ div [ class "diagram-tools" ]
                                [ button [ onClick (FoldDiagram "collapse"), disabled (model.collapsed == foldableCalls model) ] [ text "Collapse all" ]
                                , button [ onClick (FoldDiagram "expand"), disabled (Set.isEmpty model.collapsed) ] [ text "Expand all" ]
                                , checkbox "Keep positions fixed" model.fixedDiagram SetFixedDiagram
                                ]
                            , details [ class "walkthrough-help" ]
                                [ summary [] [ text "Walk through a flow" ]
                                , p []
                                    [ text "For a complex sequence, start with "
                                    , Html.strong [] [ text "Collapse all" ]
                                    , text " to show the main flow. Select an activation bar marked with two short lines to reveal its nested calls one level at a time. Select it again to hide them."
                                    ]
                                , p []
                                    [ text "Leave "
                                    , Html.strong [] [ text "Keep positions fixed" ]
                                    , text " on so the audience can follow the same arrows as you reveal details. Turn it off to close the gaps left by hidden calls."
                                    ]
                                , p []
                                    [ text "Use "
                                    , Html.strong [] [ text "Full screen" ]
                                    , text " to present. It opens with your current theme and the same calls expanded or collapsed."
                                    ]
                                ]
                            ]

                      else
                        text ""
                    , div [ class "output-footer" ]
                        [ details [ class "plantuml-menu" ]
                            [ summary [] [ text "PlantUML" ]
                            , div [ class "plantuml-actions" ]
                                [ modeButton model.outputMode Code "View code"
                                , modeButton model.outputMode ServerPreview "Preview on server"
                                , button [ disabled (output == Nothing), onClick (Copy (Maybe.withDefault "" output)) ] [ text "Copy code" ]
                                ]
                            ]
                        ]
                    ]
                ]
            , div [ class "settings" ]
                [ div [ class "options" ]
                    [ checkbox "Show return arrows" model.showReturns ShowReturns
                    , if model.outputMode == Diagram then
                        text ""

                      else
                        checkbox "Include monochrome theme" model.includeTheme IncludeTheme
                    ]
                , p [ class "copy-status", attribute "role" "status" ] [ text model.copyStatus ]
                ]
            , if model.outputMode == Diagram then
                themeSettings model

              else
                text ""
            , p [ id "editor-shortcuts", class "editor-shortcuts" ]
                [ text "Tab indents. Shift+Tab outdents. Press Esc then Tab to leave the editor." ]
            ]
        ]


editor : String -> Html Msg
editor source =
    div [ class "source-editor" ]
        [ pre [ class "source-highlight", attribute "aria-hidden" "true" ]
            (List.intersperse [ text "\n" ] (List.map highlightLine (String.lines source))
                |> List.concat
                |> (\lines -> lines ++ [ text "\n" ])
            )
        , textarea
            [ id "source"
            , value source
            , onInput Edit
            , spellcheck False
            , attribute "autocapitalize" "off"
            , attribute "aria-describedby" "editor-shortcuts"
            , attribute "wrap" "off"
            , placeholder "Type a sequence or choose Load example."
            ]
            []
        ]


syntaxHelp : Html Msg
syntaxHelp =
    details [ class "syntax-help" ]
        [ summary [] [ text "Syntax help" ]
        , ul []
            [ li [] [ text "Start with ", code [] [ text "sequence NAME" ], text " to name the first participant." ]
            , li [] [ text "Indent a line and write ", code [] [ text "NAME: message" ], text " to send a message." ]
            , li [] [ text "Indent again for a nested call. Line up sibling calls at the same level." ]
            , li [] [ text "Put ", code [] [ text "[async]" ], text " after the name to omit the return arrow." ]
            ]
        , pre [] [ code [] [ text syntaxExample ] ]
        , button [ onClick LoadSyntaxExample ] [ text "Load syntax example" ]
        ]


syntaxExample : String
syntaxExample =
    """sequence user
    browser: open dashboard
        api: load data
        audit [async]: record visit"""


highlightLine : String -> List (Html Msg)
highlightLine line =
    let
        heading =
            String.trimLeft line

        indentation =
            text (String.left (String.length line - String.length heading) line)

        ( prefix, rest ) =
            splitAtFirst ":" heading

        ( participant, options ) =
            splitAtFirst "[" prefix

        token name content =
            span [ class ("syntax-" ++ name) ] [ text content ]
    in
    if String.startsWith "sequence " heading && heading == line then
        [ token "keyword" "sequence", token "participant" (String.dropLeft 8 heading) ]

    else
        [ indentation, token "participant" participant, token "option" options, token "caption" rest ]


splitAtFirst : String -> String -> ( String, String )
splitAtFirst separator source =
    case List.head (String.indexes separator source) of
        Just index ->
            ( String.left index source, String.dropLeft index source )

        Nothing ->
            ( source, "" )


modeButton : OutputMode -> OutputMode -> String -> Html Msg
modeButton selected mode caption =
    button
        [ attribute "aria-pressed" (if selected == mode then "true" else "false")
        , onClick (SetOutputMode mode)
        ]
        [ text caption ]


outputView : Model -> Maybe String -> Html Msg
outputView model output =
    case ( model.diagram, output ) of
        ( Just (Ok sequence), Just source ) ->
            case model.outputMode of
                Code ->
                    pre [ class "output-code", attribute "tabindex" "0" ] [ code [] [ text source ] ]

                Diagram ->
                    div
                        [ class (if model.fitDiagram then "diagram-preview local-diagram diagram-fit" else "diagram-preview local-diagram")
                        , attribute "tabindex" "0"
                        , attribute "aria-label" "Diagram preview"
                        ]
                        [ Diagram.view model.collapsed model.fixedDiagram model.showReturns (diagramTheme model) sequence ]

                ServerPreview ->
                    previewView model.previewRequest model.preview source

        ( Just (Err message), _ ) ->
            div [ class "output-message output-error" ] [ text message ]

        _ ->
            div [ class "output-message" ]
                [ p [] [ text "Enter a sequence or load the example to see the preview." ] ]


foldableCalls : Model -> Set String
foldableCalls model =
    model.diagram
        |> Maybe.andThen Result.toMaybe
        |> Maybe.map Diagram.foldableCalls
        |> Maybe.withDefault Set.empty


previewView : Int -> Preview -> String -> Html Msg
previewView request preview source =
    let
        previewImage loading url =
            div [ class "diagram-preview", attribute "tabindex" "0", attribute "aria-label" "Diagram preview" ]
                [ p [ hidden (not loading), attribute "role" "status" ] [ text "Loading diagram…" ]
                , img
                    [ src url
                    , hidden loading
                    , alt "Generated UML sequence diagram"
                    , attribute "referrerpolicy" "no-referrer"
                    , on "load" (Decode.succeed (PreviewLoaded request url))
                    , on "error" (Decode.succeed (PreviewFailed request))
                    ]
                    []
                ]

        prompt message caption =
            div [ class "output-message" ]
                [ p [] [ text message ]
                , p [ id "preview-sharing" ] [ text "Rendering sends the generated code to the public PlantUML server." ]
                , button
                    [ class "example-button"
                    , attribute "aria-describedby" "preview-sharing"
                    , onClick (RenderPreview source)
                    ]
                    [ text caption ]
                ]
    in
    case preview of
        NotRequested ->
            prompt "Preview the sequence diagram." "Render diagram"

        Preparing ->
            div [ class "output-message", attribute "role" "status" ] [ text "Preparing diagram…" ]

        Loading url ->
            previewImage True url

        Loaded url ->
            previewImage False url

        Failed ->
            prompt "Could not load the diagram." "Try again"


diagramTheme : Model -> Theme
diagramTheme model =
    if model.diagramPreset == "custom" then
        model.customTheme

    else
        DiagramTheme.preset model.diagramPreset |> Maybe.withDefault DiagramTheme.classic


themeSettings : Model -> Html Msg
themeSettings model =
    let
        theme =
            model.customTheme

        colorPicker caption current setColor =
            label []
                [ text caption
                , input [ type_ "color", value current, onInput (setColor >> EditTheme) ] []
                ]
    in
    section [ class "theme-settings", attribute "aria-label" "Diagram theme settings" ]
        [ div [ class "theme-controls" ]
            [ themeSelect "Diagram theme" model.diagramPreset SelectDiagramTheme
                [ ( "classic", "Classic" )
                , ( "monochrome", "Monochrome" )
                , ( "inverse-monochrome", "Inverse monochrome" )
                , ( "dark", "Dark" )
                , ( "high-contrast-black", "High Contrast Black" )
                , ( "custom", "Custom" )
                ]
            , button [ onClick SaveTheme ] [ text "Download theme JSON" ]
            , label [ class "theme-file-label" ]
                [ text "Load theme JSON"
                , input [ id "theme-file", type_ "file", attribute "accept" ".json,application/json" ] []
                ]
            ]
        , if model.diagramPreset == "custom" then
            div [ class "theme-custom" ]
                [ colorPicker "Background" theme.background (\color -> { theme | background = color })
                , colorPicker "Text and arrows" theme.text (\color -> { theme | text = color })
                , colorPicker "Participants" theme.participant (\color -> { theme | participant = color })
                , colorPicker "Participant outline" theme.participantBorder (\color -> { theme | participantBorder = color })
                , colorPicker "Participant labels" theme.participantText (\color -> { theme | participantText = color })
                , colorPicker "Activations" theme.activation (\color -> { theme | activation = color })
                , colorPicker "Lifelines" theme.lifeline (\color -> { theme | lifeline = color })
                , colorPicker "Activation border" theme.activationBorder (\color -> { theme | activationBorder = color })
                , themeSelect "Font" theme.font (\font -> EditTheme { theme | font = font }) DiagramTheme.fonts
                , label []
                    [ text ("Participant corner radius (" ++ String.fromInt theme.radius ++ " px)")
                    , input
                        [ type_ "range", attribute "min" "0", attribute "max" "19", value (String.fromInt theme.radius)
                        , onInput (\radius -> EditTheme { theme | radius = Maybe.withDefault theme.radius (String.toInt radius) })
                        ]
                        []
                    ]
                ]

          else
            text ""
        , p [ class "theme-status", attribute "role" "status" ] [ text model.themeStatus ]
        ]


themeSelect : String -> String -> (String -> Msg) -> List ( String, String ) -> Html Msg
themeSelect caption current toMsg choices =
    label []
        [ text caption
        , select [ onInput toMsg ]
            (List.map (\( key, name ) -> option [ value key, selected (key == current) ] [ text name ]) choices)
        ]


checkbox : String -> Bool -> (Bool -> Msg) -> Html Msg
checkbox caption enabled toMsg =
    label []
        [ input [ type_ "checkbox", checked enabled, onCheck toMsg ] []
        , text caption
        ]


example : String
example =
    """sequence user
    browser: click
        api: get this
            database: read this
        otherApi [async]: queue audit event
    browser: enter changes
    browser: submit
        api: post that
            database: write that
    """
