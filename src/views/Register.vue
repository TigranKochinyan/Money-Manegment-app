<template>
  <form class="card auth-card" @submit.prevent="submit_handler">
    <div class="card-content">
      <span class="card-title">{{'home-bookkeeping' | localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        />
        <label for="email">{{'email' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >{{'empty-email'}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'invalid-email'}}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.password)}"
        />
        <label for="password">{{'password' | localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >{{'write-password' | localize}}</small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{'password-must-be' | localize}} 
          {{$v.password.$params.minLength.min}} 
          {{'password-now' | localize}} 
          {{password.length}}
        </small>
      </div>
      <div class="input-field">
        <input 
          id="name"
          type="text"
          v-model.trim="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        />
        <label for="name">{{'name' | localize}}</label>
        <small 
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{'write-your-name' | localize}}</small>
      </div>
      <p>
        <label>
          <input v-model="agree" type="checkbox" />
          <span>{{'agree' | localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'register' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'already-have-account' | localize}}
        <router-link to="/login">{{'sign-in' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>
<style scoped>
@media only screen and (max-width: 600px) {
  .auth-card {
    width: auto;
  }
}
</style>
<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "register",
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: v => v }
  },
  methods: {
    async submit_handler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const form_data = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      try {
        await this.$store.dispatch('register', form_data);      
        this.$router.push('/');
      } catch (error) {}
      
      
    }
  }
};
</script>