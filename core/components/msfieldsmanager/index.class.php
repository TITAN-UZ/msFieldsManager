<?php
/**
 * @package msfieldsmanager
 * @subpackage controllers
 */
require_once dirname(__FILE__) . '/model/msfieldsmanager/msfm.class.php';

class IndexManagerController extends modExtraManagerController {
    public static function getDefaultController() { return 'index'; }
}


abstract class MsfmMainController extends modExtraManagerController {
    /** @var Msfm $msfm */
    public $msfm;
    public static function getInstance(modX &$modx, $className, array $config = array()) {
        $action = call_user_func(array($className,'getDefaultController'));
        if (isset($_REQUEST['a'])) {
            $action = str_replace(array('../','./','.','-','@'),'',$_REQUEST['a']);
        }
        $className = self::getControllerClassName($action,$config['namespace']);
        $classPath = $config['namespace_path'].'controllers/default/'.$action.'.class.php';
        require_once $classPath;
        /** @var modManagerController $controller */
        $controller = new $className($modx,$config);
        return $controller;
    }
    public function initialize() {
        $this->msfm = new Msfm($this->modx);
        $this->addJavascript($this->msfm->config['jsUrl'].'mgr/msfm.js');
        $this->addHtml('<script type="text/javascript">
        Ext.onReady(function() {
            Msfm.config = '.$this->modx->toJSON($this->msfm->config).';
        });
        </script>');
        return parent::initialize();
    }

    public function getLanguageTopics() {
        return array('msfieldsmanager:default');
    }

    public function checkPermissions() { return true;}
}