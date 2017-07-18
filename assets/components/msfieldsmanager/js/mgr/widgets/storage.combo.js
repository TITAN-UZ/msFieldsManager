Msfm.combo.Storage = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        displayField: 'name'
        ,valueField: 'val'
        ,fields: ['name','val']
        ,url:  Msfm.config.connectorUrl
        ,baseParams:{
            action: 'mgr/storage/getlist'
            ,xtype: config.xtype || ''
        }
    });
    Msfm.combo.Storage.superclass.constructor.call(this,config);
};
Ext.extend(Msfm.combo.Storage,MODx.combo.ComboBox,{
    reload:function(val) {
        this.clearValue();
        this.getStore().removeAll();
        this.lastQuery = null;
        this.baseParams.xtype = val;
    }
});
Ext.reg('msfm-combo-storage',Msfm.combo.Storage);