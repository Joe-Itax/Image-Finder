// Gérer les hovers des images
const image = document.querySelector('.image');
const detailImg = document.querySelector('figcaption.detail-img');
const linkPhotographer = document.querySelector('.link-photographer'); 
const btnDownloadIcon = document.querySelector('.btn-download-icon');

// Par défaut, on cache les éléments de "figcaption"
// detailImg.style.display = 'none';
detailImg.style.visibility = 'hidden';

// On ajoute un listener sur l'image pour gérer le hover
const hoverImg = ()=>{
  // On assombrit l'image
  image.style.filter = 'brightness(80%)';
  // On affiche les éléments de "figcaption"
  detailImg.style.visibility = 'visible';
}
image.addEventListener('mousemove', hoverImg);
linkPhotographer.addEventListener('mousemove', hoverImg);

// On ajoute un listener sur les éléments de "figcaption" pour gérer le hover
detailImg.addEventListener('mousemove', () => {
  // On garde l'image assombrie
  image.style.filter = 'brightness(80%)';
});







const contentBox = document.querySelector('#content-box'); //La section
const imgBox = document.querySelector('#img-box'); //section>div
//section>div>.image
const btnValidate = document.querySelector('#btnValidate');
const searchValue = document.querySelector('#search');
const titltOfRsearch = document.querySelector('.title-of-research');
//Valeur par défaut de la page
const listDefaultQuery1 = [
  'image',
  'random',
  'world',
  'space',
  'natur',
  'animals',
  'food',
  'city',
  'landscape',
  'sports',
  'business',
  'abstract',
  'technology',
  'music',
  'architecture',
  'fashion',
  'travel',
  'vintage',
  'art',
  'mountain',
  'ocean',
  'forest',
  'sunset',
  'beach',
  'flowers',
  'cars',
  'books',
  'coffee',
  'rain',
  'winter',
  'summer',
  'fall',
  'spring',
  'pets',
  'family',
  'friends',
  'love',
  'happiness',
  'adventure',
  'party',
  'celebration',
  'colorful',
  'relaxation',
  'workout',
  'wildlife',
  'reflection',
  'serenity',
  'inspiration',
  'cuisine',
  'fitness',
  'water',
  'sky',
  'stars',
  'try',
];
const listDefaultQuery2 = [
  'artifice',
  'energy',
  'escape',
  'futuristic',
  'gluttony',
  'humor',
  'mystery',
  'still life',
  'passion',
  'romantic',
  'creativity',
  'adventure',
  'shapes',
  'balance',
  'exploration',
  'harmony',
  'tranquility',
  'discovery',
  'dynamism',
  'magic',
  'authenticity',
  'imagination',
  'meditation',
  'minimalism',
  'nostalgia',
  'optimism',
  'emotion',
  'spirituality',
  'spontaneity',
  'journey',
  'peace of mind',
  'textures',
  'adventurous',
  'air',
  'entertainment',
  'friends',
  'love',
  'happiness',
  'watercolor',
  'tradition',
  'celebration',
  'colorful',
  'urbain',
  'lifestyles',
  'wildlife',
  'reflection',
  'serenity',
  'inspiration',
  'kitchen',
  'fitness',
  'water',
  'sky',
  'stars',
  'innovation',
];
const randomQuery1 = Math.floor(Math.random() * listDefaultQuery1.length);
const randomQuery2 = Math.floor(Math.random() * listDefaultQuery2.length);
const query1 = listDefaultQuery1[randomQuery1];
const query2 = listDefaultQuery2[randomQuery2];
titltOfRsearch.textContent = `${query1} and ${query2}`;
console.log(`${query1} and ${query2}`);
let url = `https://api.pexels.com/videos/search?query=${query1}+and+${query2}&per_page=20`;
fetch(url, {
  headers: {
    Authorization: 'PUpg6u4IM4rBsAkLq5vVcmS4c03dj6TkcVOrDM9AYPo6tE9UUqhw77UC',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // console.log(data.photos[0].id);
    let html = ''; //Variable qui va stocker le code html
    for (let i = 0; i < data.videos.length; i++) {
      html += `
    <div class="image">
      <video controls autoplay loop width="300">
        <source src="${data.videos[i].video_files[0].link}" type="video/mp4" />
      </video>
      </div>
      `;
      /*<figure>
          <figcaption>
            <i class="ri-user-fill"></i>
            
          </figcaption>
        </figure>*/
    }
    imgBox.innerHTML = html;
  });

//Selon l'input du user
const onValidate = (event) => {
  event.preventDefault();
  titltOfRsearch.style.display = "block";
  const query = searchValue.value;
  titltOfRsearch.textContent = query;
  console.log(query);
  const url = `https://api.pexels.com/videos/search?query=${query}&per_page=15`;
  fetch(url, {
    headers: {
      Authorization: 'PUpg6u4IM4rBsAkLq5vVcmS4c03dj6TkcVOrDM9AYPo6tE9UUqhw77UC',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // console.log(data.photos[0].id);
      let html = ''; //Variable qui va stocker le code html
      for (let i = 0; i < data.videos.length; i++) {
        html += `
    <div class="image">
      <video controls autoplay loop width="250">
        <source src="${data.videos[i].video_files[0].link}" type="video/mp4"  />
      </video>
      </div>
      `;
        // <figure>
        //   <figcaption>
        //     <i class="ri-user-fill"></i>
        //     <a href="${data.photos[i].photographer_url}" target="_blank">${data.photos[i].photographer}</a>
        //   </figcaption>
        // </figure>
      }
      imgBox.innerHTML = html;
    });
};

btnValidate.addEventListener('click', onValidate);

searchValue.addEventListener('keydown', (event) => {
  // Ajout pour écouter l'événement keydown sur l'input searchValue
  if (event.key === 'Enter') {
    // Vérifie si la touche appuyée est "Enter"
    onValidate(event); // Appelle la fonction onValidate avec l'événement en paramètre
  }
});
