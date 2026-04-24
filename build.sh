#!/bin/bash
cd frontend
npm install
npm run build
EXIT_CODE=$?
kill $(jobs -p) 2>/dev/null || true
exit $EXIT_CODE