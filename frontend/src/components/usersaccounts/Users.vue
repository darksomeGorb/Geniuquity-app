<template>
    <div>
        <va-card
        title="Accounts">
               
            <va-data-table
            :fields="fields"
            :data="data"
            :per-page="10"
            :hoverable="true"
            no-data-label="Nothing to display !">

            <template slot="actions" slot-scope="props">
                <va-button flat small color="gray" @click="removeUser(props.rowData)" class="ma-0">
                 Delete
                </va-button>

                <va-button flat small color="danger" @click="setAccounts(props.rowData)" class="ma-0">
                   Accounts
                </va-button>
           </template>
          </va-data-table>
        </va-card>  
         <va-modal
            v-model="showAccountModal"
            title="Add Accounts to user"
            cancelText="cancel"
            size="large"
            @ok="saveAccounts"
        >
           <template slot="default">
                 <div  style="padding:0px 20px;">
                         <va-select
                              label="Accounts"
                              v-model="selectedAccount"
                              textBy="name"
                              :options="accounts"
                         />
                         <va-button color="success" @click="addAccountToUser">
                           Add
                         </va-button>
                         <br>
                         <va-data-table
                            :fields="[ { name : 'name', title: 'Account Name' },{ name : 'accountNumber', title: 'Account Number' },{ name: '__slot:actions'}]"
                            :data="selectedUser.accounts"
                            :per-page="100"
                            :hoverable="true"
                            no-data-label="Nothing to display !"
                         >
                             <template slot="actions" slot-scope="props">
                                <va-button  flat small color="gray" @click="removeAccount(props.rowData.accountNumber)" class="ma-0">
                                   Remove
                                </va-button>
                             </template>
                         </va-data-table>
                 </div>
           </template>
         </va-modal>
    </div>
</template>

<script>
export default {
  components: {
   
  },
  methods: {
     removeAccount(accountNumber){
       let accounts = this.selectedUser.accounts.filter(acc => acc.accountNumber != accountNumber)
       this.selectedUser.accounts = accounts
     },
   async removeUser(row){
       let ans = await this.$swal.fire({
            title: 'Remove user ?',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4AE392',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Remove!'
         })
         
         if(!ans.value) return
         this.$store.commit('setLoading', true)
         this.$http.delete(`${this.$apiUrl}users/${row._id}`)
        .then(data=>{
           if(data.data.message != undefined){
              this.$swal.fire(
                 `${data.data.message}`,
                 '',
                 'success'
             )
             
             this.fetchUsers()
           }else{
             throw new Error()
             this.$store.commit('setLoading', false)
           }
        })
        .catch(err=>{
           this.$store.commit('setLoading', false)
           if(err){
             this.$swal.fire(
                 `${data.data.message}`,
                 '',
                 'error'
             )
           }
        })
       
     },
     async saveAccounts(){
       let accounts = []
       for(var i =0;i<this.selectedUser.accounts.length;i++){
          accounts.push(this.selectedUser.accounts[i].accountNumber)
       }
       this.selectedUser.accounts = accounts
       this.$store.commit('setLoading', true)
      try{
          let data = await this.$http.put(`${this.$apiUrl}users/${this.selectedUser._id}`,this.selectedUser)
         this.$store.commit('setLoading', false) 
         if(data.data.message != undefined){
             this.$swal.fire(
                 `${data.data.message}`,
                 '',
                 'success'
             )
             this.fetchUsers()
          }
      }catch(err){
            this.$store.commit('setLoading', false)
            this.$swal({
						type : 'error',
						title : 'Failed to add accounts to user',
						showConfirmButton : false,
						timer : 1500 
					})
      }
     },
     setAccounts(row){  
        this.selectedUser = row
        this.showAccountModal = true
     },
     addAccountToUser(){
        if(this.selectedAccount == ''){
           return
        }
        var valid = true
        for(var i =0 ;i<this.selectedUser.accounts.length;i++){
            if(this.selectedUser.accounts[i].name === this.selectedAccount.name){
               valid = false
            }
        }
        if(valid)this.selectedUser.accounts.push(this.selectedAccount)
     },
     async fetchUsers(){
        this.$store.commit('setLoading', true)
       try{
          let data = await this.$http.get(`${this.$apiUrl}users`)
          this.$store.commit('setLoading', false)
          this.data= []
          data.data.forEach(user=>{
             if(user.name.trim() !== this.$store.state.user.name.trim()){
                this.data.push(user)
             }
          })

        }catch(err){
           this.$store.commit('setLoading', false)
             this.$swal({
              type : 'error',
              title : `Failed to Fetch Users! ${err}`,
              showConfirmButton : false,
              timer : 2500 
				})
        }
     }
  },
  data(){
      return{
         fields :[
            {
              name : "name",
              title: "Name"
            },
             {
              name :"username",
              title : "Username"
            },
             {
                name : 'number',
                title: 'Phone Number'
            },
            {
                name : 'admin',
                title: 'Admin'
            },

            {
                name: '__slot:actions',
             }
         ],
         data : [],
         accounts: [],
         showAccountModal: false,
         selectedUser : {},
         selectedAccount:''
      }
    },
    async mounted(){
         this.fetchUsers()
         try{
          let data = await this.$http.get(`${this.$apiUrl}accounts`)
          this.accounts = []
          for(var i = 0;i< data.data.length;i++){
              let item = data.data[i]
              item.id = i+1
              this.accounts.push(item)
          }
        }catch(err){
             this.$swal({
						type : 'error',
						title : 'Failed to Fetch Accounts!',
						showConfirmButton : false,
						timer : 1500 
					})
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
</style>
