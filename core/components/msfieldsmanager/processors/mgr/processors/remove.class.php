<?php
require_once MODX_CORE_PATH . 'components/msfieldsmanager/model/msfieldsmanager/msfm.class.php';
class MsfmProcessorRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = 'MsfmProcessors';
    public $languageTopics = array('msfieldsmanager:msfmfields');
    /** @var Msfm $msfm */
    private $msfm;
    public function initialize() {
        $this->msfm = new Msfm($this->modx);
        return parent::initialize();
    }
    public function beforeRemove() {
        $this->msfm->removeProcessor($this->object->toArray());
        return parent::beforeRemove();
    }

    public function afterRemove() {
        $this->msfm->parseSchema();
        return parent::afterRemove();
    }
}
return 'MsfmProcessorRemoveProcessor';