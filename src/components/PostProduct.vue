<!--Komponent för lägga till ny produkt formulär-->

<template>

<form @submit.prevent="AddNewProduct()" class="bg-light-green text-dark-grey-text p-8 mx-auto shadow-xl rounded-bl-lg rounded-br-lg">
    <label for="firstname" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Namn:</label><br>
    <input v-model="firstname" type="text" name="firstname" id="firstname" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br>

    <label for="lastname" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Beskrivning:</label><br>
    <input v-model="lastname" type="text" name="lastnamn" id="lastname" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br> 

    <label for="email" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Kategori:</label><br>
    <input v-model="email" type="text" name="email" id="email" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br> 

    <label for="username" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Antal:</label><br>
    <input v-model="username" type="text" name="username" id="username" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br> 

    <label for="password" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Pris:</label><br>
    <input v-model="password" type="text" name="password" id="password" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-2"><br>

    <br>
    <input type="submit" value="Lägg till produkt" class="max-w-full mx-auto my-0 p-3 rounded-lg bg-light-yellow text-dark-grey-text font-semibold shadow-md cursor-pointer w-full">

    <br>
</form>
    
</template>

<script>

</script>

<style scoped>

</style>