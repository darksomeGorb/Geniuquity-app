<template>
      <div class="row row-equal">
        <div class="flex xs12">
               <div class="row flex">
                    <div class="flex xs12 sm6 lg4">
                       
                    </div>
                    <div class="flex xs12 sm6 lg4">
                         <va-input
                            v-model="accountNumber"
                            placeholder="Account Number"
                            :error="!!accountNumberErrors.length"
                            :error-messages="accountNumberErrors"
                          />
                    </div>
                    <div class="flex xs12 sm6 lg4">
                        <va-button @click="getDetails" color="success">
                          Get Details
                        </va-button>
                    </div>
               </div>
               <div v-if="details.account != undefined">
                     <h2 style="text-align:center;">Account Details</h2>
                     <div class="mt-2">
                        <h5 style="text-align:center;">Account No : &nbsp;&nbsp;<span class="query-account">{{ details.account.number }}</span></h5>
                        <h5 style="text-align:center;">Currency : &nbsp;&nbsp;<span class="query-currency">{{ details.account.currency }}</span></h5>
                        <h5 style="text-align:center;">Status : &nbsp;&nbsp;<span class="query-status">{{ details.account.status }}</span></h5>
                        <h5 style="text-align:center;">Branch Code : &nbsp;&nbsp;<span class="query-account">{{ details.account.branchCode }}</span></h5>
                     </div> 
                     <h2 class="mt-4 text-center" >Account Customers</h2>
                     <div class="xs12">
                         <va-data-table
                          :fields="fields"
                          :data="details.customer"
                          :per-page="10"
                          :hoverable="true"
                          no-data-label="Nothing to display !">
                        </va-data-table> 
                     </div>
               </div>
        </div>
     </div>

  
</template>

<script>
export default {
  name: 'account-query',
  components: {
    
  },
  methods: {
     getDetails(){
         if(!this.accountNumber){
           this.accountNumberErrors = ["Enter accountNumber"]
           return
         }else if(this.accountNumber.length < 10){
           this.accountNumberErrors = ["Enter valid accountNumber"]          
         }
         this.accountNumberErrors = []
          this.$store.commit('setLoading', true) 
         this.$http.post(`${this.$apiUrl}jenga/query/account/${this.$store.state.activeAccount.accountNumber}`,{  accountNumber : this.accountNumber})
         .then(data=>{
             this.detailsData = data.data
             this.$store.commit('setLoading', false) 
             this.$store.dispatch('accountQuery',data.data)
         }) 
         .catch(err => {
           this.$store.commit('setLoading', false) 
            if(err.response.data.error != undefined){
                this.$swal.fire(
                  ``,
                 `${err.response.data.error}`,
                 'error'
             )
            }
            console.log(err)
       })  
     }
  },
  computed : {
       details(){
           if(this.$store.state.accountQueryDetails != undefined && this.$store.state.accountQueryDetails[this.$store.state.activeAccount.accountNumber] != undefined){
              return this.$store.state.accountQueryDetails[this.$store.state.activeAccount.accountNumber]
           }
           return this.detailsData
       }
  },   
  data(){
      return{
         
          accountNumber : "",
          countryCode : "",
          fields : [
              {
                name : "id",
                title : "ID"
              },{
                name : "name",
                title :"Name"
              },{
                name : "type",
                title : "Type"
              }
          ],
          detailsData : { 

          },
          accountNumberErrors : []
      }
  }
}
</script>

<style lang="scss">

</style>
