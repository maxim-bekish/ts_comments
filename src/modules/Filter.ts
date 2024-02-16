import { Render } from "./Render";

export class Filter {
  static setupEventListeners() {
    const customSelect = document.querySelector(
      ".menu_filter_custom-select"
    ) as HTMLDivElement;
    const selectedOption = customSelect.querySelector(
      ".selected-option"
    ) as HTMLSpanElement;
    const optionsList = customSelect.querySelector(
      ".options-list"
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
