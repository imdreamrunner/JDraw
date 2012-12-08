var app = app || {};

(function($){
  'use strict';

  app.PersonListView = Backbone.View.extend({
    el: '#ul-draw-list',

    personViewList: [],

    initialize: function (){
    },

    render: function(){
      var _this = this;

      // close all created Person Views
      while(this.personViewList[0]){
        this.personViewList.pop().close();
      }
      _.each(this.collection.models, function (person){
        var personView = new app.PersonView({model: person});
        _this.personViewList.push(personView);
        _this.$el.append(personView.$el);
      });

      return this;
    }
  });
})(jQuery);