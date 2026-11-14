#!/bin/sh
# Rebuild with the Elm version in elm.json.
# Pass the generator checkout as the first argument if it is not next to this repo.
set -eu

site_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)
target=web
case "${1:-}" in
    --cli) target=cli; shift ;;
    --cli-js) target=cli-js; shift ;;
    --vscode) target=vscode; shift ;;
esac

generator_dir=${1:-"$site_dir/../plantuml-generator"}
build_dir=$(mktemp -d)
trap 'rm -rf "$build_dir"' EXIT

mkdir "$build_dir/src"
cp "$site_dir/elm.json" "$build_dir/"
cp -R "$generator_dir/src/SequenceDiagram" "$build_dir/src/"
cp "$site_dir"/src/*.elm "$build_dir/src/"

cd "$build_dir"
if [ "$target" = web ]; then
    elm make src/Main.elm --optimize --output=main.js
    cp main.js "$site_dir/main.js"
    exit
fi

elm make src/Cli.elm --optimize --output=elm-cli.js
mkdir -p "$site_dir/dist"
if [ "$target" = vscode ]; then
    cp -R "$site_dir/vscode" "$build_dir/extension"
    cp "$site_dir/LICENSE" extension/LICENSE
    node "$site_dir/cli/bundle.cjs" elm-cli.js "$site_dir/diagram.css" "$site_dir/cli/render.cjs" extension/renderer.cjs
    cd extension
    version=$(node -p "require('./package.json').version")
    if command -v vsce >/dev/null 2>&1; then
        vsce package --no-dependencies --out "$site_dir/dist/seqdiagram-$version.vsix"
    else
        npx --yes @vscode/vsce@3 package --no-dependencies --out "$site_dir/dist/seqdiagram-$version.vsix"
    fi
    exit
fi

node "$site_dir/cli/bundle.cjs" elm-cli.js "$site_dir/diagram.css" "$site_dir/cli/render.cjs" seqdiagram.cjs "$site_dir/cli/run.cjs"
if [ "$target" = cli-js ]; then
    cp seqdiagram.cjs "$site_dir/dist/seqdiagram.cjs"
else
    node -e '
        require("node:fs").writeFileSync("sea.json", JSON.stringify({
            main: "seqdiagram.cjs",
            output: "seqdiagram",
            executable: process.env.SEQDIAGRAM_TARGET_NODE || process.execPath,
            disableExperimentalSEAWarning: true,
            execArgvExtension: "none",
            useCodeCache: false,
        }));
    '
    node --build-sea sea.json
    if [ "$(uname -s)" = Darwin ] && [ -z "${SEQDIAGRAM_TARGET_NODE:-}" ]; then
        codesign --force --sign - seqdiagram
    fi
    cp seqdiagram "$site_dir/dist/seqdiagram"
fi
