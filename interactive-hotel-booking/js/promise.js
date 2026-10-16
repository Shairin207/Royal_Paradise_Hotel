// Promise-based booking system

function bookingPromise(){


    return new Promise(function(resolve, reject){


        let roomAvailable = false;



        setTimeout(function(){


            if(roomAvailable){


                resolve(
                    "Booking successful. Your room has been reserved."
                );


            }

            else{


                reject(
                    "Room unavailable. No rooms are available for selected dates."
                );


            }


        }, 2000);



    });


}

bookingPromise()


.then(function(result){


    console.log(result);


})

.catch(function(error){

    console.log(error);

    // Second action after Promise rejection

    console.log(
        "Displaying alternative available rooms."
    );


});