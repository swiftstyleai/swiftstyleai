#!/usr/bin/env bash

pnpm turbo dev --filter=swiftstyleai.com > ./my.log 2>&1 &
# pnpm turbo dev > ./my.log 2>&1 &
echo $! > ./dev-pid.txt
