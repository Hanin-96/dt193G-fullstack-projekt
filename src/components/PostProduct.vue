<!--Komponent för lägga till ny produkt formulär-->

<template>

<div class="product-form-wrap bg-white text-dark-grey-text mt-14 p-4 shadow-xl rounded-lg m-auto lg:mr-4 h-fit">
<form @submit.prevent="addNewProduct()" @submit="checkForm">
        <fieldset class="mb-4 font-bold text-2xl">{{ item.productId ? 'Uppdatera produkt' : 'Lägg till produkt' }}</fieldset>

        <label for="name" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6 text-lg">Namn:</label><br>
        <span class="error-form-wrap" v-if="errorMsg.productName">
        {{errorMsg.productName}}
        </span>
        <input v-model="item.productName" type="text" name="name" id="name" class="max-w-full w-full mx-auto my-0 p-1 rounded-lg mt-2 mb-6">
        <br>

        <label for="description" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6 text-lg">Beskrivning:</label>
        <br>
        <span class="error-form-wrap" v-if="errorMsg.productDescription">
        {{errorMsg.productDescription}}
        </span>
        <textarea v-model="item.productDescription" type="text" name="description" id="description" class="max-w-full w-full mx-auto my-0 p-1 rounded-lg mt-2 mb-6"></textarea>
        <br> 


        <label for="category" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6 text-lg">Kategori:</label><br>

        <ul>
            <li v-for="option in options" :key="option._id" class="flex items-center">
            <input type="checkbox" :id="option.category_name" :name="option.category_name" :value="option._id" v-model="item.productCategories" class="mr-1 w-6 h-6 my-3">
            <label :for="option.category_name" class="text-md">{{option.category_name}}</label>
            </li>
        </ul>
        <span class="error-form-wrap" v-if="errorMsg.productCategories">
        {{errorMsg.productCategories}}
        </span>
        <br>
        <br>

        <label for="amount" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6 text-lg">Antal:</label><br>
        <span class="error-form-wrap" v-if="errorMsg.amount">
        {{errorMsg.amount}}
        </span>
        <input v-model="item.productAmount" type="number" name="amount" id="amount" class="max-w-full w-full mx-auto my-0 p-1 rounded-lg mt-2 mb-6"><br> 

        <label for="price" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6 text-lg">Pris:</label><br>
        <span class="error-form-wrap" v-if="errorMsg.price">
        {{errorMsg.price}}
        </span>
        <input v-model="item.productPrice" type="number" name="price" id="price" class="max-w-full w-full mx-auto my-0 p-1 rounded-lg mt-2 mb-2"><br>

        <br>

    <div class="btn-submit-cancel-wrap flex flex-col lg:flex-row gap-6">
        <button type="submit" class="max-w-full mx-auto my-0 p-3 rounded-lg bg-light-yellow text-dark-grey-text font-semibold shadow-md cursor-pointer w-full submit-btn">{{ item.productId ? 'Uppdatera' : 'Lägg till' }}</button>
        <button @click="resetForm($event)" type="button" class="max-w-full mx-auto my-0 p-3 rounded-lg bg-orange text-dark-grey-text font-semibold shadow-md cursor-pointer w-full submit-btn">Ångra</button>
        </div>
        <br>
    </form>
    <LoadingSpinner :loadingSpinner="isLoading" />
</div>
    
</template>

<script>
import LoadingSpinner from './LoadingSpinner.vue';

