import firebaseService from "./firebaseService";
import firesbase from "firebase";

interface ICafe {
  city: string;
  shop_name: string;
}
interface FormCafe extends HTMLFormElement {
  city: HTMLInputElement;
  shop_name: HTMLInputElement;
}
const cafeList = document.querySelector("#cafe-list");
const form: FormCafe = document.querySelector("#add-cafe-form");
const cafes = firebaseService("cafe");

function renderCafe(data: any) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  name.textContent = data.name;
  city.textContent = data.city;
  li.appendChild(name);
  li.appendChild(city);
  cafeList.appendChild(li);
}

export function submitCafe() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(form);
    const city = form.city.value;
    const name = form.shop_name.value;
    cafes.create({ city, name }).then((result) => {
      if (result !== null) {
        form.city.value = "";
        form.shop_name.value = "";
      }
    });
  });
}

export function renderCafes() {
  cafes
    .getDatas()
    .then((data) => {
      data.forEach((item: ICafe) => {
        renderCafe(item);
      });
    })
    .catch((error) => console.log(error));
}
