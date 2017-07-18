msFieldsManager.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {
        baseCls: 'modx-formpanel',
        cls: 'container',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'msfieldsmanager-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h2>' + _('msfieldsmanager') + '</h2>',
            cls: '',
            style: {margin: '15px 0'}
        }, {
            xtype: 'modx-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: _('msfieldsmanager_items'),
                layout: 'anchor',
                items: [{
                    html: _('msfieldsmanager_intro_msg'),
                    cls: 'panel-desc',
                }, {
                    xtype: 'msfieldsmanager-grid-items',
                    cls: 'main-wrapper',
                }]
            }]
        }]
    });
    msFieldsManager.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(msFieldsManager.panel.Home, MODx.Panel);
Ext.reg('msfieldsmanager-panel-home', msFieldsManager.panel.Home);
