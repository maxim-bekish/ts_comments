import { CommentDataController } from "../mod/CommentDataController";

export class CustomSelect {
  private customSelect: HTMLDivElement;
  private selectedOption: HTMLSpanElement;
  private optionsList: HTMLUListElement;

  constructor() {
    this.customSelect = document.querySelector(
      ".custom-select"
    ) as HTMLDivElement;
    this.selectedOption = this.customSelect.querySelector(
      ".selected-option"
    ) as HTMLSpanElement;
    this.optionsList = this.customSelect.querySelector(
      ".options-list"
    ) as HTMLUListElement;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.customSelect.addEventListener("click", () => {
      this.optionsList.style.display =
        this.optionsList.style.display === "block" ? "none" : "block";
    });

    this.optionsList.addEventListener("click", (event) => {
      const target = event.target as HTMLLIElement;

      if (target.tagName === "LI") {
        CommentDataController.updateFilter(target.attributes[0].value);

        this.selectedOption.textContent = target.textContent || ""; // Скрываем список после выбора опции


        
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (!this.customSelect.contains(target)) {
        this.optionsList.style.display = "none";
      }
    });
  }
}
