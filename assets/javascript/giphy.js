// when HTML page loads, start this script
$(document).ready(function(){

    // Starter array of supers
    var topics = ["wonder woman", "superman", "captain america", "iron man"];

    // this function re-renders the HTML to display the appropriate content
    function displaySuperInfo() {

        // Empty the contents of my placeholder on the index page (div with id of super_giphys)
        $("#super_giphys").empty();

        var MySuperHeros = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        MySuperHeros + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creating an AJAX call for the specific super hero button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // wait until I get my requested data and then do the dirty work
        .then(function(response) {

            console.log(response);

            //var stringified_resonse = JSON.stringify(response);

            //console.log(stringified_resonse);
            console.log(queryURL);

            // $("#buttons-view").text(JSON.stringify(response));

            // store the API call results into myResults
            var myResults = response.data;

            // loop through myResults
            for (var i = 0; i < myResults.length; i++ ) {

            console.log("myResults length is " + myResults.length);

            // create a div here
            var myDiv = $("<div>");

            // put ratings from loop into var rating
            var rating = myResults[i].rating;
            console.log(rating);            

            
            // var h3 = $("<h3>").text("Rating: " + myResults[i].rating);

            // create a h3 tag that holds the rating
            var h3 = $("<h3>").text("Rating: " + rating);


            // console.log("h3 is " + typeof h3);
            // console.log(typeof myResults[i].rating)
            // console.log("Each cycle of Ratings loop: " + rating);
            // console.log("h3 - each loop cycle is " + h3);

            // create a img tag here
            var myImg = $("<img>");

            // Setting the src attribute of the img to a property pulled off the result item

            // animated giphy
            myImg.attr("data-animate", myResults[i].images.fixed_height.url);

            //non-animated giphy
            myImg.attr("src", myResults[i].images.fixed_height_still.url);

            // set data-still attribute
            myImg.attr("data-still", myResults[i].images.fixed_height_still.url);

            //set data-state to still
            myImg.attr("data-state", "still");

            // add gif class
            myImg.attr("class", "gif");

            console.log("img result is" + myResults[i].images.fixed_height_still.url);            
            

            // append h3 and img tags to myDiv
            myDiv.append(h3,myImg);

            //append myDiv to my placeholder on the index page (div with id super_giphys)
            $("#super_giphys").append(myDiv);                  

            // end for loop
            } 

            // Pausing animation here         
            $(".gif").on("click", function() {                
                
                var state = $(this).attr("data-state");          
               
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
        
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } 
                
                else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });     
            
        // function(response) end
        });

    // end displaySuperInfo()
    }

    // Display my buttons dynamically
    function renderButtons() {

        // Deleting the super heros buttons prior to adding new super hero buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Loop through the array of super heros
        for (var i = 0; i < topics.length; i++) {

        // Dynamically generate buttons for each super hero in the array.     
        var super_btn = $("<button>");

        // Add a class
        super_btn.addClass("super");

        // Add a data-attribute with a value of the super hero at index i
        super_btn.attr("data-name", topics[i]);

        // Provide the button's text with a value of the super at index i
        super_btn.text(topics[i]);

        // Add the button to the div I created in my HTML
        $("#buttons-view").append(super_btn);

        // end for loop
        }
    // end RenderButtons()
    }

    // This function handles events where one button is clicked
    $("#add-super").on("click", function(event) {

        // event.preventDefault() prevents the form from trying to submit itself    
        event.preventDefault();

        // Get text from the input box -trim away white space and force lower case
        var superhero = $("#supers-input").val().trim().toLowerCase();

        // The superhero from the textbox is then added to my array
        topics.push(superhero);

        // call renderButtons to handle the processing of the superhero array
        renderButtons();
    });

    // Add a click event listener to all buttons with a class of "super"
    $(document).on("click", ".super", displaySuperInfo);

     // Empty the contents of my placeholder on the index page (div with id of super_giphys)
    // $("#super_giphys").empty();

    // Call the renderButtons function at least once to display the initial list of supers
    renderButtons();


// end of entire script
});

