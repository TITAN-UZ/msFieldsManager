<?php
require_once MODX_CORE_PATH . 'components/msfieldsmanager/model/msfieldsmanager/msfm.class.php';
class MsfmStorageGetListProcessor extends modObjectGetListProcessor {
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
        if($this->getProperty('xtype','') =='radiogroup') {
            $list[] = array('name'=>$this->modx->lexicon('msfieldsmanager.combo.storage.radiogroup'), 'val'=>'radiogroup');
        } else {
            $list[] = array('name'=>$this->modx->lexicon('msfieldsmanager.combo.storage.local'), 'val'=>'local');
            foreach ($data as $k => $v) {
                $name =  $this->modx->lexicon('msfieldsmanager.combo.storage.processor') . ' (' . $v . ')';
                $list[] = array('name'=>$name,'val'=>$k);
            }
        }
        return $list;
    }
    public function process() {
        $data = $this->msfm->getProcessors();
        $total = count($data);
        $list = $this->iterate($data);
        return $this->outputArray($list,$total);
    }
}
return 'MsfmStorageGetListProcessor';