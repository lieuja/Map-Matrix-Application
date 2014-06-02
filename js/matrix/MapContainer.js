define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/dom-construct",
  "dojo/on",
  "dojo/string",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/registry",
  "./MapSearch",
  "esri/arcgis/utils",
  "dojo/parser",
  "dijit/Dialog",
  "dojo/dom-style",
  "dojo/dom-class",
  "./FocusMap"
], function(
  declare,
  lang,
  domConstruct,
  on,
  string,
  _WidgetBase,
  _TemplatedMixin,
  registry,
  MapSearch,
  arcgisUtils,
  parser,
  Dialog,
  domStyle,
  domClass,
  FocusMap
) {

  var MapContainer = declare([ _WidgetBase, _TemplatedMixin ], {

    templateString: "<div></div>",

    baseClass: "map-container",

    itemId: null,

    search: null,

    mapId: null,

    map: null,

    focusMapUrlTemplate: null,

    startup: function() {
      this.inherited(arguments);

      this.mapId = registry.getUniqueId("matrix_map");

      this.searchDiv = domConstruct.create("div", {
        // ?
      }, this.domNode);

      this.mapDiv = domConstruct.create("div", {
        id: this.mapId
      }, this.domNode);

      // this._createSearch();
      this._createMap();
     
    },

    _createSearch: function() {

      this.search = new MapSearch({
        onItemSelect: lang.hitch(this, this._createMap)
      }, this.searchDiv);
      this.search.startup();

    },

    _createMap: function() {

      setTimeout(lang.hitch(this, function() {
          var itemId = this.itemId;
          arcgisUtils.createMap(itemId, this.mapId, {
          mapOptions: {
              
          }
        }).then(lang.hitch(this, function(ee) {

          this.map = ee.map;

          
            var widgetContainer = domConstruct.create("div", {
              "class": "matrix-map-widget-container"
            }, this.map.root);

            this.storyMapNode = domConstruct.create("div", {
              "class": "matrix-map-widget"
            }, widgetContainer);
            
            on(this.storyMapNode, "click", lang.hitch(this, function() {
              
              console.log("foo");

              var focusMap = new FocusMap({
                url: string.substitute(this.focusMapUrlTemplate, this)
              }, domConstruct.create("div", {}, this.domNode));
              focusMap.startup();

              console.log("bar");

            }));
          
        }));
      }), 500);

      

    }

  });

  return MapContainer;

});
