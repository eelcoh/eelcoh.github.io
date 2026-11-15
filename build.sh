#!/bin/sh
# Rebuild with the Elm version in elm.json.
# Pass the generator checkout as an argument or set SEQDIAGRAM_GENERATOR_DIR.
set -eu

site_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)
target=web
case "${1:-}" in
    --cli) target=cli; shift ;;
    --cli-js) target=cli-js; shift ;;
    --vscode) target=vscode; shift ;;
    --schema-web) target=schema-web; shift ;;
    --schema-cli) target=schema-cli; shift ;;
    --schema-cli-js) target=schema-cli-js; shift ;;
    --schema-vscode) target=schema-vscode; shift ;;
esac

build_dir=$(mktemp -d)
trap 'rm -rf "$build_dir"' EXIT
mkdir "$build_dir/src"
cp "$site_dir/elm.json" "$build_dir/"
product=seqdiagram
worker=Cli
stylesheet="$site_dir/diagram.css"
adapter="$site_dir/cli/render.cjs"
entry="$site_dir/cli/run.cjs"
extension="$site_dir/vscode"
target_node=${SEQDIAGRAM_TARGET_NODE:-}

case "$target" in
    schema-*)
        target=${target#schema-}
        schema_dir=${1:-"${JSONSCHEMA_SOURCE_DIR:-"$site_dir/../jsonschema-viewer"}"}
        if [ ! -f "$schema_dir/src/Render/Svg.elm" ]; then
            echo "Set JSONSCHEMA_SOURCE_DIR to the jsonschema-viewer checkout." >&2
            exit 1
        fi
        cp -R "$schema_dir/src/Json" "$build_dir/src/"
        mkdir "$build_dir/src/Render"
        cp "$schema_dir/src/Render/Svg.elm" "$build_dir/src/Render/"
        cp "$site_dir/schema"/src/*.elm "$site_dir/src/DiagramTheme.elm" "$build_dir/src/"
        node "$site_dir/schema/adapt.cjs" "$build_dir/src/Render/Svg.elm"
        node -e '
            const fs = require("node:fs");
            const config = JSON.parse(fs.readFileSync(process.argv[1]));
            config.dependencies.direct["NoRedInk/elm-json-decode-pipeline"] = "1.0.0";
            delete config.dependencies.direct["elm/parser"];
            fs.writeFileSync(process.argv[1], JSON.stringify(config));
        ' "$build_dir/elm.json"
        product=jsonschema
        worker=SchemaCli
        stylesheet=/dev/null
        adapter="$site_dir/schema/render.cjs"
        entry="$site_dir/schema/run.cjs"
        extension="$site_dir/schema/vscode"
        target_node=${JSONSCHEMA_TARGET_NODE:-}
        ;;
    *)
        generator_dir=${1:-"${SEQDIAGRAM_GENERATOR_DIR:-"$site_dir/../plantuml-generator"}"}
        if [ ! -d "$generator_dir/src/SequenceDiagram" ]; then
            echo "Set SEQDIAGRAM_GENERATOR_DIR to the plantuml-generator checkout." >&2
            exit 1
        fi
        cp -R "$generator_dir/src/SequenceDiagram" "$build_dir/src/"
        cp "$site_dir"/src/*.elm "$build_dir/src/"
        ;;
esac

cd "$build_dir"
if [ "$target" = web ]; then
    if [ "$product" = jsonschema ]; then
        elm make src/SchemaMain.elm --optimize --output=main.js
        cp main.js "$site_dir/json-schema/main.js"
    else
        elm make src/Main.elm --optimize --output=main.js
        cp main.js "$site_dir/main.js"
    fi
    exit
fi

elm make "src/$worker.elm" --optimize --output=elm-cli.js
mkdir -p "$site_dir/dist"
if [ "$target" = vscode ]; then
    cp -R "$extension" "$build_dir/extension"
    cp "$site_dir/LICENSE" extension/LICENSE
    if [ "$product" = jsonschema ]; then
        cp "$site_dir/vscode/extension.cjs" extension/shared-extension.cjs
    fi
    node "$site_dir/cli/bundle.cjs" elm-cli.js "$stylesheet" "$adapter" extension/renderer.cjs
    cd extension
    version=$(node -p "require('./package.json').version")
    if command -v vsce >/dev/null 2>&1; then
        vsce package --no-dependencies --out "$site_dir/dist/$product-$version.vsix"
    else
        npx --yes @vscode/vsce@3 package --no-dependencies --out "$site_dir/dist/$product-$version.vsix"
    fi
    exit
fi

node "$site_dir/cli/bundle.cjs" elm-cli.js "$stylesheet" "$adapter" program.cjs "$entry"
if [ "$target" = cli-js ]; then
    cp program.cjs "$site_dir/dist/$product.cjs"
else
    node -e '
        require("node:fs").writeFileSync("sea.json", JSON.stringify({
            main: "program.cjs",
            output: "program",
            executable: process.argv[1] || process.execPath,
            disableExperimentalSEAWarning: true,
            execArgvExtension: "none",
            useCodeCache: false,
        }));
    ' "$target_node"
    node --build-sea sea.json
    if [ "$(uname -s)" = Darwin ] && [ -z "$target_node" ]; then
        codesign --force --sign - program
    fi
    cp program "$site_dir/dist/$product"
fi
