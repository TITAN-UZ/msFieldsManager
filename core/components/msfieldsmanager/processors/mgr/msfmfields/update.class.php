<?php

class MsfmFieldsUpdateProcessor extends modObjectUpdateProcessor
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

    public function beforeSet()
    {
        $dbtype = strtolower(trim($this->getProperty('dbtype', '')));
        $default_value = strtolower(trim($this->getProperty('default_value', '')));

        if (empty($dbtype)) {
            $this->modx->error->addField('dbtype', $this->modx->lexicon('msfieldsmanager.err_ns'));
        }
        if ($this->getProperty('default', '') == 'user_defined' && $default_value == '') {
            $this->modx->error->addField('default_value', $this->modx->lexicon('msfieldsmanager.err_ns'));
        }

        $dbprecision = $this->getProperty('dbprecision', '');
        if (empty($dbprecision) || !is_numeric($dbprecision)) {
            $this->setProperty('dbprecision', $this->msfm->getDefaultPrecision($dbtype));
        } else {
            $this->setProperty('dbprecision', preg_replace('/\./', ',', $dbprecision));
        }
        if (!empty($default_value)) {
            $this->setProperty('dbdefault', $default_value);
        }
        $this->setProperty('dbtype', $dbtype);
        $this->setProperty('default_value', $default_value);
        $this->setCheckbox('checked');
        $this->setCheckbox('required');
        $this->setCheckbox('enable');
        $this->setCheckbox('dbnull');

        return !$this->hasErrors();
    }

    public function afterSave()
    {
        return $this->msfm->alterField($this->object->toArray());
    }
}

return 'MsfmFieldsUpdateProcessor';