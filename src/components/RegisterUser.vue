<!--Komponent med formulär för att lägga till ny användare-->

<template>
    <h1>Apotek 24/7</h1>
    <form @submit.prevent="RegisterUser()">
        <label for="firstname">Förnamn:</label><br>
        <input v-model="firstname" type="text" name="firstname" id="firstname"><br>

        <label for="lastname">Efternamn:</label><br>
        <input v-model="lastname" type="text" name="lastnamn" id="lastname"><br> 

        <label for="email">Epost:</label><br>
        <input v-model="email" type="text" name="email" id="email"><br> 

        <label for="username">Användarnamn:</label><br>
        <input v-model="username" type="text" name="username" id="username"><br> 

        <label for="password">Lösenord:</label><br>
        <input v-model="password" type="text" name="password" id="password"><br>
        <br>
        <input type="submit" value="Registrera"><br>

    </form>
</template>

<script>
export default {
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
h1 {
    background-color: #ffffff;
    color: #353535; 
    padding: 1em; 
    text-align: center;
} 

input {
    width: 355px; 
    max-width: 100%;
    margin: 0 auto; 
    padding: 1em; 
    border-radius: 5px;
} 

form {
    color: #353535; 
}
</style>