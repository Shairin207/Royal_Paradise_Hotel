  
// Live Offer Slider
  
const offerElement = document.getElementById("specialOffer");

const offers = [

    {
        text: "Welcome to Royal Paradise Luxury Hotel",
        style: "offer-gold"
    },

    {
        text: "Enjoy 10% off selected weekday stays",
        style: "offer-blue"
    },

    {
        text: "Relax by the pool and enjoy fine dining",
        style: "offer-green"
    }

];

let offerIndex = 0;


  function changeOffer(){    
    offerIndex = (offerIndex + 1) % offers.length;

    offerElement.textContent =
        offers[offerIndex].text;


    offerElement.className =
        "offer-message " + offers[offerIndex].style;


}

if(offerElement){

    setInterval(changeOffer,3000);

}   
// Facilities Show / Hide
  


const facilityButton = document.getElementById("facilityButton");


const facilityDetails = document.getElementById("facilityDetails");

 if(facilityButton && facilityDetails){ 
    facilityButton.addEventListener("click",function(){ 
        facilityDetails.classList.toggle("hidden");         
        facilityButton.textContent = facilityDetails.classList.contains("hidden")
        ? "Show Facilities"
        : "Hide Facilities"; 
    }); 
}    
// Video Controls
  


const hotelVideo = document.getElementById("hotelVideo");


const playButton = document.getElementById("playVideo");


const pauseButton = document.getElementById("pauseVideo");


const videoStatus = document.getElementById("videoStatus");

if(hotelVideo && playButton && pauseButton && videoStatus){

    playButton.addEventListener("click",function(){


        hotelVideo.play();


        videoStatus.textContent =
        "Video is playing.";


    });

    pauseButton.addEventListener("click",function(){


        hotelVideo.pause();


        videoStatus.textContent =
        "Video is paused.";


    });
    hotelVideo.addEventListener("ended",function(){


        videoStatus.textContent =
        "Video finished.";
    });
}