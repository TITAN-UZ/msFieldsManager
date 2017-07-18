<?php

class MsfmFieldsGetListProcessor extends modObjectGetListProcessor
{
    public $languageTopics = array('msfieldsmanager:msfmfields');
    public $classKey = 'MsfmFields';
    public $defaultSortField = 'rank';
    public $defaultSortDirection = 'ASC';
    public $checkListPermission = true;

    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array('name:LIKE' => '%' . $query . '%'));
        }
        return $c;
    }
}

return 'MsfmFieldsGetListProcessor';