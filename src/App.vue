<template>
  <main> 
    <RouterView />
  </main>
  <Footer />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import Footer from './components/Footer.vue';

export default {
  components: {
    Footer, 
    RouterView
  }
}
</script>

<style scoped>

</style>
