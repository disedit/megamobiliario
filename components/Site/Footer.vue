<script setup>
const config = await useConfig()

const legalNotice = computed(() => {
  const today = new Date()
  const currentYear = today.getFullYear()
  return config.legal_notice.replaceAll('{currentYear}', currentYear)
})
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-address">
          <UtilRichText :content="config.address" />
        </div>
        <div class="footer-links">
          <ul class="list-reset">
            <li v-for="blok in config.footer_links" :key="blok._uid">
              <SiteUnderlinedLink
                v-if="blok.link?.id && blok.link?.story"
                :to="localePath(`/${blok.link?.story?.url}`)">
                {{ blok.label }}
              </SiteUnderlinedLink>
            </li>
          </ul>
        </div>
        <div class="footer-socials">
          <h4>{{ $t('footer.socials') }}</h4>
          <ul class="footer-socials list-reset">
            <li v-for="blok in config.social_networks" :key="blok._uid">
              <SiteUnderlinedLink :to="blok.link.url">
                {{ blok.label }}
              </SiteUnderlinedLink>
            </li>
          </ul>
        </div>
        <div class="footer-logo">
          <NuxtLink :to="localePath('/')" class="main-logo">
            <span class="visually-hidden">Megamobiliario</span>
            <SiteLogo />
          </NuxtLink>
        </div>
        <div class="footer-awards">
          <img
            v-for="logo in config.footer_logos"
            :src="logo.filename"
            :alt="logo.alt"
          />
        </div>
        <UtilMarked class="footer-legal" :content="legalNotice" />
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background-color: var(--lightpink);
  font-size: var(--text-base);

  &-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr) auto auto;
    grid-template-areas:
      "address links socials . . ."
      "logo . . . awards legal";
    gap: var(--spacer-12);
  }

  &-address {
    grid-area: address;

    :deep(p) {
      margin: var(--spacer-2) 0;
    }

    :deep(p:first-child) {
      margin-top: 0;
    }
  }

  &-links {
    grid-area: links;

    li {
      margin-bottom: var(--spacer-2);
      font-weight: bold;
    }
  }

  &-socials {
    grid-area: socials;

    h4 {
      margin: 0;
      margin-bottom: var(--spacer-2);
    }

    li {
      margin-bottom: var(--spacer-2);
    }
  }

  &-logo {
    grid-area: logo;
    display: flex;
    align-items: center;

    svg {
      height: 3.5rem;
    }
  }

  &-awards {
    grid-area: awards;
    display: flex;
    gap: var(--spacer-8);
    justify-content: flex-end;

    img {
      height: 4rem;
    }
  }

  &-legal {
    grid-area: legal;
    text-align: right;

    :deep(p) {
      margin: 0;
    }
  }
}

@include media('<xxl') {
  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "address links socials ."
      "logo . awards legal";
  }
}

@include media('<xl') {
  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "address links socials"
      "logo awards legal";
  }
}

@include media('<=md') {
  .footer-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "logo"
      "links"
      "socials"
      "address"
      "awards"
      "legal";
    gap: var(--spacer-4);
  }

  .footer-logo {
    svg {
      height: 3rem;
    }
  }

  .footer-address {
    margin-top: var(--spacer-6);
  }

  .footer-awards {
    justify-content: space-between;
  }

  .footer-legal {
    text-align: left;
  }
}
</style>