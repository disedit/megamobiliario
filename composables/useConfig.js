export const useConfig = async () => {
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
  console.log('config', config, config.value)
  return config.value?.data?.story?.content
}