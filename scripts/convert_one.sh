#!/bin/bash

file="$1"
CANDIDATA="PATRICIO"
if [ -n "$2" ]
then
    CANDIDATA="$2"
fi

DATE=`echo $file | cut -d- -f6- | cut -d. -f1 | sed s/-//g`;
if [[ $file == *.xls ]]
then
    echo "Converting xls $file" 1>&2;
    DATA=`xls2csv -q 0 $file | grep $CANDIDATA | sed s/^,//g`
elif [[ $file == *.xlsx ]]
then
    echo "Converting xlsx $file" 1>&2;
    DATA=`xlsx2csv -s 0 $file | grep $CANDIDATA | sed s/^,//g`
fi

ANIO=`echo $DATE | cut -c1-4`
MES=`echo $DATE | cut -c5-6`
DIA=`echo $DATE | cut -c7-8`
APOYOS=`echo $DATA | cut -d, -f2`
APOYOSVALIDOS=`echo $DATA | cut -d, -f14`
AUXILIARES=`echo $DATA | cut -d, -f3`
AUXILIARESACTIVOS=`echo $DATA | cut -d, -f4`
echo "    {\"fecha\":\"$ANIO-$MES-$DIA\",\"apoyos\":$APOYOS,\"auxiliares\":$AUXILIARES,\"auxiliares_activos\":$AUXILIARESACTIVOS,\"apoyos_validos\":$APOYOSVALIDOS},"
