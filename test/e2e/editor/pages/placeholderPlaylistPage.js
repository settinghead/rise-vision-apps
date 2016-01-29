'use strict';
var PlaceholderPlaylistPage = function() {
  var addContentButton = element(by.id('addContentButton'));

  var playlistItems = element.all(by.css('.editor-playlist-item'));
  var moveUpButtons = element.all(by.id('moveUpButton'));
  var moveDownButtons = element.all(by.id('moveDownButton'));
  var removeButtons = element.all(by.id('removeButton'));
  var removeItemButton = element(by.id('confirmForm')).element(by.buttonText('Remove'));
  var duplicateButtons = element.all(by.id('duplicateButton'));
  var duplicateItemButton = element.all(by.id('duplicateButton'));
  var itemNameCells = element.all(by.css('.editor-playlist-item  .nameContainer:not(.ng-hide) .playlist-item-name'));
  var itemStatusCells = element.all(by.css('.editor-playlist-item .playlist-item-status'));
  var editPlaylistItemButtons = element.all(by.css('.editor-playlist-item .editPlaylistItem'));

  this.getAddContentButton = function() {
    return addContentButton;
  };

  this.getPlaylistItems = function() {
    return playlistItems;
  };

  this.getMoveUpButtons = function() {
    return moveUpButtons;
  };
  
  this.getMoveDownButtons = function() {
    return moveDownButtons;
  };
  
  this.getRemoveButtons = function() {
    return removeButtons;
  };
  
  this.getRemoveItemButton = function() {
    return removeItemButton;
  };
  
  this.getDuplicateButtons = function() {
    return duplicateButtons;
  }
  
  this.getItemNameCells = function() {
    return itemNameCells;
  };

  this.getItemStatusCells = function() {
    return itemStatusCells;
  };

  this.getEditPlaylistItemButtons = function() {
    return editPlaylistItemButtons;
  };

};

module.exports = PlaceholderPlaylistPage;
