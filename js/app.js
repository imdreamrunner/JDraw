var app = app || {};

(function($){
  'use strict';

  // Kick things off by creating the **App**.
  var App = new app.AppView();

  $('#ul-draw-list').selectLess();

  // Load default data
  if(App.collection.models.length === 0){
    $('#text-draw-list').val('Harry Potter\nRon Weasley\nHermione Granger\nGinny Weasley\nNeville Longbottom\n' +
      'Luna Lovegood\nDraco Malfoy\nSirius Black\nJames Potter\nLily Potter\nAlbus Dumbledore\nMinerva McGonagall\n' +
      'Rubeus Hagrid\nSeverus Snape\nArthur Weasley\nAlastair Moody\nRemus Lupin\nNymphadora Tonks');
    App.editPersons();
  }

})(jQuery);