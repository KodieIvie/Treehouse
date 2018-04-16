$(function(){
	// hide job role other input field unless javascript is disabled
	$('.other-title').remove();
	// jQuery Validate Email with Regex 
	const validateEmail = Email => {
	    const pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	    return $.trim(Email).match(pattern) ? true : false;
	};
	// check for only numbers
	const validateNum = numIn => {
		const numbers = /^[0-9]+$/;
		return $.trim(numIn).match(numbers) ? true : false;
	};

	// Set focus on the first text field
	// When the page loads, give focus to the first text field
	$('#name').focus();

	// ”Job Role” section of the form:
	// A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
	// Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
	$('#title').change(function() {
		if ($(this).val() === 'other'){
			$('#title').after($('<input type=text id="other-title" placeholder="Your Job Role">'));
		} else {
			$('#other-title').remove();
		};
	});
	
	// ”T-Shirt Info” section of the form:
	// For the T-Shirt color menu, only display the color options that match the design selected in the "Design" menu.
	// If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
	$('#design').change(function() {
		$('#color option[value="none"]').remove();
		if ($(this).val() === 'js puns'){
			$('#color option').hide();
			$('#color option:selected').removeAttr("selected","selected");
			$('#color option:lt(3)').show().first().attr("selected","selected");
		};
		// If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
		if ($(this).val() === 'heart js') {
			$('#color option').hide();
			$('#color option:selected').removeAttr("selected","selected");
			$('#color>option:gt(2)').show().first().attr("selected","selected");
		};
	});

	// ”Register for Activities” section of the form:
	// As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
	let total = 0;
	$('.activities input').change(function(){
		total = 0;
		$(':checkbox:checked').each(function() {
	    	total += 100;
		});
		if ($('.activities input[name="all"]').is(':checked')){
			total += 100;
		};
		// Some events are at the same time as others. If the user selects a workshop, don't allow selection of a workshop at the same date and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
		// When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
		// if js-frameworks is checked disable express
		if ($('input[name="js-frameworks"]').is(':checked') === true){
			$('input[name="express"]').prop('disabled', true)
				.parent().addClass('disabled');
		} else {		
			$('input[name="express"]').prop('disabled', false)
				.parent().removeClass('disabled');	
		};
		// if express is checked disable js-frameworks
		if ($('input[name="express"]').is(':checked') === true){
			$('input[name="js-frameworks"]').prop('disabled', true)
				.parent().addClass('disabled');
		} else {		
			$('input[name="js-frameworks"]').prop('disabled', false)
				.parent().removeClass('disabled');	
		};
		// if js-libs is checked disable node
		if ($('input[name="js-libs"]').is(':checked') === true){
			$('input[name="node"]').prop('disabled', true)
				.parent().addClass('disabled');
		} else {		
			$('input[name="node"]').prop('disabled', false)
				.parent().removeClass('disabled');	
		};
		// if node is checked disable js-libs
		if ($('input[name="node"]').is(':checked') === true){
			$('input[name="js-libs"]').prop('disabled', true)
				.parent().addClass('disabled');
		} else {		
			$('input[name="js-libs"]').prop('disabled', false)
				.parent().removeClass('disabled');	
		};

		// add or remove total display if there's a price.
		if ($('.activities label').children().is(':checked')){
			$('.total').remove();
			$('.activities').append($(`<p class="total">Total: $${total}</p>`))
		} else {
			$('.total').remove();
		};
	});

	//Payment Info section of the form:
	//Display payment sections based on the payment option chosen in the select menu
	//The "Credit Card" payment option should be selected by default, display the #credit-card div, and hide the "Paypal" and "Bitcoin information.
	//When a user selects the "PayPal" payment option, the Paypal information should display, and the credit card and “Bitcoin” information should be hidden.
	//When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.
	$('#payment option[value="credit card"]').prop('selected', true);
	$('#credit-card').next().hide().next().hide();
	$('#payment').change(function(){
		$('div').each(function(){
			$('div').show();
		})
		if($(this).val() === 'credit card'){
			$('#credit-card').next().hide().next().hide();
		}
		if($(this).val() === 'paypal'){
			$('#credit-card').hide().next().next().hide();
		}
		if($(this).val() === 'bitcoin'){
			$('#credit-card').hide().next().hide();
		}
	});

	// Form validation:
	// If any of the following validation errors exist, prevent the user from submitting the form:
	// Name field can't be blank
	// Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
	// Must select at least one checkbox under the "Register for Activities" section of the form.
	// If the selected payment option is "Credit Card," make sure the user has supplied a credit card number, a zip code, and a 3 number CVV value before the form can be submitted.
	// Credit card field should only accept a number between 13 and 16 digits
	// The zipcode field should accept a 5-digit number
	// The CVV should only accept a number that is exactly 3 digits long
	$('form').on('submit', function(event){
		// remove flash
		$('form p.vname').remove();
		$('form p.vmail').remove();
		$('form p.vchkbx').remove();
		$('form p.cc').remove();
		$('form p.zip').remove();
		$('form p.cvv').remove();

		if ($('#payment').val() === 'credit card'){
			let ccLength = $('#cc-num').val().length;
			
			// check cc cvv
			if ( $('#cvv').val().length < 3 || !validateNum($('#cvv').val()) ) {
				event.preventDefault();
				$('#cvv').focus().delay(400).effect('shake').addClass('validate');
				$('form').prepend('<p class="flash cvv">*** Credit card cvv field isn\'t valid')
			};
			// check zip code
			if ( $('#zip').val().length < 5 || !validateNum($('#zip').val()) ) {
				event.preventDefault();
				$('#zip').focus().delay(300).effect('shake').addClass('validate');
				$('form').prepend('<p class="flash zip">*** zip code field isn\'t valid')
			};
			// check credit card
			if ( (ccLength < 13 || ccLength > 16) || !validateNum($('#cc-num').val()) ) {
				event.preventDefault();
				$('#cc-num').focus().delay(400).effect('shake').addClass('validate').attr('placeholder','Enter a valid credit card');
				$('form').prepend('<p class="flash cc">*** Credit card field isn\'t valid')
			};
		
			// Form validation messages:
			// Provide some kind of indication when there’s a validation error. The field’s borders could turn red, for example, or a message could appear near the field or at the top of the form
			// There should be an error indication for the name field, email field, “Register for Activities” checkboxes, credit card number, zip code, and CVV
			// When JavaScript is switched off or unavailable, the user should still have access to all form fields and payment information. For example, the “Other” text field in the "Job Role" menu should be visible on the page when JavaScript is switched off, and all information for Bitcoin, Paypal or Credit Card payments should be visible.
			$('form').on('keyup change', (function(){
				$ccLength = $('#cc-num').val().length;
				let $cczip = $('#zip').val().length;
				let $cvv = $('#cvv').val().length;
				if ($('#name') !== ''){
					$('#name').removeClass('validate');
					$('form p.vname').remove();
				};
				if ( $('#mail') !== '' && validateEmail($('#mail').val()) ) {
					$('#mail').removeClass('validate');
					$('form p.vmail').remove();
				};
				if ( total !== 0) {
					$('.activities').removeClass('validate').children('label').removeClass('flash');
					$('form p.vchkbx').remove();
				};
				if ( $ccLength >= 13 && ccLength <= 16 ) {
					$('#cc-num').removeClass('validate');
					$('form p.cc').remove();
				};
				if ( $cczip === 5 ) {
					$('#zip').removeClass('validate');
					$('form p.zip').remove();
				};
				if ( $cvv === 3 ) {
					$('#cvv').removeClass('validate');
					$('form p.cvv').remove();
				};
			}));
		};

		// check activities checkbox's
		if ( total === 0 ){
			event.preventDefault();
			$('.activities').children('label').addClass('flash').parent().find('legend').focus().delay(400).effect('shake');
			$('form').prepend('<p class="flash vchkbx">*** Please select an activity to register');
		};
		// check email
		if ( validateEmail($('#mail').val() ) === false ){
			event.preventDefault();
			$('#mail').focus().delay(400).effect('shake').addClass('validate').attr('placeholder','Please enter a valid email');
			$('form').prepend('<p class="flash vmail">*** Email field isn\'t valid')
		};
		// check name field
		if ($('#name').val() === ''){
			event.preventDefault();
			$('#name').focus().delay(300).effect('shake').addClass('validate').attr('placeholder','Please enter your name');
			$('form').prepend('<p class="flash vname">*** Name field can\'t be blank')
		};
		
	});

}); // end jquery