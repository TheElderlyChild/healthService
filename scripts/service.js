const setDateFormat = "mm/dd/yy";

var days = [
    "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
]

var workdays = {
    
	"Jane Kirschoff":{
		name: "Jane Kirschoff",
        "sunday": false,
        "monday": false,
        "tuesday": false,
        "wednesday": true,
        "thursday": false,
        "friday": true,
        "saturday": false,
	},
	"Richard Yaeger":{
		name: "Richard Yaeger",
        "sunday": false,
        "monday": false,
        "tuesday": true,
        "wednesday": false,
        "thursday": true,
        "friday": true,
        "saturday": false,
	},
	"Lisa Ackermann":{
		name: "Lisa Ackermann",
        "sunday": false,
        "monday": true,
        "tuesday": true,
        "wednesday": true,
        "thursday": false,
        "friday": false,
        "saturday": false,
	}
}
	

function disableDates(date) {
    //if 
    // "sunday" is Day 0, disable all "sunday"

    var doctor=$("#selDoctor").find(":selected").text();
    if (!(doctor in workdays)){
        return [false];
    }

    return [workdays[doctor][days[date.getDay()]]];
}

function validatePhone(inputtxt)
{
    var value = document.getElementById(inputtxt).value;

    var filter = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(filter.test(value))
        {
        return true;
        }
    else
        {
        return false;
        }
}

function validateCard(inputtxt)
{
    var value = document.getElementById(inputtxt).value;

    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;

    var isVisa = visaRegEx.test(value) === true;
    var isMastercard = mastercardRegEx.test(value) === true;

    if(isVisa || isMastercard)
        {
        return true;
        }
    else
        {
        return false;
        }
}

// HERE, JQuery "LISTENING" starts
$(document).ready(function(){

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
 
    $("#phoneNo").on("change", function(){
        if (!validatePhone("phoneNo")){
            alert("Wrong format for phone. Please use this format: XXX XXX XXXX");
            $("#phoneNo").addClass("error");
        }
        else {
            $("#phoneNo").removeClass("error");
        }
    });

    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery
    // You can try different themes (the names are under the calendars) / This is Excite Bike
    // To use a different theme you must include its css in your HTML file.
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/
    $("#dateInput").datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/01/2020'),
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates
        }
    );


    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put


    // https://jqueryui.com/tooltip/
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)

    $("#creditCard").on("change", function(){
        if (!validateCard("creditCard")){
            alert("Wrong format for credit card number. Please use either a VISA or Mastercard");
            $("#creditCard").addClass("error");
        }
        else {
            $("#creditCard").removeClass("error");
        }
    });

    $("#creditCard").on("mouseenter", function(){
        $("#creditCard").addClass("showInput");
    });

    $("#creditCard").on("mouseleave", function(){
        $("#creditCard").removeClass("showInput");
    });

    // https://jqueryui.com/tooltip/
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#creditCard").tooltip({
        classes: {
            "ui-tooltip": "highlight"
        }
    });

});