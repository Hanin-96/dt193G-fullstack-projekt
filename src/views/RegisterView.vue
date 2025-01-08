<!--Vy för att registrera ny användare-->

<template>
    <main>
        <RegisterUser />
    </main>
</template>

<script>
import RegisterUser from '../components/RegisterUser.vue'

export default {
    //hämtar in komponenter
    components: {
        RegisterUser
    }
}
</script>

<style scoped>
main {
    width: 400px;
    height: 612px;  
    max-width: 100%; 
    background-color: #9BBF9B;
    padding: 1em; 
    margin: 0 auto; 
} 

</style>