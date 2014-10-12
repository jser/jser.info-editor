#!/bin/bash

if [[ "$TRAVIS_TAG" ]]; then
    rm -rf build
    npm run dist
    cd build
    # zipped in build/
    zip -q JSer.info-editor-osx.zip -r github-reader/osx
    zip -q JSer.info-editor-win.zip -r github-reader/win
    zip -q JSer.info-editor-linux32.zip -r github-reader/linux32
    zip -q JSer.info-editor-linux64.zip -r github-reader/linux64
    cd ../
    echo "zipped!"
else
    echo "Not Release"
fi