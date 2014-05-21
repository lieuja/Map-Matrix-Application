define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/dom-construct",
  "dojo/on",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin"
], function(
  declare,
  lang,
  domConstruct,
  on,
  _WidgetBase,
  _TemplatedMixin
) {

  var FocusMap = declare([ _WidgetBase, _TemplatedMixin ], {

    templateString: "<div><div data-dojo-attach-point='closeNode' class='close-node'>X</div></div>",

    baseClass: "focus-map",

    url: null,

    startup: function() {
      this.inherited(arguments);

      on(this.closeNode, "click", lang.hitch(this, function() {
        this.destroy();
      }));

      domConstruct.create("iframe", {
        frameborder: 0,
        src: this.url
      }, this.domNode);

    }

  });

  return FocusMap;

});
