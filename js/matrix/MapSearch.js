define([
  "dojo/_base/declare",
  "dojo/dom-attr",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "dojo/text!./templates/MapSearch.html",
  //
  "dojo/on",
  "esri/config",
  "esri/arcgis/Portal",
  "dojo/dom",
  "dojo/_base/json",
  "dojo/_base/lang",
  "dojo/_base/array",
  'dojo/dom-construct'
], function(
  declare,
  domAttr,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  template,
  //
  on,
  config,
  esriPortal,
  dom,
  JSON,
  lang,
  array,
  domConstruct
) {

    var ResultItem = declare([_WidgetBase, _TemplatedMixin], {

        templateString: "<li data-itemid='${itemId}'>${label}</li>",

    label: "foo",

    itemId: null

  });

  var MapSearch = declare([ _WidgetBase, _TemplatedMixin ], {

    templateString: template,
    baseClass: "map-search",
    portal: null,
    portalUrl: 'http://www.arcgis.com',

    startup: function() {
        this.inherited(arguments);
        this._connectToPortal();

      
    },
    
    _searchPortal: function () {
        console.log('is searching');
        if (this.portal) {
            console.log('searching');
            var params = {
                q: domAttr.get(this.searchTextNode, "value"),
                num: 5,
                type: 'Web Map'
            };
            this.portal.queryItems(params).then(lang.hitch(this, function(result){
               // console.log('success', (result));
                this._onResults(result.results);
            }));
        }
    },

    _connectToPortal: function () {
        if (this.portalUrl) {
            //create the portal
           var portal = new esriPortal.Portal(this.portalUrl);

           on(portal, 'load', lang.hitch(this, function (p) {
               console.log('portal loaded');
               this.portal = p;
               console.log(this);               
            }));
        } else {
            console.error("invalid portal url");
        }
       
    },

    _onClick: function() {

        var value = domAttr.get(this.searchTextNode, "value");
        if (this.portal) {
            //search portal
            this._searchPortal();
        } else {
            //connect to portal then search portal
            this._connectToPortal();
            this._searchPortal();

        }


      //esri/arcgis/Portal::queryItems( params ).then(lang.hitch(this, _onResults));

    },

    _onResults: function(results) {
        console.log('results', results);

        array.forEach(results, lang.hitch(this, function (result, i) {
            console.log(result);
            var item = new ResultItem({
                label: result.title,
                itemId: result.id
            });
            console.log(item);
            domConstruct.place(item.domNode, this.resultsListNode, 'last');
        }));
        //cycle through array
        //create <li> for each result
        //add <li> to resultsListNode

        // dojo/_base/array::forEach(results, function(result) {

        // create ResultItem in this.resultsListNode
        // don't forget to call ::startup()

        //})

    },

    _onItemClick: function() {

        this.onItemSelect();

    },

    onItemSelect: function() { }

  });

  return MapSearch;

});