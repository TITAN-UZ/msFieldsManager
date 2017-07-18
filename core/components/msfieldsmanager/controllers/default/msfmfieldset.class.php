<?php
require_once dirname(dirname(dirname(__FILE__))) . '/index.class.php';

class ControllersMgrMsfmFieldsetManagerController extends MsfmMainController {
    public static function getDefaultController() {
        return 'msfmfieldset';
    }
}

class msFieldsManagerMsfmFieldsetManagerController extends MsfmMainController {
    public function process(array $scriptProperties = array()) {

    }
    public function loadCustomCssJs() {
        $mgrUrl = $this->modx->getOption('manager_url',null,MODX_MANAGER_URL);
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/msfmfieldset.grid.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/msfmfieldset.panel.js');
        $this->addLastJavascript($this->msfm->config['jsUrl'].'mgr/sections/msfmfieldset.js');
    }
    public function getLanguageTopics() {
        return array('msfieldsmanager:default','msfieldsmanager:msfmfieldset');
    }
    public function getPageTitle() {
        return $this->modx->lexicon('msfieldsmanager.page.msfmfieldset_title');
    }
    public function getTemplateFile() {
        return $this->msfm->config['templatesPath'].'mgr/msfmfieldset.tpl';
    }
}