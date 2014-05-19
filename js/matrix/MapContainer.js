define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/dom-construct",
  "dojo/on",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/registry",
  "./MapSearch",
  "esri/arcgis/utils",
  "dojo/parser",
  "dijit/Dialog",
  "dojo/dom-style",
  "dojo/dom-class"

], function(
  declare,
  lang,
  domConstruct,
  on,
  _WidgetBase,
  _TemplatedMixin,
  registry,
  MapSearch,
  arcgisUtils,
  parser,
  Dialog,
  domStyle,
  domClass
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
        arcgisUtils.createMap(itemId, this.mapId, {
          mapOptions: {
              
          }
        }).then(lang.hitch(this, function(ee) {

          this.map = ee.map;

          
            var widgetContainer = domConstruct.create("div", {
              "class": "matrix-map-widget-container"
            }, this.map.root);

            this.storyMapNode = domConstruct.create("div", {
              "class": "matrix-map-widget",
              innerHTML: "HI"
            }, widgetContainer);
            
            on(this.storyMapNode, "click", lang.hitch(this, function() {
               this.storyMapDlg = new Dialog({
                    title: 'My Dialog',
                    content: this.mapDiv,
                  // style: 'width:100%, height:100%',
                });
               this.storyMapDlg.startup();
               this.storyMapDlg.show();
               this.map.resize();
             
             /*
                //make dom bigger, and place on top of everything, and then resize
                domStyle.set(this.domNode, { height: '100%', width: '100%' });

                if (domClass.contains(this.domNode, 'non-expanded')) {
                    //remove non-expanded
                    domClass.remove(this.domNode, 'non-expanded');
                    //add expanded
                    domClass.add(this.domNode, 'expanded');
                    //resize map
                    
                    
                } else {
                    //remove expanded
                    domClass.remove(this.domNode, 'expanded');
                    //add non-expanded
                    domClass.add(this.domNode, 'non-expanded');
                    //resize map
                }
                this.map.resize();
                */
            }));
          
        }));
      }), 500);

      

    }

  });

  return MapContainer;

});
