<?php
require_once dirname(dirname(dirname(__FILE__))) . '/index.class.php';

class ControllersMgrMsfmFieldsManagerController extends MsfmMainController {
    public static function getDefaultController() {
        return 'msfmfields';
    }
}

class msFieldsManagerMsfmFieldsManagerController extends MsfmMainController {
    public function process(array $scriptProperties = array()) {

    }
    public function loadCustomCssJs() {
        $mgrUrl = $this->modx->getOption('manager_url',null,MODX_MANAGER_URL);
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/position.combo.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/dbtype.combo.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/xtype.combo.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/defaultval.combo.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/table.combo.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/field.combo.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/storage.combo.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/fieldset.combo.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/tabs.combo.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/msfmfieldset.grid.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/msfmtabs.grid.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/msfmfields.grid.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/processors.grid.js');
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/widgets/msfmfields.panel.js');
        $this->addLastJavascript($this->msfm->config['jsUrl'].'mgr/sections/msfmfields.js');
    }
    public function getLanguageTopics() {
        return array('msfieldsmanager:default','msfieldsmanager:msfmfields','msfieldsmanager:msfmfieldset','msfieldsmanager:msfmtabs');
    }
    public function getPageTitle() {
        return $this->modx->lexicon('msfieldsmanager.page.msfmfields_title');
    }
    public function getTemplateFile() {
        return $this->msfm->config['templatesPath'].'mgr/msfmfields.tpl';
    }
}