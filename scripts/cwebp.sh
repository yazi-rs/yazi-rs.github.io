#!/bin/bash
shopt -s nullglob

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd $SCRIPT_DIR/..

for old in static/images/*.{png,jpg}; do
		new="static/webp/$(basename "${old%.*}.webp")"
    echo "Converting $old to $new"
    cwebp -q 70 "$old" -o "$new"
		echo
done

echo "All conversions completed!"
