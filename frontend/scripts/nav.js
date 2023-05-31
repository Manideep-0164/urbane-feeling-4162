
let userName = localStorage.getItem("name") || null;

// Making Navbar sticky on Scroll

let navbar = document.querySelector("nav");
let helpTxt = document.querySelector(".help-text");
let logoutimg = document.getElementById("logout-img")
let logouttxt = document.getElementById("log-out")
let hlpSticky = helpTxt.offsetTop;
let sticky = navbar.offsetTop;

window.onscroll = function () {
    myFunction();
}

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
        helpTxt.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
        helpTxt.classList.remove("sticky")
    }
}




// LOGIN Functionalities

document.getElementById("user-name").addEventListener("click", () => {
    if (userName == null) {
        document.querySelector(".login-div").classList.add("show-login");
        document.querySelector(".overlay").classList.add("show-overlay");
    }
})

document.getElementById("exit").addEventListener("click", () => {
    document.querySelector(".login-div").classList.remove("show-login");
    document.querySelector(".overlay").classList.remove("show-overlay");
})
document.getElementById("exit-l").addEventListener("click", () => {
    document.querySelector(".login-div").classList.remove("show-login");
    document.querySelector(".overlay").classList.remove("show-overlay");
})
document.querySelector(".overlay").addEventListener("click", () => {
    document.querySelector(".login-div").classList.remove("show-login");
    document.querySelector(".overlay").classList.remove("show-overlay");
})

document.getElementById("user-name").textContent = userName || 'Sign-in';

if (userName) {

    // Generating the Logout section
    logouttxt.textContent = 'Logout';
    logoutimg.setAttribute("src", "../images/logout-svgrepo-com.png");
    logoutimg.style.marginLeft = "-1";
    logoutimg.style.width = "22";

    // Removing the token and name from LS after logout
    document.getElementById("log-out").addEventListener("click", () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');

        // Opens a window with message Successfully Logged Out

        // var w = window.open('', '', 'width=100,height=100')
        // w.document.write('Successfully Logged Out')
        // w.focus()
        // setTimeout(function () { w.close(); }, 5000)

        // Creates a small window 

        // tempAlert("Successfully Logged Out", 5000);
        alert("Successfully Logged Out")
        logouttxt.textContent = 'About';
        logoutimg.setAttribute("src", "../images/about-svgrepo-com.png");
        logoutimg.style.marginLeft = "-1";
        logoutimg.style.width = "24";
        location.reload();
    })
}
else {
    logouttxt.textContent = 'About';
    logoutimg.setAttribute("src", "../images/about-svgrepo-com.png");
    logoutimg.style.marginLeft = "-1";
    logoutimg.style.width = "24";
}

function tempAlert(msg, duration) {
    var el = document.createElement("div");
    el.setAttribute("style", "position:absolute;top:40%;left:20%;background-color:white; width:30%; margin-auto;");
    el.innerHTML = msg;
    setTimeout(function () {
        el.parentNode.removeChild(el);
    }, duration);
    document.body.appendChild(el);
}