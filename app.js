
// ---------------
const openOverlay = document.querySelector("#open-overlay");
const btnClose = document.querySelector("#btn-close");
const principalOpenOverlay = document.querySelector(".principal-open-overlay");
btnClose.addEventListener("click", () => {
  principalOpenOverlay.classList.add("-z-50");
  document.body.classList.remove("overflow-hidden");//C'est fait
})
// Déclarer la fonction
const handleImageClicks = () => {
  const clickOnImage = document.querySelectorAll('figure > img.classImageTest');
  clickOnImage.forEach((image) => {
    image.addEventListener('click', () => {
      console.table(image.id);
      principalOpenOverlay.classList.remove("-z-50");
      document.body.classList.add("overflow-hidden");
      openOverlay.innerHTML = `
        <figure class="relative">
          <img src="${image.src}" alt="${image.alt}" title="${image.title}" class="w-full"/>
          <figcaption class="detail-img h-auto bg-transparent backdrop-blur-sm absolute w-full left-0 bottom-0 p-1 text-white flex justify-between md:text-xl px-2.5">
            <div class="link-photographer">
              <a href="$" target="_blank" title="photographer: $" class="text-2xl md:text-4xl xl:text-7xl">
                <i class="ri-user-fill"></i>
              </a>
            </div>
            <div class="btn-download-icon">
              <i class="ri-download-fill text-2xl xl:text-7xl md:text-4xl"></i>
            </div>
          </figcaption>
        </figure>
      `;
    });
  });
};
const handleBtnDownloadClick = () => {
  const btnDownload = document.querySelectorAll('button.btnDownload');
  const imageCorrespondant = document.querySelectorAll(
    'figure > img.classImageTest'
  );
  btnDownload.forEach((btn) => {
    btn.addEventListener('click', () => {
      imageCorrespondant.forEach((image) => {
        // console.table(image.id);
        if (image.id === btn.id) {
          console.log(`Btn-id-trueImage: ${btn.id}`);
          console.log(`Btn-src-trueImage: ${image.src}`);
          console.log(`Btn-Alt-trueImage: ${image.alt}`);
          // Récupérer le contenu de l'image
          fetch(image.src)
            .then((response) => response.blob())
            .then((blob) => {
              // Créer un lien de téléchargement
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `${image.alt}.jpg`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            });
        }
      });
    });
  });
};

const contentBox = document.querySelector('#content-box');
const imgBox = document.querySelector('#img-box');
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

