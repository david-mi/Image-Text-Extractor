import { ProcessModale } from "../ProcessModale/ProcessModale";
import helpContentStyle from "@views/homeUi/helpUi/content/content.module.scss"
import backgroundContentStyle from "@views/homeUi/helpUi/background/background.module.scss"

export class AddFile {
  fileInput = document.querySelector<HTMLInputElement>("input[type='file']")!;
  labelFile = document.querySelector<HTMLLabelElement>("label[for='file']")!;
  errorElement = document.getElementById("error-file")!;
  helpContent = document.getElementById("help-content")!
  helpButton = document.getElementById("help-button")!
  helpBackground = document.getElementById("help-background")!

  constructor() {
    this.fileInput.addEventListener("change", this.handleFileInput.bind(this));
    this.labelFile.addEventListener("mouseenter", this.handleLabelMouseEnter.bind(this));
    this.labelFile.addEventListener("mouseleave", this.handleLabelMouseLeave.bind(this));
    this.helpButton.addEventListener("click", this.toggleHelp.bind(this))
    this.helpBackground.addEventListener("click", this.toggleHelp.bind(this))
  }

  toggleHelp() {
    this.helpContent.classList.toggle(helpContentStyle.hide)
    this.helpBackground.classList.toggle(backgroundContentStyle.hide)
  }

  displayError(error: Error | unknown) {
    console.error(error);
    if (error instanceof Error) {
      this.errorElement.textContent = error.message;
    }
  }

  handleLabelMouseEnter() {
    document.body.classList.add("hover-form");
  }

  handleLabelMouseLeave() {
    document.body.classList.remove("hover-form");
  }

  handleFileInput({ target }: Event) {
    const addedFile = (target as HTMLInputElement).files;
    if (!addedFile || addedFile.length === 0) return

    try {
      this.checkFileValidity(addedFile[0]);
      new ProcessModale(addedFile[0]);
      this.reset();
    } catch (error) {
      this.reset();
      this.displayError(error);
    }
  }

  checkFileValidity(file: File) {
    const mimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const addedFileMimeType = file.type;
    const isMimeTypeAccepted = mimeTypes.includes(addedFileMimeType);

    if (isMimeTypeAccepted === false) {
      throw new Error("Fichiers acceptés: png, jp(e)g et webp");
    }
  }

  reset() {
    this.fileInput.value = "";
    this.errorElement.textContent = "";
  }
}