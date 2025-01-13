<!--Komponent för lägga till ny produkt formulär-->

<template>

<form @submit.prevent="addNewProduct()" @submit="checkForm" class="bg-white text-dark-grey-text mt-14 p-4 w-fit shadow-xl rounded-bl-lg rounded-br-lg mr-4">
    <fieldset class="mb-4 text-lg font-bold">Lägg till/uppdatera produkt</fieldset>
    <label for="name" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Namn:</label><br>
    <input v-model="item.productName" type="text" name="name" id="name" class="max-w-full w-full mx-auto my-0 p-1 rounded-lg mt-2 mb-6"><br>

    <label for="description" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Beskrivning:</label><br>
    <textarea v-model="item.productDescription" type="text" name="description" id="description" class="max-w-full w-full mx-auto my-0 p-1 rounded-lg mt-2 mb-6"></textarea>
    <br> 


    <label for="category" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Kategori:</label><br>

    <ul>

        <li v-for="option in options" :key="option._id">
            <input type="checkbox" :id="option.category_name" :name="option.category_name" :value="option._id" v-model="item.productCategories" class="mr-1">
            <label :for="option.category_name">{{option.category_name}}</label>
        </li>
    </ul>

    <br>

    <label for="amount" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Antal:</label><br>
    <input v-model="item.productAmount" type="number" name="amount" id="amount" class="max-w-full w-full mx-auto my-0 p-1 rounded-lg mt-2 mb-6"><br> 

    <label for="price" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Pris:</label><br>
    <input v-model="item.productPrice" type="number" name="price" id="price" class="max-w-full w-full mx-auto my-0 p-1 rounded-lg mt-2 mb-2"><br>

    <br>

    <div class="error-form-wrap" v-if="errorMsg != ''">
        <p>{{errorMsg}}</p>
        <br>
    </div>
    <input type="submit" value="Lägg till produkt" class="max-w-full mx-auto my-0 p-3 rounded-lg bg-light-yellow text-dark-grey-text font-semibold shadow-md cursor-pointer w-full border-none">

    <br>
</form>
    
</template>

<script>
export default {
    data() {
        return {
            options: [],
            item: {
                productName: "",
                productDescription: "",
                productCategories: [],
                productAmount: 0,
                productPrice: 0

            },
            errorMsg: ""
        }
    },
    methods: {
        async addNewProduct() {

            //Validering av formuläret för produkt
            if(this.item.productAmount < 0) {
                this.errorMsg = "Antal måste vara minst 1";
            } else if(this.item.productPrice < 0) {
                this.errorMsg = "Fel pris format";
            } else if(!this.item.productName || !this.item.productDescription || this.item.productCategories.length === 0 || this.item.productAmount <= 0 || this.item.productPrice <= 0) {
                this.errorMsg = "Fyll i alla fält korrekt!";

                //Skicka värden till databasen
            } else {
                try {
                const response = await fetch('https://projekt-webbtjanst-api-hanin-96.onrender.com/product', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    credentials: 'include', //KOMMENTERA INTE UT DENNA! 
                    body: JSON.stringify({ product_name: this.item.productName, price: this.item.productPrice, description: this.item.productDescription, amount: this.item.productAmount, category: this.item.productCategories})
                });

                const data = await response.json();
                
                if (response.ok) {
                    console.log("Det gick att lagra ny produkt");
                    this.errorMsg = "";
                } else {
                    this.errorMsg = "Det gick inte att lagra produkt";
                }
            } catch (error) {
                this.errorMsg = 'Det gick inte att lagra produkt';
            }

            }


            console.log(this.item);
        },
        async getAllCategories() {
            let response = await fetch("https://projekt-webbtjanst-api-hanin-96.onrender.com/categories", {
                credentials: 'include' //VIKTIGT FÖR COOKIES
            }); 

            let data = await response.json(); 

            //console.log(data); 

            this.options = data;

        }

    },
    mounted() {
        this.getAllCategories();
    }
   
}

</script>

<style scoped>

</style>