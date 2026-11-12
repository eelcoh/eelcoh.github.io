port module Main exposing (main)

import Browser
import Html exposing (Html, a, button, code, div, h1, h2, header, input, label, main_, p, pre, section, span, text, textarea)
import Html.Attributes exposing (attribute, checked, class, disabled, for, href, id, placeholder, spellcheck, type_, value)
import Html.Events exposing (onCheck, onClick, onInput)
import SequenceDiagram.Model exposing (Sequence)
import SequenceDiagram.Parser exposing (parse)
import SequenceDiagram.Renderer exposing (toPlantUml)


port copyOutput : String -> Cmd msg


port copyResult : (Bool -> msg) -> Sub msg


type alias Model =
    { source : String
    , diagram : Maybe (Result String Sequence)
    , showReturns : Bool
    , includeTheme : Bool
    , copyStatus : String
    }


type Msg
    = Edit String
    | LoadExample
    | ShowReturns Bool
    | IncludeTheme Bool
    | Copy String
    | Copied Bool


main : Program () Model Msg
main =
    Browser.document
        { init = \() -> ( { source = "", diagram = Nothing, showReturns = True, includeTheme = False, copyStatus = "" }, Cmd.none )
        , update = update
        , view = \model -> { title = "PlantUML Sequence Diagram Generator", body = [ view model ] }
        , subscriptions = \_ -> copyResult Copied
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
                        Just (parse source)
                , copyStatus = ""
              }
            , Cmd.none
            )

        LoadExample ->
            update (Edit example) model

        ShowReturns enabled ->
            ( { model | showReturns = enabled, copyStatus = "" }, Cmd.none )

        IncludeTheme enabled ->
            ( { model | includeTheme = enabled, copyStatus = "" }, Cmd.none )

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
                    , textarea
                        [ id "source"
                        , value model.source
                        , onInput Edit
                        , spellcheck False
                        , attribute "autocapitalize" "off"
                        , placeholder "sequence user\n    browser: open dashboard\n        api: load data"
                        ]
                        []
                    ]
                , section [ class "panel", attribute "aria-labelledby" "output-heading" ]
                    [ div [ class "panel-header" ]
                        [ h2 [ id "output-heading" ] [ text "PlantUML output" ]
                        , button [ disabled (output == Nothing), onClick (Copy (Maybe.withDefault "" output)) ] [ text "Copy code" ]
                        ]
                    , outputView model.diagram output
                    ]
                ]
            , div [ class "settings" ]
                [ div [ class "options" ]
                    [ checkbox "Show return arrows" model.showReturns ShowReturns
                    , checkbox "Include monochrome theme" model.includeTheme IncludeTheme
                    ]
                , p [ class "copy-status", attribute "role" "status" ] [ text model.copyStatus ]
                ]
            ]
        ]


outputView : Maybe (Result String Sequence) -> Maybe String -> Html Msg
outputView diagram output =
    case ( diagram, output ) of
        ( _, Just source ) ->
            pre [ class "output-code", attribute "tabindex" "0" ] [ code [] [ text source ] ]

        ( Just (Err message), _ ) ->
            div [ class "output-message output-error" ] [ text message ]

        _ ->
            div [ class "output-message" ]
                [ code [ attribute "aria-hidden" "true" ] [ text "@startuml" ]
                , p [] [ text "Enter a sequence or load the example to see the generated code." ]
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
        otherApi
    browser: enter changes
    browser: submit
        api: post that
            database: write that
    """
