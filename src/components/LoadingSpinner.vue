<!--Komponent för LoadingSpinner-->

<template>
     <div class="loading-spinner-wrap" v-if="loadingSpinner=== true">
        <div class="spinner"></div>
    </div> 
</template>

<script>
export default {
  //Loading spinner props
    name: "LoadingSpinner",
    props: {
    loadingSpinner: Boolean
    }
    
}

</script>

<style scoped>
.loading-spinner-wrap {
    margin: 0 auto;
    max-width: fit-content;
    margin-top: 2rem;
    margin-bottom: 2rem;
}
  
  .spinner {
    width: 48px;
    height: 48px;
    border: 5px solid #004200;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: loadingAnim 1s linear infinite;
  }
  
  @keyframes loadingAnim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>