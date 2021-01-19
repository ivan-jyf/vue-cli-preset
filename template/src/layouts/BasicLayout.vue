<template>
  <div class="basic-layout">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
  import Navigation from '@/components/Navigation/Navigation'

  export default {
    name: 'BasicLayout',
    components: {
      Navigation
    }
  }
</script>

<style scoped lang="scss"></style>
