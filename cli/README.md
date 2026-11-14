# seqdiagram

Render the same indented sequence format as the website. The executable embeds its runtime and renders SVG offline. It can also emit PlantUML source.

```sh
seqdiagram flow.seq -o flow.svg
seqdiagram flow.seq --theme dark -o flow.svg
seqdiagram flow.seq --theme-file sequence-theme.json -o flow.svg
cat flow.seq | seqdiagram --format plantuml --no-returns
```

Omit the input path or use `-` to read stdin. Omit `-o` or use `-o -` to write stdout. An output path ending in `.puml` defaults to PlantUML. Parser errors go to stderr and return a nonzero exit status.

## Build on macOS or Linux

With Elm 0.19.3 and Node.js 26.13.1 available on the build machine, run this from the site repository:

```sh
./build.sh --cli ../plantuml-generator
./dist/seqdiagram --help
```

The generated executable targets the build machine's operating system and architecture. On an Apple Silicon Mac, this produces a macOS arm64 executable. Elm and Node.js are only needed on the build machine. To cross-build, set `SEQDIAGRAM_TARGET_NODE` to the **absolute path** to the target platform's Node.js executable from the same Node.js release. For development, `./build.sh --cli-js` produces `dist/seqdiagram.cjs`, which runs with Node.js.
