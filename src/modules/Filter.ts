import { Render } from "./Render";

export class Filter {
  static setupEventListeners() {
    const customSelect = document.querySelector(
      ".navigation__filter-custom-select"
    ) as HTMLDivElement;
    const selectedOption = customSelect.querySelector(
      ".navigation__filter-selected-option"
    ) as HTMLSpanElement;
    const optionsList = customSelect.querySelector(
      ".navigation__filter-options-list"
    ) as HTMLUListElement;

    customSelect.addEventListener("click", () => {
      optionsList.style.display === "block"
        ? (optionsList.style.display = "none")
        : (optionsList.style.display = "block");
    });

    optionsList.addEventListener("click", (event) => {
      const target = event.target as HTMLLIElement;

      if (target.tagName === "LI") {
        localStorage.setItem("filter", target.attributes[0].value);

        selectedOption.textContent = target.textContent || ""; // Скрываем список после выбора опции

        Render.allCommentsAndAnswer();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (!customSelect.contains(target)) {
        optionsList.style.display = "none";
      }
    });
  }
}
