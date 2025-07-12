#!/bin/bash
set -e

cd back

# Only for linux-amd64 is enough for docker
os="linux"
arch="amd64"
dir="anemone-${VERSION}-${os}-${arch}"
mkdir -p "$dir"
CGO_ENABLED=0 GOOS=$os GOARCH=$arch go build -o "$dir/anemone" main.go

# For multiple platforms

# for os in darwin linux; do
#     for arch in amd64 arm64; do
#         dir="anemone-${VERSION}-${os}-${arch}"
#         mkdir -p "$dir"
#         GOOS=$os GOARCH=$arch go build -o "$dir/anemone" main.go
#     done
# done
