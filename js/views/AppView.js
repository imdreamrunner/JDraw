var app = app || {};

(function($){
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '#draw-app',

    events: {
      'click #edit-draw-items': 'editPersons',
      'click #control-button': 'draw',
      'click #cancel-edit-items': 'cancelEdit',
      'dblclick #ul-draw-list': 'editList',
      'click #delete-all-selected': 'deleteAll',
      'click #full-screen': 'fullScreen'
    },

    initialize: function() {
      this.collection = new app.PersonList;
      this.personListView = new app.PersonListView({collection: this.collection});
      this.selectedListView = new app.SelectedListView({collection: this.collection});
      this.personListText = this.$('#text-draw-list');
    },

    render: function() {
    },

    editList: function(){
      this.$el.find('#form-edit-list').show();
      this.$el.find('#div-draw-list').hide();
    },

    cancelEdit: function(){
      this.$el.find('#form-edit-list').hide();
      this.$el.find('#div-draw-list').show();
    },

    editPersons: function (){
      this.cancelEdit();

      var _this = this;

      // Remove all persons.
      this.collection.remove(this.collection.models);

      // All all persons from text.
      var personList = this.personListText.val().split(/\r\n|\r|\n/);
      _.each(personList, function (personName){
        var personName = personName.trim();
        if(personName !== ""){
          _this.collection.add({name: personName});
        }
      });
      this.personListView.render();
      this.selectedListView.render();
    },

    draw: function(){
      if(this.collection.unselected().length === 0){
        alert('Oops, there is no person left to be selected.');
        return;
      }
      var _this = this;
      if(this.looping){
        this.$el.find('#control-button').val('Start');

        clearInterval(this.looping);
        delete this.looping;

        this.currentPerson.set({selected: true});
        this.selectedListView.render();
      }else{
        this.$el.find('#control-button').val('Stop');
        var getPerson = function (){
          if(_this.currentPerson){
            _this.currentPerson.set({current: false});
          }
          _this.currentPerson = _this.getRandomPerson();
          _this.currentPerson.set({current: true});
          _this.$el.find('#current-item').html(_this.currentPerson.get('name'));
        }
        getPerson(); // Run once to avoid stopping before first run.
        this.looping = setInterval(getPerson, 100);
      }
    },

    getRandomPerson: function(){
      var totalPerson = this.collection.unselected().length;
      var randomInt = _.random(0, totalPerson - 1);
      return this.collection.unselected()[randomInt];
    },

    deleteAll: function(){
      _.each(this.collection.selected(), function(person){
        person.set({'selected': false});
      });
    },

    fullScreen: function(){
      var appElem = document.documentElement;
      if (appElem.requestFullScreen) {
        appElem.requestFullScreen();
      } else if (appElem.mozRequestFullScreen) {
        appElem.mozRequestFullScreen();
      } else if (appElem.webkitRequestFullScreen) {
        appElem.webkitRequestFullScreen();
      } else{
        alert('Your browser does not support HTML5 full screen. Please press F11 to enter full screen mode.')
      }
    }
  });
})(jQuery);