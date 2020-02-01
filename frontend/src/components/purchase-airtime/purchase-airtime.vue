<template>
    <div class="dashboard">
      <div class="row row-equal flex align--center justify--center">
        <div class="flex xs7">
          <va-card title="PURCHASE-AIrtime">
              
                  
                  <div class="xs12 md6 align--center justify--center">
                      <va-input 
                        label=" Mobile Number"
                        v-model="mobileNumber"
                        
                        :error="!!transferNumberErrors.length"
                        :error-messages="transferNumberErrors"
                      />
                      <va-input 
                        label="Amount"
                        v-model="airtimeAmount"
                        
                        :error="!!transferNumberErrors.length"
                        :error-messages="transferAmountErrors"

                      />

                      <va-select
                        label="TYPE"
                        v-model="transferType"
                        textBy="description"
                        :options="transferTypeOptions"
                      />
                     
                  </div> 
              
                  
                     <va-button color="success" @click="submit">
                        Buy Airtime
                     </va-button>
                      
          </va-card>
        </div>
     </div>
  </div>
</template>

<script>


export default {
  name: 'purchase-airtime',
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
       
        
        this.transferNumberErrors = this.mobileNumber ? [] : ["Enter number"]
        this.transferAmountErrors = this.airtimeAmount ? [] : ["Enter Airtime  amount "]
        

        if(!this.formReady) return

        let ans = await this.$swal.fire({
            title: `Send ksh ${this.airtimeAmount} to  ${this.mobileNumber} ? \n Charges Apply`,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4AE392',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Add!'
         })

          if(!ans.value) return
         this.$store.commit('setLoading', true)

         let data = {
            customer: {
    countryCode: "KE",
    mobileNumber: this.mobileNumber
  },
  airtime: {
    amount: this.airtimeAmount,
    "reference": "",
    "telco": this.transferType.description
  }
         }
       
        
        this.$http.post(`${this.$apiUrl}/jenga/airtime/${this.$store.state.activeAccount.accountNumber}`,data)
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
        && !this.transferAmountErrors.length &&  !this.transferDescriptionErrors.length
     }
  },
  data(){
      return{
          transferTypeOptions: [
            {
              id: 1,
              description: 'Safaricom',
            },
            {
              id: 2,
              description: 'Airtel',
            },
            {
              id: 3,
              description: 'Equitel',
            }
        ],
       
        
        transferType: {},
        mobileNumber: "",
        transferDescription: "",
        airtimeAmount: "",
        
        
        transferNumberErrors : [],
       
        transferDescriptionErrors:  [],
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
