#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "  Prism Media Academy - Studio Reservation App"
echo "  Redeployment & Synchronization"
echo "=================================================="

ACTIVE_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'devv')"
echo "[*] Current branch: ${ACTIVE_BRANCH}"

echo "[*] Pulling latest changes from remote..."
if git remote | grep -q "origin"; then
  git pull origin "${ACTIVE_BRANCH}" || echo "[!] Notice: pull skipped or no remote changes."
fi

echo "[*] Tearing down running containers..."
docker compose down

echo "[*] Executing full deployment sequence..."
bash deploy.sh
