<?php
require_once MODX_CORE_PATH . 'components/msfieldsmanager/model/msfieldsmanager/msfm.class.php';
class MsfmGenerateProcessor extends modProcessor {
    public $languageTopics = array('msfieldsmanager:msfmfields');
    public function initialize() {
        $this->msfm = new Msfm($this->modx);
        return parent::initialize();
    }
    public function process() {
        $data = array(
            'storage'  => $this->getProperty('storage',''),
            'xtype'  => $this->getProperty('xtype',''),
            'name'  => $this->getProperty('name',''),
        );
        $code = $this->msfm->extjsGenerate($data);
        return $this->success('', array('code'=>$code));
    }
}
return 'MsfmGenerateProcessor';