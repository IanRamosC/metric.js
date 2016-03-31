/**
 * @license
 * priest 0.0.1 <https://ianramosc.github.io/priest>
 * Copyright 2016 Ian Ramos <https://github.com/ianramosc>
 * Available under MIT license <https://github.com/ianramosc/priest>
 */
;(function() {

	'use strict';

	/**
	 * Semantic Version
	 * @const {string}
	 */
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
		console.log('WARNING:', msg);
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
			error("You can't convert a null value.");
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
		var baseTo = UNITS[Priest.value.type][toName];
		var baseFrom = UNITS[Priest.value.type][Priest.value.name];

		return (Priest.value.value * baseFrom.base) / baseTo.base;
	};

	var basicConverterCreator = function(name) {
		return function() {
			return basicConversion(name);
		};
	};

  var temperatureConversion = function(toName) {
    if(toName === Priest.value.name) {
      return Priest.value.value;
    } else {
      switch(Priest.value.name) {
        case 'c':
          return (toName === 'k') ? Priest.value.value + 273.15 : Priest.value.value * (9 / 5) + 32;
        case 'k':
          return (toName === 'f') ? (Priest.value.value - 273.15) * (9 / 5) + 32 : Priest.value.value - 273.15;
        case 'f':
          return (toName === 'c') ? (Priest.value.value - 32) / (9 / 5) : (Priest.value.value - 32) / (9 / 5) + 273.15;
      }
    }
  };

  var temperatureConverterCreator = function(name) {
    return function() {
      return temperatureConversion(name);
    };
  };

  var angleConversion =  function(toName) {
    if(toName === Priest.value.name) {
      return Priest.value.value;
    } else {
      switch(Priest.value.name) {
        case 'deg':
          return Priest.value.value * (Math.PI / 180);
        case 'rad':
          return Priest.value.value * (180 / Math.PI);
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
		Lightyears: helperCreator('ly', 'distance'),
		Kilometers: helperCreator('km', 'distance'),
		Hectometers: helperCreator('hm', 'distance'),
		Decameters: helperCreator('dam', 'distance'),
		Meters: helperCreator('m', 'distance'),
		Decimeters: helperCreator('dm', 'distance'),
		Centimeters: helperCreator('cm', 'distance'),
		Milimeters: helperCreator('mm', 'distance'),
    Micrometers: helperCreator('um', 'distance'),
    Nanometers: helperCreator('nm', 'distance'),
		Miles: helperCreator('mi', 'distance'),
    NauticalMiles: helperCreator('nmi', 'distance'),
		Inches: helperCreator('in', 'distance'),
		Feets: helperCreator('ft', 'distance'),
		Yards: helperCreator('yd', 'distance'),

		//Time
		Years: helperCreator('y', 'time'),
		Weeks: helperCreator('w', 'time'),
		Days: helperCreator('d', 'time'),
		Hours: helperCreator('hr', 'time'),
		Minutes: helperCreator('min', 'time'),
		Seconds: helperCreator('s', 'time'),
		Deciseconds: helperCreator('ds', 'time'),
		Centiseconds: helperCreator('cs', 'time'),
		Miliseconds: helperCreator('ms', 'time'),
    Microseconds: helperCreator('us', 'time'),
    Nanoseconds: helperCreator('ns', 'time'),

    //Temperature
    Kelvin: helperCreator('k', 'temperature'),
    Fahrenheit: helperCreator('f', 'temperature'),
    Celsius: helperCreator('c', 'temperature'),

    //Mass
    Longtons: helperCreator('lt', 'mass'),
    Tonnes: helperCreator('t', 'mass'),
    Kilograms: helperCreator('kg', 'mass'),
    Hectograms: helperCreator('hg', 'mass'),
    Decagrams: helperCreator('dag', 'mass'),
    Grams: helperCreator('g', 'mass'),
    Decigrams: helperCreator('dg', 'mass'),
    Centigrams: helperCreator('cg', 'mass'),
    Miligrams: helperCreator('mg', 'mass'),
    Micrograms: helperCreator('ug', 'mass'),
    Nanograms: helperCreator('ng', 'mass'),
    Stones: helperCreator('st', 'mass'),
    Pounds: helperCreator('lb', 'mass'),
    Ounces: helperCreator('oz', 'mass'),

    //Angle
    Degrees: helperCreator('deg', 'angle'),
    Radians: helperCreator('rad', 'angle'),
	};

	var PriestConstructor = function() {
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

	PriestConstructor.prototype = helpers;

	var Priest = new PriestConstructor();

	window.Priest = Priest;
	window.Priest.version = VERSION;

})();
