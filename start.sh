#!/bin/sh
nginx
go mod vendor
go run /GO/src/sheeputech/app/main.go
