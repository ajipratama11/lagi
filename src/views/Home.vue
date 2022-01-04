<template>
  <div class="home">
  <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title" v-if="user">{{ user.name }}</h5>
    <h5 class="card-title" v-if="!user">Belum Login</h5>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
  </div>
</template>

<script >
// @ is an alias to /src
import {mapGetters} from 'vuex'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'
let encryptor = new JSEncrypt() // New JSEncrypt Object

let publicKey = `MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFR3ZVqHiPr/KuHtMGRHtGbRR5Xl
5RKazlKqQhdSIl8yySCaL3YwVKWUQ+BgXIMy8y+3c6qwpECh3Mf4VzeqHidJC7N9
HuoLJPbxdkqx/wHCc+F1EfQDLc2qofV1R/SuJVFx7GsSez+cqJYMykaZLCwFYetz
k1+Q2tGlKXoUbwKlAgMBAAE=`  //Paste in previous generations, which can be passed in from the background during actual development

encryptor.setPublicKey(publicKey) // Set Public Key

let rsaPassWord = encryptor.encrypt('ajipraatama') // Encrypt data that needs to be encrypted

console.log(rsaPassWord)   //Get encrypted data
export default {
  name: 'Home',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
