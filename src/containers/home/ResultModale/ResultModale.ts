import { resultModaleUi } from "@views/homeUi/resultModaleUi/resultModaleUi";

export class ResultModale {
  paragraphs: Tesseract.Paragraph[] | null
  textResult: string
  resultModale: HTMLElement
  closeResultModaleButton: HTMLButtonElement
  copyButton: HTMLButtonElement
  copyButtonContainer: HTMLButtonElement
  copiedElement: HTMLElement
  resultText: HTMLElement
  copiedElementTimeout: null | NodeJS.Timeout = null
  overflowWrapper: HTMLElement

  constructor({ paragraphs, text }: Tesseract.Page) {
    this.paragraphs = paragraphs
    this.textResult = text;
    this.displayResultModale();
    this.resultModale = document.getElementById("result-modale")!;
    this.closeResultModaleButton = document.getElementById("close-result-modale") as HTMLButtonElement;
    this.closeResultModaleButton.addEventListener("click", this.handleCloseResultModale.bind(this));
    this.copyButton = document.getElementById("copy-button") as HTMLButtonElement;
    this.copyButton.addEventListener("click", this.handleCopy.bind(this));
    this.copyButtonContainer = document.getElementById("copy-button-container") as HTMLButtonElement;
    this.copiedElement = document.getElementById("copied-text-alert")!;
    this.resultText = document.getElementById("result-text")!;
    this.overflowWrapper = document.getElementById("overflow-wrapper")!
  }

  async handleCopy() {
    this.displayCopiedElement();
    await navigator.clipboard.writeText(this.textResult);
  }

  displayCopiedElement() {
    if (this.copiedElementTimeout) {
      clearTimeout(this.copiedElementTimeout);
      this.copiedElementTimeout = null;
    }

    this.copyButtonContainer.style.backdropFilter = "none"
    this.copyButton.disabled = true
    this.resultText.style.userSelect = "none"
    this.overflowWrapper.style.filter = "blur(3px)"
    this.copiedElement.style.display = "grid";
    this.copiedElementTimeout = setTimeout(this.hideCopiedElement.bind(this), 1800);
  }

  hideCopiedElement() {
    this.copyButtonContainer.style.backdropFilter = "blur(3px)"
    this.copyButton.disabled = false
    this.resultText.style.userSelect = "auto"
    this.overflowWrapper.style.filter = "none"
    this.copiedElement.style.display = "none";
  }

  handleCloseResultModale() {
    this.resultModale.remove();
    document.dispatchEvent(new Event("addPaste"))
  }

  displayResultModale() {
    const main = document.querySelector("main")!;
    if (this.paragraphs !== null) {
      main.insertAdjacentHTML("beforeend", resultModaleUi(this.paragraphs));
    }
  }
}
