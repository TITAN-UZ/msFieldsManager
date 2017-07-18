Msfm.combo.DefaultVal = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.SimpleStore({
            fields: ['d','v']
            ,data:[
                [_('msfieldsmanager.combo.default_none'),'none'],
                [_('msfieldsmanager.combo.default_user_defined'),'user_defined'],
                [_('msfieldsmanager.combo.default_null'),'NULL'],
                [_('msfieldsmanager.combo.default_current_timestamp'),'CURRENT_TIMESTAMP']
            ]
        })
        ,displayField: 'd'
        ,valueField: 'v'
        ,hiddenName: 'default'
        ,mode: 'local'
        ,triggerAction: 'all'
        ,editable: false
        ,preventRender: true
        ,forceSelection: true
        ,enableKeyEvents: true
    });
    Msfm.combo.DefaultVal.superclass.constructor.call(this,config);
};
Ext.extend(Msfm.combo.DefaultVal,MODx.combo.ComboBox);
Ext.reg('msfm-combo-default-val',Msfm.combo.DefaultVal);