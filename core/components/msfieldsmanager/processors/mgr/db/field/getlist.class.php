<?php
require_once MODX_CORE_PATH . 'components/msfieldsmanager/model/msfieldsmanager/msfm.class.php';
class MsfmTableGetListProcessor extends modObjectGetListProcessor {
    public $languageTopics = array('msfieldsmanager:msfmfields');
    public $checkListPermission = true;
    /** @var Msfm $msfm */
    private $msfm;
    public function initialize() {
        $this->msfm = new Msfm($this->modx);
        return parent::initialize();
    }
    public function iterate(array $data) {
        $list = array();
        foreach ($data as $k => $v) {
            $list[] = array('name'=>$v,'val'=>$v);
        }
        return $list;
    }
    public function process() {
        $data = $this->msfm->getDbTableFields($this->getProperty('table',''));
        $total = count($data);
        $list = $this->iterate($data);
        return $this->outputArray($list,$total);
    }
}
return 'MsfmTableGetListProcessor';