<!--Komponent med formulär för att logga in som användare-->

<template>
        <img :src="imgLogo" alt="logotyp" class="img-logo w-full max-w-40">
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
    display: block;
}
</style>