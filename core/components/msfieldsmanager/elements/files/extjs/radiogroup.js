{
    xtype: 'radiogroup'
    ,fieldLabel: _('ms2_product_%name%')
    ,hideLabel: false
    ,columns: 1
    ,value: msfmRecord['%name%']
    ,items: [{
        boxLabel: 'radiobutton1'
        ,hideLabel: true
        ,name: '%name%'
        ,inputValue: '1'
        },{
            boxLabel: 'radiobutton2'
            ,hideLabel: true
            ,name: '%name%'
            ,inputValue: '2'
        }]
}