#!/bin/bash

npx prisma migrate dev

if [ $? -ne 0 ]; then
    echo "Migration failed"
    exit 1
fi

cd ../backend/ScoutFlowAPI/
efcpt "Host=localhost;Port=5432;Database=ScoutFlow;Username=martin;Password="

if [ $? -ne 0 ]; then
    echo "Failed to apply changes"
    exit 1
fi

cd ../../db/
