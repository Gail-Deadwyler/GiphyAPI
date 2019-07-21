$(document).ready(function(){

    // Starter array of supers
    var topics = ["wonder woman", "superman", "captain america", "iron man"];

    // this function re-renders the HTML to display the appropriate content
    function displaySuperInfo() {

        var MySuperHeros = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        MySuperHeros + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&rating=g";

    // Creating an AJAX call for the specific super hero button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            console.log(response);

        });





    }

    // Displays super information
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
        }
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

    // Call the renderButtons function at least once to display the initial list of supers
    renderButtons();



});

