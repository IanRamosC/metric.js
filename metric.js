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
		if ( value != null ) {
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

	};

	var conversion = function(toName){
		var baseTo = UNITS[Metric.value.type][toName].base;
		var baseFrom = UNITS[Metric.value.type][Metric.value.name].base;
		return (Metric.value.value * baseFrom) / baseTo;
	};

	var converter = {};
	converter.meters = {
		toKilometers: function() {
			var baseName = 'km';
			return conversion(baseName);
		},
		toHectometers: function() {
			var baseName = 'hm';
			return conversion(baseName);
		},
		toDecameters: function() {
			var baseName = 'dam';
			return conversion(baseName);
		},
		toMeters: function() {
			var baseName = 'm';
			return conversion(baseName);
		},
		toDecimeters: function() {
			var baseName = 'dm';
			return conversion(baseName);
		},
		toCentimeters: function() {
			var baseName = 'cm';
			return conversion(baseName);
		},
		toMilimimeters: function() {
			var baseName = 'mm';
			return conversion(baseName);
		}
	}

	var helpers = {
		Meters: function(num) {
			var _this  = this;

			if (isValidNum(num)) {
				_this.setValue({
					name: 'm',
					value: num,
					type: 'distance'
				});
			}

			return converter.meters;
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

			return converter.meters;
		},
	};

	var MetricConstructor = function() {
		this.value;

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

})();