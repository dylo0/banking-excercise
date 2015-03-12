$(document).ready(function() {
    $.fn.autotab=function(focus){for(var i=0;i<this.length;i++){var n=i+1;var p=i-1;if(i>0&&n<this.length)$(this[i]).autotabFunction({target:$(this[n]),previous:$(this[p])});else if(i>0)$(this[i]).autotabFunction({previous:$(this[p])});else $(this[i]).autotabFunction({target:$(this[n])});if(focus!=null&&(isNaN(focus)&&focus==$(this[i]).attr('id'))||(!isNaN(focus)&&focus==i))$(this[i]).focus()}return this};
    $.fn.autotabFunction=function(options){var defaults={maxlength:2147483647,};$.extend(defaults,options);var maxlength=$(this).attr('maxlength');if(defaults.maxlength==2147483647&&maxlength!=2147483647){defaults.maxlength=maxlength}else if(defaults.maxlength>0){$(this).attr('maxlength',defaults.maxlength)}else{defaults.target=null}return $(this).bind('keydown',function(e){if(e.which==8&&this.value.length==0&&defaults.previous){defaults.previous.focus().val(defaults.previous.val())}}).bind('keyup',function(e){var keys=[8,9,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46,144,145];if(e.which!=8){var val=$(this).val();if($.inArray(e.which,keys)==-1&&val.length==defaults.maxlength&&defaults.target){defaults.target.focus()}}})};
    //specify element to autotab
    $.when($('#ssn1'), $('#ssn2'), $('#ssn3')).then(function () { $('#ssn1, #ssn2, #ssn3').autotab(); });
    $.when($('#verifyssn1'), $('#verifyssn2'), $('#verifyssn3')).then(function () { $('#verifyssn1, #verifyssn2, #verifyssn3').autotab(); });
    $.when($('#phone1'), $('#phone2'), $('#phone3')).then(function () { $('#phone1, #phone2, #phone3').autotab(); });
    
    //strip white space and validate
    $('form').submit(function() {
        $(':input:text').each(function(index) {
            $(this).val($.trim($(this).val()));
        });
        
        if ($('#cc_cvv').length > 0)
        {
            $('#cc_cvv').val($('#cc_cvv').val().replace(/[^0-9\s]/gi, '').replace(/[_\s]/g, '-'));
        }
    });

    //CC EXP
    var today = new Date();
    var selectedYear;
    var selectedMonth;
	
    var pad = function (n) {
	    n=n+1;
        return n<10 ? '0'+n : n
    };
	
	//Get Current Values
	function getCurrent() {
		if($('[name="cc_exp_year"]').length > 0) { selectedYear  = parseInt($('[name="cc_exp_year"]').val());}
		else {selectedYear  = parseInt($('[name="creditcardexpyear"]').val());}
		if($('[name="cc_exp_month"]').length > 0) {selectedMonth = parseInt($('[name="cc_exp_month"]').val(), 10) - 1;}
		else {selectedMonth  = parseInt($('[name="creditcardexpmonth"]').val(), 10) - 1;}
	}
    
    function resetYearOptions(start) {
		getCurrent();
		
    	//TU
        $('select[name="cc_exp_year"] > option').remove();
        $('select[name="cc_exp_year"]').append('<option value="0">Year</option>');
        for (var i=start; i<20; i++) {
            var value = today.getFullYear()+i;
            $('select[name="cc_exp_year"]').append('<option value="'+value+'">'+value+'</option>');
        }
        $('select[name="cc_exp_year"]').val(selectedYear);
        
        //EQ
        $('select[name="creditcardexpyear"] > option').remove();
        $('select[name="creditcardexpyear"]').append('<option value="0">Year</option>');
        for (var i=start; i<20; i++) {
            var value = today.getFullYear()+i;
            $('select[name="creditcardexpyear"]').append('<option value="'+value+'">'+value+'</option>');
        }
        $('select[name="creditcardexpyear"]').val(selectedYear);
    }
	
	
	//change first option of  EQ month fields to say "Month"
	$("#creditcardexpmonth option[value='0']").remove();
	$("#creditcardexpmonth").prepend('<option value="0">Month</option>');
    
	//When month changes change they year
    //TU
    $('[name^="cc_exp_month"]').change(function() {
    	var selectedMonth = parseInt($('[name="cc_exp_month"]').val(), 10) - 1;
        if (selectedMonth<today.getMonth()) {
        resetYearOptions(1);
        }
        else {resetYearOptions(0);}

	});
    
    //EQ
    $('[name^="creditcardexpmonth"]').change(function() {
    	var selectedMonth = parseInt($('[name="creditcardexpmonth"]').val(), 10) - 1;
        if (selectedMonth<today.getMonth()) {
        resetYearOptions(1);
        }
        else {resetYearOptions(0);}

	});
    
    resetYearOptions(0);
	getCurrent();
    
    //TU
	$('select[name="cc_exp_month"]').val(pad(selectedMonth));
        if (selectedMonth<today.getMonth()) {
        resetYearOptions(1);
        }
        else {resetYearOptions(0);}
    
    //EQ
	$('select[name="creditcardexpmonth"]').val(pad(selectedMonth));
        if (selectedMonth<today.getMonth()) {
        resetYearOptions(1);
        }
        else {resetYearOptions(0);}

    $('form').submit(function (e) {
        $('button, input[type="submit"]', this).attr('disabled', 'disabled');
    });    //-->

    var keepsession = function () {
        $.post("/keepalive/", {"type":"Keep Alive","id":22,"b":"LP1000","subid":""} );
    }
    var timer = setInterval(keepsession,15*60*1000);
    $(window).unload(function () { 
        clearInterval(timer);
    });    
});

