msFieldsManager.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'msfieldsmanager-panel-home',
            renderTo: 'msfieldsmanager-panel-home-div'
        }]
    });
    msFieldsManager.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(msFieldsManager.page.Home, MODx.Component);
Ext.reg('msfieldsmanager-page-home', msFieldsManager.page.Home);