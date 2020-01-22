<template>
    <div class="dashboard">
       <form @submit.prevent="onSubmit">
          <div class="row row-equal flex align--center justify--center">
            <div class="flex xs7">
                <va-card title="ADD ACCOUNT">
                    <div class="row flex">
                        <div class="xs12 md6 align--center justify--center pr-1">
                            <va-input
                                label="Account Number"
                                v-model="accountNumber"
                                placeholder="Account Number"
                                :error="!!accountNumberErrors.length"
                                :error-messages="accountNumberErrors"
                            />
                            <va-input
                                label="Username"
                                v-model="username"
                                placeholder="username"
                                :error="!!usernameErrors.length"
                                :error-messages="usernameErrors"
                            />
                             <va-input
                                label="Account Name"
                                v-model="name"
                                placeholder="Account Name"
                                :error="!!nameErrors.length"
                                :error-messages="nameErrors"
                            />
                        </div>
                        <div class="xs12 md6 align--center justify--center">
                            <va-input
                                label="Holders Name"
                                v-model="holderName"
                                placeholder="Holders Name"
                                :error="!!holderNameErrors.length"
                                :error-messages="holderNameErrors"
                            />
                            <va-input 
                                label="Password"
                                v-model="password"
                                placeholder="Password"
                                :error="!!passwordErrors.length"
                                :error-messages="passwordErrors"
                            />
                        </div> 
                    </div>
                        <va-input 
                                type="textarea" 
                                label="Description"
                                v-model="description"
                                placeholder="Description"
                                :error="!!descriptionErrors.length"
                                :error-messages="descriptionErrors"
                            />
                            <va-input 
                                type="textarea" 
                                label="Basic Key"
                                v-model="key"
                                placeholder="Basic Key"
                                :error="!!keyErrors.length"
                                :error-messages="keyErrors"
                            />
                            
                            <va-button color="success">
                                Save
                            </va-button>
                            
                </va-card>
            </div>
        </div>    
       </form>  
    </div>
</template>

<script>


export default {
  name: 'addaccount',
  components: {
     
  },
  methods: {
     async onSubmit(){
         this.accountNumberErrors = this.accountNumber ? [] :  ['Acount Number cannot be empty']
         this.holderNameErrors =  this.holderName ? [] : ['Holder Name cannot be empty']
         this.usernameErrors =  this.username ? [] : ['username cannot be empty']
         this.passwordErrors = this.password ? [] : ['password cannot be empty']
         this.descriptionErrors = this.description ? [] : ['Description cannot be empty']
         this.keyErrors = this.key ? [] : ['Key cannot be empty'] 
         this.nameErrors =  this.name ? [] : ['Account Name cannot empty']
         if(!this.formReady)return

         let ans = await this.$swal.fire({
            title: 'Add Account?',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4AE392',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Add!'
         })
         
         if(!ans.value) return
           this.$store.commit('setLoading', true)
         try {
            let data = await this.$http.post(`${this.$apiUrl}/accounts`,{
             username: this.username,
             password: this.password,
             key: this.key,
             name : this.name,
             description : this.description,
             accountNumber : this.accountNumber,
             holderName: this.holderName
           })
            this.$store.commit('setLoading', false) 
           if(data.data.message !== undefined){
             this.$swal.fire(
                 `${data.data.message}`,
                 '',
                 'success'
             )

             this.clearFields()
              
           }
           else{
                this.$store.commit('setLoading', false)
               this.$swal.fire(
                  ``,
                 `${err.response.data.error}`,
                 'error'
             )  
             
           }
         } catch (error) {
              this.$store.commit('setLoading', false)
             if(error.response != undefined){
                   this.$swal({
						type : `error`,
						title : `${error.response.data.error}`,
						showConfirmButton : false,
						timer : 1500 
					})
                 
             }else{
                   this.$swal({
						type : 'error',
						title : 'Failed to Add Account!',
						showConfirmButton : false,
						timer : 1500 
					})
             }
         }
     },
     clearFields(){
         this.accountNumber = ''
         this.holderName = ''
         this.username = ''
         this.password = ''
         this.description =  ''
         this.key = ''
         this.name= ''
     }
  },
  computed : {
      formReady(){
          return !this.accountNumberErrors.length && !this.passwordErrors.length
          && !this.holderNameErrors.length && !this.usernameErrors.length && !this.descriptionErrors.length
          && !this.keyErrors.length && !this.nameErrors.length
      }
  },
  data(){
      return{
         accountNumber : '',
         holderName: '',
         username: '',
         password: '',
         description: '',
         key: '',
         name: '',
         accountNumberErrors : [],
         holderNameErrors: [],
         usernameErrors: [],
         passwordErrors: [],
         descriptionErrors: [],
         keyErrors: [],
         nameErrors: []
      }
  }
}
</script>

<style lang="scss">
 .row-equal .flex {
    .va-card {
      height: 100%;
    }
  }
  .dashboard {
    .va-card {
      margin-bottom: 0 !important;
    }
  }
</style>
