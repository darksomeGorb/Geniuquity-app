<template>
    <div class="dashboard">
       <form @submit.prevent="onSubmit">
          <div class="row row-equal flex align--center justify--center">
            <div class="flex xs7">
                <va-card title="ADD ACCOUNT">
                    <div class="row flex">
                        <div class="xs12 md6 align--center justify--center pr-1">
                            <va-input
                                label="Full Name"
                                v-model="name"
                                placeholder="Full Name"
                                :error="!!nameErrors.length"
                                :error-messages="nameErrors"
                            />
                            <va-input
                                label="Username"
                                v-model="username"
                                placeholder="username"
                                :error="!!usernameErrors.length"
                                :error-messages="usernameErrors"
                            />
                              <va-input
                                label="Mobile (i.e 254723293609)"
                                v-model="mobile"
                                placeholder="Mobile"
                                :error="!!mobileErrors.length"
                                :error-messages="mobileErrors"
                            />
                        </div>
                        <div class="xs12 md6 align--center justify--center">
                            <va-input
                                type="password"
                                label="Password"
                                v-model="password"
                                placeholder="Password"
                                :error="!!passwordErrors.length"
                                :error-messages="passwordErrors"
                            />
                            <va-select
                            label="Role"
                            v-model="admin"
                            textBy="description"
                            :options="roleOptions"
                            :error="!!adminErrors.length"
                            :error-messages="adminErrors"
                            />
                        </div> 
                    </div>
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
         
         this.usernameErrors =  this.username ? [] : ['username cannot be empty']
         this.passwordErrors = this.password ? [] : ['password cannot be empty']
         this.nameErrors =  this.name ? [] : ['Account Name cannot empty']
         this.adminErrors = this.admin ? [] : ['Select role']
         this.mobileErrors = this.mobile ? [] : ["Enter phone number"]
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
            let data = await this.$http.post(`${this.$apiUrl}/users`,{
             username: this.username,
             password: this.password,
             name : this.name,
             admin :this.admin.bool,
             number : this.mobile
           })

           if(data.data.message !== undefined){
              this.$store.commit('setLoading', false)
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
                    type : 'error',
                    title : 'Failed to Add User!',
                    showConfirmButton : false,
                    timer : 2500 
					       })
             }else{
                 this.$swal({
                    type : 'error',
                    title : 'Failed to Add User!',
                    showConfirmButton : false,
                    timer : 2500 
					       })
             }
         }
     },
     clearFields(){
         this.username = ''
         this.password = ''
         this.name= ''
     }
  },
  computed : {
      formReady(){
          return !this.passwordErrors.length && !this.usernameErrors.length 
          &&!this.nameErrors.length && !this.adminErrors.length && !this.mobileErrors.length
      }
  },
  data(){
      return{
         username: '',
         password: '',
         name: '',
         mobile : "",
         mobileErrors : [],
         usernameErrors: [],
         passwordErrors: [],
         nameErrors: [],
         admin: '',
         adminErrors:[],
         roleOptions : [
              {
              id: 1,
              description: 'Admin',
              bool: true
            },
            {
              id: 2,
              description: 'user',
              bool : false
            }
         ]
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
