#!/bin/bash

cd front || exit
yarn install --frozen-lockfile

cd ../back || exit
go mod tidy
