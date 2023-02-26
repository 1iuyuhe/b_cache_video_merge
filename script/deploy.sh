#!/bin/bash

npm install
mkdir dist
cp -r assets ./dist/
cp -r node_modules ./dist/
cp index.html ./dist/index.html