<?php

class MsfmFieldsetUpdateProcessor extends modObjectUpdateProcessor
{
    public $classKey = 'MsfmFieldset';
    public $languageTopics = array('msfieldsmanager:msfmfieldset');
    /** @var Msfm $msfm */
    public $msfm;

    public function initialize()
    {
        $this->msfm = $this->modx->getService('msfieldsmanager', 'Msfm');
        return parent::initialize();
    }

    public function beforeSet()
    {
        $this->setCheckbox('enable');
        $this->setCheckbox('collapsible');
        return parent::beforeSet();
    }

    public function afterSave()
    {
        $this->msfm->alterFieldSet($this->object->toArray());
        return parent::afterSave();
    }

}

return 'MsfmFieldsetUpdateProcessor';