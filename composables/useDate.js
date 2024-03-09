export const useDate = (date) => {
  const { locale, t } = useI18n()
  const thisDate = new Date(date.replace(/\s/, 'T'))

  const months = t('months').split(' ')

  const year = thisDate.getFullYear()
  const month = thisDate.getMonth() + 1
  const day = thisDate.getDate()
  const monthName = months[thisDate.getMonth()]
  const time = `${thisDate.getHours().toString().padStart(2, '0')}:${thisDate.getMinutes().toString().padStart(2, '0')}`
  const formats = {
    en: `${monthName} ${day} ${year}`,
    es: `${day} ${monthName} ${year}`
  }
  const human = formats[locale.value]

  return { year, month, monthName, day, time, human }
}