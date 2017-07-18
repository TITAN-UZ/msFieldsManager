var msFieldsManager = function (config) {
    config = config || {};
    msFieldsManager.superclass.constructor.call(this, config);
};
Ext.extend(msFieldsManager, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('msfieldsmanager', msFieldsManager);

msFieldsManager = new msFieldsManager();