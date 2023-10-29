
//we need 2 links since the site provides separate current weather and forecast
const currentLink = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=`;

const input = document.querySelector('.input');
const currentTemperature = document.querySelector('.current-temperature');
const city = document.querySelector('.city');
const currentPrecipitation = document.querySelector('.current-precipitation');
const maxTemp = document.querySelector('.max-temperature');
const currentDescription = document.querySelector('.current-description');
const currentCity = document.querySelector('.current-city');
const currentImg = document.querySelector('.current-img');
const secondDayImg = document.querySelector('.second-day-img');
const thirdDayImg = document.querySelector('.third-day-img');
const fourthDayImg = document.querySelector('.fourth-day-img');
const fifthDayImg = document.querySelector('.fifth-day-img');
const sixthDayImg = document.querySelector('.sixth-day-img');
const secondDayPrecipitation = document.querySelector('.second-day-precipitation');
const thirdDayPrecipitation = document.querySelector('.third-day-precipitation');
const fourthDayPrecipitation = document.querySelector('.fourth-day-precipitation');
const fifthDayPrecipitation = document.querySelector('.fifth-day-precipitation');
const sixthDayPrecipitation = document.querySelector('.sixth-day-precipitation');
const secondDayTemperature = document.querySelector('.second-day-temperature');
const thirdDayTemperature = document.querySelector('.third-day-temperature');
const fourthDayTemperature = document.querySelector('.fourth-day-temperature');
const fifthDayTemperature = document.querySelector('.fifth-day-temperature');
const sixthDayTemperature = document.querySelector('.sixth-day-temperature');
const secondNightTemperature = document.querySelector('.second-night-temperature');
const thirdNightTemperature = document.querySelector('.third-night-temperature');
const fourthNightTemperature = document.querySelector('.fourth-night-temperature');
const fifthNightTemperature = document.querySelector('.fifth-night-temperature');
const sixthNightTemperature = document.querySelector('.sixth-night-temperature');
const deleteButton = document.querySelector('.delete-button');


// array with data for current weather
let currentStore = {
    city: "london",
    temp: "",
    tempMax: "",
    main: "",
    description: "",
};

//insert the corresponding picture
const getImage = (main) => {
    const value = main;

    switch (value) {
        case "Clear":
            return 'sunny.svg';
        case "Clouds":
            return 'clouds.svg';
        case "Rain":
            return 'rain.svg';
        case "Drizzle":
            return 'drizzle.svg';
        case "Snow":
            return 'snow.svg';
        case "Thunderstorm":
            return 'storm.svg';
        case "Mist":
            return 'drizzle.svg';
        case "Fog":
            return 'drizzle.svg';
        case "Haze":
            return 'clouds.svg';
        case "Smoke":
            return 'clouds.svg';
        case "Tornado":
            return 'storm.svg';
        default:
            return 'regular-fox.svg'
    };
};

//current weather
const fetchData = async () => {
    const result = await fetch(currentLink + currentStore.city + `&appid=32424d763abaecc26f0b4503d557a398`);
    const data = await result.json();

    if (result.status === 404) {
        handleClick();
        input.classList.add("placeholder-red");
    };

    // get the necessary data
    const {
        main: { temp, temp_max: tempMax },
        weather: { 0: { main, description },
        }
    } = data;

    // подставляем данные в наш массив
    currentStore = {
        ...currentStore,
        temp,
        tempMax,
        main,
        description,
    }


    //substitute the value from the array into the desired element
    const renderComponent = () => {
        currentTemperature.innerHTML = `${Math.round(currentStore.temp)}°C`;
        city.innerHTML = `Celected: ${currentStore.city.charAt(0).toUpperCase() + currentStore.city.slice(1)}`;
        currentCity.innerHTML = `${currentStore.city.charAt(0).toUpperCase() + currentStore.city.slice(1)}`;
        currentPrecipitation.innerHTML = currentStore.main;
        maxTemp.innerHTML = `${Math.round(currentStore.tempMax)}°C`;
        currentDescription.innerHTML = `${currentStore.description.charAt(0).toUpperCase() + currentStore.description.slice(1)}`;
        currentImg.src = `./assets/${getImage(main)}`;
    }
    renderComponent();
};


//array for weather forecast
let forecastStore = {
    tempDay1: "",
    tempNight1: "",
    main1: "",
    tempDay2: "",
    tempNight2: "",
    main2: "",
    tempDay3: "",
    tempNight3: "",
    main3: "",
    tempDay4: "",
    tempNight4: "",
    main4: "",
    tempDay5: "",
    tempNight5: "",
    main5: "",
};


//weather forecast
const fetchDataForecast = async () => {
    const result = await fetch(forecastLink + currentStore.city + `&appid=32424d763abaecc26f0b4503d557a398`);
    const data = await result.json();

    // get the necessary data
    const {
        list: { 0: { main: { temp: tempDay1 } } },
        list: { 0: { weather: { 0: { main: main1 } } } },
        list: { 4: { main: { temp: tempNight1 } } },
        list: { 8: { main: { temp: tempDay2 } } },
        list: { 8: { weather: { 0: { main: main2 } } } },
        list: { 12: { main: { temp: tempNight2 } } },
        list: { 16: { main: { temp: tempDay3 } } },
        list: { 16: { weather: { 0: { main: main3 } } } },
        list: { 20: { main: { temp: tempNight3 } } },
        list: { 24: { main: { temp: tempDay4 } } },
        list: { 24: { weather: { 0: { main: main4 } } } },
        list: { 28: { main: { temp: tempNight4 } } },
        list: { 32: { main: { temp: tempDay5 } } },
        list: { 32: { weather: { 0: { main: main5 } } } },
        list: { 36: { main: { temp: tempNight5 } } },

    } = data;

    // substitute the data into our array
    forecastStore = {
        ...forecastStore,
        tempDay1,
        main1,
        tempNight1,
        tempDay2,
        main2,
        tempNight2,
        tempDay3,
        main3,
        tempNight3,
        tempDay4,
        main4,
        tempNight4,
        tempDay5,
        main5,
        tempNight5,
    };

    //substitute the value from the array into the desired element
    const renderComponent = () => {
        secondDayImg.src = `./assets/${getImage(main1)}`;
        thirdDayImg.src = `./assets/${getImage(main2)}`;
        fourthDayImg.src = `./assets/${getImage(main3)}`;
        fifthDayImg.src = `./assets/${getImage(main4)}`;
        sixthDayImg.src = `./assets/${getImage(main5)}`;
        secondDayPrecipitation.innerHTML = forecastStore.main1;
        thirdDayPrecipitation.innerHTML = forecastStore.main2;
        fourthDayPrecipitation.innerHTML = forecastStore.main3;
        fifthDayPrecipitation.innerHTML = forecastStore.main4;
        sixthDayPrecipitation.innerHTML = forecastStore.main5;
        secondDayTemperature.innerHTML = `${Math.round(forecastStore.tempDay1)}°C`
        thirdDayTemperature.innerHTML = `${Math.round(forecastStore.tempDay2)}°C`
        fourthDayTemperature.innerHTML = `${Math.round(forecastStore.tempDay3)}°C`
        fifthDayTemperature.innerHTML = `${Math.round(forecastStore.tempDay4)}°C`
        sixthDayTemperature.innerHTML = `${Math.round(forecastStore.tempDay5)}°C`
        secondNightTemperature.innerHTML = `${Math.round(forecastStore.tempNight1)}°C`
        thirdNightTemperature.innerHTML = `${Math.round(forecastStore.tempNight2)}°C`
        fourthNightTemperature.innerHTML = `${Math.round(forecastStore.tempNight3)}°C`
        fifthNightTemperature.innerHTML = `${Math.round(forecastStore.tempNight4)}°C`
        sixthNightTemperature.innerHTML = `${Math.round(forecastStore.tempNight5)}°C`
    }
    renderComponent();
};


const handleKeydown = (e) => {
    if (e.key === 'Enter') {
        currentStore = {
            ...currentStore,
            city: input.value,
        }
        fetchData();
        fetchDataForecast();
    }
};
input.addEventListener('keydown', handleKeydown);

const handleClick = () => { input.value = ""; input.focus(); }
deleteButton.addEventListener('click', handleClick);

fetchData();
fetchDataForecast();