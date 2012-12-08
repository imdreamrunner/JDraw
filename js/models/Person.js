var app = app || {};

(function($){
  'use strict';

	app.Person = Backbone.Model.extend({

		defaults: {
			name: '',
			selected: false,
      current: false
		},

		toggle: function() {
			this.save({
				selected: !this.get('selected')
			});
		}

	});

})(jQuery);