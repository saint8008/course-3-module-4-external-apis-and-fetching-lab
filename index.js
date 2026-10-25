// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const stateInput = document.querySelector('#state-input');
const btn = document.querySelector('#fetch-alerts');
const alertDisplay = document.querySelector('#alerts-display');
const errorDisplay = document.querySelector('#error-message');


async function fetchWeatherAlerts(state) {
    try {
        const response = await fetch(`${weatherApi}${state}`);

        if (!response.ok) {
            throw new Error(`Could not get aler for ${state}. Status: ${response.status}. Check the state abbreviation`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

function displayAlerts(data) {
    alertDisplay.innerHTML = "";

    const summary = document.createElement('p');
    summary.textContent = `${data.title}: ${data.features.length}`;
    alertDisplay.appendChild(summary);

    const list = document.createElement('ul');
    data.features.forEach(alert => {
        const item = document.createElement('li');
        item.textContent = alert.properties.headline;
        list.appendChild(item);
    });
    alertDisplay.appendChild(list);
};

function showError(message) {
    errorDisplay.textContent = message;
    errorDisplay.classList.remove('hidden');
}

function clearError() {
    errorDisplay,textContent = "";
    errorDisplay.classList.add('hidden');
}

btn.addEventListener('click', async () => {
    const state = stateInput.value.trim().toUpperCase();
    stateInput.value = "";

    if (!state) {
        showError("Please enter a state abbreviation.");
        return;
    }

    try {
        const data = await fetchWeatherAlerts(state);
        displayAlerts(data);
        clearError();
    } catch (error){
        showError(error.message)
    }
});
