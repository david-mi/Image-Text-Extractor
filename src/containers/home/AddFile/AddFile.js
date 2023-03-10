import { ProcessModale } from "../ProcessModale/ProcessModale";

export class AddFile {
  constructor() {
    this.fileInput = document.querySelector("input[type='file']");
    this.fileInput.addEventListener("change", this.handleFileInput.bind(this));
    this.labelFile = document.querySelector("label[for='file']");
    this.labelFile.addEventListener("mouseenter", this.handleLabelMouseEnter.bind(this));
    this.labelFile.addEventListener("mouseleave", this.handleLabelMouseLeave.bind(this));
    this.errorElement = document.getElementById("error-file");
  }

  displayError(error) {
    console.error(error);
    this.errorElement.textContent = error.message;
  }

  handleLabelMouseEnter() {
    document.body.classList.add("hover-form");
  }

  handleLabelMouseLeave() {
    document.body.classList.remove("hover-form");
  }

  handleFileInput({ target }) {
    const addedFile = target.files[0];
    try {
      this.checkFileValidity(addedFile);
      this.reset();
      new ProcessModale(addedFile);
    } catch (error) {
      this.reset();
      this.displayError(error);
    }
  }

  checkFileValidity(file) {
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