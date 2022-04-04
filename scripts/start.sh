#!/bin/sh

yarn typeorm migration:run;
node dist/src/main;
