#!/bin/zsh
parent_dir="$(cd .. && pwd)"
find "$parent_dir" -type f -not -path '*/\.*' | grep -v -E 'node_modules|\.git|package-lock\.json|coverage' | xargs wc -l | sed "s|$parent_dir/||g" > sloc.md
