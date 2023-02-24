let navbar = document.querySelector("nav");
    let sticky = navbar.offsetTop;

    window.onscroll = function(){
        myFunction();
    }

    function myFunction() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }