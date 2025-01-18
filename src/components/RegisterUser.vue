<!--Komponent med formulär för att lägga till ny användare-->

<template>
    <div class="form-login max-w-sm w-full mx-auto">
        <LogoImg class="mx-auto mt-4 mb-4"/>
        <h1 class="bg-white text-dark-grey-text p-4 text-center mb-0 text-4xl">Apotek 24/7</h1>
        <form @submit.prevent="RegisterUser()" class="bg-light-green text-dark-grey-text p-8 mx-auto shadow-xl rounded-bl-lg rounded-br-lg">
            <label for="firstname" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Förnamn:</label><br>
            <span class="error" v-if="errMsg.firstname">{{ errMsg.firstname }}</span>
            <input v-model="firstname" type="text" name="firstname" id="firstname" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br>

            <label for="lastname" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Efternamn:</label><br>
            <span class="error" v-if="errMsg.lastname">{{ errMsg.lastname }}</span>
            <input v-model="lastname" type="text" name="lastnamn" id="lastname" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br> 

            <label for="email" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Epost:</label><br>
            <span class="error" v-if="errMsg.email">{{ errMsg.email }}</span>
            <input v-model="email" type="text" name="email" id="email" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br> 

            <label for="username" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Användarnamn:</label><br>
            <span class="error" v-if="errMsg.username">{{ errMsg.username }}</span>
            <input v-model="username" type="text" name="username" id="username" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br> 

            <label for="password" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Lösenord:</label><br>
            <span class="error" v-if="errMsg.password">{{ errMsg.password }}</span>
            <input v-model="password" type="text" name="password" id="password" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-2"><br>
            <br>
            <input type="submit" value="Registrera" class="max-w-full mx-auto my-0 p-3 rounded-lg bg-light-yellow text-dark-grey-text font-semibold shadow-md cursor-pointer w-full"><br>
            <span v-if="this.useradded">{{ this.useradded }}</span>
        </form>
        <loading-spinner :loadingSpinner="isLoading" />
        <div class="mt-1 p-2 text-white underline text-left">
            <RouterLink to="/login">Logga in</RouterLink>
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
    data() {
        return {
            firstname: "", 
            lastname: "", 
            email: "", 
            username: "", 
            password: "",
            isLoading: false, 
            errMsg: {
                firstname: "",
                lastname: "",
                email: "",
                username: "",
                password: ""
            },
            useradded: ""
        }
    }, 
    methods: {
        async RegisterUser() {
            this.isLoading = true;

            if(!this.registerValidation()) {
                this.loadingSpinner = false;
                return; 
            }
                
            let newUserBody = {
                first_name: this.firstname, 
                last_name: this.lastname, 
                email: this.email, 
                user_name: this.username, 
                user_password: this.password
            }
                
                
            const response = await fetch ("https://projekt-webbtjanst-api-hanin-96.onrender.com/adduser", {
                method: "POST", 
                headers: {
                    "Accept": "application/json",
                    "Content-type":"application/json"
                },
                credentials: 'include', //VIKTIGT FÖR COOKIES
                body: JSON.stringify(newUserBody)
            }); 

            this.isLoading = false; 

            const data = await response.json(); 
                
            //för test
            console.log(data); 

            if(response.ok) {
                this.firstname = ""
                this.lastname = ""
                this.email = ""
                this.username = ""
                this.password = ""
                this.useradded = "Användaren har lagts till"
                
                this.errMsg = {};

            } else {
                this.useradded = "Kunde inte lägga till användare. Tänk på att du inte kan registrera dig med en mail mer än en gång. Vänligen försök igen!"
            }

        },

        //validering för formuläret
        registerValidation() {
            this.errMsg = {}; 
            
            let isValid = true; 
            this.isLoading = false;

            if(this.firstname.length < 1) {
                this.errMsg.firstname = "Du måste ange användarnamn"; 
                isValid = false
            }

            if(this.lastname.length < 1) {
                this.errMsg.lastname = "Du måste ange efternamn"; 
                isValid= false
            }

            //Kontroll om emailadressen är rätt formaterad
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
                this.errMsg.email = "Du måste ange en korrekt e-postadress: namn@domän.se";
                isValid = false
            } 
            
            if(this.username.length < 1) {
                this.errMsg.username = "Du måste ange ett användarnamn";
                isValid = false;
            }

            if(this.password.length < 1) {
                this.errMsg.password = "Du måste ange ett lösenord";
                isValid = false; 
            }

            return isValid; 
        }
    }
}
</script>

<style scoped>
.error {
    color: red;
}

</style>