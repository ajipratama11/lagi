<template>
    <form >
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  <router-link to="/login">login</router-link>
</form>
</template>

<script>
export default {
    name: 'Forgot'
}
</script>

<style scoped>

</style>