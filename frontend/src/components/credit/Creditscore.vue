<template>
    <div class="dashboard">
      
      <div class="row row-equal flex align--center justify--center">
        <div class="flex xs7">
         <form @submit.prevent="onSubmit">
          <va-card title="CREDIT SCORE">
              <div class="row flex">
                  <div class="xs12 md6 pr-1">
                    
                       <va-date-picker
                            label="Date"
                            v-model="dateOfBirth"
                            :error="!!dateOfBirthErrors.length"
                            />

                            <va-select
                                label="Document Type"
                                v-model="documentType"
                                placeholder="Document Type"
                                textBy="name"
                                :options="documentTypeOptions"
                                :error="!!documentTypeErrors.length"
                           />
                     
                        <va-select
                            label="Bureau Type"
                            v-model="bureauType"
                            placeholder="Bureau Type"
                            textBy="name"
                            :options="bureauTypeOptions"
                            :error="!!bureauTypeErrors.length"
                        />
                  </div>
                  <div class="xs12 md6">

                       <va-input
                           label="Loan Amount"
                           type="number"
                           placeholder="Loan Amount"
                           v-model="loanAmount"
                           :error="!!loanAmountErrors.length"
                           :error-messages="loanAmountErrors"
                        />  
                 
                      <va-input
                        label="Document Number"
                        v-model="documentNumber"
                        placeholder="Document Number"
                        textBy="name"
                        :options="documentNumberErrors"
                        :error="!!documentNumberErrors.length"
                      />
                  </div> 
              </div>
             
                     <va-button color="success">
                        Fetch
                     </va-button>
                      
          </va-card>
         </form>
        </div>
        <div v-if="data.Person" class="flex xs9">
            <va-card title="RESULTS">
                    <h4 style="text-align:center;">Person</h4>
                    <div class="row row-equal flex align--center justify--center">
                        <div class="xs12 md6">
                            <p><b> Name :</b>&nbsp;&nbsp; {{ JSON.stringify(data.Person.PersonName)  }}</p>
                            <p><b>Document Type :</b>&nbsp;&nbsp; {{ data.Person.IdentityDocument.IdentityDocumentType }}</p>
                            <p><b>Document Number :</b>&nbsp;&nbsp; {{ data.Person.IdentityDocument.IdentityDocumentID }}</p>
                        </div>
                    </div> 

                     <h4 style="text-align:center;">Credit Score</h4>
                    <div class="row row-equal flex align--center justify--center">
                        <div class="xs12 md6">
                            <p><b> Score :</b>&nbsp;&nbsp; {{ data.CreditBureau.score   }}</p>
                            <p> <b>creditApplications90Days :</b> &nbsp;&nbsp; {{ data.CreditBureau.creditApplications90Days   }}</p>
                            <p> <b>creditApplications180Days :</b> &nbsp;&nbsp; {{ data.CreditBureau.creditApplications180Days  }}</p>
                            <p> <b>creditApplications365Days :</b> &nbsp;&nbsp; {{ data.CreditBureau.creditApplications365Days  }}</p>
                            <p> <b>crbEnqiry90Days :</b> &nbsp;&nbsp; {{ data.CreditBureau.crbEnqiry90Days  }}</p>
                            <p> <b>crbEnqiry180Days :</b> &nbsp;&nbsp; {{ data.CreditBureau.crbEnqiry180Days  }}</p>
                            <p> <b>crbEnqiry365Days :</b> &nbsp;&nbsp; {{ data.CreditBureau.crbEnqiry365Days  }}</p>
                            <p> <b>BouncedCheques90Days :</b> &nbsp;&nbsp; {{ data.CreditBureau.BouncedCheques90Days  }}</p>
                             <p> <b>BouncedCheques180Days :</b> &nbsp;&nbsp; {{ data.CreditBureau.BouncedCheques180Days   }}</p>
                               </div>
                         <div class="xs12 md6">
                             <p> <b>BouncedCheques365Days :</b> &nbsp;&nbsp; {{ data.CreditBureau.BouncedCheques365Days  }}</p>
                      
                            <p> <b>AcctNonPerformingCurrent :</b> &nbsp;&nbsp; {{ data.CreditBureau.AcctNonPerformingCurrent  }}</p>
                            <p> <b>AcctNonPerformingHisto :</b> &nbsp;&nbsp; {{ data.CreditBureau.AcctNonPerformingHisto  }}</p>
                            <p> <b>AcctPerformingCurrent :</b> &nbsp;&nbsp; {{ data.CreditBureau.AcctPerformingCurrent  }}</p>
                            <p> <b>AcctPerformingHisto :</b> &nbsp;&nbsp; {{ data.CreditBureau.AcctPerformingHisto  }}</p>
                            <p> <b>BouncedCheques90Days :</b> &nbsp;&nbsp; {{ data.CreditBureau.BouncedCheques90Days  }}</p>
                            <p> <b>IsFraud :</b> &nbsp;&nbsp; {{ data.CreditBureau.IsFraud  }}</p>
                            <p> <b>isGuarantor :</b> &nbsp;&nbsp; {{ data.CreditBureau.isGuarantor  }}</p>
                            <p> <b> delinquency_code :</b> &nbsp;&nbsp; {{ data.CreditBureau. delinquency_code  }}</p>
                        </div>
                    </div> 
                    <h4 style="text-align:center;">Credit Accounts Summary</h4>
                    <div v-for="(summary,index) in data.CreditAccountsSummary">
                        <p>Summary {{ index }}</p>
                       <div class="row row-equal flex align--center justify--center mb-4">
                        <div class="xs12 md6">
                            <p><b> AccountID :</b>&nbsp;&nbsp; {{ summary.AccountIdentifier.AccountID  }}</p>
                            <p> <b>AccountType :</b> &nbsp;&nbsp; {{ summary.AccountType }}</p>
                            <p> <b>AccountOpenDate :</b> &nbsp;&nbsp; {{ summary.AccountOpenDate  }}</p>
                            <p> <b>AccountOwnership:</b> &nbsp;&nbsp; {{ summary.AccountOwnership  }}</p>
                            <p> <b>AccountStatus :</b> &nbsp;&nbsp; {{ summary.AccountStatus  }}</p>
                            <p> <b>Balance :</b> &nbsp;&nbsp; {{ summary.Balance  }}</p>
                            <p> <b>DelinquencyStatus :</b> &nbsp;&nbsp; {{ summary.DelinquencyStatus }}</p>
                        </div>
                         <div class="xs12 md6">
                            <p> <b>Original_Amount :</b> &nbsp;&nbsp; {{ summary.Original_Amount[0]  }}</p>
                            <p> <b>PastDueAmount  :</b> &nbsp;&nbsp; {{ summary.PastDueAmount }}</p>
                            <p> <b>LastPaymentAmount :</b> &nbsp;&nbsp; {{ summary.LastPaymentAmount }}</p>
                            <p> <b>LastPaymentReceivedDate :</b> &nbsp;&nbsp; {{ summary.LastPaymentReceivedDate  }}</p>
                            <p> <b>NoofDelayed_Payments :</b> &nbsp;&nbsp; {{ summary.NoofDelayed_Payments  }}</p>
                            <p> <b>PostedDateTime :</b> &nbsp;&nbsp; {{ summary.PostedDateTime  }}</p>
                            <p> <b>AccountStatus :</b> &nbsp;&nbsp; {{ summary.AccountStatus }}</p>
                            <p> <b>LoanHighestDaysInArrears :</b> &nbsp;&nbsp; {{ JSON.stringify(summary.LoanAccount.LoanHighestDaysInArrears)  }}</p>
                            <p> <b> PastDueDate :</b> &nbsp;&nbsp; {{ JSON.stringify(summary.LoanAccount.PastDueDate)  }}</p>
                        </div>
                       </div> 
                    </div>
            </va-card>
        </div>
     </div>
  </div>
