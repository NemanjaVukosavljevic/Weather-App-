const API_ID = '5ba6c8a91f38fbc654c87ee0916ceca0';
const API_CALL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBarElement = document.querySelector('.search-bar input');
const searchButtonElement = document.querySelector('.search-bar button');
const iconImageElement = document.querySelector('.weather-icon');
 // ISPOD SU PROMENJIVE ZA DRUGE JEZIKE
const inputLangSrbFlagElement = document.querySelector('.input-flag-srb');
const inputLangEngFlagElement = document.querySelector('.input-flag');
const displayContentElement = document.querySelector('.content-section');
const pPersonalFeeling = document.querySelector('.p-personal-feeling');
const pMaxTemp = document.querySelector('.p-max-temperature');
const pHumidity = document.querySelector('.p-humidity');
const pWind = document.querySelector('.p-wind');
const pConditions = document.querySelector('.p-conditions');
const pAngleOfImpact = document.querySelector('.p-angle-of-impact');
const weatherLangTypeElement = document.querySelector('.conditions');
const langDivTextElement = document.querySelector('.language-div h2');
const allContentAllSelectedDivElement = document.querySelector('.--row');


async function checkTheWeather(city){
    if(inputLangSrbFlagElement.checked){
        // hvatanje API-a sa argumentom SRB jezika
        const response = await fetch(API_CALL + city + `&lang=sr` + `&appid=${API_ID}`);
        var data = await response.json();

        getSerbianTagNames();
        getConditionsLang();
     } else {   
        const response = await fetch(API_CALL + city + `&appid=${API_ID}`);
        var data = await response.json(); 

        getEnglishTagNames();
    }
    

    console.log(data);
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.personal-feeling').innerHTML = Math.round(data.main.feels_like) + '°C';
    document.querySelector('.max-temperature').innerHTML = Math.round(data.main.temp_max) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ` km/h`;
    document.querySelector('.conditions').innerHTML = data.weather[0].main;

    if(data.weather[0].main === 'Clouds' &&  inputLangSrbFlagElement.checked){
        weatherLangTypeElement.innerHTML = `Ветровито`;
    } else if (data.weather[0].main === 'Rain' &&  inputLangSrbFlagElement.checked){
        weatherLangTypeElement.innerHTML = `Кишовито`;
    } else if (data.weather[0].main === 'Snow' &&  inputLangSrbFlagElement.checked){
        weatherLangTypeElement.innerHTML = `Снег`;
    } else if (data.weather[0].main === 'Drizzle' &&  inputLangSrbFlagElement.checked){
        weatherLangTypeElement.innerHTML = `Слаба киша`;
    } else if (data.weather[0].main === 'Mist' &&  inputLangSrbFlagElement.checked){
        weatherLangTypeElement.innerHTML = `Магловито`;
    } else if (data.weather[0].main === 'Clear' &&  inputLangSrbFlagElement.checked){
        weatherLangTypeElement.innerHTML = `Сунчано`;
    }

    document.querySelector('.angle-of-impact').innerHTML = data.wind.deg + `°`;

    if(data.weather[0].main === 'Clouds'){
        iconImageElement.src = './animated/cloudy-day-3.svg'
    } else if (data.weather[0].main === 'Rain'){
        iconImageElement.src = './animated/rainy-6.svg'
    } else if (data.weather[0].main === 'Snow'){
        iconImageElement.src = './animated/snowy-6.svg'
    } else if (data.weather[0].main === 'Drizzle'){
        iconImageElement.src = './animated/rainy-4.svg'
    } else if (data.weather[0].main === 'Mist'){
        iconImageElement.src = './animated/cloudy-day-3.svg'
    } else if (data.weather[0].main === 'Clear'){
        iconImageElement.src = './animated/day.svg'
    }

    displayContentElement.style.opacity = '1';
    
    
}

function getSerbianTagNames(){
    pPersonalFeeling.innerHTML = `Лични осећај`;
    pMaxTemp.innerHTML = `Макс. Температура`;
    pHumidity.innerHTML = `Влажност ваздуха`;
    pWind.innerHTML = `Брзина ветра`;
    pConditions.innerHTML = `Услови`;
    pAngleOfImpact.innerHTML = `Угао утицаја ветра`;
    langDivTextElement.innerHTML = `Изаберите жељени језик`
    // displayContentElement.classList.toggle('fade-in-text');
    // langDivTextElement.classList.toggle('fade-in-text');
}

function getEnglishTagNames(){
    pPersonalFeeling.innerHTML = `Personal Feeling`;
    pMaxTemp.innerHTML = `Max Temperature`;
    pHumidity.innerHTML = `Humidity`;
    pWind.innerHTML = `Wind`;
    pConditions.innerHTML = `Conditions`;
    pAngleOfImpact.innerHTML = `Angle of impact`;
    langDivTextElement.innerHTML = `Select preffered language`
    // displayContentElement.classList.toggle('fade-in-text');
    // langDivTextElement.classList.toggle('fade-in-text');
}

// function getConditionsLang(){
//     if(weatherLangTypeElement.innerHTML === 'Clouds'){
//         weatherLangTypeElement.innerHTML === 'Ветровито';
//     } else if (weatherLangTypeElement.innerHTML === 'Rain'){
//         weatherLangTypeElement.innerHTML === 'Киша';
//     }
// }

// ____________________________________________________________________________

searchButtonElement.addEventListener('click', () =>{
    checkTheWeather(searchBarElement.value);
    
});

inputLangSrbFlagElement.addEventListener('click', () => {
    getSerbianTagNames();
    checkTheWeather(searchBarElement.value);

});

inputLangEngFlagElement.addEventListener('click', () => {
    getEnglishTagNames();
    checkTheWeather(searchBarElement.value);

})

let unix = 1682393864;
let date = new Date(unix*1000);

console.log(date);

