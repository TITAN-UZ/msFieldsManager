<?php

class MsfmTabsUpdateProcessor extends modObjectUpdateProcessor
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
        $this->setCheckbox('enable');
        $this->setCheckbox('is2column');
        return parent::beforeSet();
    }

    public function afterSave()
    {
        $this->msfm->alterTab($this->object->toArray());
        return parent::afterSave();
    }

}

return 'MsfmTabsUpdateProcessor';