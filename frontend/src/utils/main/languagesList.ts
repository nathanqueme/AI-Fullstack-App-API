/**
 * languagesList.ts
 * version 1.0.0
 * 
 * Created on the 01/03/2023
 */


// @ts-check
import { isHLSupported } from './localizations'

/** 
 * A list of supported language hl for the UI. In other words 
 * languages for which there is a translation of the UI's text.
 *
 * @example ["en", "fr"]
 * "en" for English
 * "fr" for French
 */
export const supportedLanguages = ["en"]


interface LanguageList {
  locale: string
  languages: { name: string, hl: string, flag: string }[] // LanguageMetadataData
}
export const languagesLists: LanguageList[] = [
  {
    locale: "en",
    languages: [
      { name: 'Afrikaans', flag: '🇿🇦', hl: 'af' },
      { name: 'Albanian', flag: '🇦🇱', hl: 'sq' },
      { name: 'Amharic', flag: '🇪🇹', hl: 'am' },
      { name: 'Arabic', flag: '🇸🇦', hl: 'ar' },
      { name: 'Armenian', flag: '🇦🇲', hl: 'hy' },
      { name: 'Azerbaijani', flag: '🇦🇿', hl: 'az' },
      { name: 'Bengali', flag: '🇧🇩', hl: 'bn' },
      { name: 'Bosnian', flag: '🇧🇦', hl: 'bs' },
      { name: 'Bulgarian', flag: '🇧🇬', hl: 'bg' },
      { name: 'Catalan', flag: '🇪🇸', hl: 'ca' },
      { name: 'Chinese (Simplified)', flag: '🇨🇳', hl: 'zh' },
      { name: 'Chinese (Traditional)', flag: '🇭🇰', hl: 'zh-TW' },
      { name: 'Croatian', flag: '🇭🇷', hl: 'hr' },
      { name: 'Czech', flag: '🇨🇿', hl: 'cs' },
      { name: 'Danish', flag: '🇩🇰', hl: 'da' },
      { name: 'Dari', flag: '🇦🇫', hl: 'fa-AF' },
      { name: 'Dutch', flag: '🇳🇱', hl: 'nl' },
      { name: 'English', flag: '🇬🇧', hl: 'en' },
      { name: 'Estonian', flag: '🇪🇪', hl: 'et' },
      { name: 'Farsi (Persian)', flag: '🇮🇷', hl: 'fa' },
      { name: 'Filipino, Tagalog', flag: '🇵🇭', hl: 'tl' },
      { name: 'Finnish', flag: '🇫🇮', hl: 'fi' },
      { name: 'French', flag: '🇫🇷', hl: 'fr' },
      { name: 'French (Canada)', flag: '🇨🇦', hl: 'fr-CA' },
      { name: 'Georgian', flag: '🇬🇪', hl: 'ka' },
      { name: 'German', flag: '🇩🇪', hl: 'de' },
      { name: 'Greek', flag: '🇬🇷', hl: 'el' },
      { name: 'Gujarati', flag: '🇮🇳', hl: 'gu' },
      { name: 'Haitian Creole', flag: '🇭🇹', hl: 'ht' },
      { name: 'Hausa', flag: '🇳🇬', hl: 'ha' },
      { name: 'Hebrew', flag: '🇮🇱', hl: 'he' },
      { name: 'Hindi', flag: '🇮🇳', hl: 'hi' },
      { name: 'Hungarian', flag: '🇭🇺', hl: 'hu' },
      { name: 'Icelandic', flag: '🇮🇸', hl: 'is' },
      { name: 'Indonesian', flag: '🇮🇩', hl: 'id' },
      { name: 'Irish', flag: '🇮🇪', hl: 'ga' },
      { name: 'Italian', flag: '🇮🇹', hl: 'it' },
      { name: 'Japanese', flag: '🇯🇵', hl: 'ja' },
      { name: 'Kannada', flag: '🇮🇳', hl: 'kn' },
      { name: 'Kazakh', flag: '🇰🇿', hl: 'kk' },
      { name: 'Korean', flag: '🇰🇷', hl: 'ko' },
      { name: 'Latvian', flag: '🇱🇻', hl: 'lv' },
      { name: 'Lithuanian', flag: '🇱🇹', hl: 'lt' },
      { name: 'Macedonian', flag: '🇲🇰', hl: 'mk' },
      { name: 'Malay', flag: '🇲🇾', hl: 'ms' },
      { name: 'Malayalam', flag: '🇮🇳', hl: 'ml' },
      { name: 'Maltese', flag: '🇲🇹', hl: 'mt' },
      { name: 'Marathi', flag: '🇮🇳', hl: 'mr' },
      { name: 'Mongolian', flag: '🇲🇳', hl: 'mn' },
      { name: 'Norwegian', flag: '🇳🇴', hl: 'no' },
      { name: 'Pashto', flag: '🇵🇰', hl: 'ps' },
      { name: 'Polish', flag: '🇵🇱', hl: 'pl' },
      { name: 'Portuguese (Brazil)', flag: '🇧🇷', hl: 'pt' },
      { name: 'Portuguese (Portugal)', flag: '🇵🇹', hl: 'pt-PT' },
      { name: 'Punjabi', flag: '🇮🇳', hl: 'pa' },
      { name: 'Romanian', flag: '🇷🇴', hl: 'ro' },
      { name: 'Russian', flag: '🇷🇺', hl: 'ru' },
      { name: 'Serbian', flag: '🇷🇸', hl: 'sr' },
      { name: 'Sinhala', flag: '🇱🇰', hl: 'si' },
      { name: 'Slovak', flag: '🇸🇰', hl: 'sk' },
      { name: 'Slovenian', flag: '🇸🇮', hl: 'sl' },
      { name: 'Somali', flag: '🇸🇴', hl: 'so' },
      { name: 'Spanish', flag: '🇪🇸', hl: 'es' },
      { name: 'Spanish (Mexico)', flag: '🇲🇽', hl: 'es-MX' },
      { name: 'Swahili', flag: '🇰🇪', hl: 'sw' },
      { name: 'Swedish', flag: '🇸🇪', hl: 'sv' },
      { name: 'Tamil', flag: '🇮🇳', hl: 'ta' },
      { name: 'Telugu', flag: '🇮🇳', hl: 'te' },
      { name: 'Thai', flag: '🇹🇭', hl: 'th' },
      { name: 'Turkish', flag: '🇹🇷', hl: 'tr' },
      { name: 'Ukrainian', flag: '🇺🇦', hl: 'uk' },
      { name: 'Urdu', flag: '🇵🇰', hl: 'ur' },
      { name: 'Uzbek', flag: '🇺🇿', hl: 'uz' },
      { name: 'Vietnamese', flag: '🇻🇳', hl: 'vi' },
      { name: 'Welsh', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', hl: 'cy' }
    ]
  },

  {
    locale: "fr",
    languages: [
      { name: 'Afrikaans', hl: 'af', flag: '🇿🇦' },
      { name: 'Albanais', hl: 'sq', flag: '🇦🇱' },
      { name: 'Amharique', hl: 'am', flag: '🇪🇹' },
      { name: 'Arabe', hl: 'ar', flag: '🇸🇦' },
      { name: 'Arménien', hl: 'hy', flag: '🇦🇲' },
      { name: 'Azerbaïdjanais', hl: 'az', flag: '🇦🇿' },
      { name: 'Bengali', hl: 'bn', flag: '🇧🇩' },
      { name: 'Bosniaque', hl: 'bs', flag: '🇧🇦' },
      { name: 'Bulgare', hl: 'bg', flag: '🇧🇬' },
      { name: 'Catalan', hl: 'ca', flag: '🇪🇸' },
      { name: 'Chinois (simplifié)', hl: 'zh', flag: '🇨🇳' },
      { name: 'Chinois (traditionnel)', hl: 'zh-TW', flag: '🇭🇰' },
      { name: 'Croate', hl: 'hr', flag: '🇭🇷' },
      { name: 'Tchèque', hl: 'cs', flag: '🇨🇿' },
      { name: 'Danois', hl: 'da', flag: '🇩🇰' },
      { name: 'Dari', hl: 'fa-AF', flag: '🇦🇫' },
      { name: 'Néerlandais', hl: 'nl', flag: '🇳🇱' },
      { name: 'Anglais', hl: 'en', flag: '🇬🇧' },
      { name: 'Estonien', hl: 'et', flag: '🇪🇪' },
      { name: 'Farsi (persan)', hl: 'fa', flag: '🇮🇷' },
      { name: 'Philippin, Tagalog', hl: 'tl', flag: '🇵🇭' },
      { name: 'Finnois', hl: 'fi', flag: '🇫🇮' },
      { name: 'Français', hl: 'fr', flag: '🇫🇷' },
      { name: 'Français (Canada)', hl: 'fr-CA', flag: '🇨🇦' },
      { name: 'Géorgien', hl: 'ka', flag: '🇬🇪' },
      { name: 'Allemand', hl: 'de', flag: '🇩🇪' },
      { name: 'Grec', hl: 'el', flag: '🇬🇷' },
      { name: 'Gujarati', hl: 'gu', flag: '🇮🇳' },
      { name: 'Créole haïtien', hl: 'ht', flag: '🇭🇹' },
      { name: 'Haoussa', hl: 'ha', flag: '🇳🇬' },
      { name: 'Hébreu', hl: 'he', flag: '🇮🇱' },
      { name: 'Hindi', hl: 'hi', flag: '🇮🇳' },
      { name: 'Hongrois', hl: 'hu', flag: '🇭🇺' },
      { name: 'Islandais', hl: 'is', flag: '🇮🇸' },
      { name: 'Indonésien', hl: 'id', flag: '🇮🇩' },
      { name: 'Irlandais', hl: 'ga', flag: '🇮🇪' },
      { name: 'Italien', hl: 'it', flag: '🇮🇹' },
      { name: 'Japonais', hl: 'ja', flag: '🇯🇵' },
      { name: 'Kannada', hl: 'kn', flag: '🇮🇳' },
      { name: 'Kazakh', hl: 'kk', flag: '🇰🇿' },
      { name: 'Coréen', hl: 'ko', flag: '🇰🇷' },
      { name: 'Letton', hl: 'lv', flag: '🇱🇻' },
      { name: 'Lituanien', hl: 'lt', flag: '🇱🇹' },
      { name: 'Macédonien', hl: 'mk', flag: '🇲🇰' },
      { name: 'Malais', hl: 'ms', flag: '🇲🇾' },
      { name: 'Malayalam', hl: 'ml', flag: '🇮🇳' },
      { name: 'Maltais', hl: 'mt', flag: '🇲🇹' },
      { name: 'Marathi', hl: 'mr', flag: '🇮🇳' },
      { name: 'Mongol', hl: 'mn', flag: '🇲🇳' },
      { name: 'Norvégien', hl: 'no', flag: '🇳🇴' },
      { name: 'Pachtoune', hl: 'ps', flag: '🇵🇰' },
      { name: 'Polonais', hl: 'pl', flag: '🇵🇱' },
      { name: 'Portugais (Brésil)', hl: 'pt', flag: '🇧🇷' },
      { name: 'Portugais (Portugal)', hl: 'pt-PT', flag: '🇵🇹' },
      { name: 'Pendjabi', hl: 'pa', flag: '🇮🇳' },
      { name: 'Roumain', hl: 'ro', flag: '🇷🇴' },
      { name: 'Russe', hl: 'ru', flag: '🇷🇺' },
      { name: 'Serbe', hl: 'sr', flag: '🇷🇸' },
      { name: 'Cinghalais', hl: 'si', flag: '🇱🇰' },
      { name: 'Slovaque', hl: 'sk', flag: '🇸🇰' },
      { name: 'Slovène', hl: 'sl', flag: '🇸🇮' },
      { name: 'Somalien', hl: 'so', flag: '🇸🇴' },
      { name: 'Espagnol', hl: 'es', flag: '🇪🇸' },
      { name: 'Espagnol (Mexique)', hl: 'es-MX', flag: '🇲🇽' },
      { name: 'Swahili', hl: 'sw', flag: '🇰🇪' },
      { name: 'Suédois', hl: 'sv', flag: '🇸🇪' },
      { name: 'Tamoul', hl: 'ta', flag: '🇮🇳' },
      { name: 'Télougou', hl: 'te', flag: '🇮🇳' },
      { name: 'Thaï', hl: 'th', flag: '🇹🇭' },
      { name: 'Turque', hl: 'tr', flag: '🇹🇷' },
      { name: 'Ukrainien', hl: 'uk', flag: '🇺🇦' },
      { name: 'Ourdou', hl: 'ur', flag: '🇵🇰' },
      { name: 'Ouzbek', hl: 'uz', flag: '🇺🇿' },
      { name: 'Vietnamien', hl: 'vi', flag: '🇻🇳' },
      { name: 'Gallois', hl: 'cy', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' }
    ]
  },

]


/** 
 * - The list of languages translated in user's locale. 
 * - By default only returns supported languages
 */
export const getLanguagesInUserLocale = (input_hl: string, alsoIncludeUnsupportedOnes = false) => {
  const hlSupported = isHLSupported(input_hl)
  const hl = hlSupported ? input_hl : "en" // -> fallback to english
  const languages = languagesLists.find(e => { return e.locale === hl })?.languages ?? []
  const filtered = alsoIncludeUnsupportedOnes ?
    languages
    :
    languages.filter(el => {
      const index = supportedLanguages.findIndex(hl => { return el.hl === hl })
      return index !== -1
    })
  const sorted = filtered
    .sort(function (a, b) { // sorted alphabetically
      if (a.name < b.name) { return -1 }
      if (a.name > b.name) { return 1 }
      return 0
    })
  return sorted
}

