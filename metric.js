/**
 * @license
 * metric 0.0.1 <https://ianramosc.github.io/metric>
 * Copyright 2016 Ian Ramos <https://github.com/ianramosc>
 * Available under MIT license <https://github.com/ianramosc/metric>
 */
;(function(window) {

  'use strict';

  var VERSION = '0.0.1';

  /**
   * @private
   * @param {string} msg
   * @returns {object} Error
   */
  var error = function(msg) {
    throw new Error(msg);
  };

  /**
   * @private
   * @param {string} msg
   */
  var warn = function(msg) {
    console.warn(msg);
  };

  /**
   * @private
   * @param {*} value The value to test
   * @returns {number} `value` itself if it's not a number, throws an error otherwise
   * @example
   *
   *     isValidNum(8173); //=> 8173
   *     isValidNum(true); //=> Error
   */
  var isValidNum = function(value) {
    // First test if `value` isn't null
    if ( value !== null ) {
      if ( !isNaN(value) ) {
        return Number(value);
      } else {
        error("This function allows only numbers.");
      }
    } else {
      error("You can't test a null value.");
    }
  };

  var UNITS = {

    distance: {
      'ly': {
        name: 'light-year',
        base: 9.460731e+15
      },
      'km': {
        name: 'kilometer',
        base: 1000,
      },
      'hm': {
        name: 'hectometer',
        base: 100,
      },
      'dam': {
        name: 'decameter',
        base: 10,
      },
      'm': {
        name: 'meter',
        base: 1
      },
      'dm': {
        name: 'decimeter',
        base: 0.1
      },
      'cm': {
        name: 'centimeter',
        base: 0.01
      },
      'mm': {
        name: 'milimeter',
        base: 0.001
      },
      'um': {
        name: 'micrometer',
        base: 0.000001
      },
      'nm': {
        name: 'nanometer',
        base: 1e-9
      },

      //SI
      'mi': {
        name: 'mile',
        base: 1609.344
      },
      'nmi': {
        name: 'nautical mile',
        base: 1852
      },
      'in': {
        name: 'inch',
        base: 0.0254
      },
      'ft': {
        name: 'feet',
        base: 0.3048
      },
      'yd': {
        name: 'yard',
        base: 0.9144
      }
    },

    area: {
      'sqkm': {
        name: 'square kilometer',
        base: 1000000
      },
      'sqm': {
        name: 'square meter',
        base: 1
      },
      'sqmi': {
        name: 'square mile',
        base: 2590000
      },
      'sqyd': {
        name: 'square yard',
        base: 0.83613119866071
      },
      'sqft': {
        name: 'square foot',
        base: 0.092903
      },
      'sqin': {
        name: 'square inch',
        base: 0.00064516
      },
      'ha': {
        name: 'hectare',
        base: 10000
      },
      'ac': {
        name: 'acre',
        base: 4046.86
      }
    },

    time: {
      'y': {
        name: 'year',
        base: 31536000
      },
      'w': {
        name: 'week',
        base: 604800
      },
      'd': {
        name: 'day',
        base: 86400
      },
      'hr': {
        name: 'hour',
        base: 3600
      },
      'min': {
        name: 'minute',
        base: 60,
      },
      's': {
        name: 'second',
        base: 1,
      },
      'ds': {
        name: 'decisecond',
        base: 0.1,
      },
      'cs': {
        name: 'centisecond',
        base: 0.01,
      },
      'ms': {
        name: 'milisecond',
        base: 0.001,
      },
      'us': {
        name: 'microsecond',
        base: 0.000001,
      },
      'ns': {
        name: 'nanosecond',
        base: 1e-9,
      }
    },

    temperature: {
      'c': {
        name: 'celsius'
      },
      'f': {
        name: 'fahrenheit'
      },
      'k': {
        name: 'kelvin'
      }
    },

    mass: {
      'lt': {
        name: 'long ton',
        base: 1016050
      },
      't': {
        name: 'tonne',
        base: 1000000
      },
      'kg': {
        name: 'kilogram',
        base: 1000
      },
      'hg': {
        name: 'hectogram',
        base: 100
      },
      'dag': {
        name: 'decagram',
        base: 10
      },
      'g': {
        name: 'gram',
        base: 1
      },
      'dg': {
        name: 'decigram',
        base: 0.1
      },
      'cg': {
        name: 'centigram',
        base: 0.01
      },
      'mg': {
        name: 'miligram',
        base: 0.001
      },
      'ug': {
        name: 'microgram',
        base: 0.000001
      },
      'ng': {
        name: 'nanogram',
        base: 1e-9
      },
      'st': {
        name: 'stone',
        base: 6350.29318
      },
      'lb': {
        name: 'pound',
        base: 453.59237
      },
      'oz': {
        name: 'ounce',
        base: 28.349523
      }
    },

    angle: {
      'deg': {
        name: 'degree'
      },
      'rad': {
        name: 'radian'
      }
    }

  };

  var basicConversion = function(toName){
    var baseTo = UNITS[Metric.value.type][toName];
    var baseFrom = UNITS[Metric.value.type][Metric.value.name];

    return (Metric.value.value * baseFrom.base) / baseTo.base;
  };

  var basicConverterCreator = function(name) {
    return function() {
      return basicConversion(name);
    };
  };

  var temperatureConversion = function(toName) {
    if(toName === Metric.value.name) {
      return Metric.value.value;
    } else {
      switch(Metric.value.name) {
        case 'c':
          return (toName === 'k') ? Metric.value.value + 273.15 : Metric.value.value * (9 / 5) + 32;
        case 'k':
          return (toName === 'f') ? (Metric.value.value - 273.15) * (9 / 5) + 32 : Metric.value.value - 273.15;
        case 'f':
          return (toName === 'c') ? (Metric.value.value - 32) / (9 / 5) : (Metric.value.value - 32) / (9 / 5) + 273.15;
      }
    }
  };

  var temperatureConverterCreator = function(name) {
    return function() {
      return temperatureConversion(name);
    };
  };

  var angleConversion =  function(toName) {
    if(toName === Metric.value.name) {
      return Metric.value.value;
    } else {
      switch(Metric.value.name) {
        case 'deg':
          return Metric.value.value * (Math.PI / 180);
        case 'rad':
          return Metric.value.value * (180 / Math.PI);
      }
    }
  };

  var angleConverterCreator = function(name) {
    return function() {
      return angleConversion(name);
    };
  };

  var converter = {};

  converter.distance = {
    toLightyears: basicConverterCreator('ly'),
    toKilometers: basicConverterCreator('km'),
    toHectometers: basicConverterCreator('hm'),
    toDecameters: basicConverterCreator('dam'),
    toMeters: basicConverterCreator('m'),
    toDecimeters: basicConverterCreator('dm'),
    toCentimeters: basicConverterCreator('cm'),
    toMilimimeters: basicConverterCreator('mm'),
    toMicrometers: basicConverterCreator('um'),
    toNanometers: basicConverterCreator('nm'),
    toMiles: basicConverterCreator('mi'),
    toNauticalMiles: basicConverterCreator('nmi'),
    toInches: basicConverterCreator('in'),
    toFeets: basicConverterCreator('ft'),
    toYards: basicConverterCreator('yd'),
  };

  converter.area = {
    toSquareKilometers: basicConverterCreator('sqkm'),
    toSquareMeters: basicConverterCreator('sqm'),
    toSquareMiles: basicConverterCreator('sqmi'),
    toSquareYards: basicConverterCreator('sqyd'),
    toSquareFoots: basicConverterCreator('sqft'),
    toSquareInches: basicConverterCreator('sqin'),
    toHectares: basicConverterCreator('ha'),
    toAcres: basicConverterCreator('ac')
  };

  converter.time = {
    toYears: basicConverterCreator('y'),
    toWeeks: basicConverterCreator('w'),
    toDays: basicConverterCreator('d'),
    toHours: basicConverterCreator('hr'),
    toMinutes: basicConverterCreator('min'),
    toSeconds: basicConverterCreator('s'),
    toDeciseconds: basicConverterCreator('ds'),
    toCentiseconds: basicConverterCreator('cs'),
    toMiliseconds: basicConverterCreator('ms'),
    toMicroseconds: basicConverterCreator('us'),
    toNanoseconds: basicConverterCreator('ns'),
  };

  converter.temperature = {
    toKelvin: temperatureConverterCreator('k'),
    toFahrenheit: temperatureConverterCreator('f'),
    toCelsius: temperatureConverterCreator('c'),
  };

  converter.mass = {
    toLongtons: basicConverterCreator('lt'),
    toTonnes: basicConverterCreator('t'),
    toKilograms: basicConverterCreator('kg'),
    toHectograms: basicConverterCreator('hg'),
    toDecagrams: basicConverterCreator('dag'),
    toGrams: basicConverterCreator('g'),
    toDecigrams: basicConverterCreator('dg'),
    toCentigrams: basicConverterCreator('cg'),
    toMilimigrams: basicConverterCreator('mg'),
    toMicrograms: basicConverterCreator('ug'),
    toNanograms: basicConverterCreator('ng'),
    toStones: basicConverterCreator('st'),
    toPounds: basicConverterCreator('lb'),
    toOunces: basicConverterCreator('oz'),
  };

  converter.angle = {
    toDegrees: angleConverterCreator('deg'),
    toRadians: angleConverterCreator('rad'),
  };

  var helperCreator = function(name, type) {
    return function(value) {
      var _this  = this;

      if (isValidNum(value) || Number(value) === 0) {
        _this.setValue({
          name: name,
          value: Number(value),
          type: type
        });
      }

      return converter[type];
    };
  };

  var helpers = {
    //Distance
    lightyears: helperCreator('ly', 'distance'),
    kilometers: helperCreator('km', 'distance'),
    hectometers: helperCreator('hm', 'distance'),
    decameters: helperCreator('dam', 'distance'),
    meters: helperCreator('m', 'distance'),
    decimeters: helperCreator('dm', 'distance'),
    centimeters: helperCreator('cm', 'distance'),
    milimeters: helperCreator('mm', 'distance'),
    micrometers: helperCreator('um', 'distance'),
    nanometers: helperCreator('nm', 'distance'),
    miles: helperCreator('mi', 'distance'),
    nauticalMiles: helperCreator('nmi', 'distance'),
    inches: helperCreator('in', 'distance'),
    feets: helperCreator('ft', 'distance'),
    yards: helperCreator('yd', 'distance'),

    //Area
    squareKilometers: helperCreator('sqkm', 'area'),
    squareMeters: helperCreator('sqm', 'area'),
    squareMiles: helperCreator('sqmi', 'area'),
    squareYards: helperCreator('sqyd', 'area'),
    squareFoots: helperCreator('sqft', 'area'),
    squareInches: helperCreator('sqin', 'area'),
    hectares: helperCreator('ha', 'area'),
    acres: helperCreator('ac', 'area'),

    //Time
    years: helperCreator('y', 'time'),
    weeks: helperCreator('w', 'time'),
    days: helperCreator('d', 'time'),
    hours: helperCreator('hr', 'time'),
    minutes: helperCreator('min', 'time'),
    seconds: helperCreator('s', 'time'),
    deciseconds: helperCreator('ds', 'time'),
    centiseconds: helperCreator('cs', 'time'),
    miliseconds: helperCreator('ms', 'time'),
    microseconds: helperCreator('us', 'time'),
    nanoseconds: helperCreator('ns', 'time'),

    //Temperature
    kelvin: helperCreator('k', 'temperature'),
    fahrenheit: helperCreator('f', 'temperature'),
    celsius: helperCreator('c', 'temperature'),

    //Mass
    longtons: helperCreator('lt', 'mass'),
    tonnes: helperCreator('t', 'mass'),
    kilograms: helperCreator('kg', 'mass'),
    hectograms: helperCreator('hg', 'mass'),
    decagrams: helperCreator('dag', 'mass'),
    grams: helperCreator('g', 'mass'),
    decigrams: helperCreator('dg', 'mass'),
    centigrams: helperCreator('cg', 'mass'),
    miligrams: helperCreator('mg', 'mass'),
    micrograms: helperCreator('ug', 'mass'),
    nanograms: helperCreator('ng', 'mass'),
    stones: helperCreator('st', 'mass'),
    pounds: helperCreator('lb', 'mass'),
    ounces: helperCreator('oz', 'mass'),

    //Angle
    degrees: helperCreator('deg', 'angle'),
    radians: helperCreator('rad', 'angle'),
  };

  var MetricConstructor = function() {
    this.value = {};

    this.setValue = function(obj) {
      if ( typeof obj === 'object' && !!obj ) {
        if(!!obj.name && (!!obj.value || obj.value === 0) && !!obj.type) {
          this.value = obj;
        }
      } else {
        error('Expected an object');
      }
    };
  };

  MetricConstructor.prototype = helpers;

  var Metric = new MetricConstructor();
  Metric.version = VERSION;

  if (typeof exports === "object" && typeof module === "object") {
    module.exports = Metric;

  } else if (typeof define === "function" && define.amd) {
    define(function(){ return Metric; });

  } else if (typeof window !== "undefined" || typeof self !== "undefined") {
    var global = typeof window !== "undefined" ? window : self;

    global.metric = Metric;

  }

})(this);
