var maps = [];

require([
  "dojo/dom-construct",
  "esri/map",
  "dojo/domReady!"
], function (
  domConstruct,
  Map
) {


    var columns = 3,
        rows = 2;

    for (var i = 0, il = rows * columns; i < il; i++) {

        var mapId = "map" + i;

        var style = {
            width: 100.0 / columns + "%",
            height: 100.0 / rows + "%",
            borderTopWidth: (i < columns ? 0 : 2) + "px",
            borderRightWidth: (i % columns === columns - 1 ? 0 : 2) + "px",
            borderBottomWidth: (i > il - (columns + 1) ? 0 : 2) + "px",
            borderLeftWidth: (i % columns === 0 ? 0 : 2) + "px"
        };

       var mapDiv = domConstruct.create("div", {
            id: mapId,
            style: style
        }, "mapMatrix");

        var map = new Map(mapId, {
            center: [-56.049, 38.485],
            zoom: 3,
            basemap: "gray",
            center: [0, 0]
        });

        domConstruct.create("input", {
            type: 'text',
            class: 'searchInput',
            placeholder: 'Search for a Map...',
            title: 'Search for a Map'
        }, mapDiv, "last");
        

        maps.push(map);

    }

});