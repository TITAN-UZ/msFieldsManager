<?php
/**
 * msFieldsManager
 * @package msfieldsmanager
 */
/**
 * @var modX $modx
 * @var array $scriptProperties
 */
switch ($modx->event->name) {
    case 'OnDocFormRender': //OnManagerPageBeforeRender
        if ($mode == 'new') {
            $classKey = !empty($_REQUEST['class_key']) ? $_REQUEST['class_key'] : '';
        } else {
            $classKey = $resource->get('class_key');
        }
        if ($classKey != 'msProduct') return;
        /** @var Msfm $msfm */
        if ($msfm = $modx->getService('msfieldsmanager', 'Msfm')) {
            $msfm->insertTabs($modx->controller, $resource);
        }
        break;
}