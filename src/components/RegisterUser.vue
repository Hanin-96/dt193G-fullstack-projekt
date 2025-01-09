<!--Komponent med formulär för att lägga till ny användare-->

<template>
    <div class="form-login max-w-sm w-full mx-auto">
        <LogoImg class="mx-auto mt-4 mb-4"/>
        <h1 class="bg-white text-dark-grey-text p-4 text-center mb-0 text-4xl">Apotek 24/7</h1>
        <form @submit.prevent="RegisterUser()" class="bg-light-green text-dark-grey-text p-8 mx-auto shadow-xl rounded-bl-lg rounded-br-lg">
            <label for="firstname" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Förnamn:</label><br>
            <input v-model="firstname" type="text" name="firstname" id="firstname" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br>

            <label for="lastname" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Efternamn:</label><br>
            <input v-model="lastname" type="text" name="lastnamn" id="lastname" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br> 

            <label for="email" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Epost:</label><br>
            <input v-model="email" type="text" name="email" id="email" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br> 

            <label for="username" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Användarnamn:</label><br>
            <input v-model="username" type="text" name="username" id="username" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6"><br> 

            <label for="password" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-6">Lösenord:</label><br>
            <input v-model="password" type="text" name="password" id="password" class="max-w-full w-full mx-auto my-0 p-1.5 rounded-lg mt-2 mb-2"><br>
            <br>
            <input type="submit" value="Registrera" class="max-w-full mx-auto my-0 p-3 rounded-lg bg-light-yellow text-dark-grey-text font-semibold shadow-md cursor-pointer w-full"><br>
        </form>
        <div class="mt-1 p-2 text-white underline text-left">
            <RouterLink to="/login">Logga in</RouterLink>
        </div>
    </div>
</template>

<script>
import LogoImg from './LogoImg.vue';

export default {
    components: {
        LogoImg
    },
    data() {
        return {
            firstname: "", 
            lastname: "", 
            email: "", 
            username: "", 
            password: ""
        }
    }, 
    methods: {
        async RegisterUser() {
            if(this.firstname || this.lastname || this.email || this.username || this.password > 2) {
                
                let newUserBody = {
                    first_name: this.firstname, 
                    last_name: this.lastname, 
                    email: this.email, 
                    user_name: this.username, 
                    user_password: this.password
                }
                
                
                const response = await fetch ("http://localhost:3000/adduser", {
                    method: "POST", 
                    headers: {
                        "Accept": "application/json",
                        "Content-type":"application/json"
                    }, 
                    body: JSON.stringify(newUserBody)
                }); 

                const data = await response.json(); 
                
                //för test
                console.log(data); 

                this.firstname = ""
                this.lastname = ""
                this.email = ""
                this.username = ""
                this.password = ""
                
            }
        }
    }
}
</script>

<style scoped>

</style>