define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/dom-construct",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/registry",
  "./MapSearch",
  "esri/arcgis/utils"
], function(
  declare,
  lang,
  domConstruct,
  _WidgetBase,
  _TemplatedMixin,
  registry,
  MapSearch,
  arcgisUtils
) {

  var MapContainer = declare([ _WidgetBase, _TemplatedMixin ], {

    templateString: "<div></div>",

    baseClass: "map-container",

    search: null,

    mapId: null,

    map: null,

    startup: function() {
      this.inherited(arguments);

      this.mapId = registry.getUniqueId("matrix_map");

      this.searchDiv = domConstruct.create("div", {
        // ?
      }, this.domNode);

      this.mapDiv = domConstruct.create("div", {
        id: this.mapId
      }, this.domNode);

      this._createSearch();
     
    },

    _createSearch: function() {

      this.search = new MapSearch({
        onItemSelect: lang.hitch(this, this._createMap)
      }, this.searchDiv);
      this.search.startup();

    },

    _createMap: function(e) {

      itemId = e.itemId || "eefd470113994f30b1e17a6be3bbc870";
      
      setTimeout(lang.hitch(this, function() {
        this.map = arcgisUtils.createMap(itemId, this.mapId, {
          mapOptions: {

          }
        });
      }), 500);

    }

  });

  return MapContainer;

});
