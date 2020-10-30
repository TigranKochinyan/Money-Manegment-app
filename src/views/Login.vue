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
        > {{'password-must-be' | localize}}
           {{$v.password.$params.minLength.min}}
            {{'password-now' | localize}} 
            {{password.length}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'sign-in' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'not-have-account' | localize}}
        <router-link to="register">{{'register' | localize}}</router-link>
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
import {email, required, minLength} from 'vuelidate/lib/validators';
import messages from '@/utils/messages';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    };
  },
  methods: {
    async submit_handler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('login', formData)      
        this.$router.push('/');
      } catch (error) {
        
      }
    },
    
  },
}
</script>