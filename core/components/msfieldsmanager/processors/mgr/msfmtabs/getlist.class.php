<?php

class MsfmTabsGetListProcessor extends modObjectGetListProcessor
{
    public $languageTopics = array('msfieldsmanager:msfmtabs');
    public $classKey = 'MsfmTabs';
    public $defaultSortField = 'key';
    public $defaultSortDirection = 'ASC';
    public $checkListPermission = true;

    public function beforeQuery()
    {
        if ($this->getProperty('combo')) {
            $this->setProperty('limit', 0);
        }
        return parent::beforeQuery();
    }

    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array('key:LIKE' => '%' . $query . '%'));
        }
        return $c;
    }

    /**
     * Iterate across the data
     *
     * @param array $data
     * @return array
     */
    public function iterate(array $data)
    {
        $list = array();
        if ($this->getProperty('combo')) {
            $list[] = array(
                'id' => 0,
                'key' => $this->modx->lexicon('msfieldsmanager.tabs.combo.default'),
            );
        }
        $list = $this->beforeIteration($list);
        $this->currentIndex = 0;
        /** @var xPDOObject|modAccessibleObject $object */
        foreach ($data['results'] as $object) {
            if ($this->checkListPermission && $object instanceof modAccessibleObject && !$object->checkPolicy('list')) continue;
            $objectArray = $this->prepareRow($object);
            if (!empty($objectArray) && is_array($objectArray)) {
                $list[] = $objectArray;
                $this->currentIndex++;
            }
        }
        $list = $this->afterIteration($list);
        return $list;
    }
}

return 'MsfmTabsGetListProcessor';