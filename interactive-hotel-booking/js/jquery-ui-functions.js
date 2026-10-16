

$(document).ready(function(){
    // Widget 1: Room Accordion
    $("#roomAccordion").accordion({

        collapsible: true,

        heightStyle: "content",

        active: false

    });
    // Widget 2: Booking Date Picker
    $("#checkInDate").datepicker({

        minDate: 0,

        dateFormat: "yy-mm-dd"

    });



    $("#checkOutDate").datepicker({

        minDate: 0,

        dateFormat: "yy-mm-dd"

    });



});