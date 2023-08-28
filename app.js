const contentBox = document.querySelector("#content-box");//La section
const imgBox = document.querySelector("#img-box"); //section>div
const image = document.querySelector(".image");//section>div>.image
const btnValidate = document.querySelector("#btnValidate");
const searchValue = document.querySelector("#search");
const titltOfRsearch = document.querySelector(".title-of-research");
//Valeur par défaut
const listDefaultQuery = ["image", "random", "world", "space", "natur", "animals", "food", "city", "landscape", "sports", "business", "abstract", "technology", "music", "architecture", "fashion", "travel", "vintage", "art", "mountain", "ocean", "forest", "sunset", "beach", "flowers", "cars", "books", "coffee", "rain", "winter", "summer", "fall", "spring", "pets", "family", "friends", "love", "happiness", "adventure", "party", "celebration", "colorful", "relaxation", "workout", "wildlife", "reflection", "serenity", "inspiration", "cuisine", "fitness", "water", "sky", "stars", "try"];
const randomQuery = Math.floor(Math.random() * (listDefaultQuery.length));
const query = listDefaultQuery[randomQuery];
titltOfRsearch.textContent = query;
console.log(query);
let url = `https://api.pexels.com/v1/search?query=${query}&per_page=15`;
fetch(url, {
  headers: {
    Authorization: "PUpg6u4IM4rBsAkLq5vVcmS4c03dj6TkcVOrDM9AYPo6tE9UUqhw77UC"
  }
})

  .then(response => response.json())
  .then(data => {
    console.log(data);
    // console.log(data.photos[0].id);
    let html = ""; //Variable qui va stocker le code html
    for (let i = 0; i < data.photos.length; i++) {
      html += `
    <div class="image">
        <figure>
          <img src="${data.photos[i].src.large2x}" alt="${data.photos[i].alt}" title="${data.photos[i].alt}"/>
          <figcaption><i class="ri-user-fill"></i></figcaption>
          <a href="${data.photos[i].photographer_url}" target="_blank">${data.photos[i].photographer}</a>
        </figure>
      </div>
      `;
    }
    imgBox.innerHTML = html;
  })

//Selon l'input du user
const onValidate = (event) => {
  event.preventDefault();
  const query = searchValue.value;
  titltOfRsearch.textContent = query;
  console.log(query);
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=15`;
  fetch(url, {
    headers: {
      Authorization: "PUpg6u4IM4rBsAkLq5vVcmS4c03dj6TkcVOrDM9AYPo6tE9UUqhw77UC"
    }
  })

    .then(response => response.json())
    .then(data => {
      console.log(data);
      // console.log(data.photos[0].id);
      let html = ""; //Variable qui va stocker le code html
      for (let i = 0; i < data.photos.length; i++) {
        html += `
    <div class="image">
        <figure>
          <img src="${data.photos[i].src.large2x}" alt="${data.photos[i].alt}" title="${data.photos[i].alt}"/>
          <figcaption><i class="ri-user-fill"></i></figcaption>
          <a href="${data.photos[i].photographer_url}" target="_blank">${data.photos[i].photographer}</a>
        </figure>
      </div>
      `;
      }
      imgBox.innerHTML = html;
    })
}

btnValidate.addEventListener("click", onValidate);

searchValue.addEventListener("keydown", (event) => { // Ajout pour écouter l'événement keydown sur l'input searchValue
  if (event.key === "Enter") { // Vérifie si la touche appuyée est "Enter"
    onValidate(event); // Appelle la fonction onValidate avec l'événement en paramètre
  }
});
