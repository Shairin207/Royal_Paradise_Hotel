



// Custom jQuery UI Widget Factory


(function($){


    $.widget(
        "royal.ratingBox",


        {


            options: {

                title: "Guest Rating",

                stars: 5

            },



            _create:function(){


                let stars = "";


                for(let i = 0; i < this.options.stars; i++){

                    stars += "⭐";

                }



                this.element.html(

                    "<div class='rating-widget'>" +

                    "<h3>" + this.options.title + "</h3>" +

                    "<p>" + stars + "</p>" +

                    "</div>"
                );
            }
        }
    );
})(jQuery);

// Activate custom widget

$(function(){


    $("#rating").ratingBox({

        title:"Guest Rating",

        stars:5

    });


});