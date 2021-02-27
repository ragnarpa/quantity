# Quantity with (sub)multipliers to real numbers

A library for converting quantities with multipliers to real numbers. Motivated by Kubernetes' API machinery quantity.

## Installation

```
npm install @ragnarpa/quantity
```

## Example usage

```javascript
const { real } = require("@ragnarpa/quantity");

const giga = real("10G");
const gibi = real("100Gi");
const micro = real("1000u");

console.log(giga, gibi, micro);
```

## Supported (sub)multipliers

| Multiplier | Unit prefix |
| ---------- | ----------- |
| n          | nano        |
| u          | micro       |
| m          | milli       |
| k          | kilo        |
| M          | mega        |
| G          | giga        |
| T          | tera        |
| P          | peta        |
| E          | exa         |
| Ki         | kibi        |
| Mi         | mebi        |
| Gi         | gibi        |
| Ti         | tebi        |
| Pi         | pebi        |
| Ei         | exbi        |