export default {
    data() {
        return {
            options: [],
            item: {
                productId: null,
                productName: "",
                productDescription: "",
                productCategories: [],
                productAmount: 0,
                productPrice: 0

            },
            //Felmeddelande för varje fält
            errorMsg: {
                productName: "",
                productDescription: "",
                productCategories: "",
                productAmount: "",
                productPrice: ""
            },
            isLoading: false
        }
    },
    components: {
        LoadingSpinner
    },
    emits: ['addedProductCallback'],
    methods: {
        //Scrolla till toppen
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        async addNewProduct() {
            //LoadingSpinner
            this.isLoading = true;

            if (!this.validateForm()) {
                //LoadingSpinner
                this.isLoading = false;
                return;
            }

            //om det finns ett id så skickas den till updateProduct annars fortsätter post anropet
            if(this.item.productId) {
                await this.updateProduct(this.item.productId); 
            } else {
                //Skicka värden till databasen
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

                //LoadingSpinner
                this.isLoading = false;
                const data = await response.json();
                
                if (response.ok) {
                    console.log("Det gick att lagra ny produkt");
                    this.$emit('addedProductCallback');
                    this.resetForm();
                    this.errorMsg = "";

                    this.errorMsg = "Det gick inte att lagra produkt";
                }
            } catch (error) {
                this.errorMsg = 'Det gick inte att lagra produkt';
            }

            //console.log(this.item);
            }
        },
        validateForm() {
        //Validering av formuläret för produkt
            this.errorMsg = {};

            if(this.item.productName.length < 10) {
                this.errorMsg.productName = "Produkt namn måste vara minst 2 tecken";
            }

            if (this.item.productDescription.length < 10) {
                this.errorMsg.productDescription = "Beskrivning måste vara minst 10 tecken";
            }

            if(this.item.productAmount <= 0) {
                this.errorMsg.amount = "Fel antal format, Antal måste vara minst 1";
            }

            if(this.item.productPrice <= 0) {
                this.errorMsg.price = "Fel pris format, Pris måste vara minst 5";
            }
            
            if(this.item.productCategories.length === 0) {
                this.errorMsg.productCategories = "Välj minst en kategori";
            } 
            else {
                return true;
            }
        },
        resetForm(event) {

            if(event) {
                event.preventDefault();
            } 
            this.errorMsg = {                
                productName: "",
                productDescription: "",
                productCategories: "",
                productAmount: "",
                productPrice: ""
            };
            this.item.productId= null,
            this.item.productName = "";
            this.item.productDescription = "";
            this.item.productCategories = [];
            this.item.productAmount = 0;
            this.item.productPrice = 0;
            
        },

        async getAllCategories() {
            
            let response = await fetch("https://projekt-webbtjanst-api-hanin-96.onrender.com/categories", {
                credentials: 'include' //VIKTIGT FÖR COOKIES
            }); 

            let data = await response.json(); 

            //console.log(data); 

            this.options = data;

        }, 

        //Funktion för att uppdatera produkt med formuläret
        async updateProduct(id) {

            try {
                let response = await fetch("https://projekt-webbtjanst-api-hanin-96.onrender.com/product/" + id, {
                    method: "PUT", 
                    headers: {
                        "Accept": "application/json",
                        "Content-type":"application/json"
                    }, 
                    credentials: 'include', //VIKTIG FÖR COOKIES
                    body: JSON.stringify({
                        product_name: this.item.productName, 
                        description: this.item.productDescription, 
                        category: this.item.productCategories, 
                        amount: this.item.productAmount, 
                        price: this.item.productPrice
                    })
                }); 

                this.isLoading = false; 
                let data = await response.json(); 
                
                if(response.ok) {
                    console.log("Produkten är uppdaterad");
                    this.$emit("addedProductCallback") //uppdaterar formuläret efter uppdatering
                    this.resetForm();
                }

            } catch(error) {
                this.errorMsg = "Något gick fel vid uppdateringen"; 
            }
        }, 

        //funktion för att populera formuläret med rätt data från produkt
        populateForm(product) {
            this.item.productId = product._id;
            this.item.productName = product.product_name; 
            this.item.productDescription = product.description; 
            this.item.productCategories = product.category.map(c => c._id); //hämta kategoriers id
            this.item.productAmount = product.amount; 
            this.item.productPrice = product.price; 
            this.scrollToTop();
        }

    },

    mounted() {
        this.getAllCategories();
    }
   
}

</script>

<style scoped>

input, textarea {
    border: 1px solid #004200;
}

.submit-btn {
    border: none;
}

.error-form-wrap {
    color: red;
    font-style: italic;
}



</style>