</template>

<script>


export default {
  components: {
     
  },

  mounted(){
      if(this.$store.state.creditscore != undefined){
         this.data = this.$store.state.creditscore
      }
  },
  methods: {
      async  onSubmit(){
         this.documentTypeErrors = this.documentType.name ? [] : ['p'],
         this.documentNumberErrors = this.documentNumber ? [] : ['Enter document number'],
         this.dateOfBirthErrors = this.dateOfBirth ? [] : ["p"]
         this.bureauTypeErrors = this.bureauType.name ? [] : ['p']
         this.loanAmountErrors = this.loanAmount ? [] : [""]
       
         if(!this.formReady)return
    
         let ans = await this.$swal.fire({
            title: `Get Credit Score charges apply`,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4AE392',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Add!'
         })
         
         if(!ans.value) return
         
        this.$store.commit('setLoading', true)
         let data = {
                "customer": [{
                "id": "",
                "fullName": "",
                "firstName": "",
                "lastName": "",
                "shortName": "",
                "title": "",
                "mobileNumber": "",
                "dateOfBirth": this.getDate(this.dateOfBirth),
                "identityDocument": {
                    "documentType": this.documentType.name,
                    "documentNumber": this.documentNumber
                }
            }],
            "bureau": {
                "reportType": this.bureauType.name,
                "countryCode": "KE"
            },
            "loan": {
                "amount": this.loanAmount
            }
         }
       
 
            this.$http.post(`${this.$apiUrl}/jenga/query/credit/${this.$store.state.activeAccount.accountNumber}`,data)
            .then(data=>{
                this.$store.commit('setLoading', false)
                this.data = data.data
                this.$store.dispatch('creditscore',data.data)
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
          return  !this.documentTypeErrors.length && 
                  !this.documentNumberErrors.length &&
                  !this.dateOfBirthErrors.length  && !this.bureauTypeErrors.length
                  !this.loanAmountErrors.length
      }

  },
  data(){
      return{
         documentType : {},
         bureauType : {},
         loanAmount : "",
         documentNumber : "",
         dateOfBirth : "",
         bureauTypeErrors : [],
         loanAmountErrors: [],
         documentTypeErrors : [],
         documentNumberErrors : [],
         dateOfBirthErrors : [],
         bureauTypeOptions :[
            {  
                id: 1, 
                name : 'Bank'
             },{
                
                id: 2, 
                name : 'Mobile'
             }
         ],
         documentTypeOptions : [
             {  
                id: 1, 
                name : 'NationalID'
             },{
                
                id: 2, 
                name : 'PASSPORT'
             },
             {
                id: 3, 
                name : 'Company/BusinessCertificate'
             },
             {
                id: 4, 
                name : 'ServiceID'
             },
             {
                id: 5, 
                name : 'AlienID'
             }
              
         ],
         data : { }
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
