
let grainbtn = document.getElementById("grain-processing-machine");
let chainbtn = document.getElementById("chain-saw");

// Removing the Side-Menu bar from the homepage by reaching the footer

let menu = document.getElementsByClassName("menu-bar")

window.addEventListener('scroll', () => {

    const scrollPosition = window.pageYOffset;      // Get the scroll position

    if (scrollPosition >= 3968.285888671875) {      //3987.142822265625
        menu[0].style.display = 'none'
    }
    else {
        menu[0].style.display = 'block'
    }

    // console.log(scrollPosition);                    // Log the scroll position
});




const grainMachine = () => {

    let data = {
        category: 'Agriculture Garden & Landscaping',
        subCategory: 'Grain Processing Machine',
        subCategories: ["Agriculture & Gardening - Made In Japan", "Agriculture Implements", "Artificial Grass", "Blowers", "Brush Cutter and Accessories", "Chaff Cutter"]
    }

    localStorage.setItem('category-grain', JSON.stringify(data));
    localStorage.removeItem("chain-saw")
}

const chainSaws = () => {
    let data = {
        category: 'Agriculture Garden & Landscaping',
        subCategory: 'Chain Saw',
        subCategories: ['Chainsaw Accessories', "Cordless Chain Saw", "Electric Chain Saw", "Petrol Chain Saw", "Pole Saw"]
    }
    localStorage.setItem('category-chain', JSON.stringify(data));
    localStorage.removeItem("category-grain")
}

const redirect = () => {
    location.href = "../products.html"
}

let menuItems = document.querySelectorAll(".menu-bar>ul");
let menuOverlay = document.getElementsByClassName("menu-overlay")[0];

function addOverlay()
{
    menuOverlay.classList.add("show-menuOverlay");
}

function removeOverlay()
{
    menuOverlay.classList.remove("show-menuOverlay");
}

// for(let k of menuItems)
// {
//     k.addEventListener("mouseover",(e)=>{
//         menuOverlay.style.color
//     })
// }
