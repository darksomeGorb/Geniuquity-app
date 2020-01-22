<template>
    <div class="dashboard">
      
      <div class="row row-equal flex align--center justify--center">
        <div class="flex xs7">
         <form @submit.prevent="onSubmit">
          <va-card title="SWIFT TRANSFER">
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
                       <va-input 
                        label="COUNTRY CODE (i.e KE,TZ)"
                        v-model="countryCode"
                        placeholder="COUNTRY CODE (i.e KE,TZ)"
                        :error="!!countryCodeErrors.length"
                        :error-messages="countryCodeErrors"
                      />
                      <va-input 
                        label="Bank Identifier Code"
                        v-model="bankBic"
                        placeholder="Bank Identifier Code"
                        :error="!!bankBicErrors.length"
                        :error-messages="bankBicErrors"
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
                   
                       <va-input 
                        label="Currency Code (i.e KES , USD)"
                        v-model="currencyCode"
                        placeholder="Currency Code (i.e KES , USD)"
                        :error="!!currencyCodeErrors.length"
                        :error-messages="currencyCodeErrors"
                      />
                      <va-select
                        label="Charge Option"
                        v-model="chargeOption"
                        textBy="name"
                        :options="chargeOptions"
                        :error="!!chargeOptionErrors.length"
                        :error-messages="chargeOptionErrors"
                      />
                      <va-input 
                        label="Recipient Address"
                        v-model="address"
                        placeholder="Recipient Address"
                        :error="!!addressErrors.length"
                        :error-messages="addressErrors"
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
        this.countryCodeErrors = this.countryCode ? [] : ['Enter country code']
        this.currencyCodeErrors = this.currencyCode ? [] : ['Enter currency code']
        this.bankBicErrors = this.bankBic ? [] : ['Enter bank identifier']
        this.chargeOptionErrors = this.chargeOption ? [] : ['t'] 
        this.addressErrors = this.address ? [] : ['Enter address']
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
                countryCode : this.countryCode,
                name : this.destinationName,
                accountNumber : this.transferNumber,
                bankBic: this.bankBic,
                addressline1 : this.address
             },
             transfer : {
               type : "SWIFT",
               amount : this.transferAmount,
               currencyCode: this.currencyCode,
               reference : "",
               date: this.getDate(),
               chargeOption : this.chargeOption.name,
               description : `${this.transferNumber}/${this.destinationName}/${this.transferDescription}`
             }
         }
       
        
        this.$http.post(`${this.$apiUrl}/jenga/swift/${this.$store.state.activeAccount.accountNumber}`,data)
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
        this.countryCode = ""
        this.currencyCode = ""
        this.bankBic = ""
        this.chargeOption = ""
        this.address = ""
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
          && !this.transferDescriptionErrors.length && !this.transferAmountErrors.length &&
          !this.countryCodeErrors.length && !this.currencyCodeErrors.length
          && !this.bankBicErrors.length && !this.chargeOptionErrors.length && !this.addressErrors.length
     }

  },
  data(){
      return{
        transferNumber: "",
        destinationName : "",
        transferDescription: "",
        transferAmount: "",
        countryCode: "",
        currencyCode : "",
        bankBic : "",
        chargeOption: "",
        address : "",
        addressErrors : [],
        bankBicErrors : [],
        chargeOptionErrors: [],
        countryCodeErrors : [],
        currencyCodeErrors: [],
        transferNumberErrors: [],
        destinationNameErrors : [],
        transferDescriptionErrors: [],
        transferAmountErrors: [],
      
        chargeOptions : [
            {
                name: "SELF",
                id :1
            },
            {
                name: "OTHER",
                id :2
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
