import { ru } from '../app/data/translations/ru'
import { en } from '../app/data/translations/en'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: {
    ru,
    en
  }
}))
