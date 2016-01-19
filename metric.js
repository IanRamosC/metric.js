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

	var helpers = {
		//Distance
		Lightyears: function(num) {
			var _this  = this;

			if (isValidNum(num)) {
				_this.setValue({
					name: 'ly',
					value: num,
					type: 'distance'
				});
			}

			return converter.distance;
		},
		Kilometers: function(num) {
			var _this  = this;

			if (isValidNum(num)) {
				_this.setValue({
					name: 'km',
					value: num,
					type: 'distance'
				});
			}

			return converter.distance;
		},
		Hectometers: function(num) {
			var _this  = this;

			if (isValidNum(num)) {
				_this.setValue({
					name: 'hm',
					value: num,
					type: 'distance'
				});
			}

			return converter.distance;
		},
		Decameters: function(num) {
			var _this  = this;

			if (isValidNum(num)) {
				_this.setValue({
					name: 'dam',
					value: num,
					type: 'distance'
				});
			}

			return converter.distance;
		},
		Meters: function(num) {
			var _this  = this;

			if (isValidNum(num)) {
				_this.setValue({
					name: 'm',
					value: num,
					type: 'distance'
				});
			}

			return converter.distance;
		},
		Decimeters: function(num) {
			var _this  = this;

			if (isValidNum(num)) {
				_this.setValue({
					name: 'dm',
					value: num,
					type: 'distance'
				});
			}

			return converter.distance;
		},
		Centimeters: function(num) {
			var _this  = this;

			if (isValidNum(num)) {
				_this.setValue({
					name: 'cm',
					value: num,
					type: 'distance'
				});
			}

			return converter.distance;
		},
		Milimeters: function(num) {
			var _this  = this;

			if (isValidNum(num)) {
				_this.setValue({
					name: 'mm',
					value: num,
					type: 'distance'
				});
			}

			return converter.distance;
		},

		//Time
		Hours: function(num) {
			var _this  = this;

			if (isValidNum(num)) {
				_this.setValue({
					name: 'hr',
					value: num,
					type: 'time'
				});
			}

			return converter.time;
		}

	};

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