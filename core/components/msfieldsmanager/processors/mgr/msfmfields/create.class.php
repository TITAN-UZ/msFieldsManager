<?php
class MsfmFieldsCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'MsfmFields';
    public $languageTopics = array('msfieldsmanager:msfmfields');
    /** @var Msfm $msfm */
    private $msfm;
    public function initialize() {
        $this->msfm =  $this->modx->getService('msfieldsmanager','Msfm');
        return parent::initialize();
    }

    public function beforeSet() {
        $name = strtolower(trim($this->getProperty('name','')));
        $dbtype = strtolower(trim($this->getProperty('dbtype','')));
        $default_value = strtolower(trim($this->getProperty('default_value','')));
        if(empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('msfieldsmanager.err_ns'));
        }
        if(!$this->msfm->checkFieldName($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('msfieldsmanager.err_ae'));
        }
        if(empty($dbtype)) {
            $this->modx->error->addField('dbtype', $this->modx->lexicon('msfieldsmanager.err_ns'));
        }
        if($this->getProperty('default','') == 'user_defined' && $default_value == '') {
            $this->modx->error->addField('default_value', $this->modx->lexicon('msfieldsmanager.err_ns'));
        }

        $dbprecision = $this->getProperty('dbprecision','');
        if(empty($dbprecision) || !is_numeric($dbprecision)){
            $this->setProperty('dbprecision', $this->msfm->getDefaultPrecision($dbtype));
        } else {
            $this->setProperty('dbprecision',preg_replace('/\./', ',', $dbprecision));
        }
        if(!empty($default_value)) {
            $this->setProperty('dbdefault',$default_value);
        }
        $this->setProperty('name',$name);
        $this->setProperty('dbtype',$dbtype);
        $this->setCheckbox('checked');
        $this->setCheckbox('required');
        $this->setCheckbox('enable');
        $this->setCheckbox('dbnull');

        return !$this->hasErrors();
    }

    public function beforeSave() {
        $name = $this->getProperty('name');
        if (empty($name)) {
            $this->addFieldError('name',$this->modx->lexicon('msfieldsmanager.err_ns_empty'));
        } else if ($this->doesAlreadyExist(array('name' => $name))) {
            $this->addFieldError('name',$this->modx->lexicon('msfieldsmanager.err_ae'));
        }

        return parent::beforeSave();
    }

    public function afterSave()
    {
        return $this->msfm->addField($this->object->toArray());
    }


}
return 'MsfmFieldsCreateProcessor';