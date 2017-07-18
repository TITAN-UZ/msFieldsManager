Msfm.grid.MsfmFieldset = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'msfm-grid-msfmfieldset'
        ,url: Msfm.config.connectorUrl
        ,baseParams: { action: 'mgr/msfmfieldset/getList' }
        ,fields: ['id','tab_id','key','title','collapsible','position','enable','rank']
        ,paging: true
        ,remoteSort: true
        ,anchor: '97%'
        ,autoExpandColumn: 'name'
        ,save_action: 'mgr/msfmfieldset/updateFromGrid'
        ,autosave: true
        ,columns: [{
				header:_('msfieldsmanager.fieldset.header_id')
				,dataIndex: 'id'
				,sortable: true
				,hidden: true
			},{
				header:_('msfieldsmanager.fieldset.header_key')
				,dataIndex: 'key'
				,sortable: true
				,editor: {
					xtype: 'textfield'
				}
			},{
				header:_('msfieldsmanager.fieldset.header_title')
				,dataIndex: 'title'
				,sortable: true
				,editor: {
					xtype: 'textfield'
				}
			},{
            header:_('msfieldsmanager.fieldset.header_tab_id')
            ,dataIndex: 'tab_id'
            ,sortable: true
            ,editor: {
        		xtype: 'msfm-combo-tabs'
            	,renderer: true
    		}
        },{
				header:_('msfieldsmanager.fieldset.header_collapsible')
				,dataIndex: 'collapsible'
				,sortable: true
				,width: 60
				,editor: {
					xtype: 'combo-boolean',
					renderer: 'boolean'
				}
			},{
				header:_('msfieldsmanager.fieldset.header_position')
				,dataIndex: 'position'
				,sortable: true
				,editor: {
					xtype: 'msfm-combo-position'
                	,renderer: true
				}
			},{
				header:_('msfieldsmanager.fieldset.header_enable')
				,dataIndex: 'enable'
				,sortable: true
				,width: 60
				,editor: {
					xtype: 'combo-boolean',
					renderer: 'boolean'
				}
			},{
				header:_('msfieldsmanager.fieldset.header_rank')
				,dataIndex: 'rank'
				,sortable: true
				,editor: {
					xtype: 'numberfield'
				}
			}],tbar:[{
             text: _('msfieldsmanager.fieldset.btn_create')
            ,cls: 'primary-button'
            ,handler: { xtype: 'msfm-window-msfmfieldset-create' ,blankValues: true }
            },'->',{
            xtype: 'textfield'
            ,name: 'search'
            ,id: 'msfm-fieldset-search-filter'
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
            ,id: 'msfm-fieldset-clear-filter'
            , text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
        ,getMenu: function() {
            return [{
                text: _('msfieldsmanager.fieldset.menu.edit')
                ,handler: this.editMsfmFieldset
            },'-',{
                text: _('msfieldsmanager.fieldset.menu.remove')
                ,handler: this.removeMsfmFieldset
            }];
        },editMsfmFieldset: function(btn,e) {
            if (!this.editMsfmFieldsetWindow) {
                this.editMsfmFieldsetWindow = MODx.load({
                    xtype: 'msfm-window-msfmfieldset-edit'
                    ,record: this.menu.record
                    ,listeners: {
                        'success': {fn:this.refresh,scope:this}
                    }
                });
            }
            this.editMsfmFieldsetWindow.setValues(this.menu.record);
            this.editMsfmFieldsetWindow.show(e.target);
        },removeMsfmFieldset: function() {
            MODx.msg.confirm({
                title: _('msfieldsmanager.fieldset.title.win_remove')
                ,text: _('msfieldsmanager.fieldset.confirm.remove')
                ,url: this.config.url
                ,params: {
                    action: 'mgr/msfmfieldset/remove'
                    ,id: this.menu.record.id
                }
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }

    });
    Msfm.grid.MsfmFieldset.superclass.constructor.call(this,config)
};
Ext.extend(Msfm.grid.MsfmFieldset,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,clearFilter: function() {
        var s = this.getStore();
        s.baseParams.query = '';
        Ext.getCmp('msfm-fieldset-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
});
Ext.reg('msfm-grid-msfmfieldset',Msfm.grid.MsfmFieldset);




Msfm.window.CreateMsfmFieldset = function(config) {
    config = config || {};
    var r = config.record
        , grid = Ext.getCmp('msfm-grid-msfmfieldset');
    this.ident = config.ident || Ext.id();
    Ext.applyIf(config,{
        title: r.id ? _('msfieldsmanager.fieldset.title.win_update') : _('msfieldsmanager.fieldset.title.win_create')
        ,url: Msfm.config.connectorUrl
        ,autoHeight:true
        ,modal: true
        ,baseParams: {
            action: r.id ? 'mgr/msfmfieldset/update' : 'mgr/msfmfieldset/create'
        }
        ,fields: [{
				xtype: 'hidden'
				,name: 'id'
			},{
				xtype: 'textfield'
				,fieldLabel: _('msfieldsmanager.fieldset.label_key')
				,description: _('msfieldsmanager.fieldset.label_key_help')
				,name: 'key'
				,allowBlank:false
				,validator: function(v) {
					return /^[a-zA-Z\_0-9]*$/.test(v)?true:_('msfieldsmanager.err_valid_name');
				}
			    ,readOnly:  r.id ? true : false
				,anchor: '100%'
			},{
				xtype: 'textfield'
				,fieldLabel: _('msfieldsmanager.fieldset.label_title')
				,description: _('msfieldsmanager.fieldset.label_title_help')
				,name: 'title'
				,allowBlank:true
				,anchor: '100%'
			},{
            xtype: 'msfm-combo-tabs'
            ,fieldLabel: _('msfieldsmanager.fieldset.label_tab_id')
            ,description: _('msfieldsmanager.fieldset.label_tab_id_help')
            ,name: 'tab_id'
            ,allowBlank:true
            ,anchor: '100%'
        	},{
				xtype: 'combo-boolean'
				,hiddenName: 'collapsible'
				,fieldLabel: _('msfieldsmanager.fieldset.label_collapsible')
				,description: _('msfieldsmanager.fieldset.label_collapsible_help')
				,name: 'collapsible'
            	,value: r.id ?  r.collapsible : 0
				,allowBlank:false
				,anchor: '100%'
			},{
				xtype: 'msfm-combo-position'
				,fieldLabel: _('msfieldsmanager.fieldset.label_position')
				,description: _('msfieldsmanager.fieldset.label_position_help')
				,name: 'position'
            	,value: r.id ?  r.position : 1
				,allowBlank:false
				,anchor: '100%'
			},{
				xtype: 'combo-boolean'
				,hiddenName: 'enable'
				,fieldLabel: _('msfieldsmanager.fieldset.label_enable')
				,description: _('msfieldsmanager.fieldset.label_enable_help')
				,name: 'enable'
            	,value: r.id ?  r.enable : 1
				,allowBlank:false
				,anchor: '100%'
			},{
				xtype: 'numberfield'
				,fieldLabel: _('msfieldsmanager.fieldset.label_rank')
				,description: _('msfieldsmanager.fieldset.label_rank_help')
				,name: 'rank'
               , value: r.id ? id.rank : grid.getStore().getTotalCount() + 1
				,allowBlank:false
				,anchor: '100%'
			}]
    });
    Msfm.window.CreateMsfmFieldset.superclass.constructor.call(this,config);
};
Ext.extend(Msfm.window.CreateMsfmFieldset,MODx.Window);
Ext.reg('msfm-window-msfmfieldset-create',Msfm.window.CreateMsfmFieldset);

Msfm.window.EditMsfmFieldset = function(config) {
    config = config || {};
    Ext.applyIf(config,{});
    Msfm.window.EditMsfmFieldset.superclass.constructor.call(this,config);
};
Ext.extend(Msfm.window.EditMsfmFieldset, Msfm.window.CreateMsfmFieldset);
Ext.reg('msfm-window-msfmfieldset-edit',Msfm.window.EditMsfmFieldset);