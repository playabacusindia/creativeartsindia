// bottom menu icons start
var callCont = document.querySelector(".call-container");
var telegramCont = document.querySelector(".telegram-container");
var emailCont = document.querySelector(".email-container");
var urlCont = document.querySelector(".url-container");

function comeFromBlock(containerName) {
    setTimeout(function () {
        containerName.style.display = "flex";
        containerName.style.transform = "scale(.3) rotateZ(360deg)";

    }, 500);
    setTimeout(function () {
        containerName.style.transform = "scale(.8) rotateZ(0deg)";
        containerName.style.opacity = "1";
    }, 1000);
}

// comeFromBlock(telegramCont);
comeFromBlock(callCont);
// comeFromBlock(urlCont);
comeFromBlock(emailCont);
// bottom menu icons end

// country select start
function toggleCon() {
    document.querySelector(`#country-select`).querySelector(".dropdown").classList.toggle(`active`);
    document.querySelector(`#country-select`).querySelector(".val").classList.toggle(`active`);
}
function fetchCountryData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            callback(data);
        }
    };
    xhr.open('GET', 'https://www.playabacusindia.com/form/tele-creative-arts-india/database/all.json', true);
    xhr.send();
}
function populateSelect() {
    fetchCountryData(function (countries) {
        var select = document.getElementById('country-select').querySelector(".dropdown").querySelector(".items");
        countries.forEach(function (country) {
            if (country.idd.suffixes) {
                var option = document.createElement('div');
                if (country.idd.suffixes.length == 1) {
                    option.innerHTML = `<img src="${country.flags.png}"> <span>${country.name.common} (${country.idd.root + country.idd.suffixes[0]})</span>`;
                    option.setAttribute('data-flag', country.flags.png);
                    option.setAttribute('data-name', country.idd.root + country.idd.suffixes);
                    option.addEventListener('click', () => {
                        document.getElementById('country-select').querySelector(".val").innerHTML = `<img src="${country.flags.png}">` + country.idd.root + country.idd.suffixes[0];
                        document.getElementById('country-select').querySelector(".val").dataset.value = country.idd.root + country.idd.suffixes[0];
                        toggleCon();
                    })
                } else {
                    option.innerHTML = `<img src="${country.flags.png}"> <span>${country.name.common} (${country.idd.root})</span>`;
                    option.setAttribute('data-flag', country.flags.png);
                    option.setAttribute('data-name', country.idd.root + country.idd.suffixes);
                    option.addEventListener('click', () => {
                        document.getElementById('country-select').querySelector(".val").innerHTML = `<img src="${country.flags.png}">` + country.idd.root;
                        document.getElementById('country-select').querySelector(".val").dataset.value = country.idd.root;
                        toggleCon();
                    })
                }
                select.prepend(option);
            }
        });

        const containerDiv = document.getElementById('country-select').querySelector(".dropdown");
        let divs = containerDiv.querySelectorAll('.items div');

        document.getElementById('searchInput').addEventListener('input', function () {
            let searchText = document.getElementById('searchInput').value.toLowerCase();
            divs.forEach(div => {
                console.log(div)
                let divText = div.querySelector("span").textContent.toLowerCase();
                console.log(divText)
                if (divText.includes(searchText)) {
                    div.classList.remove('hidden');
                    div.style.display = 'flex'; // Show the matched div
                    containerDiv.scrollTo(0, div.offsetTop); // Scroll to the matched div
                } else {
                    div.classList.add('hidden');
                    div.style.display = 'none'; // Hide the unmatched div
                }
            });
        });


    });



}
populateSelect();

// country select end


// form box start

function msgBox() {
    document.querySelector("#tele-chatbox-unique").classList.toggle("active");
    const backdrop = document.querySelector(".modal-backdrop-custom");
    if (backdrop) {
        backdrop.classList.toggle("active");
    }
}
// Initial captcha creation removed.

// Call the sendUserDataToServer function when the page loads
window.onload = function () {
    sendUserDataToServer();
    if (localStorage.getItem("customer-name") && localStorage.getItem("customer-number")) {
        document.querySelector("#tele-name").value = localStorage.getItem("customer-name");
        document.querySelector("#tele-phone").value = localStorage.getItem("customer-number");
    }
};
// CAPTCHA validation removed.
function sendUserDataToServer() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Parse the JSON response
            var locationInfo = JSON.parse(xhr.responseText);
            console.log(locationInfo);
            let ipAddress = locationInfo.ip;
            let city = locationInfo.city;
            let region = locationInfo.region;

            // Get user's host
            let host = window.location.href;

            // Get user's screen resolution
            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;
            let screenResolution = screenWidth + "x" + screenHeight;

            saveUserDataLocally(ipAddress, host, screenResolution, city, region);

        } else if (xhr.readyState == 4 && xhr.status != 200) {

            let ipAddress = "unknown";
            let city = "unknown";
            let region = "unknown";

            // Get user's host
            let host = window.location.href;

            // Get user's screen resolution
            let screenWidth = window.screen.width;
            let screenHeight = window.screen.height;
            let screenResolution = screenWidth + "x" + screenHeight;

            saveUserDataLocally(ipAddress, host, screenResolution, city, region);
        }
    };

    xhr.open('GET', `https://www.playabacusindia.com/form/tele-creative-arts-india/get-location.php`, true);
    xhr.send();


}

