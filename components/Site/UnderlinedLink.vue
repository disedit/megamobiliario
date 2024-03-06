<template>
  <NuxtLink v-bind="$attrs" class="underlined-link">
    <span><slot /></span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.underlined-link {
  display: inline-block;
  text-decoration: none;

  &.router-link-active {
    font-weight: 900;
  }

  span {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 2px;
      background: var(--black);
      left: 0;
      right: 0;
      bottom: -.25rem;
      transform: scaleX(0);
      transition: .25s ease;
      transform-origin: left;
    }
  }

  &:hover span::before {
    transform: scaleX(1);
  }
}
</style>