<template>
    <article>
        <b>{{ product.product_name }}</b>
        <p>Beskrivning: {{ product.description }}</p>
        <p>Kategori:
            <!--Loopar igenom ifall det finns fler kategorier. V-if, lägger till "," ifall det är fler än en--> 
            <span v-for="(catName, index) in product.category" :key="index">
                {{ catName.category_name }} <span v-if="index < product.category.length -1">, </span>
            </span>
        </p> <!--Tror det blir så bc array-->
        <p>Antal: {{ product.amount }}</p>
        <p>Pris: {{ product.price }}</p>
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