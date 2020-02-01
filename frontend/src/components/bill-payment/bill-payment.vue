<template>
    <div class="dashboard">
      <div class="row row-equal flex align--center justify--center">
        <div class="flex xs7">
          <va-card title="Bill-Payment">
              
                  
                  <div class="xs12 md6 align--center justify--center">
                      <va-input 
                        label=" Business Number"
                        v-model="billerCode"
                        
                        :error="!!transferNumberErrors.length"
                        :error-messages="transferNumberErrors"
                      />
                      
                      <va-input 
                        label="Amount"
                        v-model="transferAmount"
                        
                        :error="!!transferNumberErrors.length"
                        :error-messages="transferAmountErrors"

                      />
                       <va-input 
                        label=" Payer Phone Number"
                        v-model="mobileNumber"
                        
                        :error="!!transferNumberErrors.length"
                        :error-messages="transferNumberErrors"
                      />

                     
                     
                  </div> 
                    
                  
                     <va-button color="success" @click="submit">
                        Pay
                     </va-button>
                      
          </va-card>
        </div>
     </div>
  </div>
</template>

<script>


export default {
  name: 'bill-payment',
  components: {
     
   
  },
  methods: {
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
     },
    async submit(){
       
        
        this.destinationNameErrors = this.billerCode ? [] : ["Business Number cannot be Empty"]
        this.transferNumberErrors = this.mobileNumber ? [] : ["Enter Payee Number"]
        this.transferAmountErrors = this.transferAmount ? [] : ["Enter amount to transfer"]
        
        

        if(!this.formReady) return

        let ans = await this.$swal.fire({
            title: `Send ksh ${this.transferAmount} to  ${this.billerCode} made by ${this.mobileNumber}? \n Charges Apply`,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4AE392',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Add!'
         })

         
let data = {
             biller: {
      billerCode: this.billerCode,
      countryCode: "KE"
   },
   bill: {
      reference: "",
      amount: this.transferAmount,
      currency: "KES"
   },
   payer: {
      name: this.$store.state.activeAccount.holderName,
      account: this.$store.state.activeAccount.accountNumber,
      reference: "",
      mobileNumber: this.mobileNumber
   },
   partnerId:"0011547896523",
   remarks: "Transaction Done"
}
       
        
        this.$http.post(`${this.$apiUrl}/jenga/bills/pay/${this.$store.state.activeAccount.accountNumber}`,data)
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

     }
  },
  computed : {
     
       formReady(){
        return  !this.transferNumberErrors.length
        && !this.transferAmountErrors.length && !this.destinationNameErrors.length
     }
  },
  data(){
      return{
       
        billercode : "",  
        transferAmount: "",
        mobileNumber: "",
        transferNumberErrors : [],
        destinationNameErrors : [],
        transferAmountErrors : [],
        
      
      }
  },
  
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
