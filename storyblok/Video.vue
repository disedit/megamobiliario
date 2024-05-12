<script setup>
defineProps({ blok: Object })
</script>

<template>
  <section
    v-editable="blok"
    :class="[
      'video-component', `bg-${blok.color}`,
      `embed-${blok.aspect_ratio}`,
      { 'full-height': blok.full_height },
      { 'auto-height': !blok.full_height }
    ]"
  >
    <div class="container">
      <div class="video-responsive">
        <iframe
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${blok.youtube_video_id}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          class="video-embed"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.full-height {
  height: 100vh;
  height: 100svh;

  .container {
    height: 100%;
    display: flex;
  }

  .video-responsive {
    position: relative;
    width: 100%;
    height: 100%;
  }
}

.auto-height .video-responsive {
	height: 0;
	overflow: hidden;
	padding-bottom: var(--aspect-ratio, 56.25%);
	position: relative;
}

.video-responsive iframe {
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
}

.container-component .container {
  padding: 0;
}

.embed-1by1 {
  --aspect-ratio: calc(1 / 1 * 100%);
}

.embed-9by16 {
  --aspect-ratio: calc(16 / 9 * 100%);
}

.embed-4by3 {
  --aspect-ratio: calc(3 / 4 * 100%);
}
</style>