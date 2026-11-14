module SequenceInput exposing (parse)

import SequenceDiagram.Model exposing (Sequence)
import SequenceDiagram.Parser as Parser


parse : String -> Result String Sequence
parse =
    String.lines >> List.map (expandIndentTabs 0) >> String.join "\n" >> Parser.parse


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
