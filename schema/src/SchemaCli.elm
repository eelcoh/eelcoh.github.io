port module SchemaCli exposing (main)

import DiagramTheme
import Json.Decode as Decode
import SchemaDiagram
import Set


port result : { ok : Bool, text : String } -> Cmd msg


type alias Request =
    { source : String
    , theme : String
    , themeJson : Maybe String
    , mode : String
    , fixed : Bool
    , paths : List String
    , interactive : Bool
    }


main : Program Request () Never
main =
    Platform.worker
        { init =
            \request ->
                case render request of
                    Ok svg ->
                        ( (), result { ok = True, text = svg } )

                    Err error ->
                        ( (), result { ok = False, text = error } )
        , update = \message _ -> never message
        , subscriptions = \_ -> Sub.none
        }


render : Request -> Result String String
render request =
    Result.map2
        (\theme document ->
            let
                paths =
                    Set.fromList request.paths

                folded =
                    if request.mode == "initial" then
                        Set.foldl
                            (\path acc ->
                                if Set.member path acc then Set.remove path acc else Set.insert path acc
                            )
                            document.initial
                            paths

                    else
                        paths
            in
            SchemaDiagram.svg request.interactive theme { overview = request.mode == "overview", fixed = request.fixed, paths = folded } document
                ++ "\n"
        )
        (case request.themeJson of
            Just source ->
                DiagramTheme.decode source |> Result.mapError Decode.errorToString

            Nothing ->
                DiagramTheme.preset request.theme |> Result.fromMaybe ("Unknown theme: " ++ request.theme)
        )
        (SchemaDiagram.parse request.source)
