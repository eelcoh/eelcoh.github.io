// Adapt the upstream SVG renderer to emit the same tree for the browser and
// headless export. The upstream decoder and layout remain in their own repo.
const { readFileSync, writeFileSync } = require('node:fs');

const file = process.argv[2];
let source = readFileSync(file, 'utf8');

function replace(before, after) {
    if (!source.includes(before)) throw new Error(`Unsupported jsonschema-viewer source: ${before}`);
    source = source.replaceAll(before, after);
}

function replaceSection(start, end, replacement) {
    const from = source.indexOf(start);
    const to = source.indexOf(end, from);
    if (from < 0 || to < 0) throw new Error(`Unsupported jsonschema-viewer section: ${start}`);
    source = source.slice(0, from) + replacement + source.slice(to);
}

replace('import Html exposing (text)\n', '');
replace('import Svg exposing (Svg)', 'import SchemaSvg as Svg exposing (Svg)');
replace('import Svg.Attributes as SvgA exposing (refY)\n', '');
replace('import Render.Theme as Theme\n', 'import SchemaMarks\n');
replace('import Svg.Events\n', '');
replace('import Svg.Lazy exposing (lazy)\n', '');
source = source.replace(/SvgA\.(\w+)/g, (_, name) => {
    const attr = name === 'viewBox' || name === 'textLength' ? name : name.replace(/[A-Z]/g, c => '-' + c.toLowerCase());
    return `(Svg.attr "${attr}")`;
});
source = source.replace(/Theme\.dark\.(\w+)/g, (_, name) => `"var(--schema-${name})"`);
replace('Svg.Events.on', 'Svg.on');
replace('[ (Svg.attr "id") "schema-svg"\n        , (Svg.attr "width")', '[ (Svg.attr "width")');
replace('        [ schemaView ]', '        [ Svg.g [ Svg.attr "transform" "translate(12 12)" ] (schemaView :: legend) ]');
replace('        padding =\n            20', '        padding =\n            24');
replace('        svgW =\n            w + padding', `        hasRequired =
            Svg.hasClass "schema-required" schemaView

        legend =
            if hasRequired then [ SchemaMarks.requiredLegend h ] else []

        height =
            if hasRequired then h + 16 else h

        svgW =
            w + padding`);
replace('            h + padding', '            height + padding');
replace('            viewBoxString w h padding', '            viewBoxString w height padding');
replace('hSpace =\n    24', 'hSpace =\n    34');

replaceSection('roundRect :', '\n\ntype Icon', `roundRect : String -> Coordinates -> ( Svg msg, Dimensions )
roundRect label =
    SchemaMarks.card pillHeight
        { name = Just label, kind = Nothing, weight = "500", required = False
        , branch = False, origin = False, reference = False
        }
`);

replaceSection('iconRect :', '\n\n{-| True for the synthetic OpenAPI nodes', `iconRect : Bool -> Icon -> Maybe String -> String -> Bool -> Coordinates -> ( Svg msg, Dimensions )
iconRect origin icon name weight required =
    let
        kind =
            iconLabel icon
    in
    SchemaMarks.card pillHeight
        { name = name
        , kind = Just kind
        , weight = weight
        , required = required
        , branch = isBranchIcon icon
        , origin = origin
        , reference =
            case icon of
                IRef _ ->
                    True

                _ ->
                    False
        }


iconLabel : Icon -> String
iconLabel icon =
    case icon of
        IList -> "array"
        IObject -> "object"
        IInt -> "integer"
        IStr -> "string"
        IFloat -> "number"
        IFile -> "file"
        IBool -> "boolean"
        INull -> "null"
        IRef marker -> if marker == "↺" then "cyclic ref" else "ref"
        IEmail -> "email"
        IDateTime -> "date-time"
        IHostname -> "hostname"
        IIpv4 -> "ipv4"
        IIpv6 -> "ipv6"
        IUri -> "uri"
        ICustom format -> if String.length format > 18 then String.left 17 format ++ "…" else format
        IEnum -> "enum"
        IOneOf -> "oneOf"
        IAnyOf -> "anyOf"
        IAllOf -> "allOf"


connectorPathD : Bool -> Coordinates -> Coordinates -> String
connectorPathD =
    SchemaMarks.curve


connectorPath : Bool -> Coordinates -> Coordinates -> Svg msg
connectorPath square start end =
    SchemaMarks.connector square (connectorPathD square start end) end


connectorDownThenRight : Bool -> Coordinates -> Coordinates -> Svg msg
connectorDownThenRight =
    SchemaMarks.downThenRight
`);
replace('( Svg.g hoverAttrs [ svg ], ( w, h ) )',
    '( Svg.g hoverAttrs [ Svg.title (String.join "\\n" (Maybe.withDefault "" meta.description :: List.map (\\( key, val ) -> key ++ ": " ++ val) meta.constraints)), svg ], ( w, h ) )');
