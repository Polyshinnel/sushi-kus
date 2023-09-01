$('.add-btn').click(function(){
    $(this).css('background','#FF894B')
    $(this).html('В корзине')
})

$('.header-cart-btn').click(function () {
	var effect = 'slide';
	var options = { direction: 'right' };
	var duration = 500;
	if($('.header-cart').css('display') == 'block'){
		$('.header-cart').fadeOut(300);
	}else{
		$('.header-cart').toggle(effect, options, duration);
	}
});

$(document).mouseup(function (e){ 
	var cart = $('.header-cart');
	if(!cart.is(e.target) && cart.has(e.target).length === 0){
		if(cart.css('display') == 'block'){
			var effect = 'slide';
			var options = { direction: 'right' };
			var duration = 500;
			cart.toggle(effect, options, duration);
		}
	}
});

$('.close-cart').click(function(){
    var cart = $('.header-cart');
    var effect = 'slide';
    var options = { direction: 'right' };
    var duration = 500;
    cart.toggle(effect, options, duration);
})

$('.header-cart__btn-empty').click(function(){
    var cart = $('.header-cart');
    var effect = 'slide';
    var options = { direction: 'right' };
    var duration = 500;
    cart.toggle(effect, options, duration);
})

$('.customer-details__tab-btn').click(function(){
	$('.customer-details__tab-btn').each(function(){
		$(this).removeClass('customer-details__tab-btn_active')
	})
	$(this).addClass('customer-details__tab-btn_active')

	let dataTab = $(this).attr('data-tab')
	$('.customer-details__tab').each(function(){
		$(this).removeClass('customer-details__tab_active')
		let tabName = $(this).attr('data-tab')
		if(tabName == dataTab) {
			$(this).addClass('customer-details__tab_active')
		}
	})
});

$('.customer-details-payment-item').click(function(){
	$('.customer-details-payment-item').each(function(){
		$(this).removeClass('customer-details-payment-item_active')
	})
	$(this).addClass('customer-details-payment-item_active')
})

$('.customer-details__tab-time-item').click(function(){
	$('.customer-details__tab-time-item').each(function(){
		$(this).removeClass('customer-details__tab-time-item_active')
	})
	$(this).addClass('customer-details__tab-time-item_active')
	let dataTime = $(this).attr('data-time')
	let timeInput = $(this).parent().parent().parent().find('.customer-details__tab-time-input')
	if(dataTime == 'other') {
		timeInput.slideToggle()
	} else{
		timeInput.slideUp()
	}
})

$('.standart-input input').click(function(){
	$(this).removeClass('alert-input')
	$(this).parent().find('.alert-hint').remove()
})

