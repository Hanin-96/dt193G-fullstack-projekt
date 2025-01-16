<template>
  <main> 
    <RouterView />
  </main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import Footer from './components/Footer.vue';

export default {
  components: { 
    RouterView
  }
}
</script>

<style scoped>

</style>
