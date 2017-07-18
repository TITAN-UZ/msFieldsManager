<?php

class MsfmFieldsetRemoveProcessor extends modObjectRemoveProcessor
{
    public $classKey = 'MsfmFieldset';
    public $languageTopics = array('msfieldsmanager:msfmfieldset');
    /** @var Msfm $msfm */
    private $msfm;

    public function initialize()
    {
        $this->msfm = $this->modx->getService('msfieldsmanager', 'Msfm');
        return parent::initialize();
    }

    public function beforeRemove()
    {
        if ($this->modx->getObject('MsfmFields', array('fieldset_id:=' => $this->object->get('id')))) {
            return $this->modx->lexicon('msfieldsmanager.fieldset.err_remove');
        }
        return parent::beforeRemove();
    }

    public function afterRemove()
    {
        return $this->msfm->removeFieldSet($this->object->get('key'));
    }
}

return 'MsfmFieldsetRemoveProcessor';