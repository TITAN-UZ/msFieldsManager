Msfm.grid.MsfmFields = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        id: 'msfm-grid-msfmfields'
        ,
        url: Msfm.config.connectorUrl
        ,
        baseParams: {action: 'mgr/msfmfields/getList'}
        ,
        fields: ['id', 'fieldset_id', 'name', 'title', 'dbtype', 'dbprecision', 'dbnull', 'dbdefault', 'xtype', 'enable', 'rank', 'description', 'extjs', 'required']
        ,
        paging: true
        ,
        remoteSort: true
        ,
        anchor: '97%'
        ,
        autoExpandColumn: 'name'
        ,
        save_action: 'mgr/msfmfields/updateFromGrid'
        ,
        autosave: true
        ,
        columns: [{
            header: _('msfieldsmanager.header_id')
            , dataIndex: 'id'
            , sortable: true
            , hidden: true
        }, {
            header: _('msfieldsmanager.header_dbname')
            , dataIndex: 'name'
            , sortable: true
        }, {
            header: _('msfieldsmanager.header_dbtype')
            , dataIndex: 'dbtype'
            , sortable: true
        }, {
            header: _('msfieldsmanager.header_title')
            , dataIndex: 'title'
            , sortable: true
        }, {
            header: _('msfieldsmanager.header_fieldset_id')
            , dataIndex: 'fieldset_id'
            , sortable: true
            , width: 60
            , editor: {
                xtype: 'msfm-combo-fieldset',
                renderer: true
            }
        }, {
            header: _('msfieldsmanager.header_enable')
            , dataIndex: 'enable'
            , sortable: true
            , width: 60
            , editor: {
                xtype: 'combo-boolean',
                renderer: 'boolean'
            }
        }, {
            header: _('msfieldsmanager.header_rank')
            , dataIndex: 'rank'
            , sortable: true
            , editor: {
                xtype: 'numberfield'
            }
        }],
        tbar: [{
            text: _('msfieldsmanager.btn_create')
            , cls: 'primary-button'
            , handler: {
                xtype: 'msfm-window-msfmfields-create'
                , blankValues: true
            }
        }, '->', {
            xtype: 'textfield'
            , name: 'search'
            , id: 'msfm-search-filter'
            , emptyText: _('msfieldsmanager.search') + '...'
            , listeners: {
                'change': {fn: this.search, scope: this}
                , 'render': {
                    fn: function (cmp) {
                        new Ext.KeyMap(cmp.getEl(), {
                            key: Ext.EventObject.ENTER
                            , fn: function () {
                                this.fireEvent('change', this);
                                this.blur();
                                return true;
                            }
                            , scope: cmp
                        });
                    }, scope: this
                }
            }
        }, {
            xtype: 'button'
            , id: 'msfm-filter-clear'
            , text: _('msfieldsmanager.filter_clear')
            , listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
        ,
        getMenu: function () {
            return [{
                text: _('msfieldsmanager.menu.edit')
                , handler: this.editMsfmFields
            }, '-', {
                text: _('msfieldsmanager.menu.remove')
                , handler: this.removeMsfmFields
            }];
        },
        editMsfmFields: function (btn, e) {
            if (!this.editMsfmFieldsWindow) {
                this.editMsfmFieldsWindow = MODx.load({
                    xtype: 'msfm-window-msfmfields-edit'
                    , record: this.menu.record
                    , listeners: {
                        'success': {fn: this.refresh, scope: this}
                    }
                });
            }
            this.editMsfmFieldsWindow.setValues(this.menu.record);
            this.editMsfmFieldsWindow.show(e.target);
        },
        removeMsfmFields: function () {
            MODx.msg.confirm({
                title: _('msfieldsmanager.title.win_remove')
                , text: _('msfieldsmanager.confirm.remove')
                , url: this.config.url
                , params: {
                    action: 'mgr/msfmfields/remove'
                    , id: this.menu.record.id
                }
                , listeners: {
                    'success': {fn: this.refresh, scope: this}
                }
            });
        }

    });
    Msfm.grid.MsfmFields.superclass.constructor.call(this, config)
};
Ext.extend(Msfm.grid.MsfmFields, MODx.grid.Grid, {
    search: function (tf, nv, ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
    , clearFilter: function () {
        var s = this.getStore();
        s.baseParams.search = '';
        Ext.getCmp('msfm-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }
});
Ext.reg('msfm-grid-msfmfields', Msfm.grid.MsfmFields);

Msfm.window.CreateMsfmFields = function (config) {
    config = config || {};
    var r = config.record
        , self = this
        , grid = Ext.getCmp('msfm-grid-msfmfields');
    this.ident = config.ident || Ext.id();
    Ext.applyIf(config, {
        title: _('msfieldsmanager.title.win_create')
        , url: Msfm.config.connectorUrl
        , autoHeight: false
        , width: 600
        , modal: true
        , keys: []
        , baseParams: {
            action: 'mgr/msfmfields/create'
        }
        , fields: [{
            title: _('msfieldsmanager.fieldset.db')
            , xtype: 'fieldset'
            , cls: 'x-fieldset-checkbox-toggle'
            , style: 'padding-top: 5px'
            , id: 'msfm-fieldset-db-' + this.ident
            , collapsible: true
            , stateful: true
            , stateEvents: ['collapse', 'expand']
            , items: [{
                xtype: 'hidden'
                , name: 'id'
            }, {
                xtype: 'textfield'
                , id: 'msfm-field-name-' + this.ident
                , fieldLabel: _('msfieldsmanager.label_dbname')
                , description: _('msfieldsmanager.label_dbname_help')
                , name: 'name'
                , allowBlank: false
                , msgTarget: 'under'
                , anchor: '100%'
                , disabled: r.id ? true : false
                , validator: function (v) {
                    return /^[a-zA-Z\_0-9]*$/.test(v) ? true : _('msfieldsmanager.err_valid_name');
                }
            }, {
                xtype: 'msfm-combo-dbtype'
                , fieldLabel: _('msfieldsmanager.label_dbtype')
                , description: _('msfieldsmanager.label_dbtype_help')
                , name: 'dbtype'
                , allowBlank: false
                , msgTarget: 'under'
                , anchor: '100%'
                , listeners: {
                    select: function (ele, rec, idx) {
                        if (ele.value === 'VARCHAR' || ele.value === 'CHAR') {
                            Ext.getCmp('msfm-precision-' + self.ident).allowBlank = false;
                        } else {
                            Ext.getCmp('msfm-precision-' + self.ident).allowBlank = true;
                        }
                    }
                }
            }, {
                xtype: 'textfield'
                , id: 'msfm-precision-' + this.ident
                , fieldLabel: _('msfieldsmanager.label_dbprecision')
                , description: _('msfieldsmanager.label_dbprecision_help')
                , name: 'dbprecision'
                , allowBlank: true
                , anchor: '100%'
                , msgTarget: 'under'
            }, {
                xtype: 'combo-boolean'
                , hiddenName: 'dbnull'
                , fieldLabel: _('msfieldsmanager.label_dbnull')
                , description: _('msfieldsmanager.label_dbnull_help')
                , name: 'dbnull'
                , hiddenName: 'dbnull'
                , allowBlank: false
                , msgTarget: 'under'
                , anchor: '100%'
            }, {
                xtype: 'msfm-combo-default-val'
                , fieldLabel: _('msfieldsmanager.label_dbdefault')
                , description: _('msfieldsmanager.label_dbdefault_help')
                , name: 'dbdefault'
                , allowBlank: true
                , anchor: '100%'
                , value: 'none'
                , listeners: {
                    select: function (ele, rec, idx) {
                        if (ele.value === 'user_defined') {
                            Ext.getCmp('msfm-default-value-' + self.ident).show().setValue('').allowBlank = false; //.validate();
                        } else {
                            Ext.getCmp('msfm-default-value-' + self.ident).hide().setValue('').allowBlank = true;
                        }
                    }
                }
            }, {
                xtype: 'textfield'
                , id: 'msfm-default-value-' + this.ident
                , fieldLabel: _('msfieldsmanager.label_default_value')
                , description: _('msfieldsmanager.label_default_value_help')
                , name: 'default_value'
                , allowBlank: true
                , anchor: '100%'
                , hidden: true
            }]
        }, {
            title: _('msfieldsmanager.fieldset.minishop2')
            , xtype: 'fieldset'
            , cls: 'x-fieldset-checkbox-toggle'
            , style: 'padding-top: 5px'
            , id: 'msfm-fieldset-minishop2-' + this.ident
            , collapsible: true
            , stateful: true
            , stateEvents: ['collapse', 'expand']
            , items: [{
                xtype: 'textfield'
                , fieldLabel: _('msfieldsmanager.label_title')
                , description: _('msfieldsmanager.label_title_help')
                , name: 'title'
                , allowBlank: false
                , msgTarget: 'under'
                , anchor: '100%'
            }, {
                xtype: 'textarea'
                , fieldLabel: _('msfieldsmanager.label_description')
                , description: _('msfieldsmanager.label_description_help')
                , name: 'description'
                , allowBlank: true
                , anchor: '100%'
            }, {
                xtype: 'msfm-combo-xtype'
                , id: 'msfm-combo-xtype-' + this.ident
                , fieldLabel: _('msfieldsmanager.label_xtype')
                , description: _('msfieldsmanager.label_xtype_help')
                , name: 'xtype'
                , allowBlank: false
                , msgTarget: 'under'
                , anchor: '100%'
                , listeners: {
                    select: function (ele, rec, idx) {
                        self.switchStorage(ele.value);
                        Ext.getCmp('msfm-combo-storage-' + self.ident).reload(ele.value);
                    }
                }
            }, {
                xtype: 'panel'
                , id: 'msfm-panel-custom-' + this.ident
                , layout: 'form'
                , style: {'padding-top': '15px'}
                , hidden: false
                , items: [{
                    layout: 'column'
                    , border: false
                    , hidden: true
                    , labelAlign: 'top'
                    , id: 'msfm-column-storage-' + this.ident
                    , fieldLabel: _('msfieldsmanager.label_storage')
                    , items: [{
                        xtype: 'msfm-combo-storage'
                        , id: 'msfm-combo-storage-' + this.ident
                        , columnWidth: .9
                    }, {
                        xtype: 'button'
                        , text: _('msfieldsmanager.btn_extjs_generate')
                        , cls: 'primary-button'
                        , scope: this
                        , handler: this.codeGenerate
                    }]
                }, {
                    id: 'msfm-extjs-code-editor-' + this.ident
                    , xtype: Ext.ComponentMgr.types['modx-texteditor'] ? 'modx-texteditor' : 'textarea'
                    , mimeType: 'application/javascript'
                    , height: 200
                    , fieldLabel: _('msfieldsmanager.label_extjs')
                    , description: _('msfieldsmanager.label_extjs_help')
                    , name: 'extjs'
                    , allowBlank: true
                    , anchor: '100%'
                }]
            }, {
                xtype: 'msfm-combo-fieldset'
                , fieldLabel: _('msfieldsmanager.label_fieldset_id')
                , description: _('msfieldsmanager.label_fieldset_id_help')
                , name: 'fieldset_id'
                , allowBlank: false
                , msgTarget: 'under'
                , anchor: '100%'
                , value: r.id ? r.fieldset_id : 0
            }, {
                xtype: 'combo-boolean'
                , fieldLabel: _('msfieldsmanager.label_required')
                , description: _('msfieldsmanager.label_required_help')
                , name: 'required'
                , hiddenName: 'required'
                , allowBlank: false
                , msgTarget: 'under'
                , anchor: '100%'
                , value: r.id ? id.required : 0
            }, {
                xtype: 'combo-boolean'
                , hiddenName: 'enable'
                , fieldLabel: _('msfieldsmanager.label_enable')
                , description: _('msfieldsmanager.label_enable_help')
                , name: 'enable'
                , hiddenName: 'enable'
                , allowBlank: false
                , msgTarget: 'under'
                , anchor: '100%'
                , value: r.id ? id.enable : 1
            }, {
                xtype: 'numberfield'
                , fieldLabel: _('msfieldsmanager.label_rank')
                , description: _('msfieldsmanager.label_rank_help')
                , name: 'rank'
                , allowBlank: false
                , msgTarget: 'under'
                , anchor: '100%'
                , value: r.id ? id.rank : grid.getStore().getTotalCount() + 1
            }]
        }]
    });
    Msfm.window.CreateMsfmFields.superclass.constructor.call(this, config);
    this.on('show', function () {
        var f = self.fp.getForm()
            , xtype = f.findField('xtype').getValue();
        self.switchStorage(xtype);
        Ext.getCmp('msfm-combo-storage-' + self.ident).reload(xtype);
    });
    // this.on("hide", this.reset, this);
};
Ext.extend(Msfm.window.CreateMsfmFields, MODx.Window, {
    reset: function () {
        this.fp.getForm().reset();
    }
    , switchStorage: function (val) {
        if (val === 'combobox_custom' || val === 'radiogroup') {
            Ext.getCmp('msfm-column-storage-' + this.ident).show().doLayout();
        } else {
            Ext.getCmp('msfm-column-storage-' + this.ident).hide();
        }
    }
    , codeGenerate: function () {
        if (!this.mask) this.mask = new Ext.LoadMask(this.getEl());
        this.mask.show();
        MODx.Ajax.request({
            url: Msfm.config.connectorUrl
            , params: {
                action: 'mgr/extjs/generate'
                , storage: Ext.getCmp('msfm-combo-storage-' + this.ident).getValue()
                , xtype: Ext.getCmp('msfm-combo-xtype-' + this.ident).getValue()
                , name: Ext.getCmp('msfm-field-name-' + this.ident).getValue()
            }
            , listeners: {
                'success': {
                    fn: function (r) {
                        this.mask.hide();
                        Ext.getCmp('msfm-extjs-code-editor-' + this.ident).setValue(r.object.code);
                    }, scope: this
                }
                , 'failure': {
                    fn: function (r) {
                        this.mask.hide();
                    }, scope: this
                }
            }
        });
    }
});
Ext.reg('msfm-window-msfmfields-create', Msfm.window.CreateMsfmFields);


Msfm.window.EditMsfmFields = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        title: _('msfieldsmanager.title.win_edit')
        , url: Msfm.config.connectorUrl
        , autoHeight: true
        , modal: true
        , baseParams: {
            action: 'mgr/msfmfields/update'
        }
    });
    Msfm.window.EditMsfmFields.superclass.constructor.call(this, config);
};
Ext.extend(Msfm.window.EditMsfmFields, Msfm.window.CreateMsfmFields, {});
Ext.reg('msfm-window-msfmfields-edit', Msfm.window.EditMsfmFields);