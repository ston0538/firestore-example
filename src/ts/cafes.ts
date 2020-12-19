import firebaseService from "./firebaseService";

interface ICafe {
  city: string;
  name: string;
}

const cafeList = document.querySelector("#cafe-list");
const cafes = firebaseService("cafes");

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

export function renderCafes() {
  cafes.getDatas().then((data) => {
    data.forEach((item: ICafe) => {
      renderCafe(item);
    });
  });
}
