var app = app || {};

(function($){
  'use strict';

  app.PersonList = Backbone.Collection.extend({
    //localStorage: new Backbone.LocalStorage('JDraw'),

    model: app.Person,

    selected: function(){
      return this.filter(function(person){
        return person.get('selected');
      })
    },

    unselected: function(){
      return this.filter(function(person){
        return !person.get('selected');
      })
    },

    nextOrder: function() {
      if ( !this.length ) {
        return 1;
      }
      return this.last().get('order') + 1;
    },

    comparator: function( todo ) {
      return todo.get('order');
    }

  });

})(jQuery);