<template>
  <div class="form-group" :class="{ hasError: v.$error }">
    <label class="mr-2 font-bold text-grey">Email</label>
    <input
      type="email"
      class="form-input"
      placeholder="user@yahoo.com"
      @input="v.$touch()"
    />
    <div class="text-sm mt-2 text-red" v-if="v.$error">
    <div v-if="!v.required">Email gak di isi</div>
    <div v-if="!v.notGmail">Email jangan gratisan dong</div>
    <div v-if="!v.isEmailAvailable">Email cendek nemen</div>
    <div v-if="!v.email">Email dduk format e</div>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    v: {
      type: Object,
      required: true
    }
  },
  computed: {
    email: {
      get() {
        return this.value;
      },
      set(value) {
        this.v.$touch();
        this.$emit("input", value);
      }
    }
  }
};
</script>
