<?php

class MsfmFieldsRemoveProcessor extends modObjectRemoveProcessor
{
    public $classKey = 'MsfmFields';
    public $languageTopics = array('msfieldsmanager:msfmfields');
    /** @var Msfm $msfm */
    private $msfm;

    public function initialize()
    {
        $this->msfm = $this->modx->getService('msfieldsmanager', 'Msfm');
        return parent::initialize();
    }

    public function beforeRemove()
    {
        return parent::beforeRemove();
    }

    public function afterRemove()
    {
        return $this->msfm->removeField($this->object->get('name'));
    }

}

return 'MsfmFieldsRemoveProcessor';