<template>
<form @submit.prevent="onsubmit">
  <va-input
    v-model="username"
    type="text"
    label="User Name"
    :error="!!usernameErrors.length"
    :error-messages="usernameErrors"
  />

  <va-input
    v-model="password"
    type="Password"
    label="Password"
    :error="!!passwordErrors.length"
    :error-messages="passwordErrors"
  />

  <!-- <div class="auth-layout__options d-flex align--center justify--space-between">
    
    <router-link class="ml-1 link" :to="{name: 'recover-password'}">Recover Password</router-link>
  </div> -->

  <div class="d-flex justify--center mt-3">
    <va-button type="submit" class="my-0">Login</va-button>
  </div>
</form>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      keepLoggedIn: false,
      usernameErrors: [],
      passwordErrors: [],
    }
  },
  computed: {
    formReady () {
      return !this.usernameErrors.length && !this.passwordErrors.length
    },
  },
  methods: {
    onsubmit () {
      this.usernameErrors = this.username ? [] : ['User Name is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return
      }
        this.$store.commit('setLoading', true) 
       this.$router.push({ name: 'dashboard' })
      this.$http.post(`${this.$apiUrl}auth/login`,{
        username: this.username,
        password: this.password
      })
      .then(data=>{
          this.$store.commit('setLoading', false) 
         if(data.data != undefined){
            this.$store.dispatch('userlogin',this.username)
            this.$router.push('/auth/code')
            return
         }
         this.$swal.fire(
                  ``,
                 `Error login in`,
                 'error'
             )

      })
      .catch(err=>{
          this.$store.commit('setLoading', false) 
         if(err.response.data.error != undefined){
           this.usernameErrors.push(err.response.data.error)
           this.passwordErrors.push(err.response.data.error) 
         }else{
              this.$swal.fire(
                  ``,
                 `${err.response}`,
                 'error'
             )
         }
      })
    },
  },
}
</script>

<style lang="scss">
</style>