$('.customer-details-payment-btn').click(function(){
	let typeTakeout = $('.customer-details__tab-btn_active').attr('data-tab')
	$('.alert-hint').each(function(){
		$(this).remove()
	})

	let deliveryType = 'Доставка'
	let errFlag = 0

	jsonObj = {}

	if(typeTakeout == 'delivery') {
		let deliverySelector = $('#delivery-addr')
		let flatSelector = $('#delivery-flat')
		let entranceSelector = $('#delivery-entrance')
		let floorSelector = $('#delivery-floor')
		let deliveryCodeSelector = $('#delivery-code')

		jsonObj.deliveryType = deliveryType


		let deliveryAddr = deliverySelector.val()
		let flat = flatSelector.val()
		flat = flat.replace(/[^0-9]/g, '');
		let entrance = entranceSelector.val()
		entrance = entrance.replace(/[^0-9]/g, '');
		let floor = floorSelector.val()
		floor = floor.replace(/[^0-9]/g, '');
		let deliveryCode = deliveryCodeSelector.val()

		if(deliveryAddr == '') {
			deliverySelector.addClass('alert-input')
			deliverySelector.parent().append('<p class="alert-hint">Введите корректный адрес</p>')
			errFlag++
		}

		if(flat == '') {
			flatSelector.val('')
			flatSelector.addClass('alert-input')
			flatSelector.parent().append('<p class="alert-hint">Введите корректно квартиру/офис</p>')
			errFlag++
		}

		if(entrance == '') {
			entranceSelector.val('')
			entranceSelector.addClass('alert-input')
			entranceSelector.parent().append('<p class="alert-hint">Введите корректный подъезд</p>')
			errFlag++
		}

		if(floor == '') {
			floorSelector.val('')
			floorSelector.addClass('alert-input')
			floorSelector.parent().append('<p class="alert-hint">Введите корректный этаж</p>')
			errFlag++
		}

		if(deliveryCode == '') {
			deliveryCodeSelector.addClass('alert-input')
			deliveryCodeSelector.parent().append('<p class="alert-hint">Введите код домофона</p>')
			errFlag++
		}

		let timeDeliveryType = $('.customer-details__tab-time-item_active').attr('data-time')
		let timeDelivery = '';
		if(timeDeliveryType == 'now') {
			timeDelivery = 'Как можно быстрее'
		} else {
			let timeDeliverySelector = $('.customer-details__tab-time-item_active').parent().parent().find('#delivery-time')
			timeDelivery = timeDeliverySelector.val()
			if(timeDelivery == '') {
				timeDeliverySelector.addClass('alert-input')
				timeDeliverySelector.parent().append('<p class="alert-hint">Введите желаемое время</p>')
				errFlag++
			}
		}

		jsonObj.deliveryAddr = deliveryAddr
		jsonObj.flat = flat
		jsonObj.entrance = entrance
		jsonObj.floor = floor
		jsonObj.deliveryCode = deliveryCode
		jsonObj.timeDelivery = timeDelivery
	} else {
		deliveryType = 'Самовывоз'
		let timeDeliveryType = $('.customer-details__tab-time-item_active').attr('data-time')
		let timeDelivery = '';
		if(timeDeliveryType == 'now') {
			timeDelivery = 'Как можно быстрее'
		} else {
			let timeDeliverySelector = $('.customer-details__tab-time-item_active').parent().parent().find('input')
			timeDelivery = timeDeliverySelector.val()
			if(timeDelivery == '') {
				timeDeliverySelector.addClass('alert-input')
				timeDeliverySelector.parent().append('<p class="alert-hint">Введите желаемое время</p>')
				errFlag++
			}
		}

		jsonObj.deliveryType = deliveryType
		jsonObj.timeDelivery = timeDelivery
	}

	let phoneSelector = $('#customer-phone')
	let customerSelector = $('#customer-name')

	let customerName = customerSelector.val()
	customerArr = customerName.split(' ')
	let customerPhone = phoneSelector.val().replace(/[^0-9]/g, '');

	if(customerPhone.length < 11) {
		phoneSelector.val('')
		phoneSelector.addClass('alert-input')
		phoneSelector.parent().append('<p class="alert-hint">Введите корректный телефон</p>')
		errFlag++
	}

	if(customerArr.length < 2) {
		customerSelector.val('')
		customerSelector.addClass('alert-input')
		customerSelector.parent().append('<p class="alert-hint">Введите Фамилию и Имя</p>')
		errFlag++
	}

	let comment = $('#customer-comment').val()

	jsonObj.phone = customerPhone
	jsonObj.name = customerName
	jsonObj.comment = comment

	let paymentMethod = $('.customer-details-payment-item_active').attr('data-payment')
	jsonObj.paymentMethod = paymentMethod

	let products = []

	$('.cart-details__product').each(function(){
		let name = $(this).find('.cart-details__product-title p').html()
		let totalPrice = $(this).find('.cart-details__product-title h4').html()
		let quantity = $(this).find('.cart-details__product-count input').val()

		let productObj = {
			name: name,
			totalPrice: totalPrice,
			quantity: quantity
		}

		products.push(productObj)
	})

	jsonObj.products = products
	jsonObj.totalPrice = $('.customer-details-payment-btn').attr('data-total')

	console.log(jsonObj)
})

