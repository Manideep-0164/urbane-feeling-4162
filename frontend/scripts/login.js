
const baseURL = 'https://teal-seahorse-suit.cyclic.app';

let form = document.getElementById("sign-up-form");
let login = document.getElementById("sign-in-form");

/* SIGN-UP FORM ****************************** SIGN-UP FORM ****************************** SIGN-UP FORM ******************************   */

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.password.value !== form.confirmpassword.value) {
        alert("Password Mismatch");
    }
    else {
        let userDetails = {
            name: form.userName.value,
            email: form.email.value,
            mobile: form.phone.value,
            password: form.password.value,
        }
        postingData(userDetails);
    }
})

function postingData(data) {
    fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((res) => {
            if (res.msg == "Successfully Registered, Please Login to Continue") {
                alert(res.msg);
                document.getElementById('signup-form-cont').style.display = "none";
                document.getElementById('signin-form-cont').style.display = "block";
                form.reset();
            }
            else if (res.error) {
                alert('Something went wrong');
                console.log(res);
            }
            else if (res.msg == 'User Already Exists, Please Login') {
                alert(res.msg);
            } else { alert("Something went wrong") }
            console.log(res)
        })
        .catch(err => console.log(err));
}

/* SIGN-IN FORM ****************************** SIGN-IN FORM ****************************** SIGN-IN FORM ******************************   */

login.addEventListener("submit", (e) => {
    e.preventDefault();

    let userDetails = {
        email: login['email-l'].value,
        password: login['password-l'].value,
    }
    loginReq(userDetails);
})


function loginReq(data) {
    fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((res) => {
            if (res.err) {
                alert('Something went wrong');
                console.log(res);
            }
            else if (res.invalid) {
                alert("Wrong Credentials");
                console.log(res)
            }
            else if (res.msg == "User Doesn't Exists, Please Register") {
                alert(res.msg);
                console.log(res)
            }
            else {
                console.log(res)
                localStorage.setItem('name', res.name);
                localStorage.setItem('token', res.token);
                alert(res.msg);
                document.querySelector(".login-div").classList.remove("show-login");
                document.querySelector(".overlay").classList.remove("show-overlay");
                window.location.reload()
            }

        })
        .catch(err => console.log(err));
}

/* SIGN-UP ****************************** REDIRECTING to SIGN-UP ****************************** SIGN-UP ******************************   */

document.getElementById("register-page").addEventListener("click", () => {
    document.getElementById('signin-form-cont').style.display = "none";
    document.getElementById('signup-form-cont').style.display = "block";
});

document.getElementById("login-page").addEventListener("click", () => {
    document.getElementById('signup-form-cont').style.display = "none";
    document.getElementById('signin-form-cont').style.display = "block";
});