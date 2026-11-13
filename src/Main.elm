port module Main exposing (main)

import Browser
import Diagram
import Html exposing (Html, a, button, code, div, h1, h2, header, img, input, label, main_, p, pre, section, span, text, textarea)
import Html.Attributes exposing (alt, attribute, checked, class, disabled, for, hidden, href, id, placeholder, spellcheck, src, type_, value)
import Html.Events exposing (on, onCheck, onClick, onInput)
import Json.Decode as Decode
import SequenceDiagram.Model exposing (Sequence)
import SequenceDiagram.Parser exposing (parse)
import SequenceDiagram.Renderer exposing (toPlantUml)


port copyOutput : String -> Cmd msg


port downloadDiagram : () -> Cmd msg


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
    , copyStatus : String
    , outputMode : OutputMode
    , fitDiagram : Bool
    , preview : Preview
    , previewRequest : Int
    }


type Msg
    = Edit String
    | LoadExample
    | ShowReturns Bool
    | IncludeTheme Bool
    | Copy String
    | Copied Bool
    | SetOutputMode OutputMode
    | ToggleDiagramFit
    | DownloadDiagram
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
                  , copyStatus = ""
                  , outputMode = Code
                  , fitDiagram = True
                  , preview = NotRequested
                  , previewRequest = 0
                  }
                , Cmd.none
                )
        , update = update
        , view = \model -> { title = "PlantUML Sequence Diagram Generator", body = [ view model ] }
        , subscriptions = \_ -> Sub.batch [ copyResult Copied, previewResult PreviewPrepared ]
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Edit source ->
            ( { model
                | source = source
                , diagram =
                    if String.isEmpty (String.trim source) then
                        Nothing

                    else
                        Just (parse (String.join "\n" (List.map (expandIndentTabs 0) (String.lines source))))
                , copyStatus = ""
                , preview = NotRequested
              }
            , Cmd.none
            )

        LoadExample ->
            update (Edit example) model

        ShowReturns enabled ->
            ( { model | showReturns = enabled, copyStatus = "", preview = NotRequested }, Cmd.none )

        IncludeTheme enabled ->
            ( { model | includeTheme = enabled, copyStatus = "", preview = NotRequested }, Cmd.none )

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

        DownloadDiagram ->
            ( model, downloadDiagram () )

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
                , text "PlantUML"
                ]
            , a [ href "https://github.com/eelcoh/plantuml-generator" ] [ text "View on GitHub ↗" ]
            ]
        , main_ []
            [ div [ class "intro" ]
                [ h1 [] [ text "Sequence diagram", span [] [ text " generator" ] ]
                , p [] [ text "Describe a sequence with indented text and get PlantUML code as you type." ]
                ]
            , div [ class "workbench" ]
                [ section [ class "panel", attribute "aria-labelledby" "source-heading" ]
                    [ div [ class "panel-header" ]
                        [ h2 [ id "source-heading" ] [ label [ for "source" ] [ text "Sequence input" ] ]
                        , button [ class "example-button", onClick LoadExample ] [ text "Load example" ]
                        ]
                    , editor model.source
                    ]
                , section [ class "panel", attribute "aria-labelledby" "output-heading" ]
                    [ div [ class "panel-header output-header" ]
                        [ h2 [ id "output-heading" ] [ text "PlantUML output" ]
                        , div [ class "output-actions" ]
                            [ div [ class "output-toggle", attribute "role" "group", attribute "aria-label" "Output view" ]
                                [ modeButton model.outputMode Code "Code"
                                , modeButton model.outputMode Diagram "Diagram"
                                , modeButton model.outputMode ServerPreview "PlantUML preview"
                                ]
                            , button [ disabled (output == Nothing), onClick (Copy (Maybe.withDefault "" output)) ] [ text "Copy code" ]
                            ]
                        ]
                    , outputView model output
                    ]
                ]
            , div [ class "settings" ]
                [ div [ class "options" ]
                    [ checkbox "Show return arrows" model.showReturns ShowReturns
                    , checkbox "Include monochrome theme" model.includeTheme IncludeTheme
                    ]
                , p [ class "copy-status", attribute "role" "status" ] [ text model.copyStatus ]
                ]
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
            , placeholder "sequence user\n    browser: open dashboard\n        api: load data"
            ]
            []
        ]


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


expandIndentTabs : Int -> String -> String
expandIndentTabs column line =
    case String.uncons line of
        Just ( ' ', rest ) ->
            " " ++ expandIndentTabs (column + 1) rest

        Just ( '\t', rest ) ->
            let
                spaces =
                    4 - modBy 4 column
            in
            String.repeat spaces " " ++ expandIndentTabs (column + spaces) rest

        _ ->
            line


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
                    div [ class "local-diagram-output" ]
                        [ div [ class "diagram-tools" ]
                            [ button
                                [ onClick ToggleDiagramFit
                                , attribute "aria-pressed" (if model.fitDiagram then "true" else "false")
                                ]
                                [ text "Fit to panel" ]
                            , button [ onClick DownloadDiagram ] [ text "Download SVG" ]
                            ]
                        , div
                            [ class (if model.fitDiagram then "diagram-preview local-diagram diagram-fit" else "diagram-preview local-diagram")
                            , attribute "tabindex" "0"
                            , attribute "aria-label" "Diagram preview"
                            ]
                            [ Diagram.view model.showReturns model.includeTheme sequence ]
                        ]

                ServerPreview ->
                    previewView model.previewRequest model.preview source

        ( Just (Err message), _ ) ->
            div [ class "output-message output-error" ] [ text message ]

        _ ->
            div [ class "output-message" ]
                [ code [ attribute "aria-hidden" "true" ] [ text "@startuml" ]
                , p [] [ text "Enter a sequence or load the example to see the generated code." ]
                ]


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
