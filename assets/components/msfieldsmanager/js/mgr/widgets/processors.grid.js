Msfm.grid.Processors = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'msfm-grid-processors'
        ,url: Msfm.config.connectorUrl
        ,baseParams: { action: 'mgr/processors/getList' }
        ,fields: ['id','name','display_field','value_field','sort_field','table_name','processor']
        ,paging: true
        ,remoteSort: true
        ,anchor: '97%'
        ,autoExpandColumn: 'name'
        ,save_action: 'mgr/processors/updateFromGrid'
        ,autosave: true
        ,columns: [{
				header:_('msfieldsmanager.header_id')
				,dataIndex: 'id'
				,sortable: true
				,hidden: true
			},{
				header:_('msfieldsmanager.header_name')
				,dataIndex: 'name'
				,sortable: true
			},{
				header:_('msfieldsmanager.header_display_field')
				,dataIndex: 'display_field'
				,sortable: true
			},{
				header:_('msfieldsmanager.header_value_field')
				,dataIndex: 'value_field'
				,sortable: true
			},{
                header:_('msfieldsmanager.header_sort_field')
                ,dataIndex: 'sort_field'
                ,sortable: true
            }],tbar:[{
             text: _('msfieldsmanager.btn_processor_create')
			,cls: 'primary-button'
            ,handler: {
				xtype: 'msfieldsmanager-window-processors-create'
				,blankValues: true }
            },'->',{
            xtype: 'textfield'
            ,name: 'search'
            ,id: 'msfm-search-filter-processor'
            ,emptyText: _('msfieldsmanager.search')+'...'
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
            ,text: _('msfieldsmanager.filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
        ,getMenu: function() {
            return [{
                text: _('msfieldsmanager.menu.edit')
                ,handler: this.editProcessors
            },'-',{
                text: _('msfieldsmanager.menu.remove')
                ,handler: this.removeProcessors
            }];
        },editProcessors: function(btn,e) {
            if (!this.editProcessorsWindow) {
                this.editProcessorsWindow = MODx.load({
                    xtype: 'msfm-window-processors-edit'
                    ,record: this.menu.record
                    ,listeners: {
                        'success': {fn:this.refresh,scope:this}
                    }
                });
            }
            this.editProcessorsWindow.setValues(this.menu.record);
            this.editProcessorsWindow.show(e.target);
        },removeProcessors: function() {
            MODx.msg.confirm({
                title: _('msfieldsmanager.title.win_remove')
                ,text: _('msfieldsmanager.confirm.remove')
                ,url: this.config.url
                ,params: {
                    action: 'mgr/processors/remove'
                    ,id: this.menu.record.id
                }
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }

    });
    Msfm.grid.Processors.superclass.constructor.call(this,config)
};
Ext.extend(Msfm.grid.Processors,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    ,clearFilter: function() {
        var s = this.getStore();
        s.baseParams.search = '';
        Ext.getCmp('msfm-search-filter-processor').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
});
Ext.reg('msfm-grid-processors',Msfm.grid.Processors);

Msfm.window.CreateProcessors = function(config) {
    config = config || {};
    var r = config.record
    ,self = this;
	this.ident = config.ident || Ext.id();
    Ext.applyIf(config,{
        title: _('msfieldsmanager.title.win_processor_create')
        ,url: Msfm.config.connectorUrl
        ,autoHeight:true
        ,width: 600
        ,modal: true
        ,keys: []
        ,baseParams: {
            action: 'mgr/processors/create'
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
            ,value: r.id || ''
        },{
			xtype: 'textfield'
            ,id:'msfm-processor-name-' + self.ident
			,fieldLabel: _('msfieldsmanager.label_processor_name')
			,description: _('msfieldsmanager.label_processor_name_help')
			,name: 'name'
			,allowBlank:false
            ,anchor: '100%'
            ,value: r.name || ''
            ,disabled: r.id ? true : false
			,validator: function(v) {
				return /^[a-zA-Z\_0-9]*$/.test(v)?true:_('msfieldsmanager.err_valid_name');
			}
		},{
            xtype: 'textfield'
            ,fieldLabel: _('msfieldsmanager.label_processor_url')
            ,description: _('msfieldsmanager.label_processor_url_help')
            ,allowBlank:true
            ,anchor: '100%'
            ,value: '/assets/components/msfieldsmanager/connector.php'
            ,readOnly: true
            ,hidden: r.id ? false : true
        },{
            xtype: 'textfield'
            ,fieldLabel: _('msfieldsmanager.label_processor_action')
            ,description: _('msfieldsmanager.label_processor_action_help')
            ,allowBlank:true
            ,anchor: '100%'
            ,value: 'mgr/custom/'+ (r.name || '')
            ,readOnly: true
            ,hidden: r.id ? false : true
        },{
			xtype: 'msfm-combo-table'
            ,id:'msfm-combo-table-' + self.ident
			,fieldLabel: _('msfieldsmanager.label_table')
			,description: _('msfieldsmanager.label_table_help')
			,name: 'table_name'
			,allowBlank:false
            ,anchor: '100%'
            ,value: r.table_name || ' '
            ,disabled: r.id ? true : false
			,listeners: {
				select:  {fn:this.onSelectTable,scope:this}
			}
		},{
            xtype: 'msfm-combo-field'
            ,id:'msfm-combo-field-sort-' + self.ident
            ,fieldLabel: _('msfieldsmanager.label_sort_field')
            ,description: _('msfieldsmanager.label_sort_field_help')
            ,name: 'sort_field'
            ,allowBlank:false
            ,anchor: '100%'
            ,value: r.sort_field || ' '
            ,table: r.table_name || ''
        },{
			xtype: 'msfm-combo-field'
            ,id:'msfm-combo-field-display-' + self.ident
			,fieldLabel: _('msfieldsmanager.label_display_field')
			,description: _('msfieldsmanager.label_display_field_help')
			,name: 'display_field'
			,allowBlank:false
			,anchor: '100%'
            ,value: r.display_field || ' '
            ,table: r.table_name || ''
		},{
			xtype: 'msfm-combo-field'
            ,id:'msfm-combo-field-value-' + self.ident
			,fieldLabel: _('msfieldsmanager.label_value_field')
			,description: _('msfieldsmanager.label_value_field_help')
			,name: 'value_field'
			,allowBlank:false
			,anchor: '100%'
            ,value: r.value_field || ' '
            ,table: r.table_name || ''
		},{
            xtype: 'button'
            ,text: _('msfieldsmanager.btn_processor_generate')
            ,scope: this
            ,cls: 'primary-button'
            ,style: 'margin-top: 15px;'
            ,anchor: '100%'
            , handler: this.processorGenerate
        },{
            id: 'processor-code-editor-' +  this.ident
            ,xtype: Ext.ComponentMgr.types['modx-texteditor'] ? 'modx-texteditor' : 'textarea'
            ,mimeType: 'application/x-php'
            ,height: 300
            ,fieldLabel: _('msfieldsmanager.label_processor_code')
            ,description: _('msfieldsmanager.label_processor_code_help')
            ,name: 'processor'
            ,allowBlank:false
            ,anchor: '100%'
            ,value: r.processor || ''
        }]
    });
    Msfm.window.CreateProcessors.superclass.constructor.call(this,config);
};
Ext.extend(Msfm.window.CreateProcessors,MODx.Window,{
    onSelectTable: function(ele, rec, idx){
       Ext.getCmp('msfm-combo-field-display-' +  this.ident).reload(rec.json.name);
       Ext.getCmp('msfm-combo-field-value-' +  this.ident).reload(rec.json.name);
       Ext.getCmp('msfm-combo-field-sort-' +  this.ident).reload(rec.json.name);
    }
    ,processorGenerate: function(){
        if (!this.mask) this.mask = new Ext.LoadMask(this.getEl());
        this.mask.show();
        MODx.Ajax.request({
            url: Msfm.config.connectorUrl
            ,params: {
                action:'mgr/processors/generate'
                ,name: Ext.getCmp('msfm-processor-name-' +  this.ident).getValue()
                ,classKey: Ext.getCmp('msfm-combo-table-' +  this.ident).getValue()
                ,sort: Ext.getCmp('msfm-combo-field-sort-' +  this.ident).getValue()
            }
            ,listeners: {
                'success':{fn:function(r) {
                    this.mask.hide();
                    Ext.getCmp('processor-code-editor-' +  this.ident).setValue(r.object.code);
                },scope:this}
                ,'failure': {fn:function(r) {
                    this.mask.hide();
                },scope:this}
            }
        });
    }
});
Ext.reg('msfieldsmanager-window-processors-create',Msfm.window.CreateProcessors);


Msfm.window.EditProcessors = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('msfieldsmanager.title.win_processor_edit')
        ,url: Msfm.config.connectorUrl
        ,baseParams: {
            action: 'mgr/processors/update'
        }
    });
    Msfm.window.EditProcessors.superclass.constructor.call(this,config);
};
Ext.extend(Msfm.window.EditProcessors,Msfm.window.CreateProcessors,{});
Ext.reg('msfm-window-processors-edit',Msfm.window.EditProcessors);
