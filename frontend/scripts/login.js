
const baseURL = 'https://teal-seahorse-suit.cyclic.app';

let form = document.getElementById("sign-up-form");
let login = document.getElementById("sign-in-form");
let loader = document.querySelector(".loader");
let spinIcon = document.querySelector(".loader>i");
let loaderL = document.querySelector(".loader-l");
let spinIconL = document.querySelector(".loader-l>i")
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

    document.getElementById("submit-btn").style.display = 'none';
    loader.style.display = 'flex';
    spinIcon.classList.add('spin');

    fetch(`${baseURL}/users/register`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((res) => {
            if (res.msg == "Successfully Registered, Please Login to Continue") {

                loader.style.display='none';
                document.getElementById("submit-btn").style.display='block'
                form['submit-btn'].value = 'Success';

                setTimeout(()=>{
                    alert(res.msg);
                document.getElementById('signup-form-cont').style.display = "none";
                document.getElementById('signin-form-cont').style.display = "block";
                form.reset();
                spinIcon.classList.remove('spin');
                form['submit-btn'].value = 'Submit'
                },100)

            }
            else if (res.error) {
                alert('Something went wrong');
                loader.style.display='none';
                spinIcon.classList.remove('spin');
                document.getElementById("submit-btn").style.display='block'
                console.log(res);
            }
            else if (res.msg == 'User Already Exists, Please Login') {

                alert(res.msg);
                loader.style.display='none';
                spinIcon.classList.remove('spin');
                document.getElementById("submit-btn").style.display='block'

            } else { 
                alert("Something went wrong")
                loader.style.display='none';
                spinIcon.classList.remove('spin');
                document.getElementById("submit-btn").style.display='block'
             }
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

    
    document.getElementById("submit-btn-l").style.display = 'none';
    loaderL.style.display = 'flex';
    spinIconL.classList.add('spin');

    fetch(`${baseURL}/users/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    })
        .then((res)=>{
            console.log(res)
            return res.json()
        })
        .then((res) => {
            if (res.err) {

                loaderL.style.display='none';
                spinIconL.classList.remove('spin');
                document.getElementById("submit-btn-l").style.display='block'
                login['submit-btn-l'].value = '✕ Failed';

                
                setTimeout(()=>{
                    alert('Something went wrong');
                    login['submit-btn-l'].value = 'Submit'
                    login.reset();
                },100);

                console.log(res);
            }
            else if (res.invalid) {

                loaderL.style.display='none';
                spinIconL.classList.remove('spin');
                document.getElementById("submit-btn-l").style.display='block'
                login['submit-btn-l'].value = '✕ Failed';

                
                setTimeout(()=>{
                    alert("Wrong Credentials");
                    login['submit-btn-l'].value = 'Submit'
                    login.reset();
                },100);
                console.log(res)
            }
            else if (res.msg == "User Doesn't Exists, Please Register") {

                loaderL.style.display='none';
                spinIconL.classList.remove('spin');
                document.getElementById("submit-btn-l").style.display='block'
                login['submit-btn-l'].value = '✕ Failed';

                setTimeout(()=>{
                    alert(res.msg);
                    login['submit-btn-l'].value = 'Submit'
                    login.reset();
                },100);
                console.log(res)
            }
            else {

                loaderL.style.display='none';
                spinIconL.classList.remove('spin');
                document.getElementById("submit-btn-l").style.display='block'
                login['submit-btn-l'].value = '✓';

                console.log(res)
                localStorage.setItem('name', res.name);
                localStorage.setItem('token', res.token);
                
                setTimeout(()=>{
                    alert(res.msg);
                    login['submit-btn-l'].value = 'Submit'
                    document.querySelector(".login-div").classList.remove("show-login");
                    document.querySelector(".overlay").classList.remove("show-overlay");
                    location.reload();
                },100)
            }

            // login['submit-btn-l'].value = 'Submit'

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