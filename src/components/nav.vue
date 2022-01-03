<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!user">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/login">login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/register">sign up</router-link>
        </li>
      </ul>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="user">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="javascript:void(0)" @click="handleClick">logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'Nav',
    methods:{
        handleClick(){
            localStorage.removeItem('token');
            this.$store.dispatch('user', null);
            this.$router.push('/');
        }
    },
    computed: {
        ...mapGetters(['user'])
    }
}
</script>