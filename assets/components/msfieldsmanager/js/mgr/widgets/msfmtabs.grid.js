Msfm.grid.MsfmTabs = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'msfm-grid-msfmtabs'
        ,url: Msfm.config.connectorUrl
        ,baseParams: { action: 'mgr/msfmtabs/getList' }
        ,fields: ['id','key','title','enable','rank']
        ,paging: true
        ,remoteSort: true
        ,anchor: '97%'
        ,autoExpandColumn: 'name'
        ,save_action: 'mgr/msfmtabs/updateFromGrid'
        ,autosave: true
        ,columns: [{
				header:_('msfieldsmanager.tabs.header_id')
				,dataIndex: 'id'
				,sortable: true
				,hidden: true
			},{
				header:_('msfieldsmanager.tabs.header_key')
				,dataIndex: 'key'
				,sortable: true
				,editor: {
					xtype: 'textfield'
				}
			},{
				header:_('msfieldsmanager.tabs.header_title')
				,dataIndex: 'title'
				,sortable: true
				,editor: {
					xtype: 'textfield'
				}
			},{
				header:_('msfieldsmanager.tabs.header_enable')
				,dataIndex: 'enable'
				,sortable: true
				,width: 60
				,editor: {
					xtype: 'combo-boolean',
					renderer: 'boolean'
				}
			},{
				header:_('msfieldsmanager.tabs.header_rank')
				,dataIndex: 'rank'
				,sortable: true
				,editor: {
					xtype: 'numberfield'
				}
			}],tbar:[{
             text: _('msfieldsmanager.tabs.btn_create')
            ,cls: 'primary-button'
            ,handler: { xtype: 'msfm-window-msfmtabs-create' ,blankValues: true }
            },'->',{
            xtype: 'textfield'
            ,name: 'search'
            ,id: 'msfm-tabs-search-filter'
            ,emptyText: _('search_ellipsis')
            ,listeners: {
                'change': {fn:this.search,scope:this}
                ,'render': {fn: function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key: Ext.EventObject.ENTER
                        ,fn: function() {
                            this.fireEvent('change',this);
                            this.blur();
                            return true;
                        }
                        ,scope: cmp
                    });
                },scope:this}
            }
        },{
            xtype: 'button'
            ,id: 'msfm-tabs-filter-clear'
            , text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
        ,getMenu: function() {
            return [{
                text: _('msfieldsmanager.tabs.menu.edit')
                ,handler: this.editMsfmTabs
            },'-',{
                text: _('msfieldsmanager.tabs.menu.remove')
                ,handler: this.removeMsfmTabs
            }];
        },editMsfmTabs: function(btn,e) {
            if (!this.editMsfmTabsWindow) {
                this.editMsfmTabsWindow = MODx.load({
                    xtype: 'msfm-window-msfmtabs-edit'
                    ,record: this.menu.record
                    ,listeners: {
                        'success': {fn:this.refresh,scope:this}
                    }
                });
            }
            this.editMsfmTabsWindow.setValues(this.menu.record);
            this.editMsfmTabsWindow.show(e.target);
        },removeMsfmTabs: function() {
            MODx.msg.confirm({
                title: _('msfieldsmanager.tabs.title.win_remove')
                ,text: _('msfieldsmanager.tabs.confirm.remove')
                ,url: this.config.url
                ,params: {
                    action: 'mgr/msfmtabs/remove'
                    ,id: this.menu.record.id
                }
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }

    });
    Msfm.grid.MsfmTabs.superclass.constructor.call(this,config)
};
Ext.extend(Msfm.grid.MsfmTabs,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,clearFilter: function() {
        var s = this.getStore();
        s.baseParams.query = '';
        Ext.getCmp('msfm-tabs-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
});
Ext.reg('msfm-grid-msfmtabs',Msfm.grid.MsfmTabs);




Msfm.window.CreateMsfmTabs = function(config) {
    config = config || {};
    var r = config.record
        , grid = Ext.getCmp('msfm-grid-msfmtabs');
    this.ident = config.ident || Ext.id();
    Ext.applyIf(config,{
        title: r.id ? _('msfieldsmanager.tabs.title.win_update') : _('msfieldsmanager.tabs.title.win_create')
        ,url: Msfm.config.connectorUrl
        ,autoHeight:true
        ,modal: true
        ,baseParams: {
            action: r.id ? 'mgr/msfmtabs/update' : 'mgr/msfmtabs/create'
        }
        ,fields: [{
				xtype: 'hidden'
				,name: 'id'
			},{
				xtype: 'textfield'
				,fieldLabel: _('msfieldsmanager.tabs.label_key')
				,description: _('msfieldsmanager.tabs.label_key_help')
				,name: 'key'
				,allowBlank:false
                ,validator: function(v) {
                    return /^[a-zA-Z\_0-9]*$/.test(v)?true:_('msfieldsmanager.err_valid_name');
                }
                ,readOnly:  r.id ? true : false
				,anchor: '100%'
			},{
				xtype: 'textfield'
				,fieldLabel: _('msfieldsmanager.tabs.label_title')
				,description: _('msfieldsmanager.tabs.label_title_help')
				,name: 'title'
				,allowBlank:false
				,anchor: '100%'
			},{
				xtype: 'combo-boolean'
				,hiddenName: 'enable'
				,fieldLabel: _('msfieldsmanager.tabs.label_enable')
				,description: _('msfieldsmanager.tabs.label_enable_help')
				,name: 'enable'
                ,value: r.id ?  r.enable : 1
				,allowBlank:false
				,anchor: '100%'
			},{
				xtype: 'numberfield'
				,fieldLabel: _('msfieldsmanager.tabs.label_rank')
				,description: _('msfieldsmanager.tabs.label_rank_help')
				,name: 'rank'
                , value: r.id ? id.rank : grid.getStore().getTotalCount() + 1
				,allowBlank:false
				,anchor: '100%'
			}]
    });
    Msfm.window.CreateMsfmTabs.superclass.constructor.call(this,config);
};
Ext.extend(Msfm.window.CreateMsfmTabs,MODx.Window);
Ext.reg('msfm-window-msfmtabs-create',Msfm.window.CreateMsfmTabs);

Msfm.window.EditMsfmTabs = function(config) {
    config = config || {};
    Ext.applyIf(config,{});
    Msfm.window.EditMsfmTabs.superclass.constructor.call(this,config);
};
Ext.extend(Msfm.window.EditMsfmTabs, Msfm.window.CreateMsfmTabs);
Ext.reg('msfm-window-msfmtabs-edit',Msfm.window.EditMsfmTabs);