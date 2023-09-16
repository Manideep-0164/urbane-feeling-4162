//Default Data

const productURL = "https://teal-seahorse-suit.cyclic.app";
// const productURL = "http://localhost:2020";
const token = localStorage.getItem("token");
const name = localStorage.getItem("name");

const barLoader = document.getElementsByClassName("bar-loader")[0];
const loaderOverlay = document.getElementsByClassName("loader-overlay")[0];
let cardCont = document.getElementsByClassName("card-container")[0];
let headDiv = document.getElementsByClassName("product-top")[0];
let category = document.getElementsByClassName("sub-heading")[0];
let brandCont = document.getElementsByClassName("brand-items")[0];
let productHeading = document.querySelector(".product-heading > .GPM");
let loadingData = document.querySelector(".loaderRectangle");
let brandItms = document.getElementsByClassName("brandCheckbox");
let sortButton = document.getElementById("sort");
var CategorisedData = []; // Container to store the data based on category from fetched Data
let holdbrand = {}; // Container to hold the Checked Brand
let priceFilter = []; // Container to store the priceChecked Data
let brandLength = 0; // variable to store the length of each brand in line 197
let brandFilter = []; // Container to store the brandChecked Data

let data = {
  category: "Agriculture Garden & Landscaping",
  subCategory: "Grain Processing Machine",
  subCategories: [
    "Agriculture & Gardening - Made In Japan",
    "Agriculture Implements",
    "Artificial Grass",
    "Blowers",
    "Brush Cutter and Accessories",
    "Chaff Cutter",
  ],
};

window.addEventListener("load", async () => {
  fetchProducts();
});

//Getting Header Data
let headingData =
  JSON.parse(
    localStorage.getItem("category-grain") ||
      localStorage.getItem("category-chain")
  ) || data;

//Creating Dynamic Header
createHeader(headingData);

function createHeader(data) {
  headDiv.innerHTML = `
    
    <h2 class="heading">${data.subCategory.toUpperCase()}</h2>
        <ul>
            <li>⟨</li>
            ${data.subCategories.map((e) => createItems(e ? e : "")).join("")}
            <li>⟩</li>
        </ul>
    
    `;

  let heading = document.getElementsByClassName("heading")[0];

  // Letter wrapping with ellipses
  if (data.subCategory.length >= 24) {
    heading.classList.add("letter-wrapper");
  } else {
    heading.classList.remove("letter-wrapper");
  }
}

//Creating the List-items
function createItems(items) {
  return `<li>${items}</li>`;
}

// Product Part

category.innerText = headingData.subCategory; // Categories heading

async function fetchProducts() {
  try {
    // Storing and Modifying Category name similar to name in Database
    let catFilter = headingData.subCategory.toLowerCase();
    if (catFilter == "grain processing machine") catFilter = "Grain processing";

    let res = await fetch(`${productURL}/products/get/ag`);
    let rawData = await res.json();
    let data = rawData.map((e) => {
      return {
        name: e.name,
        brand: e.brand,
        image: e.image,
        price: e.price,
        category: e.category,
      };
    });

    // filtering by category
    CategorisedData = data.filter((e) => {
      if (catFilter == e.category) return true;
    });

    // Setting Product-Heading and No.of Products
    productHeading.innerHTML = `
        ${headingData.subCategory}<span class="products-length"> (1 - ${CategorisedData.length} products)</span>
        `;

    // brands filter creation
    createBrands(CategorisedData);

    // cards
    createProducts(CategorisedData);

    // Removing Loader after getting data
    removeLoader();
  } catch (err) {
    console.log(err);
  }
}

// Creating Products
function createProducts(data) {
  cardCont.innerHTML = null;
  createCards(data);
}

