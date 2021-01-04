import firebaseService, { callback } from "./firebaseService";
import firebase from "firebase/app";

interface FormCafe extends HTMLFormElement {
  city: HTMLInputElement;
  shop_name: HTMLInputElement;
}
// const cafeList = document.querySelector("#cafe-list") as HTMLScriptElement;
const cafeList = <HTMLScriptElement>document.querySelector("#cafe-list");
const form: FormCafe = document.querySelector("#add-cafe-form");
const cafes = firebaseService("cafes");
const loadMore = document.querySelector(".load-more button");
const loading = document.querySelector(".loading");

function renderCafe(
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
) {
  setTimeout(() => {
    loading.classList.add("active");
  }, 1000);
  let template: any = "";
  const cafes = doc.data();
  template += `
    <li>
    <span>${cafes.name}</span>
    <span>${cafes.city}</span>
    <div class="cross">X</div> 
    </li> 
  `;
  cafeList.innerHTML += template;
  setTimeout(() => {
    loading.classList.remove("active");
  }, 2000);
  const cross = document.querySelector(".cross");
  // delete data
  cross.addEventListener("click", (e) => deleteCafe(e, doc.id));
}

export function submitCafe() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(form);
    const city = form.city.value;
    const name = form.shop_name.value;
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    cafes.createData({ city, name, createdAt }).then((result) => {
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

const realTime: callback = function (changes, empty) {
  changes.forEach((change) => {
    if (change.type === "added") {
      renderCafe(change.doc);
    }
    if (change.type === "removed") {
      let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
      cafeList.removeChild(li);
    }
  });
  if (empty === true) {
    alert("불러올 데이터가 없습니다.");
    loadMore.removeEventListener("click", renderCafes);
    cafeList.removeEventListener("scroll", handleScroll);
  }
  // console.log(empty);
};
export async function renderCafes() {
  cafes.getDatas(realTime, 6);
}
function handleScroll() {
  const triggerHeight = cafeList.scrollTop + cafeList.offsetHeight;
  if (triggerHeight >= cafeList.scrollHeight) {
    renderCafes();
  }
}
// load data on DOM loaded
cafeList.addEventListener("scroll", handleScroll);
// loadMore.addEventListener("click", renderCafes);
