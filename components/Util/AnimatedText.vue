<script setup>
const props = defineProps({
  id: { type: String, required: true },
  text: { type: String, required: true },
  duration: { type: Number, default: 2 }
})

const { $gsap } = useNuxtApp()

onMounted(() => {
    $gsap.fromTo(`#text-${props.id} .word-inner`, {
      y: '100%'
    }, {
      y: 0,
      duration: props.duration,
      stagger: .1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: `#text-${props.id}`,
        start: 'top bottom'
      }
    })
})
</script>

<template>
  <div class="animated-text" :id="`text-${id}`">
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
      transform: translateY(100%);
    }
  }
</style>