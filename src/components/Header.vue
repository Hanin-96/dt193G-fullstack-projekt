<!--Komponent för header-->

<template>
    <div class="header-wrap">
        <header class="w-full max-w-7xl mx-auto">
            <nav class="bg-white">
                <ul class="flex justify-between">
                    <li class="bg-light-green p-4">
                    <RouterLink to="/admin">Lagerhantering</RouterLink>
                    </li>
                    <li class="p-4">
                    <RouterLink to="/"><button @click="logOut">Logga ut</button></RouterLink>
                    </li>
                </ul>
            </nav>
        </header>
    </div>

</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    methods: {
        async logOut() {
            try {
                let response = await fetch("https://projekt-webbtjanst-api-hanin-96.onrender.com/admin/logout", {
                    method: 'GET',
                    credentials: 'include', 
                })

                //console.log(response); 
                
                this.$router.push({name:"login"}); 

            } catch(err) {
                console.log(err).message("Utloggning misslyckades").code(500); 
            }
        }
    }
}


</script>



<style scoped>

</style>