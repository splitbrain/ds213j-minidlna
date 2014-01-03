function estimateHeight() {
	var myWidth = 0, myHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		myHeight = document.body.clientHeight;
	}
	return myHeight;
}


Ext.onReady(function() {

    function onSaveBtnClick(item){
		conn.request({
			url: 'writefile.cgi',
			params: Ext.urlEncode({name: combo.value, action: texta.getValue()}),
			success: function(responseObject) {
				if (responseObject.responseText=="ok\n") {
					Ext.Msg.alert('Status','Changes&nbsp;saved.');
				} else {
					Ext.Msg.alert('Status',responseObject.responseText);
				}

				saveBtn.disable();
				repairBtn.enable();
			}
		});
	}
	
	
    function onRepairBtnClick(item){
		if (!(saveBtn.disabled)) {
			Ext.MessageBox.show({
				title: 'Warning',
				msg: 'Unsaved changes, are you sure you want to load original file?',
				icon: Ext.MessageBox.WARNING,
				buttons: Ext.MessageBox.YESNOCANCEL,
				fn: function(btn, text) {
					if (btn=='yes') {
						conn.request({
							url: 'getfile.cgi?'+Ext.urlEncode({action: combo.value})+'.original',
							success: function(responseObject) {
								texta.setValue(responseObject.responseText);
							}
						});
						repairBtn.enable();
						saveBtn.enable();
					}
				}
			})
		} else {
			conn.request({
				url: 'getfile.cgi?'+Ext.urlEncode({action: combo.value})+'.original',
				success: function(responseObject) {
					texta.setValue(responseObject.responseText);
				}
			});
			repairBtn.enable();
			saveBtn.enable();
		}

	}

	var conn = new Ext.data.Connection();

    function onComboClick(item){
		conn.request({
			url: 'getfile.cgi?'+Ext.urlEncode({action: combo.value}),
			success: function(responseObject) {
				texta.setValue(responseObject.responseText);
			}
		});
		repairBtn.enable();
		saveBtn.disable();
	}


	var texta = new Ext.form.TextArea ({
		hideLabel: true,
		name: 'msg',
		style: 'font-family:monospace',
		grow: false,
		preventScrollbars: false,
		anchor: '100% -53',
		enableKeyEvents:true,
		listeners: {
			keypress: function(f, e) {
				if (saveBtn.disabled) {
					saveBtn.enable();
				}
			}
		}

	});


	var combo = new Ext.form.ComboBox ({
		store: [==:names:==],
		name: 'file',
		shadow: true,
		editable: false,
		mode: 'local',
		triggerAction: 'all',
		emptyText: 'Choose config file',
		selectOnFocus: true
	});

	var saveBtn = new Ext.Toolbar.Button({
		handler: onSaveBtnClick,
		name: 'save',
		text: 'Save',
		icon: 'images/save.png',
		cls: 'x-btn-text-icon',
		disabled: true
	});

	var repairBtn = new Ext.Toolbar.Button({
		handler: onRepairBtnClick,
		name: 'original',
		text: 'Original',
		icon: 'images/source.png',
		cls: 'x-btn-text-icon',
		disabled: true
	});


    var form = new Ext.form.FormPanel({
    	renderTo: 'content',
        baseCls: 'x-plain',
        url:'save-form.php',
		height: estimateHeight(),
        items: [
			new Ext.Toolbar({
				items: [
					'-',
					saveBtn,
					'-',
					repairBtn,
					'-',
					combo
				]
			}),
			texta
		]
    });

	Ext.EventManager.onWindowResize(function() {
		form.doLayout();
		form.setHeight(estimateHeight());
	});

	combo.addListener('select',onComboClick);

	/**
	 * MiniDLNA packaging change
	 * start
	 */
	combo.value="minidlna.conf";                                                                            
	onComboClick(); 
	/**
	 * MiniDLNA packaging change
	 * end
	 */
});
