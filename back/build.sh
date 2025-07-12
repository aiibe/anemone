#!/bin/bash
set -e

cd back

for os in darwin linux; do
    for arch in amd64 arm64; do
        dir="anemone-${VERSION}-${os}-${arch}"
        mkdir -p "$dir"
        GOOS=$os GOARCH=$arch go build -o "$dir/anemone" main.go
        zip -r "${dir}.zip" "$dir"
    done
done
