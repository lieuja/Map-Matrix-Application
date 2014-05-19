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
  'dojo/dom-construct',
  'dojo/keys'
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
  domConstruct,
  keys
) {

    var ResultItem = declare([_WidgetBase, _TemplatedMixin], {

        templateString: "<li><a href='#' data-dojo-attach-event='click: _onClick'>${label}</a></li>",

        baseClass: "result-item",

        label: "foo",

        itemId: null,
    
        parent: null,
    
        _onClick: function(e) {
      
            this.parent.onItemSelect({
                itemId: this.itemId
            });
      
            e.preventDefault(); // (JB) cancels any navigation the anchor click may have invoked
        }

    });

    var MapSearch = declare([ _WidgetBase, _TemplatedMixin ], {

        templateString: template,
        baseClass: "map-search",
        portal: null,
        portalUrl: 'http://www.arcgis.com',
        resultsListArray: [],

        startup: function() {
            this.inherited(arguments);
            this._connectToPortal();

            on(this.searchTextNode, "keypress", lang.hitch(this, function(evt) {
                if (evt.charCode === 13) {
                  this._searchPortal();
                }
            }));
    },        
    
    _clearResults: function() {
        //console.log('cleared');
        domAttr.set(this.searchTextNode, "value", '');
        domConstruct.empty(this.resultsListNode);
        this.resultsListArray = [];
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
        /*if (this.searchTextNode == '') {
            alert: ('please insert text');
        }*/
        if (this.portal) {
            //search portal
            this._searchPortal();
        } else {
            //connect to portal then search portal
            this._connectToPortal();
            this._searchPortal();

        }

    },

    _onResults: function(results) {
        console.log('results', results);

        array.forEach(results, lang.hitch(this, function (result, i) {
            //console.log(result);
            var item = new ResultItem({
                label: result.title,
                itemId: result.id,
                parent: this
            });
            item.startup(); // (JB) even though it isn't implemented
            //console.log(item);
            domConstruct.place(item.domNode, this.resultsListNode, 'last');
            this.resultsListArray.push(item);
        }));

    },

    _onItemClick: function() {

        this.onItemSelect();

    },

    onItemSelect: function(e) { /* e.itemId */ }

  });

  return MapSearch;

});
