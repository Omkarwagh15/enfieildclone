if(typeof(WCU_DATA) == 'undefined')
	var WCU_DATA = {};
if(isNumber(WCU_DATA.animationSpeed))
    WCU_DATA.animationSpeed = parseInt(WCU_DATA.animationSpeed);
else if(jQuery.inArray(WCU_DATA.animationSpeed, ['fast', 'slow']) == -1)
    WCU_DATA.animationSpeed = 'fast';
WCU_DATA.showSubscreenOnCenter = parseInt(WCU_DATA.showSubscreenOnCenter);
var sdLoaderImgWcu = '<img src="'+ WCU_DATA.loader+ '" />';
var g_wcuAnimationSpeed = 300;

jQuery.fn.showLoaderWcu = function() {
    return jQuery(this).html( sdLoaderImgWcu );
};
jQuery.fn.appendLoaderWcu = function() {
    jQuery(this).append( sdLoaderImgWcu );
};
jQuery.sendFormWcu = function(params) {
	// Any html element can be used here
	return jQuery('<br />').sendFormWcu(params);
};
/**
 * Send form or just data to server by ajax and route response
 * @param string params.fid form element ID, if empty - current element will be used
 * @param string params.msgElID element ID to store result messages, if empty - element with ID "msg" will be used. Can be "noMessages" to not use this feature
 * @param function params.onSuccess funstion to do after success receive response. Be advised - "success" means that ajax response will be success
 * @param array params.data data to send if You don't want to send Your form data, will be set instead of all form data
 * @param array params.appendData data to append to sending request. In contrast to params.data will not erase form data
 * @param string params.inputsWraper element ID for inputs wraper, will be used if it is not a form
 * @param string params.clearMsg clear msg element after receive data, if is number - will use it to set time for clearing, else - if true - will clear msg element after 5 seconds
 */
jQuery.fn.sendFormWcu = function(params) {
    var form = null;
    if(!params)
        params = {fid: false, msgElID: false, onSuccess: false};

    if(params.fid)
        form = jQuery('#'+ fid);
    else
        form = jQuery(this);

    /* This method can be used not only from form data sending, it can be used just to send some data and fill in response msg or errors*/
    var sentFromForm = (jQuery(form).tagName() == 'FORM');
    var data = new Array();
    if(params.data)
        data = params.data;
    else if(sentFromForm)
        data = jQuery(form).serialize();

    if(params.appendData) {
		var dataIsString = typeof(data) == 'string';
		var addStrData = [];
        for(var i in params.appendData) {
			if(dataIsString) {
				addStrData.push(i+ '='+ params.appendData[i]);
			} else
            data[i] = params.appendData[i];
        }
		if(dataIsString)
			data += '&'+ addStrData.join('&');
    }
    var msgEl = null;
    if(params.msgElID) {
        if(params.msgElID == 'noMessages')
            msgEl = false;
        else if(typeof(params.msgElID) == 'object')
           msgEl = params.msgElID;
       else
            msgEl = jQuery('#'+ params.msgElID);
    }
	if(typeof(params.inputsWraper) == 'string') {
		form = jQuery('#'+ params.inputsWraper);
		sentFromForm = true;
	}
	if(sentFromForm && form) {
        jQuery(form).find('*.wcuInputError').removeClass('wcuInputError');
    }
	if(msgEl && !params.btn) {
		jQuery(msgEl)
			.removeClass('wcuSuccessMsg')
			.removeClass('wcuErrorMsg');
		if(!params.btn) {
			jQuery(msgEl).showLoaderWcu();
		}
	}
	if(params.btn) {
		jQuery(params.btn).attr('disabled', 'disabled');
		// Font awesome usage
		params.btnIconElement = jQuery(params.btn).find('.fa').length ? jQuery(params.btn).find('.fa') : jQuery(params.btn);
		if(jQuery(params.btn).find('.fa').length) {
			params.btnIconElement
				.data('prev-class', params.btnIconElement.attr('class'))
				.attr('class', 'fa fa-spinner fa-spin');
		}
	}
    var url = '';
	if(typeof(params.url) != 'undefined')
		url = params.url;
    else if(typeof(ajaxurl) == 'undefined' || typeof(ajaxurl) !== 'string')
        url = WCU_DATA.ajaxurl;
    else
        url = ajaxurl;

    jQuery('.wcuErrorForField').hide(WCU_DATA.animationSpeed);
	var dataType = params.dataType ? params.dataType : 'json';
	// Set plugin orientation
	if(typeof(data) == 'string') {
		data += '&pl='+ WCU_DATA.WCU_CODE;
		data += '&reqType=ajax';
	} else {
		data['pl'] = WCU_DATA.WCU_CODE;
		data['reqType'] = 'ajax';
	}

    jQuery.ajax({
        url: url,
        data: data,
        type: 'POST',
        dataType: dataType,
        success: function(res) {
            toeProcessAjaxResponseWcu(res, msgEl, form, sentFromForm, params);
			if(params.clearMsg) {
				setTimeout(function(){
					if(msgEl)
						jQuery(msgEl).animateClear();
				}, typeof(params.clearMsg) == 'boolean' ? 5000 : params.clearMsg);
			}
        }
    });
};
/**
 * Hide content in element and then clear it
 */
