<template>
  <form @submit.prevent="onsubmit" class="login">
     <div v-if="logged">
          <div class="row mb-2">
          <va-input
            v-model="code"
            label="ENTER CODE SENT TO PHONE"
            :error="!!codeErrors.length"
            :error-messages="codeErrors"
          />
        </div>
        <div class="row justify--center">
          <va-button type="submit" class="my-0">Validate</va-button>
        </div>
     </div>
  </form>
</template>

<script>
export default {
  computed:{
      username(){
        return this.$store.state.usernamelogin
      },
      logged(){
         if( this.$store.state.usernamelogin != "" && this.$store.state.usernamelogin != ""){
            return true
         }
         return false
      }

  },
  mounted(){
    if(!this.logged){
       this.$router.push('/auth/login')
    }
  },
  data () {
    return {
      code: '',
      codeErrors: [],
    }
  },
  methods: {
    onsubmit () {
      if (!this.code) {
         this.codeErrors = ['Enter code']
         return;
      }
      this.codeErrors = []
      this.$store.commit('setLoading', true) 
      console.log()
      this.$http.post(`${this.$apiUrl}auth/code`,{
        username: this.username,
        code: this.code
      })
      .then(data=>{
          this.$store.commit('setLoading', false) 
         if(data.data != undefined){
            this.$store.dispatch('userdetails',data.data)
            this.$router.push('/')
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
           this.codeErrors.push(err.response.data.error)
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
