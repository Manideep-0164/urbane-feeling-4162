// const cartBaseURL = "http://localhost:2020";
const cartBaseURL = "https://teal-seahorse-suit.cyclic.app";
const user = localStorage.getItem("userId");
const token = localStorage.getItem("token");

let dataContainer = document.getElementById("append-cart");
let subTotal = document.getElementById("total-amount");
let grandTotal = document.getElementById("grand-total");
let checkOut = document.getElementById("check-out");
let cartContainer = document.getElementById("cart-container");
let cartEmptyCont = document.getElementById("cart-empty-container");
let goHomeBtn = document.getElementById("go-home");
const barLoader = document.getElementsByClassName("bar-loader")[0];
const loaderOverlay = document.getElementsByClassName("loader-overlay")[0];

let totalCost = 0;

window.addEventListener("load", async () => {
  getCartOfUser();
});

async function getCartOfUser() {
  let cartData;

  loaderOverlay.style.display = "block";
  barLoader.style.display = "block";

  try {
    cartData = await fetch(`${cartBaseURL}/cart/cart-items/${user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log(error);
    alert("Something went wrong.");
  } finally {
    loaderOverlay.style.display = "none";
    barLoader.style.display = "none";
  }

  if (cartData?.message === "Your Cart is empty.") {
    cartContainer.innerHTML = null;
    cartEmptyCont.style.display = "block";
    return;
  }
  cartEmptyCont.style.display = "none";

  totalCost = cartData.reduce((acc, item) => {
    acc = acc + item.quantity * item.price;
    return acc;
  }, 0);

  subTotal.innerText = "$" + totalCost;
  grandTotal.innerText = "$" + totalCost;

  displaycart(cartData);
}

goHomeBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

checkOut.addEventListener("click", () => {
  localStorage.setItem("total_price", totalCost);
  window.location.href = "../checkout.html";
});

function displaycart(data) {
  dataContainer.innerHTML = null;

  data.forEach((e, i) => {
    let cartItem = document.createElement("div");
    cartItem.setAttribute("class", "cart-item");

    let cartItemImage = document.createElement("div");
    cartItemImage.setAttribute("class", "cart-item-image");
    let cartImg = document.createElement("img");
    cartImg.setAttribute("src", e.image);
    cartItemImage.append(cartImg); //Image appended

    let cartItemInfo = document.createElement("div");
    cartItemInfo.setAttribute("class", "cart-item-info");
    let itemBrand = document.createElement("span");
    itemBrand.setAttribute("class", "item-brand");
    itemBrand.innerText = e.brand;
    let itemName = document.createElement("p");
    itemName.setAttribute("class", "item-name");
    itemName.innerText = e.name;
    let itemCategory = document.createElement("p");
    itemCategory.setAttribute("class", "item-category");
    itemCategory.innerText = e.category;
    cartItemInfo.append(itemBrand, itemName, itemCategory); //Item info appended

    let itemQnt = document.createElement("div");
    itemQnt.setAttribute("class", "item-qnt");
    itemQnt.innerText = "Qty : ";
    let dec = document.createElement("button");
    dec.setAttribute("class", "dec");
    dec.innerText = "-";
    let inc = document.createElement("button");
    inc.setAttribute("class", "inc");
    inc.innerText = "+";
    let itemQuant = document.createElement("span");
    itemQuant.setAttribute("class", "item-quant");
    itemQuant.innerText = e.quantity;
    itemQnt.append(dec, itemQuant, inc); //Quantity appended

    let itemPrice = document.createElement("div");
    itemPrice.setAttribute("class", "item-price");
    let price = document.createElement("p");
    price.setAttribute("class", "price");
    price.innerText = "$" + e.price;
    let remove = document.createElement("button");
    remove.setAttribute("class", "remove-item");
    remove.innerText = "Remove";
    itemPrice.append(price, remove); //price and removebtn appended

    inc.addEventListener("click", async () => {
      let response;

      loaderOverlay.style.display = "block";
      barLoader.style.display = "block";

      try {
        response = await fetch(`${cartBaseURL}/cart/update-item/${e._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            quantity: e.quantity + 1,
          }),
        }).then((res) => res.json());
      } catch (error) {
        console.log(error);
        alert("Something went wrong.");
      } finally {
        loaderOverlay.style.display = "none";
        barLoader.style.display = "none";
      }

      if (response.message === "Item updated") return getCartOfUser();
      if (response.message === "Product does not exist.")
        alert("Product does not exist.");
    });

    dec.addEventListener("click", async () => {
      // Decreament Part
      if (itemQuant.innerText > 1) {
        let response;

        loaderOverlay.style.display = "block";
        barLoader.style.display = "block";

        try {
          response = await fetch(`${cartBaseURL}/cart/update-item/${e._id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              quantity: e.quantity - 1,
            }),
          }).then((res) => res.json());
        } catch (error) {
          console.log(error);
          alert("Something went wrong.");
        } finally {
          loaderOverlay.style.display = "none";
          barLoader.style.display = "none";
        }

        if (response.message === "Item updated") return getCartOfUser();
        if (response.message === "Product does not exist.")
          alert("Product does not exist.");
      }
    });

    remove.addEventListener("click", async () => {
      let deleteResponse;

      loaderOverlay.style.display = "block";
      barLoader.style.display = "block";

      try {
        deleteResponse = await fetch(
          `${cartBaseURL}/cart/remove-item/${e._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        ).then((res) => res.json());
      } catch (error) {
        console.log(error);
        alert("Something went wrong.");
      } finally {
        loaderOverlay.style.display = "none";
        barLoader.style.display = "none";
      }

      if (deleteResponse.message !== "Item removed.")
        return alert(deleteResponse.message);

      if (deleteResponse.message === "Item removed.") getCartOfUser();
    });

    cartItem.append(cartItemImage, cartItemInfo, itemQnt, itemPrice);
    dataContainer.append(cartItem);
  });
}
