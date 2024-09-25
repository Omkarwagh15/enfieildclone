jQuery(document).ready(function ($) {
    "use strict";
    // Select/Un-select product
    $(document).on('change', '.item-product input[type="checkbox"]', function (e) {
        var $this = $(this);
        var $thisWrap = $this.closest('.item-products-wrap');
        var $thisWpbingoWrap = $thisWrap.closest('.buy-together-wrap');
        var $thisProductsBtWrap = $thisWpbingoWrap.find('.item-products-wrap');
        var total_price = 0;
        var total_items = 0;
        
        $thisWrap.find('.item-product input[type="checkbox"]').each(function () {
            var this_product_id = $(this).attr('data-product_id');
            if ($(this).is(':checked')) {
                var this_price = parseFloat($(this).attr('data-price'));
                if (!isNaN(this_price)) {
                    total_price += this_price;
                }
                total_items++;
                $thisProductsBtWrap.find('.item-product[data-product_id="' + this_product_id + '"]').removeClass('buy-together-hidden');
            }
            else {
                $thisProductsBtWrap.find('.item-product[data-product_id="' + this_product_id + '"]:not(.buy-together-content)').addClass('buy-together-hidden');
            }
            
        });
        
        var total_price_html = bwp_woo_format_money(total_price);
        $thisWpbingoWrap.find('.total-price-html').html(total_price_html);
        $thisWpbingoWrap.find('.for-items-text').text(buy_together['text']['for_num_of_items'].replace('{{number}}', total_items));
        
    });
    
    // Add all selected products to cart
    $(document).on('click', '.buy-together-add-all-to-cart', function (e) {
        var $this = $(this);
        if ($this.is('.adding-to-cart')) {
            return false;
        }
        
        var $thisWpbingoWrap = $this.closest('.buy-together-wrap');
        var $itemsWrap = $thisWpbingoWrap.find('.item-products-wrap');
        var i = 0;
        
        // Check selected products
        if (!$itemsWrap.find('.item-product input[type="checkbox"]:checked').length) {
            var error_msg_html = '<div class="buy-together-error-message woocommerce-error">' + buy_together['text']['no_product_selected_text'] + '</div>';
            if (!$thisWpbingoWrap.find('.buy-together-messages-wrap').length) {
                $thisWpbingoWrap.prepend('<div class="buy-together-messages-wrap"></div>');
            }
            $thisWpbingoWrap.find('.buy-together-messages-wrap').html(error_msg_html);
            return false;
        }
        
        $itemsWrap.find('.item-product').each(function () {
            $(this).addClass('item-product-' + i).attr('data-item_num', i).find('input[type="checkbox"]').prop('disabled', true);
            i++;
        });
        
        $this.addClass('adding-to-cart disabled');
        $this.text(buy_together['text']['adding_to_cart_text']);
        $thisWpbingoWrap.find('.buy-together-messages-wrap').html('');
        bwp_add_to_cart($itemsWrap, 0);
        
    });
    
    function bwp_add_to_cart($itemsWrap, item_num) {
        var next_item_num = item_num + 1;
        var $productItem = $itemsWrap.find('.item-product-' + item_num);
        var $nextProductItem = $itemsWrap.find('.item-product-' + next_item_num);
        var $wpbingoWrap = $itemsWrap.closest('.buy-together-wrap');
        
        if (!$productItem.length) {
            $itemsWrap.closest('.buy-together-wrap').find('.buy-together-add-all-to-cart').removeClass('adding-to-cart disabled').text(buy_together['text']['add_to_cart_text']);
            $itemsWrap.find('.item-product:not(.buy-together-main-item) input[type="checkbox"]').prop('disabled', false);
            bwp_display_add_to_cart_messages($itemsWrap);
            bwp_reset_add_to_cart_count_success_fail($itemsWrap);
            $(document.body).trigger('wc_fragment_refresh');
            return;
        }
        
        if (!$productItem.find('input[type="checkbox"]').is(':checked')) {
            if ($nextProductItem.length) {
                bwp_add_to_cart($itemsWrap, next_item_num);
            }
            else {
                $itemsWrap.closest('.buy-together-wrap').find('.buy-together-add-all-to-cart').removeClass('adding-to-cart disabled').text(buy_together['text']['add_to_cart_text']);
                $itemsWrap.find('.item-product:not(.buy-together-main-item) input[type="checkbox"]').prop('disabled', false);
                bwp_display_add_to_cart_messages($itemsWrap);
                bwp_reset_add_to_cart_count_success_fail($itemsWrap);
                $(document.body).trigger('wc_fragment_refresh');
                return;
            }
        }
        else {
            var product_id = $productItem.attr('data-product_id');
            var data = {
                action: 'woocommerce_add_to_cart',
                product_id: product_id
            };
            
            $.post(buy_together['ajaxurl'], data, function (response) {
                if ($nextProductItem.length) {
                    bwp_count_add_to_cart_success_fail($itemsWrap, response);
                    bwp_add_to_cart($itemsWrap, next_item_num);
                }
                else {
                    bwp_count_add_to_cart_success_fail($itemsWrap, response);
                    
                    $wpbingoWrap.find('.buy-together-add-all-to-cart').removeClass('adding-to-cart disabled').text(buy_together['text']['add_to_cart_text']);
                    $itemsWrap.find('.item-product:not(.buy-together-main-item) input[type="checkbox"]').prop('disabled', false);
                    
                    bwp_display_add_to_cart_messages($itemsWrap);
                    bwp_reset_add_to_cart_count_success_fail($wpbingoWrap);
                    
                    // $itemsWrap.closest('.buy-together-wrap').html
                }
            });
        }
    }
    
    function bwp_display_add_to_cart_messages($itemsWrap) {
        var $wpbingoWrap = $itemsWrap.closest('.buy-together-wrap');
        var count_success = parseInt($wpbingoWrap.find('.buy-together-add-all-to-cart').attr('data-count_success'));
        var count_fail = parseInt($wpbingoWrap.find('.buy-together-add-all-to-cart').attr('data-count_fail'));
        var message_success = buy_together['text']['add_to_cart_success'].replace('{{number}}', count_success);
        var message_fail = '';
        if (count_fail == 1) {
            message_fail = buy_together['text']['add_to_cart_fail_single'].replace('{{number}}', count_fail);
        }
        if (count_fail > 1) {
            message_fail = buy_together['text']['add_to_cart_fail_plural'].replace('{{number}}', count_fail);
        }
        var count_success_html = '';
        var count_fail_html = '';
        $(document.body).trigger('wc_fragment_refresh');
        if (!$wpbingoWrap.find('.buy-together-messages-wrap').length) {
            $wpbingoWrap.prepend('<div class="buy-together-messages-wrap"></div>');
        }
        if ($.trim(message_success) != '') {
            var view_cart_html = '<a class="button wc-forward" href="' + buy_together['cart_url'] + '">' + buy_together['text']['view_cart'] + '</a>';
            count_success_html = '<div class="buy-together-success-message woocommerce-message">' + view_cart_html + message_success + '</div>';
        }
        if ($.trim(message_fail) != '') {
            count_fail_html = '<div class="buy-together-error-message woocommerce-error">' + message_fail + '</div>';
        }
        $wpbingoWrap.find('.buy-together-messages-wrap').html(count_success_html + count_fail_html);
    }
    
    function bwp_count_add_to_cart_success_fail($itemsWrap, response) {
        var count_fail;
        var count_success;
        var $wpbingoWrap = $itemsWrap.closest('.buy-together-wrap');
        if (response.hasOwnProperty('error')) {
            if (response['error']) {
                count_fail = parseInt($wpbingoWrap.find('.buy-together-add-all-to-cart').attr('data-count_fail'));
                if (isNaN(count_fail)) {
                    count_fail = 0;
                }
                count_fail++;
                $wpbingoWrap.find('.buy-together-add-all-to-cart').attr('data-count_fail', count_fail);
            }
            else {
                count_success = parseInt($wpbingoWrap.find('.buy-together-add-all-to-cart').attr('data-count_success'));
                if (isNaN(count_success)) {
                    count_success = 0;
                }
                count_success++;
                $wpbingoWrap.find('.buy-together-add-all-to-cart').attr('data-count_success', count_success);
            }
        }
        else {
            count_success = parseInt($wpbingoWrap.find('.buy-together-add-all-to-cart').attr('data-count_success'));
            if (isNaN(count_success)) {
                count_success = 0;
            }
            count_success++;
            $wpbingoWrap.find('.buy-together-add-all-to-cart').attr('data-count_success', count_success);
        }
    }
    
    function bwp_reset_add_to_cart_count_success_fail($itemsWrap) {
        $itemsWrap.find('.buy-together-add-all-to-cart').attr('data-count_success', 0).attr('data-count_fail', 0);
    }
    
    /**
     *
     * @param $form
     * @param response
     * @param position  top or bottom.
     */
    function bwp_display_multi_messages($form, response, position) {
        $form.find('.buy-together-message').remove();
        
        var msg_class = '';
        
        if (response['err'] === 'yes') {
            msg_class += 'alert-danger';
        }
        else {
            msg_class += 'alert-success';
        }
        
        if ($.type(response['message']) === 'string') {
            if (response['message'] !== '') {
                if (position === 'top') {
                    $form.prepend('<div class="buy-together-message alert ' + msg_class + '">' + response['message'] + '</div>');
                }
                else {
                    $form.append('<div class="buy-together-message alert ' + msg_class + '">' + response['message'] + '</div>');
                }
            }
        }
        else {
            $.each(response['message'], function (index, item) {
                if (position === 'top') {
                    $form.prepend('<div class="buy-together-message alert ' + msg_class + '">' + item + '</div>');
                }
                else {
                    $form.append('<div class="buy-together-message alert ' + msg_class + '">' + item + '</div>');
                }
            });
        }
    }
    
    function bwp_woo_format_money(number) {
        return bwp_format_money(number, buy_together['price_thousand_separator'], buy_together['price_decimal_separator'], buy_together['price_decimals'], buy_together['currency_symbol'], buy_together['price_format']);
    }
    
    function bwp_format_money(number, thousand_sep, decimal_sep, tofixed, symbol, woo_price_format) {
        var before_text = '';
        var after_text = '';
        number = number || 0;
        tofixed = !isNaN(tofixed = Math.abs(tofixed)) ? tofixed : 2;
        symbol = symbol !== undefined ? symbol : "$";
        thousand_sep = thousand_sep || ",";
        decimal_sep = decimal_sep || ".";
        var negative = number < 0 ? "-" : "",
            i = parseInt(number = Math.abs(+number || 0).toFixed(tofixed), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        
        symbol = '<span class="woocommerce-Price-currencySymbol">' + symbol + '</span>';
        
        switch (woo_price_format) {
            case '%1$s%2$s':
                //left
                before_text += symbol;
                break;
            case '%1$s %2$s':
                //left with space
                before_text += symbol + ' ';
                break;
            case '%2$s%1$s':
                //right
                after_text += symbol;
                break;
            case '%2$s %1$s':
                //right with space
                after_text += ' ' + symbol;
                break;
            default:
                //default
                before_text += symbol;
        }
        
        
        var money_return = before_text +
            negative + (j ? i.substr(0, j) + thousand_sep : "" ) +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand_sep) +
            (tofixed ? decimal_sep + Math.abs(number - i).toFixed(tofixed).slice(2) : "") +
            after_text;
        
        if (buy_together['wc_tax_enabled']) {
            money_return += ' <small class="woocommerce-Price-taxLabel tax_label">' + buy_together['ex_tax_or_vat'] + '</small>';
        }
        
        money_return = '<span class="woocommerce-Price-amount amount">' + money_return + '</span>';
        
        return money_return;
    }
});