#!/usr/bin/env bash
# Boot a local PostgreSQL 17 instance for development.
# Data lives in /home/user/.pgdata so it survives sandbox restarts;
# re-run this script any time to bring the server back up.
set -euo pipefail

PGDATA="${PGDATA:-/home/user/.pgdata}"
PGPORT="${PGPORT:-5544}"
PGUSER_APP="${PGUSER_APP:-app}"
PGPASS_APP="${PGPASS_APP:-porshure_local_dev}"
PGDB="${PGDB:-porshure}"
PGBIN="$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | sort -V | tail -1 || true)"

if [ -z "${PGBIN}" ] || [ ! -x "${PGBIN}/initdb" ]; then
  echo "==> Installing PostgreSQL..."
  export DEBIAN_FRONTEND=noninteractive
  sudo apt-get update -qq
  sudo apt-get install -y -qq postgresql postgresql-contrib
  PGBIN="$(ls -d /usr/lib/postgresql/*/bin | sort -V | tail -1)"
fi

if ! sudo test -s "${PGDATA}/PG_VERSION"; then
  echo "==> Initialising cluster in ${PGDATA}..."
  sudo chmod 711 /home/user || true
  sudo mkdir -p "${PGDATA}"
  sudo chown postgres:postgres "${PGDATA}"
  sudo chmod 700 "${PGDATA}"
  sudo -u postgres "${PGBIN}/initdb" -D "${PGDATA}" -U postgres \
    --auth-local=trust --auth-host=scram-sha-256 >/dev/null
fi

if sudo -u postgres "${PGBIN}/pg_ctl" -D "${PGDATA}" status >/dev/null 2>&1; then
  echo "==> PostgreSQL already running on port ${PGPORT}."
else
  echo "==> Starting PostgreSQL on port ${PGPORT}..."
  sudo -u postgres "${PGBIN}/pg_ctl" -D "${PGDATA}" \
    -o "-p ${PGPORT} -k /tmp -c listen_addresses=127.0.0.1" \
    -l "${PGDATA}/pg.log" start >/dev/null
  sleep 2
fi

echo "==> Ensuring role '${PGUSER_APP}' and database '${PGDB}' exist..."
sudo -u postgres psql -h /tmp -p "${PGPORT}" -tAc \
  "SELECT 1 FROM pg_roles WHERE rolname='${PGUSER_APP}'" | grep -q 1 || \
  sudo -u postgres psql -h /tmp -p "${PGPORT}" -c \
    "CREATE ROLE ${PGUSER_APP} LOGIN PASSWORD '${PGPASS_APP}'" >/dev/null
sudo -u postgres psql -h /tmp -p "${PGPORT}" -tAc \
  "SELECT 1 FROM pg_database WHERE datname='${PGDB}'" | grep -q 1 || \
  sudo -u postgres psql -h /tmp -p "${PGPORT}" -c \
    "CREATE DATABASE ${PGDB} OWNER ${PGUSER_APP}" >/dev/null

echo "==> Ready: postgres://${PGUSER_APP}:${PGPASS_APP}@127.0.0.1:${PGPORT}/${PGDB}"
