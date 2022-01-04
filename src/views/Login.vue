<template>
  <div class="login">
    <form @submit.prevent="handleSubmit">
      <error v-if="error" :error="error" />
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          id="exampleInputPassword1"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <router-link to="/forgot"></router-link>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import Error from "@/components/Error.vue";
import axios from "axios";
import JSEncrypt from "jsencrypt/bin/jsencrypt";

export default {
  name: "Login",
  components: {
    // VueRecaptcha
    Error,
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleSubmit() {
      const password = this.password;
      let encryptor = new JSEncrypt(); // New JSEncrypt Object

      let publicKey = `MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFR3ZVqHiPr/KuHtMGRHtGbRR5Xl
5RKazlKqQhdSIl8yySCaL3YwVKWUQ+BgXIMy8y+3c6qwpECh3Mf4VzeqHidJC7N9
HuoLJPbxdkqx/wHCc+F1EfQDLc2qofV1R/SuJVFx7GsSez+cqJYMykaZLCwFYetz
k1+Q2tGlKXoUbwKlAgMBAAE=`; //Paste in previous generations, which can be passed in from the background during actual development

      encryptor.setPublicKey(publicKey); // Set Public Key
      console.log(password)
      try {
        const response = await axios.post("login", {
          email: this.email,
          password: encryptor.encrypt(password),
        });
        const pw = encryptor.encrypt(password)
        console.log(response);
        console.log(pw);
        localStorage.setItem("token", response.data.token);
        this.$store.dispatch("user", response.data.user);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
        this.error = "Invalid email/password";
      }
    },
  },
};
</script>