replace('view : (String -> msg) -> (HoverState -> msg) -> msg -> Set String -> Definitions -> Schema -> Html.Html msg',
    'view : Bool -> Bool -> Bool -> (HoverState -> msg) -> msg -> Set String -> Definitions -> Maybe String -> Schema -> Svg msg');
replace('view toggleMsg hoverMsg unhoverMsg collapsedNodes defs schema =',
    'view overview fixed square hoverMsg unhoverMsg collapsedNodes defs name schema =');
replace('config "root" ( 0, 0 ) Nothing', 'config "root" ( 0, 0 ) name');
replace('    { toggleMsg : String -> msg', '    { overview : Bool\n    , fixed : Bool\n    , square : Bool');
replace('            { toggleMsg = toggleMsg', '            { overview = overview\n            , fixed = fixed\n            , square = square');
replace('connectorPath (', 'connectorPath config.square (');
replace('connectorPath\n                                (', 'connectorPath config.square\n                                (');
replace('connectorDownThenRight\n                                (', 'connectorDownThenRight config.square\n                                (');
replace('Set.member path collapsedNodes', 'isCollapsed config collapsedNodes path');
replace('clickableGroup (config.toggleMsg path)', 'clickableGroup path (isCollapsed config collapsedNodes path)');
const start = source.indexOf('clickableGroup :');
const end = source.indexOf('\n\nviewProperties :', start);
if (start < 0 || end < 0) throw new Error('Missing upstream clickableGroup');
source = source.slice(0, start) + `isCollapsed : ViewConfig msg -> Set String -> String -> Bool
isCollapsed config paths path =
    if config.overview && path == "root" then
        Set.member path paths

    else
        config.overview /= Set.member path paths


clickableGroup : String -> Bool -> ( Svg msg, Dimensions ) -> ( Svg msg, Dimensions )
clickableGroup path collapsed ( svg, dims ) =
    ( Svg.fold path collapsed svg, dims )


retainSpace : ViewConfig msg -> Bool -> ( Svg msg, Dimensions ) -> ( Svg msg, Dimensions )
retainSpace config collapsed ( svg, dims ) =
    if config.fixed && collapsed then
        ( Svg.hidden svg, dims )

    else
        ( svg, dims )


isBranchIcon : Icon -> Bool
isBranchIcon icon =
    case icon of
        IRef _ ->
            True

        _ ->
            List.member icon [ IObject, IList, IOneOf, IAnyOf, IAllOf ]


propertySchema : Schema.ObjectProperty -> Schema
propertySchema property =
    case property of
        Schema.Required _ schema ->
            schema

        Schema.Optional _ schema ->
            schema


siblingGap : (a -> Schema) -> a -> List a -> Float
siblingGap schemaFor current rest =
    case rest of
        next :: _ ->
            if List.any (schemaFor >> iconForSchema >> isBranchIcon) [ current, next ] then
                13

            else
                6

        [] ->
            ySpace
` + source.slice(end);
replace('viewProps ( x, h1 + ySpace ) elements',
    'viewProps ( x, h1 + siblingGap propertySchema element elements ) elements');
replace('viewItems_ (idx + 1) ( x, h1 + ySpace ) elements',
    'viewItems_ (idx + 1) ( x, h1 + siblingGap identity element elements ) elements');
for (const name of ['objectGraph', 'arrayGraph', 'choiceGraph']) {
    replace(`if isCollapsed config collapsedNodes path then\n${name === 'choiceGraph' ? '        ' : '                '}( ${name}, ( w, h ) )`,
        `if isCollapsed config collapsedNodes path && not config.fixed then\n${name === 'choiceGraph' ? '        ' : '                '}( ${name}, ( w, h ) )`);
}
replace('objectGraph :: propertiesGraphs\n', 'objectGraph :: (List.map (hideChild config collapsedNodes path) propertiesGraphs)\n');
replace('( allGraphs, finalDims )\n                    |> toSvgCoordsTuple', `( allGraphs, finalDims )
                    |> preserveChildren config (isCollapsed config collapsedNodes path)`);
replace('( allOfGraph, newCoords )\n            |> toSvgCoordsTuple', `( allOfGraph, newCoords )
            |> preserveChildren config (isCollapsed config collapsedNodes path)`);
