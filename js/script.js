// ========== Variables & Constants ==========
//base url & API key
// const BASE_URL = "https://www.giantbomb.com/api";
// const API_KEY = "74eac851eddd98d383885278b2969c6c35af31a8";
//cache & store relevant DOM elements
const $image = $(`#gameImage`);
const $title = $(`#gameTitle`);
const $description = $(`#gameDescription`);
const $learnMore = $(`#learnMore`);
const $GBLink = $(`#GBLink`);
//-->add aditional for platforms/multiplayer/etc.
const $input = $(`input[type="text"]`);

//variable to extract & store user input and store data from AJAX call to API
let userInput, gameData;

// ========== Event Listeners ==========
$(`form`).on(`submit`, handleGetData);

// ========== Functions ==========
//hand the request for data to the Giant Bomb API
function handleGetData(event) {
    //prevent the default 'submit' element behavior
    event.preventDefault();

    //get the value/text from the user input element
    userInput = $input.val();
    console.log(userInput);
    //then clear the input element
    $input.val("");

    //make a request to the API using the user input
    $.ajax({
        url: `https://www.giantbomb.com/api/search`,
        dataType: `jsonp`,
        jsonp: `json_callback`,
        data: {
            api_key: `74eac851eddd98d383885278b2969c6c35af31a8`,
            query: `${userInput}`,
            format: `jsonp`,
            resources: `game`,
            //field_list: 'name',
        }
        // url:`${BASE_URL}/game/?api_key=${API_KEY}&format=jsonp&json_callback=logResults&resource_type=game&query=${userInput}`
    }).then(
        //on success
        (data) => {
            gameData = data.results;
            console.log(gameData);
            render();
        },
        //on fail
        (error) => {
            console.log(`error: `, error);
        }
    );
}

// render/display the data that was returned by a successful API call
function render() {
    $title.text(gameData[0].name)
    $description.text(gameData[0].deck)
    $image.attr({
        src: gameData[0].image.original_url,
        title: `Cover Image`,
        alt: `Game Cover Image`,
    });
    $learnMore.html(`<a href="${gameData[0].site_detail_url}" target="blank">More Info Here</a>`)
    console.log(gameData[0].site_detail_url);
}


/* ========== Resources ==========

    - GiantBomb developer forum - confirmation of implementation of jsonp for their API - https://www.giantbomb.com/forums/api-developers-3017/jsonpcallback-support-226006/
    - JSONP (JSON with Padding) - https://en.wikipedia.org/wiki/JSONP
    - jQuery & JSONP - https://learn.jquery.com/ajax/working-with-jsonp/
    - jQuery & JSONP Examples - https://www.sitepoint.com/jsonp-examples/
    - using JSONP to call GiantBomb API (example code) - https://pastebin.com/4xfsMcCJ

==================================
*/