<?php
require_once MODX_CORE_PATH . 'components/msfieldsmanager/model/msfieldsmanager/msfm.class.php';
class MsfmProcessorCreateProcessor extends modObjectCreateProcessor {
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
        $name = $this->getProperty('name');
        if (empty($name)) {
            $this->addFieldError('name',$this->modx->lexicon('msfieldsmanager.err_ns_empty'));
        } else if ($this->doesAlreadyExist(array('name' => $name))) {
            $this->addFieldError('name',$this->modx->lexicon('msfieldsmanager.err_ae'));
        }
        return parent::beforeSave();
    }
    public function afterSave(){
        $this->msfm->parseSchema();
        $this->msfm->saveProcessor($this->object->get('name'),$this->object->get('processor'));
        return parent::afterSave();
    }
}
return 'MsfmProcessorCreateProcessor';