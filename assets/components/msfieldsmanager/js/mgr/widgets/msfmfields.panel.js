Msfm.panel.MsfmFields = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+_('msfieldsmanager.msfmfields_title')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,id: 'msfm-tabs'
            ,defaults: { border: false ,autoHeight: true }
            ,border: true
            ,deferredRender: false
            ,stateEvents: ['tabchange']
            ,getState:function() {return { activeTab:this.items.indexOf(this.getActiveTab())};}
            ,items: [{
                title: _('msfieldsmanager.tab.msfmfields')
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>'+_('msfieldsmanager.msfmfields_intro_msg')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                 xtype: 'msfm-grid-msfmfields'
                 ,cls: 'main-wrapper'
                 }]
            },{
                title: _('msfieldsmanager.tab.fieldset')
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>'+_('msfieldsmanager.fieldset.msfmfieldset_intro_msg')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                 xtype: 'msfm-grid-msfmfieldset'
                 ,cls: 'main-wrapper'
                 }]
            },{
                title: _('msfieldsmanager.tab.tabs')
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>'+_('msfieldsmanager.tabs.msfmtabs_intro_msg')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                 xtype: 'msfm-grid-msfmtabs'
                 ,cls: 'main-wrapper'
                 }]
            },{
                title: _('msfieldsmanager.tab.processors')
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>'+_('msfieldsmanager.processors_intro_msg')+'</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: 'msfm-grid-processors'
                    ,cls: 'main-wrapper'
                }]
            }]
        }]
    });
    Msfm.panel.MsfmFields.superclass.constructor.call(this,config);
};
Ext.extend(Msfm.panel.MsfmFields,MODx.Panel);
Ext.reg('msfm-panel-msfmfields',Msfm.panel.MsfmFields);