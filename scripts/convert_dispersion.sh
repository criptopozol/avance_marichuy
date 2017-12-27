#!/bin/bash
# Espera un .csv con 4 columnas:
#estado,apoyos,porcentaje_base_1,porcentaje_base_100
# ej:
#Aguascalientes,1965.0,0.216,21.6
#Baja California,1382.0,0.0524,5.24

file="$1"

while read line;
do
    NOMBRE=`echo $line | cut -d, -f1`
    APOYOS=`echo $line | cut -d, -f2`
    PORCENTAJE=`echo $line | cut -d, -f4`
    echo "    {\"nombre\":\"$NOMBRE\",\"apoyos\":$APOYOS,\"porcentaje\":$PORCENTAJE},"
done < $file
