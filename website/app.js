/* Global Variables */
const apiKey = "25118763bf66238e09c7f37ffd43b8e1&units=metric";

// New date instance dynamically
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Listening to the click to update UI
document.querySelector('#generate').addEventListener('click',(event) => {
    const clientCountryCode = document.querySelector('#country').value ;
    const clientZIPCode = document.querySelector('#zip').value ;
    const feelings = document.querySelector('#feelings').value;

    getData(`http://api.openweathermap.org/data/2.5/weather?zip=${clientZIPCode},${clientCountryCode}&appid=${apiKey}`)
        .then((data) => {
            const temp = data.main.temp;
            postData('/weather', {date: newDate, temp: temp, content: feelings})
                .then(
                    getUIContent('/UIData')
                        .then((data) => {
                            document.querySelector('#date').innerHTML = `Date: ${data.date}`;
                            document.querySelector('#temp').innerHTML = `Temprature: ${data.temp} &deg;C`;
                            if(data.content !== ""){
                                document.querySelector('#content').innerHTML = `Feelings: ${data.content}`;
                            } else {
                                document.querySelector('#content').innerHTML = null;
                            }
                        })
                );
        }); 
});

// Get and Post Requests
const getData = async ( url ) =>{
    const response = await fetch(url);
    try {
      const newData = await response.json();
        return newData;
    } 
    catch(error) {
    console.log("error", error);
    }
}

const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },    
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      return newData;
    } 
    catch(error) {
        console.log("error", error);
    }
}

const getUIContent = async ( url = '') =>{
    const response = await fetch(url);

    try {
      const newData = await response.json();
      return newData;
    } 
    catch(error) {
        console.log("error", error);
    }
}