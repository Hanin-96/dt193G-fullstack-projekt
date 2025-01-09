<!--Komponent med formulär för att logga in som användare-->

<template>
        <img :src="imgLogo" alt="logotyp" class="img-logo w-full">
</template>

<script>
import imgLogo from '../assets/logotyp.svg';
export default {
    name: "LogoImg",
    data() {
        return {
            imgLogo,
        }
    },
}
</script>

<style scoped>

.img-logo {
    max-width: 10rem;
    display: block;
    margin: 0 auto;
    margin-bottom: 2rem;
    margin-top: 2rem;
}
</style>