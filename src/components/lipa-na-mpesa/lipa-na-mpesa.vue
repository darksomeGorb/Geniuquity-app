<template>
    <div class="dashboard">
      <div class="row row-equal flex align--center justify--center">
        <div class="flex xs7">
          <va-card title="LIPA-NA-MPESA">
              <div class="row flex align--center justify--center">
                 
                  <div class="xs12 md6 align--center justify--center">
                      <va-input 
                        label="Customer Mobile Number"
                        v-model="transferNumber"
                        :placeholder="transferNumberLabel"
                        :error="!!transferNumberErrors.length"
                        :error-messages="transferNumberErrors"
                      />
                      <va-input 
                        label="Transaction Amount"
                        v-model="TransactionAmount"
                        placeholder="Amount"
                        :error="!!transferNumberErrors.length"
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
                     
                     <va-button color="success" @click="submit">
                        Send Money
                     </va-button>
                      
          </va-card>
        </div>
     </div>
  </div>
</template>

<script>
import { Banks } from '../../store/banks'

export default {
  name: 'lipa-na-mpesa',
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
        this.transferTypeErrors = this.transferType.description != undefined ? [] : ["p"]
        this.destinationNameErrors = this.destinationName ? [] : ["Name cannot be empty"]
        this.transferNumberErrors = this.transferNumber ? [] : ["Enter number"]
        this.transferAmountErrors = this.transferAmount ? [] : ["Enter amount to transfer"]
        this.transferDescriptionErrors = this.transferDescription ? [] : ["Descrption cannot be empty"]

        if(!this.formReady) return

        let ans = await this.$swal.fire({
            title: `Send ksh ${this.transferAmount} to  ${this.transferNumber} of ${this.destinationName}? \n Charges Apply`,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4AE392',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Add!'
         })

          if(!ans.value) return
         this.$store.commit('setLoading', true)
         let destination =   destination = {
                type : this.transferType.description,
                countryCode : "KE",
                name : this.destinationName,
          }

        

         let data = {
customer: {
    countryCode: "KE",
    mobileNumber: "0765555131"
  },
  airtime: {
    amount: "100",
    reference: "",
    telco: "Safaricom"
  },
}
       
        
        this.$http.post(`${this.$apiUrl}/jenga/pesalink/${this.$store.state.activeAccount.accountNumber}`,data)
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
     transferNumberLabel(){
       let type = this.transferType.description == undefined ? this.transferType : this.transferType.description
       return type == 'bank' ? "Account Number" : "Phone Number"
     },
       formReady(){
        return !this.transferTypeErrors.length && !this.destinationNameErrors.length && !this.transferNumberErrors.length
        && !this.transferAmountErrors.length &&  !this.transferDescriptionErrors.length
     }
  },
  data(){
      return{
          transferTypeOptions: [
            {
              id: 1,
              description: 'bank',
            },
            {
              id: 2,
              description: 'mobile',
            }
        ],
        bank : {},
        bankOptions : [],
        transferType: {},
        transferNumber: "",
        destinationName : "",
        transferDescription: "",
        transferAmount: "",
        bankCodeErrors : [],
        transferTypeErrors : [],
        transferNumberErrors : [],
        destinationNameErrors : [],
        transferDescriptionErrors:  [],
        transferAmountErrors : [],
      
      }
  },
  mounted(){
     Banks.forEach((bank,index) => {
        bank.id = index + 1
        this.bankOptions.push(bank)
     })
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
