Metric.js
=====

Lightweight easy-to-use library for unit of measurement conversion.

<p align="center">
  <img alt="Metric.js" src="http://ianramosc.github.io/metric.js/images/logo.svg" width="300px" />
</p>

[![Build Status](https://travis-ci.org/IanRamosC/metric.js.svg?branch=master)](https://travis-ci.org/IanRamosC/metric.js)

### What is ~~love~~ Metric?

Metric.js is a lightweight library that provides an easy way to convert units of measurement.

### Installation

```sh
$ npm install --save metricjs
```

or

```html
<script src="./js/metric.min.js"></script>
```

### Usage

```js
// If you're using node
const metric = require("metricjs")

let birthday = new Date("1995-03-01T00:00:00Z").getTime()

let age = metric.milliseconds(Date.now() - birthday).toYears() // 21.38...
```
[You can find the full documentation here](https://ianramosc.github.io/metric.js)

### License

[MIT](https://github.com/ianramosc/metric.js/blob/master/LICENSE) © Ian Ramos
