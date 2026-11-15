module SchemaSource exposing (prepare)

import Dict exposing (Dict)
import Json.Decode as Decode
import Json.Encode as Encode


{-| Prepare the visualization without changing the source in the editor.
-}
prepare : Encode.Value -> ( Encode.Value, Dict String Encode.Value )
prepare value =
    if Decode.decodeValue (Decode.oneOf [ Decode.field "openapi" Decode.string, Decode.field "swagger" Decode.string ]) value |> isOk then
        ( value, Dict.empty )

    else
        ( normalize True value, anchors True value )


normalize : Bool -> Encode.Value -> Encode.Value
normalize root value =
    case Decode.decodeValue (Decode.keyValuePairs Decode.value) value of
        Err _ ->
            value

        Ok original ->
            let
                fields =
                    List.map (\( key, child ) -> ( key, normalizeChild key child )) original

                definitionProperties =
                    original
                        |> List.filter (Tuple.first >> (\key -> List.member key [ "$defs", "definitions" ]))
                        |> List.concatMap (Tuple.second >> objectFields)
                        |> Dict.fromList
                        |> Dict.toList
                        |> List.map (Tuple.mapSecond (normalize False))

                displayFields =
                    if root && not (List.any (Tuple.first >> (\key -> List.member key [ "type", "properties", "$ref", "allOf", "anyOf", "oneOf" ])) fields) && not (List.isEmpty definitionProperties) then
                        ( "properties", Encode.object definitionProperties ) :: fields

                    else
                        fields

                constraints =
                    List.filter (Tuple.first >> (\key -> List.member key [ "const", "dependentRequired", "additionalItems" ])) fields

                description =
                    fields
                        |> List.filter (Tuple.first >> (==) "description")
                        |> List.filterMap (Tuple.second >> Decode.decodeValue Decode.string >> Result.toMaybe)

                annotated =
                    if List.isEmpty constraints then
                        displayFields

                    else
                        ( "description", Encode.string (String.join "\n" (description ++ List.map (\( key, entry ) -> key ++ ": " ++ Encode.encode 0 entry) constraints)) )
                            :: List.filter (Tuple.first >> (/=) "description") displayFields
            in
            case List.partition (Tuple.first >> (==) "$ref") annotated of
                ( [ reference ], rest ) ->
                    if List.any (Tuple.first >> (\key -> List.member key [ "type", "properties", "allOf", "anyOf", "oneOf" ])) rest then
                        Encode.object [ ( "allOf", Encode.list Encode.object [ [ reference ], rest ] ) ]

                    else
                        Encode.object annotated

                _ ->
                    Encode.object annotated


normalizeChild : String -> Encode.Value -> Encode.Value
normalizeChild key value =
    case schemaChildren key value of
        Just (Named fields) ->
            Encode.object (List.map (Tuple.mapSecond (normalize False)) fields)

        Just (Indexed children) ->
            Encode.list (normalize False) children

        Just (Single child) ->
            normalize False child

        Nothing ->
            value


anchors : Bool -> Encode.Value -> Dict String Encode.Value
anchors root value =
    if not root && (Decode.decodeValue (Decode.field "$id" Decode.string) value |> isOk) then
        Dict.empty

    else
        let
            nested =
                objectFields value
                    |> List.filterMap (\( key, child ) -> schemaChildren key child)
                    |> List.concatMap childrenList
                    |> List.map (anchors False)
                    |> List.foldl Dict.union Dict.empty
        in
        case Decode.decodeValue (Decode.field "$anchor" Decode.string) value of
            Ok name ->
                Dict.insert ("#" ++ name) (normalize False value) nested

            Err _ ->
                nested


type Children
    = Named (List ( String, Encode.Value ))
    | Indexed (List Encode.Value)
    | Single Encode.Value


schemaChildren : String -> Encode.Value -> Maybe Children
schemaChildren key value =
    if List.member key [ "$defs", "definitions", "properties", "patternProperties", "dependentSchemas" ] then
        Decode.decodeValue (Decode.keyValuePairs Decode.value) value |> Result.toMaybe |> Maybe.map Named

    else if List.member key [ "allOf", "anyOf", "oneOf", "prefixItems" ] then
        Decode.decodeValue (Decode.list Decode.value) value |> Result.toMaybe |> Maybe.map Indexed

    else if List.member key [ "items", "if", "then", "else", "not", "contains", "additionalProperties" ] then
        Just (Single value)

    else
        Nothing


childrenList : Children -> List Encode.Value
childrenList children =
    case children of
        Named fields ->
            List.map Tuple.second fields

        Indexed values ->
            values

        Single value ->
            [ value ]


objectFields : Encode.Value -> List ( String, Encode.Value )
objectFields =
    Decode.decodeValue (Decode.keyValuePairs Decode.value) >> Result.withDefault []


isOk : Result x a -> Bool
isOk result =
    case result of
        Ok _ ->
            True

        Err _ ->
            False
