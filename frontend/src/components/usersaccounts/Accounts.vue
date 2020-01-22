<template>
    <div class="flex xs12">
        <va-card
        title="Accounts">
               
            <va-data-table
            :fields="fields"
            :data="data"
            :per-page="10"
            hoverable="true"
            no-data-label="Nothing to display !">

              <template slot="actions" slot-scope="props">
                <va-button flat small color="gray" @click="removeAccount(props.rowData)" class="ma-0">
                  Delete
                </va-button>
           </template>
          </va-data-table>
        </va-card>  
    </div>
</template>

<script>
export default {
  components: {
   
  },
  methods: {
    async removeAccount(row){
       let ans = await this.$swal.fire({
            title: 'Remove Account ?',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4AE392',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Remove!'
         })
         
         if(!ans.value) return
         this.$store.commit('setLoading', true)
         this.$http.delete(`${this.$apiUrl}accounts/${row._id}`)
        .then(data=>{
           this.$store.commit('setLoading', false)
           if(data.data.message != undefined){
              this.$swal.fire(
                 `${data.data.message}`,
                 '',
                 'success'
             )
             
             this.fetchAccounts()
           }else{
              this.$store.commit('setLoading', false)
             throw new Error()
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
     async fetchAccounts(){
         this.$store.commit('setLoading', true)
        try{
          this.data = []
          let data = await this.$http.get(`${this.$apiUrl}accounts`)
          this.data = data.data
            this.$store.commit('setLoading', false)
        }catch(err){
            this.$store.commit('setLoading', false)
          this.$swal({
						type : 'error',
						title : 'Failed to Fetch Accounts!',
						showConfirmButton : false,
						timer : 3000 
          })
          
        }
     }
  },
  data(){
      return{
         fields :[
            {
              name : "name",
              title: "Account Name"
            },
            {
              name : "accountNumber",
              title: "Account Number"
            },
            {
              name : "holderName",
              title: 'Holder Name'
             },
             {
              name :"username",
              title : "Username"
            },
            {
              name :"password",
              title : "Password"
            },
            {
              name : "key",
              title : "Basic Key",
              
            },
            {
              name : "description",
              title: "Description"
            },
             {
                name: '__slot:actions',
             }
            
         ],
         data : []
      }
    },
    mounted(){
        this.fetchAccounts()
    }
}
</script>

<style lang="scss">

</style>
