#!/bin/bash

CANDIDATA="PATRICIO"
if [ -n "$1" ]
then
    CANDIDATA="$1"
fi

echo 'var apoyos_data = ['
for i in `ls Reporte-APP-* | sort -t- -k6`;
do
    ./convert_one.sh "$i" "$CANDIDATA" 
done
echo '];'
