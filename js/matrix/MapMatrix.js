define([
  "dojo/_base/declare",
  "dojo/dom-construct",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "esri/map",
  "./MapContainer"
], function(
  declare,
  domConstruct,
  _WidgetBase,
  _TemplatedMixin,
  Map,
  MapContainer
) {

  (function() {

    var e = document.createElement("LINK");
    e.rel = "stylesheet";
    e.href = require.toUrl("matrix/styles/MapMatrix.css");

    document.getElementsByTagName("HEAD")[0].appendChild(e);

  })();

  var MapMatrix = declare([ _WidgetBase, _TemplatedMixin ], {

    templateString: "<div></div>",
    baseClass: "map-matrix",

    rows: 1,
    columns: 1,

    itemIds: null,

    focusMapUrlTemplate: null,

    maps: null,

    startup: function() {
      this.inherited(arguments);

      this.maps = [];

      for (var i = 0, il = this.rows * this.columns; i < il; i++) {

        // dynamically size based on # of rows/columns
        var style = {
            width: 100.0 / this.columns + "%",
            height: 100.0 / this.rows + "%"
        };

        // determine the border classes
        var classes = [];
        if (i >= this.columns) {
          classes.push("border-top");
        }
        if (i % this.columns !== this.columns - 1) {
          classes.push("border-right");
        }
        if (i <= il - (this.columns + 1)) {
         classes.push("border-bottom"); 
        }
        if (i % this.columns !== 0) {
          classes.push("border-left");
        }
        classes.push('non-expanded');

        // create the map container
        var mapDiv = domConstruct.create("div", { }, this.domNode);
        var map = new MapContainer({
          style: style,
          "class": classes.join(" "),
          itemId: this.itemIds[i] || null,
          focusMapUrlTemplate: this.focusMapUrlTemplate || null
        }, mapDiv);
        map.startup();
        
        // hang on to map reference (why?)
        this.maps.push(map);

      }
    }

  });

  return MapMatrix;

});