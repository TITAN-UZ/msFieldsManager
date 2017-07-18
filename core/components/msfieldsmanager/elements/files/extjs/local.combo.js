{
    xtype:'modx-combo'
    ,name: '%name%'
    ,hiddenName: '%name%'
    ,fieldLabel: _('ms2_product_%name%')
    ,description: '<b>[[*%name%]]</b><br />'+ _('ms2_product_%name%_help')
    ,value: msfmRecord['%name%']
    ,store: new Ext.data.SimpleStore({
        fields: ['d','v']
        ,data:[
            ['display1','value1'],
            ['display2','value2']
        ]
    })
    ,displayField: 'd'
    ,valueField: 'v'
    ,anchor: '100%'
    ,mode: 'local'
}