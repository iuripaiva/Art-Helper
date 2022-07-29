import config from "./config.js";
const API_Key = config;

const authorName = document.querySelector(".art__author");
const artName = document.querySelector(".art__name");
const RealArt = document.querySelector(".art__real");
const FakeArt = document.querySelector(".art__fake");
const artAuthenticity = document.querySelector(".art__authenticity");
const artDescription = document.querySelector(".art__description");
const artPrice = document.querySelector(".art__price");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

const fetchArt = async () => {
  
  const APIResponse = await fetch(
    `https://api.nookipedia.com/nh/art?api_key=${API_Key}`
  );

  const data = await APIResponse.json();

  for (let i = 0; i < data.length; i++) {
    if (isNaN(input.value)) {
      if (
        data[i].name == input.value ||
        data[i].name.toLowerCase() == input.value.toLowerCase()
      ) {
        return data[i]; // Will only return the searched data if it fits the required conditions above
      }
    }
  }
};

const renderArt = async () => {
  const data = await fetchArt();

  if (data === undefined) { // Check if the data inputted exists in the JSON
    alert(
      "Invalid art name. You must fill the text field with a valid art name."
    );
    show("Page1", "Page2");
    input.value = "";
  }

  if (
    isNaN(input.value) &&
    input.value.toUpperCase() == data.name.toUpperCase()
  ) {
    authorName.innerHTML = data.author;
    artName.innerHTML = data.art_name;
    RealArt.src = data.image_url;
    if (data.has_fake) { // Check if the searched art piece contains a fake version.
      FakeArt.src = data.fake_image_url;
      document.querySelector(".span__fake").innerHTML = 'Fake'; // If so, the text "Fake" will appear normally
    } else {
      FakeArt.src = 'img/genuine.svg';
      document.querySelector(".span__fake").innerHTML = '<del>Fake</del>'; // If not, the "Fake" text will switch to a scratched version.
    }
    artAuthenticity.innerHTML = data.authenticity;
    artDescription.innerHTML = data.description;
    artPrice.innerHTML = data.buy;
    show("Page2", "Page1");
    input.value = "";
  }
};

form.addEventListener("submit", (event) => { // Add a listener to the submit button on the form, and execute the query to the API with the inputted value
  event.preventDefault();
  renderArt(input.value);
});
