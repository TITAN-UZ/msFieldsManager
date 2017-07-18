<?php

class MsfmFieldsetCreateProcessor extends modObjectCreateProcessor
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
        $key = strtolower(trim($this->getProperty('key', '')));
        if (empty($key)) {
            $this->modx->error->addField('key', $this->modx->lexicon('msfieldsmanager.fieldset.err_ns'));
        }
        if ($this->msfm->checkKeyName($key, $this->classKey)) {
            $this->modx->error->addField('key', $this->modx->lexicon('msfieldsmanager.fieldset.err_ae'));
        }

        $this->setCheckbox('enable');
        $this->setCheckbox('collapsible');
        return !$this->hasErrors();
    }

    public function afterSave()
    {
        $this->msfm->addFieldSet($this->object->toArray());
        return parent::afterSave();
    }

}

return 'MsfmFieldsetCreateProcessor';