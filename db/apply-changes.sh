#!/bin/bash

# load .env file
set -a && source .env && set +a

npx prisma migrate dev

if [ $? -ne 0 ]; then
    echo "Migration failed"
    exit 1
fi

cd ../backend/ScoutFlowAPI/
efcpt $EFCPT_CONNECTION_STRING

if [ $? -ne 0 ]; then
    echo "Failed to apply changes"
    exit 1
fi

cd ../../db/
