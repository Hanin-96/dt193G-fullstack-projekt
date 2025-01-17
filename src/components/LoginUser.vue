<!--Komponent med formulär för att logga in som användare-->

<template>
    <div class="form-login max-w-sm w-full mx-auto">
        <LogoImg class="mx-auto mt-4 mb-4"/>
            <div class="login-wrap bg-light-green shadow-xl rounded-bl-lg rounded-br-lg pb-2">
            <h1 class="bg-white text-dark-grey-text p-4 text-center mb-0 text-4xl">Apotek 24/7</h1>
                <form @submit.prevent="loginUser()" class=" text-dark-grey-text p-8 mx-auto">

                    <label for="username" class="text-base">Användarnamn:</label><br>
                    <input v-model="userBody.username" type="text" name="username" id="username" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br> 

                    <label for="password" class="text-base">Lösenord:</label><br>
                    <input v-model="userBody.password" type="password" name="password" id="password" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-2"><br>
                    <br>
                    <div class="error-msg mb-2" v-if="errorMsg != ''">
                    <p>{{errorMsg}}</p>
                    </div>
                    <input type="submit" value="Logga in" id="submit-btn" class="max-w-full mx-auto my-0 p-3 rounded-lg bg-light-yellow text-dark-grey-text font-semibold shadow-md cursor-pointer w-full"><br>
                </form>
                <LoadingSpinner :loadingSpinner="isLoading"/>
        </div>

        <div class="mt-1 p-2 text-white underline text-right">
            <RouterLink to="/register">Registrera ny användare</RouterLink>
        </div>
    </div>
</template>

<script>
import LogoImg from './LogoImg.vue';
import LoadingSpinner from './LoadingSpinner.vue';
export default {
    components: {
        LogoImg,
        LoadingSpinner
    },
    name: "LoginUser",
    data() {
        return {
            userBody: {
                username: '',
                password: ''
            },
            errorMsg: "",
            isLoading: false
        }
    },
    methods: {
        //Post fetch anrop för inloggning av användare
        async loginUser() {
            this.isLoading = true;

            try {
                const response = await fetch('https://projekt-webbtjanst-api-hanin-96.onrender.com/login', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    credentials: 'include', //KOMMENTERA INTE UT DENNA! 
                    body: JSON.stringify({ user_name: this.userBody.username, user_password: this.userBody.password })
                });

                const data = await response.json();
                this.isLoading = false;
                
                if (response.ok) {
                    //console.log("Inloggning lyckades!");
                    this.$router.push({name:'admin'});
                    this.errorMsg = "";
                } else {
                    this.errorMsg = "Fel Användarnamn/Lösenord";
                }
            } catch (error) {
                this.errorMsg = 'Det gick inte att logga in, serverfel';
            }
        }
    }
};
</script>

<style scoped>
.error-msg {
    color: red;
}

</style>