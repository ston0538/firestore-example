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

function renderCafe(doc: any) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");

  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "x";
  li.setAttribute("data-id", doc.id);
  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  // delete data
  cross.addEventListener("click", (e) => deleteCafe(e, doc.id));
}

export function submitCafe() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(form);
    const city = form.city.value;
    const name = form.shop_name.value;
    cafes.createData({ city, name }).then((result) => {
      if (result !== null) {
        form.city.value = "";
        form.shop_name.value = "";
      }
    });
  });
}
function deleteCafe(event: Event, id: string) {
  event.stopPropagation();
  cafes.deleteData(id);
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
