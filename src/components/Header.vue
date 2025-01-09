<!--Komponent för header-->

<template>
    <div class="header-wrap">
        <header class="w-full max-w-4xl mt-20 mx-auto">
            <nav class="bg-white">
                <ul class="flex justify-between">
                    <li class="bg-light-green p-4">
                    <RouterLink to="/admin">Lagerhantering</RouterLink>
                    </li>
                    <li class="p-4">
                    <RouterLink to="/logout">Logga ut</RouterLink>
                    </li>
                </ul>
            </nav>
        </header>
    </div>

</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    
}


</script>



<style scoped>

</style>