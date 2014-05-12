define([
  "dojo/_base/declare",
  "dojo/dom-attr",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./templates/MapSearch.html"
], function(
  declare,
  domAttr,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template
) {

  var ResultItem = declare([], {

    templateString: "<li>${label}</li>",

    label: "foo",

    itemId: null

  });

  var MapSearch = declare([ _WidgetBase, _TemplatedMixin ], {

    templateString: template,
    baseClass: "map-search",

    startup: function() {
      this.inherited(arguments);

      
    },

    _onClick: function() {

      // var value = domAttr.get(this.searchTextNode, "value");


      // esri/arcgis/Portal::queryItems( params ).then(lang.hitch(this, _onResults));

    },

    _onResults: function(results) {

      // dojo/_base/array::forEach(results, function(result) {

        // create ResultItem in this.resultsListNode
        // don't forget to call ::startup()

      //})

    }

    _onItemClick: function() {

      this.onItemSelect();

    },

    onItemSelect: function() { }

  });

  return MapSearch;

});