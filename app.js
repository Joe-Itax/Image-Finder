const contentBox = document.querySelector("#content-box");//La section
const imgBox = document.querySelector("#img-box"); //section>div
const image = document.querySelector(".image");//section>div>.image
const url = "https://api.pexels.com/v1/search?query=natur&per_page=20";
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
          <img src="${data.photos[i].src.large2x}" alt="${data.photos[i].alt}" />
          <figcaption><i class="ri-user-fill"></i></figcaption>
          <a href="${data.photos[i].photographer_url}" target="_blank">${data.photos[i].photographer}</a>
        </figure>
      </div>
      `;
    }
    imgBox.innerHTML = html;
  })


/*
const img = document.createElement("img");
imgBox.appendChild(img);

const getData = async () => {
  const response = await fetch("https://api.unsplash.com/photos/random/?client_id=OHXabCxP14DXrZMvtHr7qFjUeLe7DvnncGA_LAC_dm0&query=nature&color=green);
  const data = await response.json();
  img.src = data.urls.regular;
  img.alt = data.alt_description;
  console.log(data);
  // console.log(data.urls.regular);
  // let html = ""; //Variable qui va stocker le code html
  /*for (let i = 0; i < data.photos.length; i++) {
    html += `
    <div class="image">
        <figure>
          <img src="${data.photos[i].src.portrait}" alt="${data.alt_description}" />
          <figcaption><a href="${data.photos[i].photographer_url}" target="_blank">Photographer: ${data.photos[i].photographer}</a></figcaption>
        </figure>
      </div>
      `;
  }
  // imgBox.innerHTML = html;
}

getData();

*/