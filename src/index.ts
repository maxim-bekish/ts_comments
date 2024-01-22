import "./sass/_style.scss";
import "./sass/_all.scss";


import fetchData from "./modules/fetchData";
import {xxx} from "./modules/addComment";

const user: HTMLElement | null = document.getElementById("user");
const avatarID: HTMLElement | null = document.getElementById("avatarID");
const submit: HTMLElement | null = document.getElementById("submit");

submit?.addEventListener("click", () => {

   xxx()
  
});

// Пример использования функции
fetchData()
  .then((result) => {
    user.textContent = `${result.title} ${result.first} ${result.last} `;

    const img = new Image();
    img.src = result.picture;
    img.alt = "avatar";
    avatarID.append(img);

    //;
  })
  .catch((error) => {
    console.error("Ошибка при запросе данных:", error);
    if (user) user.textContent = `First Last`;
  });
