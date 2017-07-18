<?php
class MsfmProcessorGetListProcessor extends modObjectGetListProcessor {
    public $languageTopics = array('msfieldsmanager:msfmfields');
    public $classKey = 'MsfmProcessors';
    public $defaultSortField = 'name';
    public $defaultSortDirection = 'ASC';
    public $checkListPermission = true;
    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array('name:LIKE' => '%'.$query.'%'));
        }
        return $c;
    }
}
return 'MsfmProcessorGetListProcessor';