// Creating Product-Cards
function createCards(data) {
  data.forEach((e) => {
    let childCard = document.createElement("div");
    childCard.setAttribute("class", "card");

    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "img");

    let cardIMG = document.createElement("img");
    cardIMG.setAttribute("src", `${e.image}`);

    imgDiv.append(cardIMG);

    let infoCont = document.createElement("div");
    infoCont.setAttribute("class", "info");

    let name = document.createElement("p");
    name.setAttribute("class", "name");
    name.innerText = e.name;

    let brand = document.createElement("p");
    brand.setAttribute("class", "brand");
    brand.innerText = e.brand;

    let price = document.createElement("p");
    price.setAttribute("class", "price");
    price.innerText = `Rs. ${e.price} / Piece`;

    infoCont.append(name, brand, price);

    let cartBtn = document.createElement("button");
    cartBtn.setAttribute("class", "addToCart");
    cartBtn.innerText = "ADD TO CART";

    cartBtn.addEventListener("click", async () => {
      const itemDetails = {
        name: e.name,
        brand: e.brand,
        image: e.image,
        price: e.price,
        category: e.category,
      };

      let isItemAddedToCart;

      loaderOverlay.style.display = "block";
      barLoader.style.display = "block";

      try {
        isItemAddedToCart = await fetch(`${productURL}/cart/add-to-cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(itemDetails),
        }).then((res) => res.json());
      } catch (error) {
        console.log(error);
        alert("Something went wrong.");
      } finally {
        loaderOverlay.style.display = "none";
        barLoader.style.display = "none";
      }

      if (isItemAddedToCart?.error === "Please Login")
        return alert("Please Login");

      if (isItemAddedToCart?.message === "Product added to cart.")
        return alert("Product added to cart.");

      if (isItemAddedToCart?.message === "Already added!")
        return alert("Already added!");

      console.log(isItemAddedToCart);
    });

    childCard.append(imgDiv, infoCont, cartBtn);

    cardCont.append(childCard);
  });
}

// Creating brand checkboxes
function createBrands(data) {
  brandCont.innerHTML = null;
  let duplicates = [];
  data.forEach((e) => {
    if (!duplicates.includes(e.brand)) {
      duplicates.push(e.brand);

      let label = document.createElement("label");
      label.setAttribute("for", `${e.brand}`);

      let div = document.createElement("div");

      let input = document.createElement("input");
      input.setAttribute("type", `checkbox`);
      input.setAttribute("class", `brandCheckbox`);
      input.setAttribute("value", `${e.brand}`);
      input.setAttribute("id", `${e.brand}`);
      input.addEventListener("click", () => {
        handleClick(input);
      });

      let p = document.createElement("p");

      for (let ele of data) {
        if (e.brand == ele.brand) brandLength++;
      }

      p.innerHTML = `${e.brand} <span>(${brandLength})</span>`;
      brandLength = [];

      div.append(input, p);

      label.append(div);

      brandCont.append(label);
    }
  });
}

// RenderLoader
function renderLoader() {
  loadingData.classList.add("show-loader");
  document.querySelector("body").style.overflowY = "hidden";
}

// RemoverLoader
function removeLoader() {
  loadingData.classList.remove("show-loader");
  document.querySelector("body").style.overflowY = "visible";
}

let count = 0;
let brandTempData = [];

// Filtering the data by brand based on checkboxes
function handleClick(ele) {
  let brandTempData = priceFilter[0] ? priceFilter : CategorisedData;
  let brand = ele.value;
  if (ele.checked) holdbrand[brand] = 1;

  if (!ele.checked) {
    delete holdbrand[brand];
    count = 0; // After unchecking the brand we need to refresh the poducts Container
  }

  // Displaying all data if no brand is selected
  let noBrand = !Object.keys(holdbrand).length; // Getting the length of the (holdbrand obj)
  if (noBrand) {
    createProducts(brandTempData);
    brandFilter = []; //Emptying the container because no brand was selected
    return;
  }
  console.log(brandTempData);
  for (let i in holdbrand) {
    count++;
    brandFilter = brandTempData.filter((e) => {
      if (i == e.brand) return true;
    });
    if (count == 1) cardCont.innerHTML = null; // Refreshing the products container for initial brand selection
    if (brandFilter.length == 0) {
      // If no data exists in the combo of Selected Price and Brand
      alert("No data Exists with the Selected Combination");
      ele.checked = false; // Making checkbox Unchecked because the selected combo not present
      delete holdbrand[brand];
      count = 0;
      createProducts(brandTempData); // Displaying the data of PriceFilter
      return;
    }
    // Displaying the selected brand's Data
    createCards(brandFilter);
  }
}

let tempData = [];

// Filtering the data by price and brand based on checkboxes
for (let i of brandItms) {
  i.addEventListener("click", (e) => {
    let [startPrice, endPrice] = e.target.value.split(" ").map(Number);
    tempData = brandFilter[0] ? brandFilter : CategorisedData; // Checking wheather which data present either brandsChecked data or if not then total data
    if (tempData && e.target.checked) {
      for (let j of tempData) {
        if (j.price >= startPrice && j.price <= endPrice) {
          priceFilter.push(j);
        }
      }
      if (priceFilter.length == 0) {
        // If data not present with given combination (brand + price)
        alert("no Data with given combination");
        e.target.checked = false; // unchecking the checkbox (because data not present)
        return;
      }
      createProducts(priceFilter);
    } else if (!e.target.checked) {
      let temp = []; // Container for storing checked data
      temp = priceFilter.filter((ele) => {
        if (ele.price < startPrice || ele.price > endPrice) return true; // filtering the unchecked data
      });

      if (temp[0]) {
        // After filteration if data present
        priceFilter = temp; // storing the updated data because we need to remove the unchecked data from priceFilter also
        createProducts(temp);
      } else {
        priceFilter = []; // if all the price fields are unchecked
        createProducts(tempData);
      }
    }
  });
}

// Sorting the products by price or name
sortButton.addEventListener("change", async (e) => {
  let cat = headingData.subCategory;

  const catOptions = {
    "Chain Saw": "chain saw",
    "Grain Processing Machine": "Grain processing",
  };

  let filteredProducts;

  loaderOverlay.style.display = "block";
  barLoader.style.display = "block";

  try {
    filteredProducts = await fetch(
      `${productURL}/product/sort?cat=${catOptions[cat]}&sort=${e.target.value}`
    ).then((res) => res.json());
  } catch (error) {
    console.log(error);
    alert("Something went wrong.");
  } finally {
    loaderOverlay.style.display = "none";
    barLoader.style.display = "none";
  }

  createProducts(filteredProducts);
});
