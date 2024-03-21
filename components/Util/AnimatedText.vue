<script setup>
const props = defineProps({
  text: { type: String, required: true },
  duration: { type: Number, default: 2 }
})

const id = computed(() => {
  return "text" + Math.random().toString(16).slice(2)
})

const { $gsap } = useNuxtApp()

onMounted(() => {
    $gsap.fromTo(`#${id.value} .word-inner`, {
      y: '100%'
    }, {
      y: 0,
      duration: props.duration,
      stagger: .1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: `#${id.value}`,
        start: 'top bottom'
      }
    })
})
</script>

<template>
  <div class="animated-text" :id="id">
    <div v-for="(line, l) in text.split('\n')" :key="l" class="line">
      <span v-for="(word, w) in line.split(' ')" :key="w" class="word">
        <span class="word-inner">{{ word }}</span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .word {
    overflow: hidden;
    display: inline-block;
    padding: .1em 0;
    margin: -.2em .12em;

    &-inner {
      display: block;
      transform: translateY(50%);
    }
  }
</style>