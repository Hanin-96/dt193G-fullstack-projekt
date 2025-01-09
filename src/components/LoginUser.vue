<!--Komponent med formulär för att logga in som användare-->

<template>
    <div class="form-login max-w-sm w-full mx-auto">
        <LogoImg />
        <h1 class="bg-white text-dark-grey-text p-4 text-center mb-0 text-4xl">Apotek 24/7</h1>
            <form @submit.prevent="loginUser()" class="bg-light-green text-dark-grey-text p-8 mx-auto shadow-xl rounded-bl-lg rounded-br-lg">

                <label for="username" class="text-base">Användarnamn:</label><br>
                <input v-model="userBody.username" type="text" name="username" id="username" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br> 

                <label for="password" class="text-base">Lösenord:</label><br>
                <input v-model="userBody.password" type="text" name="password" id="password" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-2"><br>
                <br>
                <div class="error-msg mb-2" v-if="errorMsg != ''">
                    <p>{{errorMsg}}</p>
                </div>
                <input type="submit" value="Logga in" id="submit-btn" class="max-w-full mx-auto my-0 p-3 rounded-lg bg-light-yellow text-dark-grey-text font-semibold shadow-md cursor-pointer w-full"><br>
        </form>
        <div class="mt-1 p-2 text-white underline text-right">
            <RouterLink to="/register">Registrera ny användare</RouterLink>
        </div>
    </div>
</template>

<script>
import LogoImg from './LogoImg.vue';
export default {
    components: {
        LogoImg
    },
    name: "LoginUser",
    data() {
        return {
            LogoImg,
            userBody: {
                username: '',
                password: ''
            },
            errorMsg: ""
        }
    },
    methods: {
        async loginUser() {
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ user_name: this.userBody.username, user_password: this.userBody.password })
                });

                const data = await response.json();
                
                if (response.ok) {
                    console.log("Inloggning lyckades!");
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

</style>