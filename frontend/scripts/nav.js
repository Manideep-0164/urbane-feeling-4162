let navbar = document.querySelector("nav");
let sticky = navbar.offsetTop;

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
    document.querySelector(".login-div").classList.add("show-login");
    document.querySelector(".overlay").classList.add("show-overlay");
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

let userName = localStorage.getItem("name") || null;
document.getElementById("user-name").textContent = userName || 'Login';

if (userName) {
    document.getElementById("log-out").textContent = 'Logout';
    document.getElementById("log-out").addEventListener("click", () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        document.getElementById("log-out").textContent = 'About';
        window.location.reload()
    })
}
else document.getElementById("log-out").textContent = 'About';