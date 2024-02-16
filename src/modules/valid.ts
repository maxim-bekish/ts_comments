export const validInput = (
  input: HTMLTextAreaElement,
  button: HTMLButtonElement,
  bool: boolean
): void => {
  input.addEventListener("input", () => {
    const text = input.value.split("").length;
    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;
    let span = document.getElementById("counterText");
    if (text === 0) {
      button.disabled = true;
      if (bool) {
        span.innerText = `Макс.  1000 символов`;
        span.style.color = "red";
      }
      return;
    }
    if (text > 1000) {
      button.disabled = true;
      if (bool) {
        span.innerText = `${text}/1000     Слишком длинное сообщение`;
        span.style.color = "red";
      }
      return;
    }
    if (text >= 0 && text <= 1000) {
      button.disabled = false;
      if (bool) {
        span.innerText = `${text}/1000 `;
        span.style.color = "black";
      }
      return;
    }
  });
};
