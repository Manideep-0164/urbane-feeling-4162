let navbar = document.querySelector("nav");
let sticky = navbar.offsetTop;
let userName = localStorage.getItem("name") || null;

window.onscroll = function () {
    myFunction();
}

function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

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
    document.getElementById("log-out").textContent = 'Logout';
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
        document.getElementById("log-out").textContent = 'About';
        location.reload();
    })
}
else document.getElementById("log-out").textContent = 'About';

function tempAlert(msg, duration) {
    var el = document.createElement("div");
    el.setAttribute("style", "position:absolute;top:40%;left:20%;background-color:white; width:30%; margin-auto;");
    el.innerHTML = msg;
    setTimeout(function () {
        el.parentNode.removeChild(el);
    }, duration);
    document.body.appendChild(el);
}