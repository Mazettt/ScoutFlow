#!/bin/bash

# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex

cat seed.sql | psql ScoutFlow
