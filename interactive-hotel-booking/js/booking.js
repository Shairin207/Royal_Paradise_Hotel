
const bookingForm = document.getElementById("bookingForm");

const roomType = document.getElementById("roomType");

const checkIn = document.getElementById("checkInDate");

const checkOut = document.getElementById("checkOutDate");

const formMessage = document.getElementById("formMessage");


const rooms = {

    luxury:{
        name:"Luxury Suite",
        price:500
    },

    deluxe:{
        name:"Deluxe Suite",
        price:350
    },

    premium:{
        name:"Premium Suite",
        price:250
    }

};

// Password validation

function checkPassword(){


    let password =
    document.getElementById("bookingPassword").value;



    return (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password)
    );


}
// Calculate nights safely

function calculateNights(){


    if(!checkIn.value || !checkOut.value){

        return 0;

    }

    let start = new Date(checkIn.value);

    let end = new Date(checkOut.value);

    let difference =
    end.getTime() - start.getTime();



    return Math.ceil(
        difference / (1000*60*60*24)
    );


}


// Live calculator

function updateEstimate(){


    let room = rooms[roomType.value];


    let nights = calculateNights();

    let facilities =
    Array.from(
        document.querySelectorAll(".facility-checkbox:checked")
    )
    .map(function(item){

        return item.value;

    });

    document.getElementById("estimateRoom").textContent =

    room ? room.name : "Not selected";

    document.getElementById("estimateRate").textContent =

    room ? "$"+room.price : "$0";

    document.getElementById("estimateNights").textContent =

    nights;

    document.getElementById("estimateFacilities").textContent =

    facilities.length
    ? facilities.join(", ")
    : "None";

    document.getElementById("estimateTotal").textContent =


    room && nights > 0

    ? "$" + (room.price * nights)

    : "$0";

}

//live calculator

roomType.addEventListener(
"change",
updateEstimate
);

checkIn.addEventListener(
"change",
updateEstimate
);

checkOut.addEventListener(
"change",
updateEstimate
);

document.querySelectorAll(".facility-checkbox")
.forEach(function(box){


    box.addEventListener(
    "change",
    updateEstimate
    );


});
// Booking submit

bookingForm.addEventListener(
"submit",
function(e){
    e.preventDefault();

    let name =
    document.getElementById("fullName").value.trim();

    let email =
    document.getElementById("email").value.trim();

    if(name.length < 2){

        formMessage.textContent =
        "Please enter your name.";
        return;

    }
    if(!email.includes("@")){

        formMessage.textContent =
        "Enter a valid email.";

        return;
    }

    if(!checkPassword()){

        formMessage.textContent =
        "Password must contain 8 characters, uppercase, lowercase and number.";

        return;
    }
    if(!roomType.value || !checkIn.value || !checkOut.value){


        formMessage.textContent =
        "Please complete booking details.";

        return;


    }
    window.location.href = "booking-confirmation.html";

});