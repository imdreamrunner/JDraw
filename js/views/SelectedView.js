var app = app || {};

(function($){
  'use strict';

  app.SelectedView = Backbone.View.extend({
    tagName:  'li',
    events: {
      'click .delete': 'setUnselected'
    },
    initialize: function (){
      this.template = _.template($('#selected-person-template').html());
      _.bindAll(this, 'render');
      this.model.on('change', this.render);
      this.render();
    },
    setUnselected: function(){
      this.model.set({selected: false});
    },
    render: function(){
      if(this.model.get('selected')){
        this.$el.html(this.template(this.model.toJSON()));
      }else{
        this.$el.html('');
      }
      return this;
    },
    close: function (){
      this.off();
      this.remove();
    }
  });
})(jQuery);