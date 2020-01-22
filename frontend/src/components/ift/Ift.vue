<template>
    <div class="dashboard">
      
      <div class="row row-equal flex align--center justify--center">
        <div class="flex xs7">
         <form @submit.prevent="onSubmit">
          <va-card title="INTERNAL FUND TRANSFER">
              <div class="row flex">
                  <div class="xs12 md6 pr-1">
                      <va-input
                        label="Full Name"
                        v-model="destinationName"
                        placeholder="Full Name"
                        :error="!!destinationNameErrors.length"
                        :error-messages="destinationNameErrors"
                      />
                      <va-input 
                        label="Account Number"
                        v-model="transferNumber"
                        placeholder="Account Number"
                        :error="!!transferNumberErrors.length"
                        :error-messages="transferNumberErrors"
                      />
                    
                  </div>
                  <div class="xs12 md6">
                      <va-input 
                        label="Amount"
                        v-model="transferAmount"
                        placeholder="Amount"
                        :error="!!transferAmountErrors.length"
                        :error-messages="transferAmountErrors"
                      />
              
                  </div> 
              </div>
                   <va-input 
                        type="textarea" 
                        label="Description"
                        v-model="transferDescription"
                        placeholder="Description"
                        :error="!!transferDescriptionErrors.length"
                        :error-messages="transferDescriptionErrors"
                      />
                     
                     <va-button color="success">
                        Send Money
                     </va-button>
                      
          </va-card>
         </form>
        </div>
     </div>
  </div>
</template>

<script>


export default {
  components: {
     
  },
  methods: {
      async  onSubmit(){
        this.transferNumberErrors = this.transferNumber ? [] : ['Transfer number cannot be empty']
        this.destinationNameErrors = this.destinationName ?  [] : ['Name cannot be empty']
        this.transferDescriptionErrors = this.transferDescription ?  [] : ['Description cannot be empty']
        this.transferAmountErrors = this.transferAmount ?  [] : ['Amount cannot be empty']
       
        if(!this.formReady)return

         let ans = await this.$swal.fire({
            title: `Send ksh ${this.transferAmount} to Equity Account ${this.transferNumber} of ${this.destinationName}? \n Charges 15ksh`,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4AE392',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Add!'
         })
         
         if(!ans.value) return
           this.$store.commit('setLoading', true)
         let data = {
             source : {
                 countryCode : "KE",
                 name : this.$store.state.activeAccount.holderName,
                 accountNumber : this.$store.state.activeAccount.accountNumber
             },
             destination : {
                type : "bank",
                countryCode : "KE",
                name : this.destinationName,
                accountNumber : this.transferNumber
             },
             transfer : {
               type : "InternalFundsTransfer",
               amount : this.transferAmount,
               currencyCode: "KES",
               reference : "",
               date: this.getDate(),
               description : `${this.transferNumber}/${this.destinationName}/${this.transferDescription}`
             }
         }
       
        
        this.$http.post(`${this.$apiUrl}/jenga/ift/${this.$store.state.activeAccount.accountNumber}`,data)
        .then(data=>{
             this.$store.commit('setLoading', false)
            this.$swal.fire(
                 `${data.data.message}`,
                 '',
                 'success'
             )

             this.clear()
              
         }) 
         .catch(err => {
           this.$store.commit('setLoading', false) 
              this.$swal.fire(
                  ``,
                 `${err.response.data.error}`,
                 'error'
             )
                     
         })
        
     },
     clear(){
        this.transferNumber= ""
        this.destinationName = ""
        this.transferDescription = ""
        this.transferAmount = ""
      
     },
     getDate(){
        let today = new Date();
        let dd = today.getDate();

        let mm = today.getMonth()+1; 
        const yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd=`0${dd}`;
        } 

        if(mm<10) 
        {
            mm=`0${mm}`;
        } 

       return yyyy + "-" + mm + "-"+ dd
     }
  },
  computed : {
     formReady(){
          return !this.transferNumberErrors.length && !this.destinationNameErrors.length
          && !this.transferDescriptionErrors.length && !this.transferAmountErrors.length 
          
      }

  },
  data(){
      return{
        transferNumber: "",
        destinationName : "",
        transferDescription: "",
        transferAmount: "",
        transferNumberErrors: [],
        destinationNameErrors : [],
        transferDescriptionErrors: [],
        transferAmountErrors: [],
       
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
