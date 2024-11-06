#!/bin/bash

git pull

if [ $? -ne 0 ]; then
    echo "git pull failed"
    exit 1
fi

cd db/
npm install
npx prisma migrate deploy
cd ..