replace('toSvgCoordsTuple :', `hideChild : ViewConfig msg -> Set String -> String -> Svg msg -> Svg msg
hideChild config paths path svg =
    Tuple.first (retainSpace config (isCollapsed config paths path) ( svg, ( 0, 0 ) ))


preserveChildren : ViewConfig msg -> Bool -> ( List (Svg msg), Dimensions ) -> ( Svg msg, Dimensions )
preserveChildren config collapsed ( nodes, dims ) =
    case nodes of
        head :: tail ->
            toSvgCoordsTuple ( head :: List.map (\\node -> Tuple.first (retainSpace config collapsed ( node, dims ))) tail, dims )

        [] ->
            toSvgCoordsTuple ( nodes, dims )


toSvgCoordsTuple :`);
replace('else if isCollapsed config collapsedNodes path then\n                -- Collapsed ref:', 'else if isCollapsed config collapsedNodes path && not config.fixed && Dict.member ref defs then\n                -- Collapsed ref:');
replace('                        viewSchema (Set.insert ref visited) defs collapsedNodes config path ( x, y ) (Just defName) weight isRequired defSchema\n                            |> clickableGroup path (isCollapsed config collapsedNodes path)', `                        let
                            ( expanded, dims ) =
                                viewSchema (Set.insert ref visited) defs collapsedNodes config path ( x, y ) (Just defName) weight isRequired defSchema

                            collapsed =
                                isCollapsed config collapsedNodes path

                            ( pill, _ ) =
                                iconRect (IRef "↗") (Just defName) weight isRequired ( x, y )
                        in
                        if config.fixed && collapsed then
                            ( Svg.g [] [ Svg.hidden expanded, Svg.fold path True pill ], dims )

                        else
                            clickableGroup path False ( expanded, dims )`);
// Keep the property label and show the full reference in the SVG tooltip.
replace('                    extractRefName ref', '                    Maybe.withDefault (extractRefName ref) name');
replace('( Svg.g [] [ Svg.hidden expanded, Svg.fold path True pill ], dims )', '( Svg.g [] [ Svg.hidden expanded, Svg.fold path True (Svg.g [] [ Svg.title ref, pill ]) ], dims )');
replace('iconRect (IRef "↗") (Just defName) weight isRequired ( x, y )\n                    |> clickableGroup', 'iconRect (IRef "↗") (Just defName) weight isRequired ( x, y )\n                    |> Tuple.mapFirst (\\node -> Svg.g [] [ Svg.title ref, node ])\n                    |> clickableGroup');
replace('-- Definition not found: show label pill, not clickable\n                        iconRect (IRef "↗") (Just defName) weight isRequired ( x, y )', '-- Definition not found: show label pill, not clickable\n                        iconRect (IRef "↗") (Just defName) weight isRequired ( x, y )\n                            |> Tuple.mapFirst (\\node -> Svg.g [] [ Svg.title ref, node ])');
replace('    String.dropLeft 14 ref', '    ref |> String.split "/" |> List.reverse |> List.head |> Maybe.withDefault ref');

/* Schema.Fallback includes booleans and schemas containing only annotations. */
replace('Schema.Fallback _ ->\n            ( Svg.g [] [], coords )',  `Schema.Fallback value ->
            let
                description =
                    Json.Decode.decodeValue (Json.Decode.field "description" Json.Decode.string) value
                        |> Result.withDefault ""
            in
            SchemaMarks.card pillHeight
                { name = name
                , kind = Just "schema"
                , weight = weight, required = isRequired
                , branch = False, origin = path == "root", reference = False
                }
                coords
                |> Tuple.mapFirst (\\node -> Svg.g [] [ Svg.title description, node ])`);
replace('            viewMaybeTitle coords "Null" name', '            iconRect (path == "root") INull name weight isRequired coords');
replace('-> Icon -> Maybe Name -> List Schema -> ( Svg msg, Dimensions )',
    '-> Icon -> Maybe Name -> String -> Bool -> List Schema -> ( Svg msg, Dimensions )');
replace(' ( x, y ) icon name schemas =', ' ( x, y ) icon name weight isRequired schemas =');
replace('iconRect icon name "500" False ( x, y )', 'iconRect icon name weight isRequired ( x, y )');
replace(' name subSchemas', ' name weight isRequired subSchemas');
replace(' Nothing subSchemas', ' Nothing "500" False subSchemas');
replace('iconRect icon name', 'iconRect (path == "root") icon name');
replace('iconRect (IRef', 'iconRect (path == "root") (IRef');
writeFileSync(file, source);
