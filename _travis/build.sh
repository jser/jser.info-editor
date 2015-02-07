#!/bin/bash

if [[ "$TRAVIS_TAG" ]]; then
    rm -rf build
    npm run dist
    cd build
    # zipped in build/
    zip -q JSer.info-editor-osx.zip -r jser.info-editor/osx64
    zip -q JSer.info-editor-win32.zip -r jser.info-editor/win32
    zip -q JSer.info-editor-win64.zip -r jser.info-editor/win64
#    zip -q JSer.info-editor-linux32.zip -r jser.info-editor/linux32
#    zip -q JSer.info-editor-linux64.zip -r jser.info-editor/linux64
    cd ../
    echo "zipped!"
else
    echo "Not Release"
fi