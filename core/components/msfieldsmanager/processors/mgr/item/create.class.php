<?php

class msFieldsManagerItemCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'msFieldsManagerItem';
    public $classKey = 'msFieldsManagerItem';
    public $languageTopics = array('msfieldsmanager');
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('msfieldsmanager_item_err_name'));
        } elseif ($this->modx->getCount($this->classKey, array('name' => $name))) {
            $this->modx->error->addField('name', $this->modx->lexicon('msfieldsmanager_item_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'msFieldsManagerItemCreateProcessor';