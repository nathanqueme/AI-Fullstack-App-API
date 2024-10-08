/**
 * localizations.tsx
 * version 1.0.0
 * 
 * Created on the 19/02/2023
 */

import LocalizedStrings from 'react-localization'
import { supportedLanguages } from './languagesList'

// const { hl = "en" } = mainConfig
const hl = "en"

/**
  `"en"`:{
    `"joe"`: `"Joe"`,
    `"greeting"`: `"Hello {0}!"`
  }
  strings.formatString(strings.greeting, strings.joe) gives `"Hello Joe!"`
*/
export const localization = new LocalizedStrings({
  "en": {
    // Navigation
    edit: "Edit",
    close: "Close",
    cancel: "Cancel",
    confirm: "Confirm",
    back: "Back",
    save: "Save",
    done: "Done",
    next: "Next",
    none: "None",
    upload: "Upload",
    select_file: "Select file",
    drag_and_drop_file: "Drag and drop file to upload",
    // Pages
    page_not_found: "Page not found",
    error_404_description: "Sorry, we couldn't find that page.",
    back_home: "Back home",
    home: "Home", 
    x_documents: "{0} stories",
    // Errors
    invalid_file_type: "Invalid file type",
    title: "Title", 
    enter_title: "Enter title",
    text: "Text", 
    description: "Description",
    enter_description: "Enter description",
    name: "Name", 
    enter_name: "Enter name", 
    // NEW
    mic: "Mic",
    file: "File", 
    record_class: "Record your teacher's class.",
    use_file: "Upload an audio, a video or a text file."
  }
})

export function isHLSupported(hl: string) {
  return supportedLanguages.includes(hl)
}

localization.setLanguage(hl)
