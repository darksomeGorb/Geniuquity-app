<template>
    <div class="dashboard">
      <div class="row row-equal flex align--center justify--center">
        <div class="flex xs7">
          <va-card title="B2B">
              <div class="row flex align--center justify--center">
                 
                  <div class="xs12 md6 align--center justify--center">
                     <va-input 
                        label="Amount"
                        v-model="transferAmount"
                        placeholder="Amount"
                        :error="!!transferAmountErrors.length"
                        :error-messages="transferAmountErrors"

                      />

                      <va-input 
                        label="Sender Mobile Number"
                        v-model="mobileNumber"
                        placeholder="Your Phone Number"
                        :error="!!transferNumberErrors.length"
                        :error-messages="transferNumberErrors"
                      />

                      
                      <va-input 
                        label="Receiver Account Number"
                        v-model="receiverAccountNumber"
                        placeholder="Account Number To Receive payment"
                        :error="!!destinationNameErrors.length"
                        :error-messages="destinationNameErrors"

                      />

                  </div> 
              </div>
                   
                     <va-button color="success" @click="submit">
                        pay
                     </va-button>
                      
          </va-card>
        </div>
     </div>
  </div>
</template>

<script>


export default {
  name: 'lipa',
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
        
        this.destinationNameErrors = this.receiverAccountNumber ? [] : ["Enter Bussiness Number"]
        this.transferNumberErrors = this.mobileNumber ? [] : ["Enter Phone number"]
        this.transferAmountErrors = this.transferAmount ? [] : ["Enter amount to transfer"]
      

        if(!this.formReady) return

        let ans = await this.$swal.fire({
            title: `Send ksh ${this.transferAmount} to  ${this.receiverAccountNumber} made by ${this.mobileNumber}? \n Charges Apply`,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4AE392',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Add!'
         })

          if(!ans.value) return
         this.$store.commit('setLoading', true)
         
        
 let data = {
            amount : this.transferAmount,
            senderMobileNumber: this.mobileNumber,
            senderName: this.$store.state.activeAccount.holderName,
            destinationShortcode: "987654345678",
            destinationAccountNumber:  this.receiverAccountNumber,
           transferReference: "",
           sourceAccountNumber:this.$store.state.activeAccount.accountNumber

         }
       
       
        
        this.$http.post(`${this.$apiUrl}/jenga/request/${this.$store.state.activeAccount.accountNumber}`,data)
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
        return   !this.transferNumberErrors.length
        && !this.transferAmountErrors.length &&  !this.transferDescriptionErrors.length
     }
  },
  data(){
      return{
     mobileNumber: "",
        receiverAccountNumber:"",
        transferAmount: "",
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
