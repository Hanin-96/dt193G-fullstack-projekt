<template>
    <div class="flex flex-col justify-center max-w-7xl w-full mx-auto gap-4 p-4 xl:flex-row xl:items-start items-center lg:mt-20 mt-0">
        <div class="logo-title-wrap flex flex-col items-center text-white">
            <LogoImg class="max-w-20"/>
            <h1>Apotek 24/7</h1>
        </div>
        <div class="w-full max-w-7xl">
            <HeaderComponent />
            <div class="main-content-wrap flex h-min bg-light-green w-full max-w-7xl mx-auto pb-20 justify-between">
                <!--Här kan vi lägga in kompontent för hämtning av lager produkter-->
                    <div class="p-4 relative top-10 max-w-xl">
                        <div class="product-">
                        <Products @deleteProduct="deleteProduct(product._id)" @updateProduct="handleUpdateProduct" v-for="product in products" :product="product" :key="product._id" class="produktkort w-full max-w-full shadow-xl rounded-lg"/>
                        <LoadingSpinner :loadingSpinner="isLoading" />
                        </div>
                    </div>
                <PostProduct ref="postProductForm" @addedProductCallback="getProducts()" class="max-w-2xl w-full"/>
            </div>
            <LoadingSpinner :loadingSpinner="isLoading" />

        </div>
    </div>

</template>

<script>
import HeaderComponent from '@/components/Header.vue'
import LogoImg from '@/components/LogoImg.vue';
import Products from '@/components/Products.vue';
import PostProduct from '@/components/PostProduct.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
    //tom array för att läsa in produkter
    data() {
        return {
            products: [],
            isLoading: false
        }
    },
    //hämtar in komponent för login
    components: {
        HeaderComponent,
        LogoImg, 
        Products,
        PostProduct,
        LoadingSpinner
    }, 
    methods: {
        //Funktion för att hämta in data
        async getProducts() {
            this.isLoading = true;
            let response = await fetch("https://projekt-webbtjanst-api-hanin-96.onrender.com/product", {
                method: "GET",
                credentials: 'include' //VIKTIGT FÖR COOKIES
            }); //används för testning

            this.isLoading = false;
            let data = await response.json(); 

            console.log(data); 
            let sortedData = data;
            sortedData = sortedData.sort((a, b) => {
                let titleA = a.product_name
                let titleB = b.product_name
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                return 0;
            })

            this.products = data;
        }, 

        //funktion för att radera produkter
        async deleteProduct(id) {
            this.isLoading = true;
            let response = await fetch("https://projekt-webbtjanst-api-hanin-96.onrender.com/product/" + id, {
                method: "DELETE", 
                headers: {
                    "Accept": "application/json", 
                    "Content-type": "application/json"

                }, 
                credentials: 'include'
            });
            this.isLoading = false;
            let data = await response.json(); 
            
            this.getProducts(); 
        }, 

        // lägger in data från produkt som ska uppdateras i formuläret postproduct
        handleUpdateProduct(product) {
        this.$refs.postProductForm.populateForm(product); 
        },
    }, 

    mounted() {
        this.getProducts();
    }
}
</script>

<style>
.produktkort {
    background-color: #f8f8f8; 
    margin-bottom: 1rem; 
    padding: 1rem; 
}
</style>