function saveUserDataLocally(ipAddress, host, screenResolution, city, region) {
    // Check if localStorage is supported by the browser
    if (typeof (Storage) !== "undefined") {
        // Store data in localStorage
        localStorage.setItem("ipAddress", ipAddress);
        localStorage.setItem("host", host);
        localStorage.setItem("screenResolution", screenResolution);
        localStorage.setItem("city", city);
        localStorage.setItem("region", region);
    } else {
        console.error("localStorage is not supported");
    }
}

function saveCustomerDataLocally(customerName, customerNumber) {
    // Check if localStorage is supported by the browser
    if (typeof (Storage) !== "undefined") {
        // Store data in localStorage
        localStorage.setItem("customer-name", customerName);
        localStorage.setItem("customer-number", customerNumber);

    } else {
        console.error("localStorage is not supported");
    }
}

function limitLetters(textarea, maxLetters) {
    const currentText = textarea.value;

    if (currentText.length > maxLetters) {
        textarea.value = currentText.substring(0, maxLetters);
        alert("You can only enter up to " + maxLetters + " characters.");
    }

    // Safely update character count
    const counter = document.getElementById("wordCountMsg");
    if (counter) {
        counter.textContent = `${textarea.value.length} / ${maxLetters} letters`;
    }
}


document.querySelector('#sendBtn').addEventListener('click', function (e) {
    e.preventDefault();
    if (true) { // Replaced validateCaptcha() with true

        // var photoUrl = document.getElementById('photo_url').value;
        var photoUrl = 'https://placehold.co/600x400/white/black/png';
        let selectedValue = document.querySelector('input[name="inquiry_type"]:checked')?.value;
        console.log(selectedValue);
        let name = document.querySelector("#tele-name").value.trim();
        let frontPhoneElement = document.querySelector(".val");
        let frontPhone = frontPhoneElement.dataset.value.trim();
        let phone = document.querySelector("#tele-phone").value.trim();
        let email = document.querySelector("#tele-email").value.trim();
        let msg = document.querySelector('#message').value.trim();
        let ipAddress = localStorage.getItem("ipAddress");
        let host = localStorage.getItem("host");
        let screenResolution = localStorage.getItem("screenResolution");
        let city = localStorage.getItem("city");
        let region = localStorage.getItem("region");
        let message = `Hi,

    We hope this message finds you well. You've got a new inquiry from:

    From,
    Name: ${name}
    Phone: ${frontPhone}${phone}

    Message :-
    ${msg}
    type: ${selectedValue}
    More Details:
    City: ${city}
    Region: ${region}
    IP Address: ${ipAddress}
    From URL: ${host}
    Screen Resolution: ${screenResolution}

    Please reach out to them at your earliest convenience.

    Best,
    Team Biz15`;


        if (name === "" || phone === "" || msg === "" || email === "" || selectedValue === undefined) {
            alert("Please fill in all fields and select an inquiry type.");
        } else if (!/^\d{10,}$/.test(phone)) {
            alert("Please enter a valid number.");
        } else {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
            } else {

                // Backend Mailer call
                fetch('php/contact.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `name=${encodeURIComponent(name)}&phone=${encodeURIComponent(frontPhone + phone)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(msg)}&inquiry_type=${encodeURIComponent(selectedValue)}&city=${encodeURIComponent(city)}&region=${encodeURIComponent(region)}`,
                }).then(function (response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                }).then(function (data) {
                    console.log(data);
                    if (data.status === "success") {
                        showStatusNotification("Message sent successfully!", "success");
                        // Reset form
                        document.querySelector("#tele-name").value = "";
                        document.querySelector("#tele-phone").value = "";
                        document.querySelector("#tele-email").value = "";
                        document.querySelector('#message').value = "";
                    } else {
                        showStatusNotification(data.message || 'Failed to send message', "error");
                    }
                }).catch(function (error) {
                    console.error('There was a problem with your fetch operation:', error);
                    showStatusNotification('Failed to send message. Please try again later.', "error");
                });

                document.querySelector('#sendBtn').classList.add("active");

            }
        }
    }
});

function showStatusNotification(message, type) {
    const notification = document.getElementById('statusNotification');
    const icon = document.getElementById('statusIcon');
    const messageSpan = document.getElementById('statusMessage');

    messageSpan.textContent = message;
    notification.className = `top-notification active ${type}`;

    if (type === 'success') {
        icon.className = 'bi bi-check-circle-fill';
    } else {
        icon.className = 'bi bi-exclamation-triangle-fill';
    }

    setTimeout(() => {
        notification.classList.remove('active');
    }, 5000);
}


// form box end

