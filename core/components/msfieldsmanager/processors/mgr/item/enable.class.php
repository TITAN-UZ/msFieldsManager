<?php

class msFieldsManagerItemEnableProcessor extends modObjectProcessor
{
    public $objectType = 'msFieldsManagerItem';
    public $classKey = 'msFieldsManagerItem';
    public $languageTopics = array('msfieldsmanager');
    //public $permission = 'save';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('msfieldsmanager_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var msFieldsManagerItem $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('msfieldsmanager_item_err_nf'));
            }

            $object->set('active', true);
            $object->save();
        }

        return $this->success();
    }

}

return 'msFieldsManagerItemEnableProcessor';
