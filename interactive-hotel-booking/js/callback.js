


// Callback based booking system


function checkRoom(callback){


    setTimeout(function(){


        console.log(
            "Room availability checked"
        );


        callback();


    },2000);


}

function confirmBooking(){


    setTimeout(function(){


        console.log(
            "Booking confirmed successfully"
        );


    },2000);


}

checkRoom(function(){
    confirmBooking();

});