<?php
$xpdo_meta_map['MsfmFieldset']= array (
  'package' => 'msfieldsmanager',
  'version' => '1.1',
  'table' => 'msfm_fieldset',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'tab_id' => 0,
    'key' => NULL,
    'title' => NULL,
    'collapsible' => 0,
    'position' => 0,
    'enable' => 1,
    'rank' => 0,
  ),
  'fieldMeta' => 
  array (
    'tab_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '11',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
      'index' => 'index',
    ),
    'key' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => false,
    ),
    'title' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => true,
    ),
    'collapsible' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'phptype' => 'boolean',
      'null' => false,
      'default' => 0,
    ),
    'position' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
    ),
    'enable' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'phptype' => 'boolean',
      'null' => false,
      'default' => 1,
    ),
    'rank' => 
    array (
      'dbtype' => 'int',
      'precision' => '11',
      'phptype' => 'integer',
      'null' => false,
      'default' => 0,
      'index' => 'index',
    ),
  ),
  'indexes' => 
  array (
    'rank' => 
    array (
      'alias' => 'rank',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'rank' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
    'tab_id' => 
    array (
      'alias' => 'tab_id',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'tab_id' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
  'aggregates' => 
  array (
    'MsfmFields' => 
    array (
      'class' => 'MsfmFields',
      'local' => 'id',
      'foreign' => 'fieldset_id',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
    'MsfmTabs' => 
    array (
      'class' => 'MsfmTabs',
      'local' => 'tab_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
