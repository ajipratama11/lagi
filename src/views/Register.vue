<template>
  <div class="register">
  <form @submit.prevent="handleSubmit">
  <div class="mb-3" :class="{ 'form-group--error': $v.name.$error }">
    <label for="exampleInputName1" class="form-label">Name</label>
    <input type="text" class="form-control"  v-model.trim="$v.name.$model" >
    <div class="error" v-if="!$v.name.required">Name is required</div>
  <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
  </div>
  <div class="mb-3" :class="{ 'form-group--error': $v.email.$error }">
    <label  class="form-label" >Email address</label>
    <input type="email" class="form-control" v-model.trim="$v.email.$model">
  <div class="error" v-if="!$v.email.notGmail ">Name Not Gmail letters.</div>
  <div class="error" v-if="!$v.email.notYahoo ">Name Not Yahoo letters.</div>
  <div class="error" style="color: red" v-if="!$v.email.email">Harus email.</div>
  </div>
  <div class="mb-3" :class="{ 'form-group--error': $v.password.$error }">
    <label for="exampleInputPassword1" class="form-label">Repeat Password</label>
    <input type="text" class="form-control" v-model.trim="$v.password.$model" id="exampleInputPassword1">
  </div>
  <div class="error" v-if="!$v.password.UpperCase">Mengandung Huruf Kapital</div>
  <div class="error" v-if="!$v.password.LowerCase">Mengandung Huruf Kecil</div>
  <div class="error" v-if="!$v.password.numberV">Mengandung Angka</div>
  <div class="error" v-if="!$v.password.symbol">Mengandung Karakter</div>
  <div class="error" v-if="!$v.password.minLength">Panjang lebih dari {{$v.password.$params.minLength.min}} karakter.</div>
  <div class="mb-3" :class="{ 'form-group--error': $v.password_confirm.$error }">
    <br/>
          <label  class="form-label" >Password Confirm</label>
        <input type="password" class="form-control" v-model.trim="$v.password_confirm.$model">
  </div>
  <div class="error" style="color: red" v-if="!$v.password_confirm.sameAsPassword">kudu podo</div>
  <vue-recaptcha
  sitekey="6Ldsgb0dAAAAALJdjxCz5CCv1nEDGRGF7OgxIIz8"
  ref="recaptcha"
  @verify="onCaptchaVerified"
  @expired="onCaptchaExpired">
</vue-recaptcha>
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>
  </div>
</template>

<script >
// @ is an alias to /src
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import {  notGmail,notYahoo, isEmailAvailable, UpperCase, LowerCase, numberV, symbol } from "../validator.js";
import axios from 'axios'
import { VueRecaptcha } from 'vue-recaptcha';
export default {
  name: 'Register',
  components: {
    // VueRecaptcha
     VueRecaptcha
  },
  data() {
      return {
          name: '',
          email: '',
          password: '',
          password_confirm: '',
          submitStatus: null,
          isVerified: false,
      }
  },
  validations: {
    name: {
      required,
      minLength: minLength(8)
    },
    email : { required, email, notGmail, isEmailAvailable, UpperCase, notYahoo },
    password: {  UpperCase, LowerCase, numberV, symbol, minLength: minLength(8) },
    password_confirm: {  sameAsPassword: sameAs('password') }
  },
   methods: {
     onCaptchaVerified() {
      
      this.isVerified = true;
    },
    onCaptchaExpired: function () {
      this.isVerified = false;
      console.log('drung dicentang');
      this.$refs.recaptcha.reset();
    },
       async handleSubmit(){
         this.$v.$touch()
         console.log(this.$v.$invalid);
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here        
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 900)
      }
         await axios.post('register', {
              name : this.name,
              email : this.email,
              password : this.password
          });
          this.$router.push('/login');
       
      }
  }
}
</script>