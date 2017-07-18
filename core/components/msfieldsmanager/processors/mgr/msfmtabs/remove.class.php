<?php
class MsfmTabsRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = 'MsfmTabs';
    public $languageTopics = array('msfieldsmanager:msfmtabs');
    /** @var Msfm $msfm */
    private $msfm;
    public function initialize() {
        $this->msfm = $this->modx->getService('msfieldsmanager', 'Msfm');
        return parent::initialize();
    }

    public function beforeRemove()
    {
        if ($this->modx->getObject('MsfmFieldset', array('tab_id:=' => $this->object->get('id')))) {
            return $this->modx->lexicon('msfieldsmanager.tabs.err_remove');
        }
        return parent::beforeRemove();
    }

    public function afterRemove() {
        return $this->msfm->removeTab($this->object->get('key'));
    }
}
return 'MsfmTabsRemoveProcessor';