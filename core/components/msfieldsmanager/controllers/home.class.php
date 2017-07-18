<?php

/**
 * The home manager controller for msFieldsManager.
 *
 */
class msFieldsManagerHomeManagerController extends modExtraManagerController
{
    /** @var msFieldsManager $msFieldsManager */
    public $msFieldsManager;


    /**
     *
     */
    public function initialize()
    {
        $path = $this->modx->getOption('msfieldsmanager_core_path', null,
                $this->modx->getOption('core_path') . 'components/msfieldsmanager/') . 'model/msfieldsmanager/';
        $this->msFieldsManager = $this->modx->getService('msfieldsmanager', 'msFieldsManager', $path);
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return array('msfieldsmanager:default');
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('msfieldsmanager');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->msFieldsManager->config['cssUrl'] . 'mgr/main.css');
        $this->addCss($this->msFieldsManager->config['cssUrl'] . 'mgr/bootstrap.buttons.css');
        $this->addJavascript($this->msFieldsManager->config['jsUrl'] . 'mgr/msfieldsmanager.js');
        $this->addJavascript($this->msFieldsManager->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->msFieldsManager->config['jsUrl'] . 'mgr/misc/combo.js');
        $this->addJavascript($this->msFieldsManager->config['jsUrl'] . 'mgr/widgets/items.grid.js');
        $this->addJavascript($this->msFieldsManager->config['jsUrl'] . 'mgr/widgets/items.windows.js');
        $this->addJavascript($this->msFieldsManager->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->msFieldsManager->config['jsUrl'] . 'mgr/sections/home.js');

        $this->addHtml('<script type="text/javascript">
        msFieldsManager.config = ' . json_encode($this->msFieldsManager->config) . ';
        msFieldsManager.config.connector_url = "' . $this->msFieldsManager->config['connectorUrl'] . '";
        Ext.onReady(function() {
            MODx.load({ xtype: "msfieldsmanager-page-home"});
        });
        </script>
        ');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        return $this->msFieldsManager->config['templatesPath'] . 'home.tpl';
    }
}