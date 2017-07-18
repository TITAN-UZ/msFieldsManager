<?php
$xpdo_meta_map['MsfmTabs']= array (
  'package' => 'msfieldsmanager',
  'version' => '1.1',
  'table' => 'msfm_tabs',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'key' => NULL,
    'title' => NULL,
    'enable' => 1,
    'rank' => 0,
  ),
  'fieldMeta' => 
  array (
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
      'null' => false,
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
  ),
  'aggregates' => 
  array (
    'MsfmFieldset' => 
    array (
      'class' => 'MsfmFieldset',
      'local' => 'id',
      'foreign' => 'tab_id',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
);
