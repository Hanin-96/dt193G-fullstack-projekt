<template>
    <div class="flex flex-col justify-center max-w-4xl w-full mx-auto gap-4 p-4 md:flex-row md:items-start items-center md:mt-20 mt-0">
        <LogoImg class="max-w-20"/>
        <div class="w-full max-w-4xl">
            <HeaderComponent />
            <MainContent>
                <!--Här kan vi lägga in kompontent för hämtning av lager produkter-->
                <div class="p-4 mx-4 relative top-10 max-w-80">
                    <Products @deleteProduct="deleteProduct(product._id)" v-for="product in products" :product="product" :key="product._id" class="produktkort"/>
                </div>
                
            </MainContent>
        </div>
    </div>

</template>

<script>
import MainContent from '@/components/MainContent.vue';
import HeaderComponent from '@/components/Header.vue'
import LogoImg from '@/components/LogoImg.vue';
import Products from '@/components/Products.vue';

export default {
    //tom array för att läsa in produkter
    data() {
        return {
            products: []
        }
    },
    //hämtar in komponent för login
    components: {
        HeaderComponent,
        MainContent,
        LogoImg, 
        Products
    }, 
    methods: {
        //Funktion för att hämta in data
        async getProducts() {
            let response = await fetch("https://projekt-webbtjanst-api-hanin-96.onrender.com/product", {
                credentials: 'include' //VIKTIGT FÖR COOKIES
            }); //används för testning

            let data = await response.json(); 

            console.log(data); 

            this.products = data;
        }, 

        //funktion för att radera produkter
        async deleteProduct(id) {
            let response = await fetch("https://projekt-webbtjanst-api-hanin-96.onrender.com/product/" + id, {
                method: "DELETE", 
                headers: {
                    "Accept": "application/json", 
                    "Content-type": "application/json"

                }, 
                credentials: 'include'
            });

            let data = await response.json(); 
            
            this.getProducts(); 
        }
    }, 

    mounted() {
        this.getProducts();
    }
}
</script>

<style>
.produktkort {
    background-color: #f8f8f8; 
    border-radius: 5px; 
    box-shadow: 2px 2px 0 #35353580; 
    margin-bottom: 1em; 
    padding: 1em; 
}
</style>