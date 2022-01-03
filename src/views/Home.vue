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
export default {
  name: 'Home',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
