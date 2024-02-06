// Define cities array
const cities = [
  {
    arabicName: "قسنطينة",
    name: "Costantine",
  },
  {
    arabicName: "الجزائر",
    name: "Alger",
  },
  {
    arabicName: "وهران",
    name: "Oran",
  },
  {
    arabicName: "باتنة",
    name: "Batna",
  },
  {
    arabicName: "سطيف",
    name: "Setif",
  },
  {
    arabicName: "بريكة",
    name: "Barika",
  },
  {
    arabicName: "عنابة",
    name: "Annaba",
  },
  {
    arabicName: "تيزي وزو",
    name: "Tizi Ouzou",
  },
  {
    arabicName: "البليدة",
    name: "Blida",
  },
];

// Populate dropdown with city names
for (let city of cities) {
  const content = `<option>${city.arabicName}</option>`;
  document.getElementById("cites_select").innerHTML += content;
}

// Add event listener for city selection change
document.getElementById("cites_select").addEventListener("change", function () {
  const selectedValue = this.value;
  let cityName = "";

  // Iterate through the cities array to find the matching city
  for (const city of cities) {
    if (city.arabicName === selectedValue) {
      cityName = city.name; // Set cityName when a match is found
      break; // Exit the loop since we found a match
    }
  }

  UpdateCity(cityName);
});

// Function to update prayer timings
function UpdateCity(cityName) {
  let param = {
    country: "DZ",
    city: cityName,
  };

  axios
    .get("https://api.aladhan.com/v1/timingsByCity", {
      params: param,
      headers: {
        "Content-Type": "application/json",
      },
    })

    .then(function (response) {
      const prayerTimings = response.data.data.timings;

      const prayerIds = [
        "Fajr_Time",
        "Sunrise_Time",
        "Dhuhr_Time",
        "Asr_Time",
        "Maghrib_Time",
        "Isha_Time",
      ];

      for (const prayerId of prayerIds) {
        const prayerName = prayerId.replace("_Time", "");
        document.getElementById(prayerId).innerHTML = prayerTimings[prayerName];
      }

      const readableDate = response.data.data.date.readable;
      document.getElementById("readable").innerHTML = readableDate;

      const weekDay = response.data.data.date.hijri.weekday.ar;
      document.getElementById("weekday").innerHTML = weekDay;

      const currentTime = new Date();

      // Format the current time to hh:MM format in 12-hour format
      const options = { hour: "numeric", minute: "numeric", hour12: true };
      const formattedCurrentTime = currentTime.toLocaleTimeString(
        "en-US",
        options
      );

      // Set the formatted current time with period to the "timestamp" span
      document.getElementById("timestamp").innerHTML = formattedCurrentTime;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Initial call to UpdateCity with the first city in the array
UpdateCity(cities[0].arabicName);
