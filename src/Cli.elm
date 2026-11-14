port module Cli exposing (main)

import Diagram
import DiagramTheme exposing (Theme)
import Json.Decode as Decode
import SequenceDiagram.Renderer exposing (toPlantUml)
import SequenceInput


port result : { ok : Bool, text : String } -> Cmd msg


type alias Request =
    { source : String
    , format : String
    , theme : String
    , themeJson : Maybe String
    , stylesheet : String
    , showReturns : Bool
    , plantUmlMonochrome : Bool
    }


main : Program Request () Never
main =
    Platform.worker
        { init =
            \request ->
                case render request of
                    Ok output ->
                        ( (), result { ok = True, text = output } )

                    Err message ->
                        ( (), result { ok = False, text = message } )
        , update = \message _ -> never message
        , subscriptions = \_ -> Sub.none
        }


render : Request -> Result String String
render request =
    SequenceInput.parse request.source
        |> Result.andThen
            (\sequence ->
                case request.format of
                    "svg" ->
                        resolveTheme request
                            |> Result.map (\theme -> Diagram.toSvg request.stylesheet request.showReturns theme sequence ++ "\n")

                    "plantuml" ->
                        Ok (toPlantUml request.showReturns request.plantUmlMonochrome sequence)

                    _ ->
                        Err ("Unknown output format: " ++ request.format)
            )


resolveTheme : Request -> Result String Theme
resolveTheme request =
    case request.themeJson of
        Just source ->
            DiagramTheme.decode source |> Result.mapError Decode.errorToString

        Nothing ->
            DiagramTheme.preset request.theme
                |> Result.fromMaybe ("Unknown diagram theme: " ++ request.theme)
