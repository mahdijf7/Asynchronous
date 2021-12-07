'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// ///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//   <article class="country">
//     <img class="country__img" src="${data.flag}" />
//     <div class="country__data">
//       <h3 class="country__name">${data.name}</h3>
//       <h4 class="country__region">${data.region}</h4>
//       <p class="country__row"><span>👫</span>${(
//         +data.population / 1000000
//       ).toFixed(1)} people</p>
//       <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
//       <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
//     </div>
//   </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

///////////////////////////////////////
// Welcome to Callback Hell

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbour country (2)
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

///////////////////////////////////////
// Consuming Promises
// Chaining Promises
// Handling Rejected Promises
// Throwing Errors Manually

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'dfsdfdef';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })

//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('australia');

///////////////////////////////////////////////////////////////
//!coding challenge 1

// const whereAmi = function (lat, lng) {
//  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//  .then( (res) =>{
//    if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`)
//     return res.json()})
//  .then((data) => {
//    console.log(data);
//    console.log(`you are in  ${data.city} , ${data.country}`)

//    return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
//   })
//   .then(res => {
//     if (!res.ok)
//       throw new Error(`Country not found (${res.status})`)

//     return res.json() })

//     .then(data => renderCountry(data[0]))
//     .catch(err=> console.error(`${err.message}🔥`))
// }

// whereAmi(52.508,13.381)
// whereAmi(19.037,72.873)
// whereAmi(-33.933,18.474)

//////////////////////////////////////////

// console.log('Test start')
// setTimeout(()=> console.log('0 sec timer'),0)
// Promise.resolve('Resolved promise 1').then(res =>
//   console.log(res))
//   Promise.resolve('Resolved promise 2').then(res =>{
//     for(let i= 0; i<1000000000; i++){}
//     console.log(res)
//   })
// console.log(' Test end')

////////////////////////////////////////

// const lottreyPromise= new Promise(function(resolve,reject){
//   console.log('lottery drow is happening 🔮')
//   setTimeout(function(){
//   if (Math.random() >=0.5){
//     resolve('you win 💲')
//   }else {
//     reject( new Error('you lost uor money 💩'))
//   }
// },2000)
// })
// lottreyPromise.then( res=> console.log(res)).catch(err => console.error(err))

// //promisifying set timeout
// const wait = function(seconds){
// return new Promise(function(resolve){
//   setTimeout(resolve,seconds*1000)
// })
// }
// wait(1).then(()=>{
//   console.log('I waited for 1 second')
//   return wait(1)
// })
// .then(()=> {
//   console.log('I waited for 2 second')
// return wait (1)
// })
// .then(()=> {
//   console.log('I waited for 3 second')
// return wait (1)
// })
// .then(()=>
// console.log('I waited for 4 second'))

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promise.resolve('abs').then(x=> console.log(x));
// Promise.reject(new Error('Problem!')).catch(x=> console.error(x))

// const getPosiotion = function () {
//  return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     // (position) => console.log(position),
//     // (err) => console.error(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// // getPosiotion().then((pos) => console.log(pos));
// const whereAmi = function () {

// getPosiotion().then(pos=>{
//   const{latitude: lat,longitude: lng}=(pos.coords)
//    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
// })
//    .then( (res) =>{
//      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`)
//       return res.json()})
//    .then((data) => {
//      console.log(data);
//      console.log(`you are in  ${data.city} , ${data.country}`)

//      return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
//     })
//     .then(res => {
//       if (!res.ok)
//         throw new Error(`Country not found (${res.status})`)

//       return res.json() })

//       .then(data => renderCountry(data[0]))
//       .catch(err=> console.error(`${err.message}🔥`))
//   }

// btn.addEventListener('click',whereAmi)
///////////////////////////////

//! coding challenge 2
/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
  */
//////////////////////////////////////////////
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
 // Geolocation
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    
    // Reverse geocoading
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if(!resGeo.ok) throw new Error('Problem getting location data')
    const dataGeo = await resGeo.json();
    //Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`);
      if(!res.ok) throw new Error('Problem getting country')
    const data = await res.json();
    renderCountry(data[0]);
    return `You are in ${dataGeo.city},${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}💥`);
    renderError(`💥 ${err.message}`)

    // Reject promise return from async function
    throw err;
  }
};
console.log('1: Will get location');
//  const city =whereAmI()
//  console.log(city)


// whereAmI()
// .then(city=>console.log(`2: ${city}`))
// .catch(err=> console.error(`2: ${err.message}💥`))
// .finally(()=>console.log('3: Finish gettig loacation '))


(async function(){
try{
   const city = await whereAmI()
   console.log(`2: ${city}`)
}catch(err){
  console.error(`2: ${err.message}💥`)
}
console.log('3: Finish gettig location ')
})()
*/
//////////////////////////////////////////
/*
const get3Contries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//console.log(data1.capital, data2.capital, data3.capital);
   const data= await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
console.log(data.map(d=> d[0].capital))
    
  } catch (err) {
    console.error(err);
  }
};
get3Contries('iran', 'canada', 'usa');

*/

///////////////////////////////////////
/*
// Other Promise Combinators: race, allSettled and any
Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/
////////////////////////////////////
//! coding challange 3

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

// PART 1
// const loadNPause = async function () {
//   try {
//     // Load image 1
//     let img = await createImage('img/img-1.jpg');
//     console.log('Image 1 loaded');
//     await wait(2);
//     img.style.display = 'none';

//     // Load image 1
//     img = await createImage('img/img-2.jpg');
//     console.log('Image 2 loaded');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadNPause();

// const loadAll = async function (imgArr) {
//   try {
//     const imgs = imgArr.map(async (img) => await createImage(img));
//     console.log(imgs);
//     const imgsEl = await Promise.all(imgs);
//     console.log(imgsEl);
//     imgsEl.forEach((img) => img.classList.add('parallel'));
//   } catch (err) {
//     console.error(err);
//   }
// };
// loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