// Créer 3 éléments de liste ul
let ul1 = document.createElement('ul');
let ul2 = document.createElement('ul');
let ul3 = document.createElement('ul');
// Ajouter les 3 listes ul à la section imgBox
imgBox.appendChild(ul1);
imgBox.appendChild(ul2);
imgBox.appendChild(ul3);
const randomQuery1 = Math.floor(Math.random() * listDefaultQuery1.length);
const randomQuery2 = Math.floor(Math.random() * listDefaultQuery2.length);
const query1 = listDefaultQuery1[randomQuery1];
const query2 = listDefaultQuery2[randomQuery2];
titltOfRsearch.textContent = `${query1} and ${query2}`;
let query = titltOfRsearch.textContent;
let url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=30&client_id=OHXabCxP14DXrZMvtHr7qFjUeLe7DvnncGA_LAC_dm0`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data.results);

    for (let i = 0; i < data.results.length; i++) {
      const li = document.createElement('li');
      li.classList.add('mb-4');
      li.innerHTML = `
      <div class="image relative">
        <figure class="relative w-full">
          <img src="${data.results[i].urls.small}" alt="${data.results[i].alt_description}" id="${data.results[i].id}" title="${data.results[i].alt_description}" class="classImageTest w-full"/>
          <figcaption class="detail-img h-auto bg-transparent backdrop-blur-sm absolute w-full left-0 bottom-0 p-1 text-white flex justify-between md:text-xl px-2.5">
            <div class="link-photographer">
              <a href="${data.results[i].user.links.html}" target="_blank" title="photographer: ${data.results[i].user.name}" class="text-lg md:text-xl">
                <i class="ri-user-fill"></i>
              </a>
            </div>
            <div class="btn-download-box">
              <button type="button" title="Télécharger cette image" class="btnDownload" id="${data.results[i].id}"><i class="ri-download-fill text-lg md:text-xl"></i></button>
            </div>
          </figcaption>
        </figure>
      </div>
    `;
      if (i < 10) {
        ul1.classList.add('col-start-1', 'col-end-2', 'max-h-full');
        ul1.appendChild(li);
      } else if (i < 20) {
        ul2.classList.add('col-start-2', 'col-end-3', 'max-h-full');
        ul2.appendChild(li);
      } else {
        ul3.classList.add(
          'col-start-1',
          'col-end-3',
          'max-h-full',
          'md:col-start-3',
          'md:col-end-4'
        );
        ul3.appendChild(li);
      }
    }
    handleImageClicks();
    handleBtnDownloadClick();
  })
// ------------------------------------------------------------
//Selon l'input du user
const onValidate = (event) => {
  event.preventDefault();
  ul1.innerHTML = '';
  ul2.innerHTML = '';
  ul3.innerHTML = '';
  query = searchValue.value;
  titltOfRsearch.classList.remove('hidden');
  titltOfRsearch.textContent = query;
  console.log(query);
  url = `https://api.unsplash.com/search/photos/?page=1&query=${query}&per_page=30&client_id=OHXabCxP14DXrZMvtHr7qFjUeLe7DvnncGA_LAC_dm0`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // console.log(data.photos[0].id);
      let html = ''; //Variable qui va stocker le code html
      for (let i = 0; i < data.results.length; i++) {
        const li = document.createElement('li');
        li.classList.add('mb-4');
        li.innerHTML = `
          <div class="image relative">
            <figure class="relative">
              <img src="${data.results[i].urls.small}" alt="${data.results[i].alt_description}" id="${data.results[i].id}" title="${data.results[i].alt_description}" class="classImageTest"/>
              <figcaption class="detail-img h-auto bg-transparent backdrop-blur-sm absolute w-full left-0 bottom-0 p-1 text-white flex justify-between md:text-xl px-2.5">
                <div class="link-photographer">
                  <a href="${data.results[i].user.links.html}" target="_blank" title="photographer: ${data.results[i].user.name}" class="text-lg md:text-xl">
                    <i class="ri-user-fill"></i>
                  </a>
                </div>
                <div class="btn-download-box">
                  <button title="Télécharger cette image" class="btnDownload" id="${data.results[i].id}"><i class="ri-download-fill text-lg md:text-xl"></i></button>
                </div>
              </figcaption>
            </figure>
          </div>
        `;
        if (i < 10) {
          ul1.classList.add('col-start-1', 'col-end-2', 'max-h-full');
          ul1.appendChild(li);
        } else if (i < 20) {
          ul2.classList.add('col-start-2', 'col-end-3', 'max-h-full');
          ul2.appendChild(li);
        } else {
          ul3.classList.add(
            'col-start-1',
            'col-end-3',
            'max-h-full',
            'md:col-start-3',
            'md:col-end-4'
          );
          ul3.appendChild(li);
        }
      }
      handleImageClicks();
      handleBtnDownloadClick();
    });
};
/*
let url = `https://api.pexels.com/v1/search?query=${query1}+and+${query2}&per_page=18`;
fetch(url, {
  headers: {
    Authorization: 'PUpg6u4IM4rBsAkLq5vVcmS4c03dj6TkcVOrDM9AYPo6tE9UUqhw77UC',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // console.log(data.photos[0].id);

    // Parcour de la boucle for qui génère le code HTML des images
    // Ajout des éléments li à la liste ul appropriée
    for (let i = 0; i < data.photos.length; i++) {
      const li = document.createElement('li');
      li.classList.add('mb-4');
      li.innerHTML = `
      <div class="image relative">
        <figure class="relative">
          <img src="${data.photos[i].src.large2x}" alt="${data.photos[i].alt}" id="${data.photos[i].id}" title="${data.photos[i].alt}" class="classImageTest"/>
          <figcaption class="detail-img h-auto bg-transparent backdrop-blur-sm absolute w-full left-0 bottom-0 p-1 text-white flex justify-between md:text-xl px-2.5">
            <div class="link-photographer">
              <a href="${data.photos[i].photographer_url}" target="_blank" title="photographer: ${data.photos[i].photographer}" class="text-lg md:text-xl">
                <i class="ri-user-fill"></i>
              </a>
            </div>
            <div class="btn-download-box">
              <button type="button" title="Télécharger cette image" class="btnDownload" id="${data.photos[i].id}"><i class="ri-download-fill text-lg md:text-xl"></i></button>
            </div>
          </figcaption>
        </figure>
      </div>
    `;
      if (i < 6) {
        ul1.classList.add('col-start-1', 'col-end-2', 'max-h-full');
        ul1.appendChild(li);
      } else if (i < 12) {
        ul2.classList.add('col-start-2', 'col-end-3', 'max-h-full');
        ul2.appendChild(li);
      } else {
        ul3.classList.add(
          'col-start-1',
          'col-end-3',
          'max-h-full',
          'md:col-start-3',
          'md:col-end-4'
        );
        ul3.appendChild(li);
      }
    }
    handleImageClicks();
    handleBtnDownloadClick();
  });

//Selon l'input du user
const onValidate = (event) => {
  event.preventDefault();
  ul1.innerHTML = '';
  ul2.innerHTML = '';
  ul3.innerHTML = '';
  const query = searchValue.value;
  titltOfRsearch.classList.remove('hidden');
  titltOfRsearch.textContent = query;
  console.log(query);
  url = `https://api.pexels.com/v1/search?query=${query}&per_page=180`;
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
      for (let i = 0; i < data.photos.length; i++) {
        const li = document.createElement('li');
        li.classList.add('mb-4');
        li.innerHTML = `
          <div class="image relative">
            <figure class="relative">
              <img src="${data.photos[i].src.large2x}" alt="${data.photos[i].alt}" id="${data.photos[i].id}" title="${data.photos[i].alt}" class="classImageTest"/>
              <figcaption class="detail-img h-auto bg-transparent backdrop-blur-sm absolute w-full left-0 bottom-0 p-1 text-white flex justify-between md:text-xl px-2.5">
                <div class="link-photographer">
                  <a href="${data.photos[i].photographer_url}" target="_blank" title="photographer: ${data.photos[i].photographer}" class="text-lg md:text-xl">
                    <i class="ri-user-fill"></i>
                  </a>
                </div>
                <div class="btn-download-box">
                  <button title="Télécharger cette image" class="btnDownload" id="${data.photos[i].id}"><i class="ri-download-fill text-lg md:text-xl"></i></button>
                </div>
              </figcaption>
            </figure>
          </div>
        `;
        if (i < 6) {
          ul1.classList.add('col-start-1', 'col-end-2', 'max-h-full');
          ul1.appendChild(li);
        } else if (i < 12) {
          ul2.classList.add('col-start-2', 'col-end-3', 'max-h-full');
          ul2.appendChild(li);
        } else {
          ul3.classList.add(
            'col-start-1',
            'col-end-3',
            'max-h-full',
            'md:col-start-3',
            'md:col-end-4'
          );
          ul3.appendChild(li);
        }
      }
      handleImageClicks();
      handleBtnDownloadClick();
    });
};
*/

btnValidate.addEventListener('click', onValidate);

searchValue.addEventListener('keydown', (event) => {
  // Ajout pour écouter l'événement keydown sur l'input searchValue
  if (event.key === 'Enter') {
    // Vérifie si la touche appuyée est "Enter"
    onValidate(event); // Appelle la fonction onValidate avec l'événement en paramètre
  }
});

console.log(titltOfRsearch.textContent);

// Test de la Fonction de téléchargement
/*const downloadImage = async (event) => {

  const image = event.target.previousElementSibling;
  const imageUrl = image.src;
  console.log(`1- image=${image}. imageUrl=${imageUrl} `);
  const url = new URL(imageUrl);
  url.download = 'image.jpg';
  console.log(`2- url=${url}. url.download=${url.download} `);
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.click();
  } catch (err) {
    console.error('Error downloading image', err);
  }
}
const downloadImage = async (event) => {
  const image = event.target.previousElementSibling;
  const imageUrl = image.src;

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const download = await navigator.downloads.download({
      url: URL.createObjectURL(blob),
      filename: 'image.jpg',
      saveAs: true
    });

    URL.revokeObjectURL(download.url);

  } catch (error) {
    console.error('Error downloading image:', error);
  }
}*/