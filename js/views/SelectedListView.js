var app = app || {};

(function($){
  'use strict';

  app.SelectedListView = Backbone.View.extend({
    el: '#ul-selected-list',

    personViewList: [],

    initialize: function (){
    },

    render: function(){
      var _this = this;

      // close all created Person Views
      while(this.personViewList[0]){
        this.personViewList.pop().close();
      }
      _.each(this.collection.selected(), function (person){
        var personView = new app.SelectedView({model: person});
        _this.personViewList.push(personView);
        _this.$el.append(personView.$el);
      });

      return this;
    }
  });
})(jQuery);