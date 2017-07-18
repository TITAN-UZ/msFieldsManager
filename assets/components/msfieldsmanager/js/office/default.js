Ext.onReady(function () {
    msFieldsManager.config.connector_url = OfficeConfig.actionUrl;

    var grid = new msFieldsManager.panel.Home();
    grid.render('office-msfieldsmanager-wrapper');

    var preloader = document.getElementById('office-preloader');
    if (preloader) {
        preloader.parentNode.removeChild(preloader);
    }
});