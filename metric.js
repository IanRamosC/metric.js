/*
 * @author https://github.com/ianramosc
 *
 *
 *
 *
 *
*/

;(function() {

	'use strict';

	var VERSION = '0.0.1';

	var error = function(msg) {
		throw new Error(msg);
	};

	var warn = function(msg) {
		console.log('WARNING:', msg);
	};

	var isValidNum = function(value) {
		// First test if `value` isn't null
		if ( value !== null ) {
			if ( !isNaN(value) ) {
				return value;
			} else {
				error("This function only accept numbers.");
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

			//SI
			'mi': {
				name: 'mile',
				base: 1609.344
			},
			'in': {
				name: 'inch',
				base: 0.0254
			},
			'ft': {
				name: 'inch',
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
				name: 'second',
				base: 0.1,
			},
			'cs': {
				name: 'second',
				base: 0.01,
			},
			'ms': {
				name: 'miliseconds',
				base: 0.001,
			}
		},

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

		//SI
		toMiles: basicConverterCreator('mi'),
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
	};

	var helperCreator = function(name, type) {
		return function(value) {
			var _this  = this;

			if (isValidNum(value)) {
				_this.setValue({
					name: name,
					value: value,
					type: type
				});
			}

			return converter[type];
		}
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
		//SI
		Miles: helperCreator('mi', 'distance'),
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


	}

	var MetricConstructor = function() {
		this.value = '';

		this.setValue = function(obj) {
			if ( typeof obj === 'object' && !!obj ) {
				if(!!obj.name && !!obj.value && !!obj.type) {
					this.value = obj;
				}
			} else {
				error('Expected an object');
			}
		};
	};

	MetricConstructor.prototype = helpers;

	var Metric = new MetricConstructor();

	window.Metric = Metric;
	window.Metric.version = VERSION;

})();