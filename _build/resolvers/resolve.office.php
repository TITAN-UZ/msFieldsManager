<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;
    /** @var Office $office */
    if ($Office = $modx->getService('office', 'Office', MODX_CORE_PATH . 'components/office/model/office/')) {

        if (!($Office instanceof Office)) {
            $modx->log(xPDO::LOG_LEVEL_ERROR, '[msFieldsManager] Could not register paths for Office component!');

            return true;
        } elseif (!method_exists($Office, 'addExtension')) {
            $modx->log(xPDO::LOG_LEVEL_ERROR,
                '[msFieldsManager] You need to update Office for support of 3rd party packages!');

            return true;
        }

        /** @var array $options */
        switch ($options[xPDOTransport::PACKAGE_ACTION]) {
            case xPDOTransport::ACTION_INSTALL:
            case xPDOTransport::ACTION_UPGRADE:
                $Office->addExtension('msFieldsManager', '[[++core_path]]components/msfieldsmanager/controllers/office/');
                $modx->log(xPDO::LOG_LEVEL_INFO, '[msFieldsManager] Successfully registered msFieldsManager as Office extension!');
                break;

            case xPDOTransport::ACTION_UNINSTALL:
                $Office->removeExtension('msFieldsManager');
                $modx->log(xPDO::LOG_LEVEL_INFO, '[msFieldsManager] Successfully unregistered msFieldsManager as Office extension.');
                break;
        }
    }
}

return true;