jQuery.fn.animateClear = function() {
	var newContent = jQuery('<span>'+ jQuery(this).html()+ '</span>');
	jQuery(this).html( newContent );
	jQuery(newContent).hide(WCU_DATA.animationSpeed, function(){
		jQuery(newContent).remove();
	});
};
/**
 * Hide content in element and then remove it
 */
jQuery.fn.animateRemoveWcu = function(animationSpeed, onSuccess) {
	animationSpeed = animationSpeed == undefined ? WCU_DATA.animationSpeed : animationSpeed;
	jQuery(this).hide(animationSpeed, function(){
		jQuery(this).remove();
		if(typeof(onSuccess) === 'function')
			onSuccess();
	});
};
function toeProcessAjaxResponseWcu(res, msgEl, form, sentFromForm, params) {
    if(typeof(params) == 'undefined')
        params = {};
    if(typeof(msgEl) == 'string')
        msgEl = jQuery('#'+ msgEl);
    if(msgEl)
        jQuery(msgEl).html('');
	if(params.btn) {
		jQuery(params.btn).removeAttr('disabled');
		if(params.btnIconElement) {
			params.btnIconElement.attr('class', params.btnIconElement.data('prev-class'));
		}
	}
    /*if(sentFromForm) {
        jQuery(form).find('*').removeClass('wcuInputError');
    }*/
    if(typeof(res) == 'object') {
        if(res.error) {
            if(msgEl) {
                jQuery(msgEl)
					.removeClass('wcuSuccessMsg')
					.addClass('wcuErrorMsg');
            }
			var errorsArr = [];
            for(var name in res.errors) {
                if(sentFromForm) {
					var inputError = jQuery(form).find('[name*="'+ name+ '"]');
                    inputError.addClass('wcuInputError');
					if(inputError.attr('placeholder')) {
						//inputError.attr('placeholder', res.errors[ name ]);
					}
					if(!inputError.data('keyup-error-remove-binded')) {
						inputError.keydown(function(){
							jQuery(this).removeClass('wcuInputError');
						}).data('keyup-error-remove-binded', 1);
					}
                }
                if(jQuery('.wcuErrorForField.toe_'+ nameToClassId(name)+ '').exists())
                    jQuery('.wcuErrorForField.toe_'+ nameToClassId(name)+ '').show().html(res.errors[name]);
                else if(msgEl)
                    jQuery(msgEl).append(res.errors[name]).append('<br />');
				else
					errorsArr.push( res.errors[name] );
            }
			if(errorsArr.length && params.btn && jQuery.fn.dialog && !msgEl) {
				jQuery('<div title="'+ toeLangWcu("Really small warning :)")+ '" />').html( errorsArr.join('<br />') ).appendTo('body').dialog({
					modal: true
				,	width: '500px'
				});
			}
        } else if(res.messages.length) {
            if(msgEl) {
                jQuery(msgEl)
					.removeClass('wcuErrorMsg')
					.addClass('wcuSuccessMsg');
                for(var i = 0; i < res.messages.length; i++) {
                    jQuery(msgEl).append(res.messages[i]).append('<br />');
                }
            }
        }
    }
    if(params.onSuccess && typeof(params.onSuccess) == 'function') {
        params.onSuccess(res);
    }
}

function getDialogElementWcu() {
	return jQuery('<div/>').appendTo(jQuery('body'));
}

function toeOptionWcu(key) {
	if(WCU_DATA.options && WCU_DATA.options[ key ])
		return WCU_DATA.options[ key ];
	return false;
}
function toeLangWcu(key) {
	if(WCU_DATA.siteLang && WCU_DATA.siteLang[key])
		return WCU_DATA.siteLang[key];
	return key;
}
function toePagesWcu(key) {
	if(typeof(WCU_DATA) != 'undefined' && WCU_DATA[key])
		return WCU_DATA[key];
	return false;;
}
/**
 * This function will help us not to hide desc right now, but wait - maybe user will want to select some text or click on some link in it.
 */
function toeOptTimeoutHideDescriptionWcu() {
	jQuery('#wcuOptDescription').removeAttr('toeFixTip');
	setTimeout(function(){
		if(!jQuery('#wcuOptDescription').attr('toeFixTip'))
			toeOptHideDescriptionWcu();
	}, 500);
}
/**
 * Show description for options
 */
