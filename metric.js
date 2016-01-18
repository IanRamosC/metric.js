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
			'm': {
				name: 'meter',
				base: 1
			},
			'mm': {
				name: 'milimeter',
				base: 0.001
			}
		},

	};

	var helpers = {
		Meters: function(num) {
			var _value = num
				,	_name  = 'meters'
				,	_type  = 'distance'
				,	_this  = this;

			if (isValidNum(_value)) {
				_this.setValue({
					name: _name,
					value: _value,
					type: _type
				});
			}

			return {
				foo: function(test) {
					console.log(test + " | " + _this.value.value);
				}
			}
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