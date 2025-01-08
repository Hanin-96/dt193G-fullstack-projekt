<!--Komponent med formulär för att logga in som användare-->

<template>
    <div class="form-login">
        <img :src="imgLogo" alt="logotyp" class="img-logo">
        <h1>Apotek 24/7</h1>
        <form @submit.prevent="loginUser()">

            <label for="username">Användarnamn:</label><br>
            <input v-model="userBody.username" type="text" name="username" id="username"><br> 

            <label for="password">Lösenord:</label><br>
            <input v-model="userBody.password" type="text" name="password" id="password"><br>
            <br>
            <div class="error-msg" v-if="errorMsg != ''">
                <p>{{errorMsg}}</p>
            </div>
            <input type="submit" value="Logga in" id="submit-btn"><br>
        </form>
</div>
</template>

<script>
import imgLogo from '../assets/logotyp.svg';
export default {
    name: "LoginUser",
    data() {
        return {
            imgLogo,
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
h1 {
    background-color: #ffffff;
    color: #353535; 
    padding: 1em; 
    text-align: center;
    margin-bottom: 0 ;
} 

input {
    max-width: 100%;
    margin: 0 auto; 
    padding: 1em; 
    border-radius: 0.5rem;
} 

.img-logo {
    max-width: 10rem;
    width: 100%;
    display: block;
    margin: 0 auto;
    margin-bottom: 2rem;
    margin-top: 2rem;
}

form {
    color: #353535; 
    background-color: #9BBF9B;
    padding: 2rem;
    max-width: 400px;
    width: 100%;
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    border-radius: 0 0 0.5rem 0.5rem;
}

form >* {
    max-width: 400px;
    width: 100%;
    border: none;
    font-size: 16px;
}

form input {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
}



.form-login {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
}

#submit-btn {
    background-color: #FFDE83;
    padding: 1rem;
    border: none;
    box-shadow: 0px 10px 10px -3px rgb(53, 53, 53, 0.3);
    font-size: 20px;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    color: #353535;
}

.cls-3 {
    fill: #9BBF9B;
}
</style>