<template>
    <article>
        <b>{{ product.product_name }}</b>
        <p>Beskrivning: {{ product.description }}</p>
        <p>Kategori:
            <!--Loopar igenom ifall det finns fler kategorier. V-if, lägger till "," ifall det är fler än en--> 
            <span v-for="(catName, index) in product.category" :key="index">
                {{ catName.category_name }} <span v-if="index < product.category.length -1">, </span>
            </span>
        </p> 
        <p>Antal: {{ product.amount }}</p>
        <p>Pris: {{ product.price }}</p>
        <div class="btn-products-wrap flex gap-4">
            <button class="bg-light-yellow text-dark-grey-text font-bold py-2 px-4 rounded w-full mt-6">Uppdatera</button> 
            <button @click="$emit('deleteProduct')" class="bg-orange text-dark-grey-text font-bold py-2 px-4 rounded w-full mt-6">Radera <i class="fa-solid fa-trash" style="color: #353535;"></i></button>
        </div>
    </article>
</template>

<script>
export default {

    props: {
        product: Object
    }
        
}

</script>

<style>

</style>