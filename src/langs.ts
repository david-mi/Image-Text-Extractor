const navigatorLanguage = navigator.language;

export interface ProcessState {
  "loading tesseract core": string,
  "initializing tesseract": string,
  "initialized tesseract": string,
  "loading language traineddata": string,
  "loading language traineddata (from cache)": string,
  "loaded language traineddata": string,
  "initializing api": string,
  "initialized api": string,
  "recognizing text": string
}

interface Lang {
  [props: string]: {
    processModale: {
      processState: ProcessState,
      choseLang: string,
      selectOptions: {
        [props: string]: string
      },
      sendButton: string
    },
    resultModale: {
      clipboardAlert: string
    }
  }
}

const lang: Lang = {
  "fr-FR": {
    processModale: {
      processState: {
        "loading tesseract core": "Chargement du noyen Tesseract",
        "initializing tesseract": "Initialisation de Tesseract",
        "initialized tesseract": "Tesseract initialisé",
        "loading language traineddata": "Chargement du language entraîné",
        "loading language traineddata (from cache)": "Récupération dans le cache",
        "loaded language traineddata": "Langage chargé",
        "initializing api": "Initialisation de l'API",
        "initialized api": "API initialisée",
        "recognizing text": "Reconnaissance du texte..."
      },
      choseLang: "Choisir un langage",
      selectOptions: {
        "eng": "Anglais",
        "fra": "Français"
      },
      sendButton: "Envoyer"
    },
    resultModale: {
      clipboardAlert: "Ajouté au presse papier"
    }
  },

  "default": {
    processModale: {
      processState: {
        "loading tesseract core": "Loading tesseract core",
        "initializing tesseract": "Initializing tesseract",
        "initialized tesseract": "Initialized tesseract",
        "loading language traineddata": "Loading language traineddata",
        "loading language traineddata (from cache)": "Loading language traineddata (from cache)",
        "loaded language traineddata": "Loaded language traineddata",
        "initializing api": "Initializing api",
        "initialized api": "Initialized api",
        "recognizing text": "Recognizing text"
      },
      choseLang: "Choose a lang",
      selectOptions: {
        "eng": "English",
        "fra": "French"
      },
      sendButton: "Send"
    },
    resultModale: {
      clipboardAlert: "Added to clipboard"
    }
  }
};

export const langConfig = lang[navigatorLanguage] || lang.default;