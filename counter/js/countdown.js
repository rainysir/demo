(function($) {
$.Countdown = function(options) {
	var defaultOptions = {
		endTime:null,
		afterFinish: function() {}
	};
	options = $.extend({}, defaultOptions, options)
	var _class =  {
		endTime: null,
		daysCounter: null,
		hoursCounter: null,
		minutesCounter: null,
		secondsCounter: null,
		finished: false,
		initialize: function(endTime) {
			_class.endTime = endTime;
			var status = _class.getStatus();
			_class.daysCounter = $.Counter(0, 364, 'Days');
			_class.hoursCounter = $.Counter(0, 23, 'Hours');
			_class.minutesCounter = $.Counter(0, 59, 'Minutes');
			_class.secondsCounter = $.Counter(0, 59, 'Seconds');
			if (!status.finished) {
				_class.daysCounter.setCurrent(status.days);
				_class.hoursCounter.setCurrent(status.hours);
				_class.minutesCounter.setCurrent(status.minutes);
				_class.secondsCounter.setCurrent(status.seconds);
				
			} else {
				_class.finish();
			}
		},
		
		
		isFinished: function() {
			return _class.finished;
		},
		
		finish: function() {
			_class.finished = true;
			_class.secondsCounter.setCurrent(0);
			_class.minutesCounter.setCurrent(0);
			_class.hoursCounter.setCurrent(0);
			_class.daysCounter.setCurrent(0);
			if (typeof(options.afterFinish) == 'function') {
				options.afterFinish();
			}
			
		},
		
		update: function() {
			var status = _class.getStatus();

			if (status.finished) {
				_class.finish();
				return;
			}

			_class.secondsCounter.setCurrent(status.seconds);
			_class.minutesCounter.setCurrent(status.minutes);
			_class.hoursCounter.setCurrent(status.hours);
			_class.daysCounter.setCurrent(status.days);
		},
		
		getStatus: function() {
			
			var now = new Date();
			var difference = new Date();
			difference.setTime(Math.abs(_class.endTime.getTime() - now.getTime()));
			
			var timeDifference = difference.getTime();
			
			var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
			timeDifference -= days * (1000 * 60 * 60 * 24);
			var hours = Math.floor(timeDifference / (1000 * 60 * 60)); 
			timeDifference -= hours * (1000 * 60 * 60);
			var minutes = Math.floor(timeDifference / (1000 * 60)); 
			timeDifference -= minutes * (1000 * 60);
			var seconds = Math.floor(timeDifference / 1000); 
			timeDifference -= seconds * 1000;
			
			var finished = now >= _class.endTime;
			
			return {finished: finished, days: days, hours: hours, minutes: minutes, seconds: seconds};
		},
		
		toString: function() {
			var days = _class.daysCounter.current;
			days = days < 10 ? '0' + days : '' + days;
			var hours = _class.hoursCounter.current;
			hours = hours < 10 ? '0' + hours : '' + hours;
			var minutes = _class.minutesCounter.current;
			minutes = minutes < 10 ? '0' + minutes : '' + minutes;
			var seconds = _class.secondsCounter.current;
			seconds = seconds < 10 ? '0' + seconds : '' + seconds;
			return days + hours + minutes + seconds;
		}
		
	};
	_class.initialize(options.endTime);
	return _class;
} 

$.Counter = function(min, max, unit) {
   	var _class = {
		min: null,
		max: null,
		unit: null,
		current:0,
		initialize: function(min, max, unit) {
			_class.min = min;
			_class.max = max;
			_class.unit = unit;
		},
		
		setCurrent: function(current) {
			if (current < _class.min) {
				_class.current = _class.min;
			} else if (current > _class.max) {
				_class.current = _class.max;
			} else {
				_class.current = current;
			}
		}
	} 
	_class.initialize();
	return _class;
    
};
})(jQuery)