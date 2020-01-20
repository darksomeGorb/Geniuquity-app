<template>
    <div class="dashboard">
      
      <div class="row row-equal flex align--center justify--center">
        <div class="flex xs7">
         <form @submit.prevent="onSubmit">
          <va-card title="KYC">
              <div class="row flex">
                  <div class="xs12 md6 pr-1">
                        <va-input 
                        label="First Name"
                        v-model="firstName"
                        placeholder="First Name"
                        :error="!!firstNameErrors.length"
                        :error-messages="firstNameErrors"
                      />
                    
                      <va-select
                        label="Document Type"
                        v-model="documentType"
                        placeholder="Document Type"
                        textBy="name"
                        :options="documentTypeOptions"
                        :error="!!documentTypeErrors.length"
                      />
                    
                  </div>
                  <div class="xs12 md6">
                        <va-input 
                        label="Last Name"
                        v-model="lastName"
                        placeholder="Last Name"
                        :error="!!lastNameErrors.length"
                        :error-messages="lastNameErrors"
                      />
                    
                      <va-input
                        label="Document Number"
                        v-model="documentNumber"
                        placeholder="Document Number"
                        textBy="name"
                        :error-messages="documentNumberErrors"
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
        <div v-if="data.identity" class="flex xs9">
            <va-card title="RESULTS">
                 <h4 style="text-align:center;">Customer Details</h4>
                 <div class="row row-equal flex align--center justify--center">
                       <div class="xs12 md6">
                         <p> <b>Full Name :</b>&nbsp;&nbsp; {{ data.identity.customer.fullName }}</p>
                         <p> <b>Birthdate :</b>&nbsp;&nbsp; {{ data.identity.customer.birthDate }}</p>
                         <p> <b>Gender :</b>&nbsp;&nbsp; {{ data.identity.customer.gender }}</p>
                      </div>
                      <div class="xs12 md6">
                          <p> <b>Nationality :</b>&nbsp;&nbsp; {{ data.identity.customer.nationality }}</p>
                          <p> <b>Birth City Name :</b>&nbsp;&nbsp; {{ data.identity.customer.birthCityName }}</p>
                          <p> <b>Occupation :</b>&nbsp;&nbsp; {{ data.identity.customer.occupation }}</p>
                      </div>
                 </div> 
                 <h4 style="text-align:center;">Document Details</h4>
                 <div class="row row-equal flex align--center justify--center">
                       <div class="xs12 md6">
                         <p> <b>Document Type :</b>&nbsp;&nbsp; {{ data.identity.documentType }}</p>
                         <p> <b>Serial Number :</b>&nbsp;&nbsp; {{ data.identity.documentSerialNumber }}</p>
                         <p> <b>Expiration Date :</b>&nbsp;&nbsp; {{ data.identity.customer.birthCityName }}</p>
                      </div>
                      <div class="xs12 md6">
                          <p> <b>Document Number :</b>&nbsp;&nbsp; {{ data.identity.documentNumber }}</p>
                           <p> <b>Issued Date :</b>&nbsp;&nbsp; {{ data.identity.documentIssueDate }}</p>
                          <p> <b>IssuedBy :</b>&nbsp;&nbsp; {{ data.identity.IssuedBy }}</p>
                      </div>
                 </div> 
                   <h4 style="text-align:center;">Additional Document Details</h4>
                 <div class="row row-equal flex align--center justify--center">
                     <div class="xs12">
                            <va-data-table
                                :fields="fields"
                                :data="data.identity.additionalIdentityDetails"
                                :per-page="50"
                                :hoverable="true"
                                no-data-label="Nothing to display !"
                              />
                     </div>
                 </div> 
                   <h4 style="text-align:center;">Address</h4>
                 <div class="row row-equal flex align--center justify--center">
                       <div class="xs12 md6">
                         <p> <b>Province Name :</b>&nbsp;&nbsp; {{ data.identity.address.provinceName }}</p>
                         <p> <b>Location Name :</b>&nbsp;&nbsp; {{ data.identity.address.locationName }}</p>
                         <p> <b>Village :</b>&nbsp;&nbsp; {{ data.identity.address.villageName }}</p>
                      </div>
                      <div class="xs12 md6">
                          <p> <b>District Name :</b>&nbsp;&nbsp; {{  data.identity.address.districtName }}</p>
                           <p> <b>Sub location:</b>&nbsp;&nbsp; {{ data.identity.address.subLocationName}}</p>
                          
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
  methods: {
      async  onSubmit(){
         this.documentTypeErrors = this.documentType.name ? [] : ['p']
         this.firstNameErrors = this.firstName ? [] : ['Enter fisrt name']
         this.lastNameErrors = this.lastName ? [] : ['Enter last name']
         this.documentNumberErrors = this.documentNumber ? [] : ['Enter document number']
         
        if(!this.formReady)return

         let ans = await this.$swal.fire({
            title: `Get KYC charges apply`,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4AE392',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes Add!'
         })
         
         if(!ans.value) return
         
         this.$store.commit('setLoading', true)
         let data = {
            "identity": {
                "documentType": this.documentType.name,
                "firstName": this.firstName,
                "lastName": this.lastName,
                "dateOfBirth": "",
                "documentNumber": this.documentNumber,
                "countryCode": "KE"
              } 
         }
       
        
            this.$http.post(`${this.$apiUrl}/jenga/query/kyc/${this.$store.state.activeAccount.accountNumber}`,data)
            .then(data=>{
                this.$store.commit('setLoading', false)
                this.data = data.data 
                this.$store.dispatch('kyc',data.data)
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
        
     },

  },
  computed : {
     formReady(){
          return  !this.documentTypeErrors.length && !this.firstNameErrors.length &&
                  !this.lastNameErrors.length && !this.documentNumberErrors.length 
                  
     }

  },
  data(){
      return{
         documentType : {},
         firstName : "",
         lastName : "",
         documentNumber : "",
         documentTypeErrors : [],
         firstNameErrors : [],
         lastNameErrors : [],
         documentNumberErrors : [],
         documentTypeOptions : [
             {  
                id: 1, 
                name : 'ID'
             },{
                
                id: 2, 
                name : 'PASSPORT'
             },
             {
                id: 3, 
                name : 'ALIENID'
             }
         ],
         fields : [
             {
               name : 'documentNumber',
               title : 'Document Number'
             },
             {
               name : 'documentType',
               title : 'Document Type'
             },{
               name : 'issuedBy',
               title : 'Issued By'
             }
         ],
         data : { }
      }
  },
  mounted(){
     if(this.$store.state.kyc != undefined){
        this.data = this.$store.state.kyc
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
