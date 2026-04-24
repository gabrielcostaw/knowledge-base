#!/bin/bash
set -m
cd frontend
npm install
npm run build
BUILD_EXIT=$?
kill -TERM -$$ 2>/dev/null || true
exit $BUILD_EXIT