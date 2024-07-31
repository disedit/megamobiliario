export const useConfig = async () => {
  const siteConfig = useState('config', () => null)
  const { locale } = useI18n()
  const version = useEnvironment()
  const storyblokApi = useStoryblokApi()
  const { data: config } = await useAsyncData(
    'config_' + locale.value,
    async () => await storyblokApi.get('cdn/stories/config', {
      version,
      resolve_links: 'url',
      language: locale.value
    }),
    { watch: [locale] }
  )

  siteConfig.value = config.value.data.story.content

  watch(config, (newConfig) => {
    siteConfig.value = newConfig.data.story.content
  })

  return siteConfig
}