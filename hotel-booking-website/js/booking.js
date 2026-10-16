const bookingForm = document.getElementById("bookingForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("bookingPassword");
const roomType = document.getElementById("roomType");
const checkIn = document.getElementById("checkInDate");
const checkOut = document.getElementById("checkOutDate");
const formMessage = document.getElementById("formMessage");

const roomData = {
    luxury: { name: "Luxury Suite", rate: 500 },
    deluxe: { name: "Deluxe Suite", rate: 350 },
    premium: { name: "Premium Suite", rate: 250 }
};


// Show an error under an input
function showError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;
    input.classList.add("invalid");
    input.classList.remove("valid");
    return false;
}


// Clear the error when the input is valid
function showValid(input, errorId) {
    document.getElementById(errorId).textContent = "";
    input.classList.remove("invalid");
    input.classList.add("valid");
    return true;
}


function validateName() {
    if (fullName.value.trim().length < 2) {
        return showError(fullName, "fullNameError", "Please enter your full name.");
    }

    return showValid(fullName, "fullNameError");
}


function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        return showError(email, "emailError", "Please enter a valid email address.");
    }

    return showValid(email, "emailError");
}


// 2(c): check the password using our own JavaScript
function validatePassword() {
    const value = password.value;
    const hasLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    if (!hasLength || !hasUppercase || !hasLowercase || !hasNumber) {
        return showError(
            password,
            "passwordError",
            "Password needs 8+ characters, uppercase, lowercase and a number."
        );
    }

    return showValid(password, "passwordError");
}


function validateRoom() {
    if (!roomType.value) {
        return showError(roomType, "roomTypeError", "Please select a room.");
    }

    return showValid(roomType, "roomTypeError");
}


function validateDates() {
    let valid = true;

    if (!checkIn.value) {
        showError(checkIn, "checkInError", "Please choose a check-in date.");
        valid = false;
    } else {
        showValid(checkIn, "checkInError");
    }

    if (!checkOut.value) {
        showError(checkOut, "checkOutError", "Please choose a check-out date.");
        valid = false;
    } else if (checkIn.value && new Date(checkOut.value) <= new Date(checkIn.value)) {
        showError(checkOut, "checkOutError", "Check-out must be after check-in.");
        valid = false;
    } else {
        showValid(checkOut, "checkOutError");
    }

    return valid;
}


// Give simple password feedback while typing
password.addEventListener("input", function () {
    const message = document.getElementById("passwordMessage");

    if (password.value.length === 0) {
        message.textContent = "Use 8+ characters with uppercase, lowercase and a number.";
    } else if (validatePassword()) {
        message.textContent = "Strong password.";
    } else {
        message.textContent = "Keep adding the required characters.";
    }
});


// 2(e): calculate the room price from the room and dates
function updateEstimate() {
    const room = roomData[roomType.value];
    const estimateRoom = document.getElementById("estimateRoom");
    const estimateRate = document.getElementById("estimateRate");
    const estimateNights = document.getElementById("estimateNights");
    const estimateFacilities = document.getElementById("estimateFacilities");
    const estimateTotal = document.getElementById("estimateTotal");

    let nights = 0;

    if (checkIn.value && checkOut.value) {
        const start = new Date(checkIn.value);
        const end = new Date(checkOut.value);
        const difference = end - start;

        if (difference > 0) {
            nights = Math.ceil(difference / (1000 * 60 * 60 * 24));
        }
    }

    const selectedFacilities = Array.from(
        document.querySelectorAll(".facility-checkbox:checked")
    ).map(function (item) {
        return item.value;
    });

    estimateRoom.textContent = room ? room.name : "Not selected";
    estimateRate.textContent = room ? `$${room.rate}` : "$0";
    estimateNights.textContent = nights;
    estimateFacilities.textContent = selectedFacilities.length
        ? selectedFacilities.join(", ")
        : "None";
    estimateTotal.textContent = room && nights > 0
        ? `$${room.rate * nights}`
        : "$0";
}

roomType.addEventListener("change", updateEstimate);
checkIn.addEventListener("change", updateEstimate);
checkOut.addEventListener("change", updateEstimate);

document.querySelectorAll(".facility-checkbox").forEach(function (checkbox) {
    checkbox.addEventListener("change", updateEstimate);
});


// 2(d): validate the form when it is submitted
bookingForm.addEventListener("submit", function (event) {
    const nameOk = validateName();
    const emailOk = validateEmail();
    const passwordOk = validatePassword();
    const roomOk = validateRoom();
    const datesOk = validateDates();

    if (!nameOk || !emailOk || !passwordOk || !roomOk || !datesOk) {
        event.preventDefault();
        formMessage.textContent = "Please fix the highlighted fields before submitting.";
        formMessage.className = "form-message error-text";
        return;
    }

    // This assignment website has no server, so show a success message instead.
    event.preventDefault();
    formMessage.textContent = "Form is valid. Your booking details are ready to submit.";
    formMessage.className = "form-message success-text";
});
