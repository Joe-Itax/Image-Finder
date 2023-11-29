// ---------------
const openOverlay = document.querySelector('#open-overlay');
const btnClose = document.querySelector('#btn-close');
const principalOpenOverlay = document.querySelector('.principal-open-overlay');
btnClose.addEventListener('click', () => {
  principalOpenOverlay.classList.add('-z-50');
  document.body.classList.remove('overflow-hidden'); //C'est fait
});
// Déclarer la fonction
const handleImageClicks = () => {
  const clickOnImage = document.querySelectorAll('figure > img.classImageTest');
  clickOnImage.forEach((image) => {
    image.addEventListener('click', () => {
      principalOpenOverlay.classList.remove('-z-50');
      document.body.classList.add('overflow-hidden');
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
        if (image.id === btn.id) {
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
// Next Page Btn function
let page = 1;
let nextPage = document.querySelector('.container-next-page');
const btnNextPage = document.querySelector('#btn-nextPage');
const nextPageDirection = (data) => {
  let total_pages = data.total_pages;
  if (total_pages || total_pages > 1) {
    nextPage.classList.remove('hidden');
    btnNextPage.addEventListener('click', () => {
      page += 1;
      url = url.replace(`&page=${page - 1}`, `&page=${page}`);
      fetch(url)
        .then((response) => response.json())
        .then((newData) => {
          ul1.innerHTML = '';
          ul2.innerHTML = '';
          ul3.innerHTML = '';
          for (let i = 0; i < newData.results.length; i++) {
            const li = document.createElement('li');
            li.classList.add('mb-4');
            li.innerHTML = `
              <div class="image relative">
                <figure class="relative w-full">
                  <img src="${newData.results[i].urls.small}" alt="${newData.results[i].alt_description}" id="${newData.results[i].id}" title="${newData.results[i].alt_description}" class="classImageTest w-full cursor-zoom-in"/>
                  <figcaption class="detail-img h-auto bg-transparent backdrop-blur-sm absolute w-full left-0 bottom-0 p-1 text-white flex justify-between md:text-xl px-2.5">
                    <div class="link-photographer">
                      <a href="${newData.results[i].user.links.html}" target="_blank" title="photographer: ${newData.results[i].user.name}" class="text-lg md:text-xl">
                        <i class="ri-user-fill"></i>
                      </a>
                    </div>
                    <div class="btn-download-box">
                      <button type="button" title="Télécharger cette image" class="btnDownload" id="${newData.results[i].id}"><i class="ri-download-fill text-lg md:text-xl"></i></button>
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
    });
  } else {
    nextPage.classList.add('hidden');
  }
};
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
let url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=30&page=${page}&client_id=HiXX9RQ2LfCN71STnuryS31srNdccFWAVxfSYhD5vrg`;
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    nextPageDirection(data);
console.log(data);
    for (let i = 0; i < data.results.length; i++) {
      const li = document.createElement('li');
      li.classList.add('mb-4');
      li.innerHTML = `
      <div class="image relative">
        <figure class="relative w-full">
          <img src="${data.results[i].urls.small}" alt="${data.results[i].alt_description}" id="${data.results[i].id}" title="${data.results[i].alt_description}" class="classImageTest w-full cursor-zoom-in"/>
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
  });
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
  url = `https://api.unsplash.com/search/photos/?page=1&query=${query}&per_page=30&${page}&client_id=HiXX9RQ2LfCN71STnuryS31srNdccFWAVxfSYhD5vrg`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      nextPageDirection(data);
      let html = ''; //Variable qui va stocker le code html
      for (let i = 0; i < data.results.length; i++) {
        const li = document.createElement('li');
        li.classList.add('mb-4');
        li.innerHTML = `
          <div class="image relative">
            <figure class="relative">
              <img src="${data.results[i].urls.small}" alt="${data.results[i].alt_description}" id="${data.results[i].id}" title="${data.results[i].alt_description}" class="classImageTest cursor-zoom-in"/>
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

btnValidate.addEventListener('click', onValidate);

searchValue.addEventListener('keydown', (event) => {
  // Ajout pour écouter l'événement keydown sur l'input searchValue
  if (event.key === 'Enter') {
    // Vérifie si la touche appuyée est "Enter"
    onValidate(event); // Appelle la fonction onValidate avec l'événement en paramètre
  }
});
