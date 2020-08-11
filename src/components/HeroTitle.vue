<template>
<section class="hero is-primary">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
         {{pageName}}
      </h1>
      <h2 class="subtitle">
        Primary subtitle
      </h2>
    </div>
  </div>
</section>
</template>
<script>
export default {
  name: 'HeroTitle',
  props: {
    pageName: String
  }
}
</script>
<style scoped>

</style>