function toeOptShowDescriptionWcu(description, x, y, moveToLeft) {
    if(typeof(description) != 'undefined' && description != '') {
        if(!jQuery('#wcuOptDescription').length) {
            jQuery('body').append('<div id="wcuOptDescription"></div>');
        }
		if(moveToLeft)
			jQuery('#wcuOptDescription').css('right', jQuery(window).width() - (x - 10));	// Show it on left side of target
		else
			jQuery('#wcuOptDescription').css('left', x + 10);
        jQuery('#wcuOptDescription').css('top', y);
        jQuery('#wcuOptDescription').show(200);
        jQuery('#wcuOptDescription').html(description);
    }
}
/**
 * Hide description for options
 */
function toeOptHideDescriptionWcu() {
	jQuery('#wcuOptDescription').removeAttr('toeFixTip');
    jQuery('#wcuOptDescription').hide(200);
}
function toeInArrayWcu(needle, haystack) {
	if(haystack) {
		for(var i in haystack) {
			if(haystack[i] == needle)
				return true;
		}
	}
	return false;
}
function toeShowDialogCustomized(element, options) {
	options = jQuery.extend({
		resizable: false
	,	width: 500
	,	height: 300
	,	closeOnEscape: true
	,	open: function(event, ui) {
			jQuery('.ui-dialog-titlebar').css({
				'background-color': '#222222'
			,	'background-image': 'none'
			,	'border': 'none'
			,	'margin': '0'
			,	'padding': '0'
			,	'border-radius': '0'
			,	'color': '#CFCFCF'
			,	'height': '27px'
			});
			jQuery('.ui-dialog-titlebar-close').css({
				'background': 'url("'+ WCU_DATA.cssPath+ 'img/tb-close.png") no-repeat scroll 0 0 transparent'
			,	'border': '0'
			,	'width': '15px'
			,	'height': '15px'
			,	'padding': '0'
			,	'border-radius': '0'
			,	'margin': '7px 7px 0'
			}).html('');
			jQuery('.ui-dialog').css({
				'border-radius': '3px'
			,	'background-color': '#FFFFFF'
			,	'background-image': 'none'
			,	'padding': '1px'
			,	'z-index': '300000'
			,	'position': 'fixed'
			,	'top': '60px'
			});
			jQuery('.ui-dialog-buttonpane').css({
				'background-color': '#FFFFFF'
			});
			jQuery('.ui-dialog-title').css({
				'color': '#CFCFCF'
			,	'font': '12px sans-serif'
			,	'padding': '6px 10px 0'
			});
			if(options.openCallback && typeof(options.openCallback) == 'function') {
				options.openCallback(event, ui);
			}
			jQuery('.ui-widget-overlay').css({
				'z-index': jQuery( event.target ).parents('.ui-dialog:first').css('z-index') - 1
			,	'background-image': 'none'
			});
			if(options.modal && options.closeOnBg) {
				jQuery('.ui-widget-overlay').unbind('click').bind('click', function() {
					jQuery( element ).dialog('close');
				});
			}
		}
	}, options);
	return jQuery(element).dialog(options);
}
/**
 * @see html::slider();
 **/
function toeSliderMove(event, ui) {
    var id = jQuery(event.target).attr('id');
    jQuery('#toeSliderDisplay_'+ id).html( ui.value );
    jQuery('#toeSliderInput_'+ id).val( ui.value ).change();
}
function wcuCorrectJqueryUsed() {
	return (typeof(jQuery.fn.sendFormWcu) === 'function');
}
function wcuReloadCoreJs(clb, params) {
	var scriptsHtml = ''
	,	coreScripts = ['common.js', 'core.js'];
	for(var i = 0; i < coreScripts.length; i++) {
		scriptsHtml += '<script type="text/javascript" class="wcuReloadedScript" src="'+ WCU_DATA.jsPath+ coreScripts[ i ]+ '"></script>';
	}
	jQuery('head').append( scriptsHtml );
	if(clb) {
		_wcuRunClbAfterCoreReload( clb, params );
	}
}
function _wcuRunClbAfterCoreReload(clb, params) {
	if(wcuCorrectJqueryUsed()) {
		callUserFuncArray(clb, params);
		return;
	}
	setTimeout(function(){
		wcuCorrectJqueryUsed(clb, params);
	}, 500);
}
function wcuUpdateUrlParam(param, value, url) {
	var queryParameters = {},
		queryString = location.search.substring(1),
		regexp = /([^&=]+)=([^&]*)/g,
		m;

	while(m = regexp.exec(queryString)) {
		if (m[1] == 'min_price' || m[1] == 'max_price') {
			continue;
		}
		// if (m[1] == 'min_price') {
		// 	m[2] = 0;
		// }
		// if (m[1] == 'max_price') {
		// 	m[2] = 999999;
		// }
		queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}

	queryParameters[param] = value;
	window.location.search = jQuery.param(queryParameters);
	window.sessionStorage.clear();
}
