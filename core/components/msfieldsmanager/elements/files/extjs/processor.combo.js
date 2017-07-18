{
    xtype:'modx-combo'
    ,name: '%name%'
    ,hiddenName: '%name%'
    ,description: '<b>[[*%name%]]</b><br />'+_('ms2_product_%name%_help')
    ,value: msfmRecord['%name%']
    ,anchor: '100%'
    ,fieldLabel: _('ms2_product_%name%')
    ,displayField: '%display_field%'
    ,valueField: '%value_field%'
    ,fields: ['%display_field%','%value_field%']
    ,url: '%connector%'
    ,baseParams:{
        action: 'mgr/custom/%processor_name%'
    }
}