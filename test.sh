#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "  Prism Media Academy - Verification Suite"
echo "=================================================="

echo "[*] Running TypeScript compiler check..."
npx tsc --noEmit
echo "[OK] TypeScript validation passed."

echo "[*] Running ESLint check..."
npm run lint
echo "[OK] ESLint validation passed."

echo "[*] Testing Next.js production build..."
npm run build
echo "[OK] Production build check passed."

echo "=================================================="
echo "  All Verification Checks Passed"
echo "=================================================="
