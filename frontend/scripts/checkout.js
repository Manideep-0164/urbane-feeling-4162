// const checkoutURL = "http://localhost:2020";
const checkoutURL = "https://teal-seahorse-suit.cyclic.app";
const form = document.getElementById("form");
const userName = localStorage.getItem("name");
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const barLoader = document.getElementsByClassName("bar-loader")[0];
const loaderOverlay = document.getElementsByClassName("loader-overlay")[0];

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const rawForm = new FormData(form);
  const paymentDetails = {};
  for (const pair of rawForm.entries()) {
    paymentDetails[pair[0]] = pair[1];
  }

  let response;

  loaderOverlay.style.display = "block";
  barLoader.style.display = "block";

  try {
    response = await fetch(`${checkoutURL}/cart/cart-items/${userId}`, {
      method: "DELETE",
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

  if (!response.acknowledged)
    alert("Something went wrong, Please try again later.");

  localStorage.setItem(userName, JSON.stringify(paymentDetails));
  form.reset();

  window.location.href = "../thankyou.html";
});
