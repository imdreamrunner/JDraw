var app = app || {};

(function($){
  'use strict';

  app.PersonView = Backbone.View.extend({
    tagName:  'li',
    initialize: function (){
      if(this.options.selected){
        this.template = _.template($('#selected-person-template').html());
      }else{
        this.options.selected = false;
        this.template = _.template($('#person-template').html());
      }
      _.bindAll(this, 'render');
      this.model.on('change', this.render);
      this.render();
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    close: function (){
      this.off();
      this.remove();
    }
  });
})(jQuery);