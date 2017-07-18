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
            'name'  =>  empty($this->getProperty('name')) ? 'MyProcessor' : ucfirst($this->getProperty('name')),
            'classKey'  => $this->getProperty('classKey',''),
            'sort'  =>  empty($this->getProperty('sort')) ? 'id' : $this->getProperty('sort'),
        );
        $code = $this->msfm->processorGenerate($data);
        return $this->success('', array('code'=>$code));
    }
}
return 'MsfmGenerateProcessor';