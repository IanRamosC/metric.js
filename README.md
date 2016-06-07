Metric.js
=====

Lightweight easy-to-use library for unit of measurement conversion.

<p align="center">
  <img alt="Metric.js" src="metric.svg" width="300px" />
</p>

[![Build Status](https://travis-ci.org/ianramosc/metric.js.svg?branch=master)](https://travis-ci.org/ianramosc/metric.js)

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
const metric = require('metricjs');

metric.hours(60).toDays(); // 2.5
```
[You can find the full documentation here](https://ianramosc.github.io/metric.js)

### License

[MIT](https://github.com/ianramosc/metric.js/blob/master/LICENSE) © Ian Ramos
