<?php
require_once dirname(dirname(dirname(__FILE__))) . '/index.class.php';

class ControllersMgrMsfmTabsManagerController extends MsfmMainController {
    public static function getDefaultController() {
        return 'msfmtabs';
    }
}

class msFieldsManagerMsfmTabsManagerController extends MsfmMainController {
    public function process(array $scriptProperties = array()) {

    }
    public function loadCustomCssJs() {
        $mgrUrl = $this->modx->getOption('manager_url',null,MODX_MANAGER_URL);
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/msfmtabs.grid.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/msfmtabs.panel.js');
        $this->addLastJavascript($this->msfm->config['jsUrl'].'mgr/sections/msfmtabs.js');
    }
    public function getLanguageTopics() {
        return array('msfieldsmanager:default','msfieldsmanager:msfmtabs');
    }
    public function getPageTitle() {
        return $this->modx->lexicon('msfieldsmanager.page.msfmtabs_title');
    }
    public function getTemplateFile() {
        return $this->msfm->config['templatesPath'].'mgr/msfmtabs.tpl';
    }
}