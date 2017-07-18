var Msfm = function(config) {
    config = config || {};
    Msfm.superclass.constructor.call(this,config);
};
Ext.extend(Msfm,Ext.Component,{
    page:{},
    window:{},
    grid:{},
    tree:{},
    panel:{},
    combo:{},
    config: {},
    view: {},
    extra: {},
    connector_url: ''

});
Ext.reg('Msfm',Msfm);

Msfm = new Msfm();


Ext.override(Ext.form.FieldSet, {
    getState: function () {
        return {collapsed: this.collapsed};
    }
});