#!/bin/sh
# Rebuild with the Elm version in elm.json.
# Pass the generator checkout as the first argument if it is not next to this repo.
set -eu

site_dir=$(CDPATH='' cd -- "$(dirname -- "$0")" && pwd)
generator_dir=${1:-"$site_dir/../plantuml-generator"}
build_dir=$(mktemp -d)
trap 'rm -rf "$build_dir"' EXIT

mkdir "$build_dir/src"
cp "$site_dir/elm.json" "$build_dir/"
cp -R "$generator_dir/src/SequenceDiagram" "$build_dir/src/"
cp "$site_dir"/src/*.elm "$build_dir/src/"

cd "$build_dir"
elm make src/Main.elm --optimize --output=main.js
cp main.js "$site_dir/main.js"
