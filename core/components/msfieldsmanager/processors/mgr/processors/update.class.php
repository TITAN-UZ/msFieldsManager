<?php
require_once MODX_CORE_PATH . 'components/msfieldsmanager/model/msfieldsmanager/msfm.class.php';
class MsfmProcessorUpdateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'MsfmProcessors';
    public $languageTopics = array('msfieldsmanager:msfmfields');
    /** @var Msfm $msfm */
    private $msfm;
    public function initialize() {
        $this->msfm = new Msfm($this->modx);
        return parent::initialize();
    }
    public function beforeSet() {
        return parent::beforeSet();
    }
    public function beforeSave() {
        return parent::beforeSave();
    }
    public function afterSave(){
        $this->msfm->saveProcessor($this->object->get('name'),$this->object->get('processor'));
        return parent::afterSave();
    }
}
return 'MsfmProcessorUpdateProcessor';