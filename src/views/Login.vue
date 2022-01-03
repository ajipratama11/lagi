<template>
  <div class="login">
  <form @submit.prevent="handleSubmit">
   <error v-if="error" :error="error" />
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" v-model="email" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" v-model="password" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  <router-link to="/forgot"></router-link>
</form>
  </div>
</template>

<script >
// @ is an alias to /src
import Error from '@/components/Error.vue'
import axios from 'axios'
import CryptoJS from 'crypto-js' //Encryption js
export default {
  name: 'Login',
  components: {
    // VueRecaptcha
    Error
  },
  data(){
      return {
          email: '',
          password: '',
          error: ''
      }
  },
  methods: {
      async handleSubmit(){
        if(this.email.includes("gmail"))
{
  this.error = "Gaoleh grtais";
}

        try{
          const response = await axios.post('login',{
              email: this.email,
              password: this.password
          });
          this.setCookie(this.email, this.password, 7);
          localStorage.setItem('token', response.data.token);
          this.$store.dispatch('user', response.data.user);
          this.$router.push('/');
          console.log(response);
        }catch (e){
            this.error = 'Invalid email/password'
        }

   
      },
       //Set cookie method
            setCookie(email, password, days) {
                CryptoJS.AES.encrypt(password, 'secret key 123');//Use CryptoJS method to encrypt
                var saveDays = new Date(); //Get Time
                saveDays.setTime( 24 * 60 * 60 * 1000 * days); //Number of days saved
                //String splicing and storing in cookie
                window.document.cookie = "email" + "=" + email + ";path=/;saveDays=" + saveDays.toGMTString();
                window.document.cookie = "password" + "=" + password + ";path=/;saveDays=" + saveDays.toGMTString();
            },
            //Read cookie
            getCookie() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //The format shown here needs to be cut and can be output by yourself.
                    for (var i = 0; i < arr.length; i++) { 
                        var arr2 = arr[i].split('='); //Cut again
                        //This will cut out the array with mobile as the 0th item and the array with password as the 0th item, and judge the corresponding value
                        if (arr2[0] == 'email') {
                            this.email = arr2[1]; //Get account
                        } else if (arr2[0] == 'password') {
                            //Get the encrypted password arr2[1] and decrypt it
                            var bytes = CryptoJS.AES.decrypt(arr2[1].toString(), 'secret key 123');
                            var plaintext = bytes.toString(CryptoJS.enc.Utf8); //Get the decrypted password (the password entered when logging in)
                            this.password = plaintext;
                        }
                    }
                }
            },
            //Clear cookie
            clearCookie() {
                this.setCookie("", "", 0); //Leave the account password blank, and set the number of days to 0
            }
      
  }
}
</script>
