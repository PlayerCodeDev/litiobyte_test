# Desafío Técnico - LitioByte

## Índice
- [Desafío Técnico - LitioByte](#desafío-técnico---litiobyte)
  - [Índice](#índice)
  - [Reglas de limpieza de datos](#reglas-de-limpieza-de-datos)
  - [Regla de eliminación de duplicados](#regla-de-eliminación-de-duplicados)
  - [Reportes generados](#reportes-generados)
  - [Loggins](#loggins)
  - [Supuestos del diseño](#supuestos-del-diseño)
  - [Decisiones técnicas](#decisiones-técnicas)
  - [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
    - [1. Requisitos](#1-requisitos)
    - [2. Instalación](#2-instalación)
    - [3. Archivo de entrada](#3-archivo-de-entrada)
    - [4. Ejecución](#4-ejecución)
    - [5. Resultados](#5-resultados)

Este desafío consiste en implementar un script deprocesamiento y limpieza de datos de ventas.

El objetivo es recibir un archivo JSON con registros potencialmente mal formados y producir:
* Datos limpios y normalizados
* Eliminación de duplicados
* Reportes claros de descartes

Ejemplo de datos entregados:
```json
[ { "order_id": "A1", "amount": "1000", "currency": "CLP", "date": "2024-01-10" }, { "order_id": "A1", "amount": 1000, "currency": "CLP", "date": "10-01-2024" }, { "order_id": "B2", "amount": -200, "currency": "USD", "date": null } ]
```

A continuación detallo las decisiones que he tomado y cómo lo he hecho durante el desarrollo.

## Reglas de limpieza de datos
Durante el procesamiento, se aplican las siguientes reglas:

1. `order_id`
   * Campo obligatorio.
   * Si no existe o no es string se descarta el registro.
2. `amount`
   * Se transforma siempre a número.
   * Se convierte a valor positivo usando valor absoluto.
   * Si el valor es nulo, está vacío o no convertible a número el registro se descarta.
3. `currency`
   * No es obligatorio.
   * Si existe, se normaliza a mayúsculas.
   * Si no existe o es inválido se asigna como nulo.
4. `date`
   * El formato final permitido es ISO (`YYYY-MM-DD`).
   * Si la fecha viene en otro formato válido (por ejemplo `DD-MM-YYYY`) se transforma.
   * Si la fecha es nula o inválida se normaliza a `null`.

## Regla de eliminación de duplicados
Dos registros se consideran duplicados si comparten exactamente los mismos valores normalizados en los siguientes campos:
* `order_id`
* `amount`
* `currency`
* `date`

>[!NOTE]
>No considero duplicados solo con `orden_id` por no saber la integridad del proceso de obtención/creación de los datos.

La duplicidad se realiza después de la normalización para evitar falso negativos causados por formatos distintos.

Cosas a tener en cuenta:
1. El primer registro encontrado se conserva.
2. Los duplicados posteriores se descartan.
3. Cada descarte por duplicidad queda registrado en el reporte y logs.

## Reportes generados
El script genera dos archivos relacionados a reportes.

1. `/output/data.json`
Contiene únicamente los registros:
   * válidos
   * normalizados
   * sin duplicados

1. `/output/report.txt`
   * Total de registros recibidos
   * Registros válidos tras normalización
   * Registros finales tras deduplicación
   * Total de registros descartados
   * Motivos de descarte agrupados

## Loggins
Se genera un archivo `/logs/process.log` con información detallada del proceso:
* Inicio y fin de la ejecución
* Registros descartados por validación
* Registros descartados por normalización
* Registros descartados por duplicidad

Los logs incluyen:
* Timestamp
* Nivel (`INFO`, `WARNING`, `ERROR`)
* Mensaje
* Datos relevantes del registro

## Supuestos del diseño
* El script se ejecuta como proceso batch, no como API.
* El archivo de entrada es JSON válido (sino, el proveso falla explícitamente).
* Es preferible descartar registros individuales antes que falle todo el lote.

## Decisiones técnicas
* Node.js con ES Modules: sintaxis moderna y alineada con estándares actuales.
* Separación de responsabilidades:
  * Validadores
  * Normalizadores
  * Deduplicación
  * Orquestación
  * Logging
* JDoc para documentar y facilitar mantenimiento.
* Sin dependencias externas.

## Cómo ejecutar el proyecto

### 1. Requisitos

Node.js 18 o superior
Sistema operativo: Windows, macOS o Linux
Puedes verificar tu versión de Node con:
```bach
node -v
```

### 2. Instalación

Clona o descarga el proyecto y ubícate en la carpeta raíz.
No es necesario instalar dependencias externas.
Asegúrate de que existan las siguientes carpetas:

```bash
data/
output/
logs/
```

### 3. Archivo de entrada

Coloca el archivo de entrada en:
```bash
data/input.json
```
El archivo debe contener un arreglo de registros en formato JSON válido.

### 4. Ejecución

Desde la raíz del proyecto, ejecuta:
```bash
npm start
```

O directamente:
```bash
node src/index.js
```

### 5. Resultados

Al finalizar la ejecución se generarán:

```bash
output/clean_data.json #registros limpios, normalizados y sin duplicados
output/report.txt  #resumen del procesamiento y descartes
logs/process.log #log detallado del proceso
```