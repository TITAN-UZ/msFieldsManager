<?php

class MsfmTabsCreateProcessor extends modObjectCreateProcessor
{
    public $classKey = 'MsfmTabs';
    public $languageTopics = array('msfieldsmanager:msfmtabs');
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
            $this->modx->error->addField('key', $this->modx->lexicon('msfieldsmanager.tabs.err_ns'));
        }
        if ($this->msfm->checkKeyName($key, $this->classKey)) {
            $this->modx->error->addField('key', $this->modx->lexicon('msfieldsmanager.tabs.err_ae'));
        }

        $this->setCheckbox('enable');
        $this->setCheckbox('is2column');
        return !$this->hasErrors();
    }

    public function afterSave()
    {
        $this->msfm->addTab($this->object->toArray());
        return parent::afterSave();
    }
}

return 'MsfmTabsCreateProcessor';