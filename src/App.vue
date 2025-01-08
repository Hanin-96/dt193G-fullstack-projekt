<template>
  <Header />
  <main> 
    <RouterView />
  </main>
  <Footer />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Header, 
    Footer, 
    RouterView
  }
}
</script>

<style scoped>

</style>
