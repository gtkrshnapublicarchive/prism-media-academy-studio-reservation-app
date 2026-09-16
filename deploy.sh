#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo "  Prism Media Academy - Studio Reservation App"
echo "  Deployment Orchestrator"
echo "=================================================="

# 1. Environment Configuration Check
echo "[*] Step 1/5: Checking environment configuration..."
if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    echo "[!] .env not found. Copying .env.example to .env..."
    cp .env.example .env
  else
    echo "[x] Neither .env nor .env.example found. Aborting."
    exit 1
  fi
fi
echo "[OK] Environment file is ready."

# 2. Build and Launch Containers
echo "[*] Step 2/5: Building and starting Docker containers..."
docker compose build
docker compose up -d db

# 3. Database Healthcheck Wait Loop
echo "[*] Step 3/5: Waiting for PostgreSQL container to become healthy..."
MAX_ATTEMPTS=30
ATTEMPT=1
until [ "$(docker inspect -f '{{.State.Health.Status}}' prism_studio_db 2>/dev/null)" = "healthy" ]; do
  if [ $ATTEMPT -ge $MAX_ATTEMPTS ]; then
    echo "[x] PostgreSQL container failed to become healthy within timeout."
    docker compose logs db
    exit 1
  fi
  echo "    Waiting for db healthcheck (attempt ${ATTEMPT}/${MAX_ATTEMPTS})..."
  sleep 2
  ATTEMPT=$((ATTEMPT + 1))
done
echo "[OK] Database is healthy and ready to accept connections."

# 4. Start Application Container
echo "[*] Step 4/5: Starting web application container..."
docker compose up -d web

# 5. Summary & Health Status
echo "=================================================="
echo "  Deployment Completed Successfully"
echo "=================================================="
echo "[OK] Application URL: http://localhost:3000"
echo "[OK] Database Port:   5432"
echo "=================================================="
