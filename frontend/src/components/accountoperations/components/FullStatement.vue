<template>
    <div class="flex xs12">
        <form @submit.prevent="onSubmit">
            <va-card
        title="FULL STATEMENT">
               <div class="row flex">
                    <div class="flex xs12 sm6 lg4">
                           <va-date-picker
                            label="From Date"
                            v-model="fromDate"
                            :error="!!fromDateErrors.length"
                           />
                    </div>
                    <div class="flex xs12 sm6 lg4">
                           <va-date-picker
                            label="To Date"
                            v-model="toDate"
                            :error="!!toDateErrors.length"
                            />
                    </div>
                    <div class="flex xs12 sm6 lg4">
                        <va-button color="success">
                          Get Statement
                        </va-button>
                    </div>
               </div>

            <va-data-table
            :fields="fields"
            :data="data"
            :per-page="50"
            :hoverable="true"
            no-data-label="Nothing to display !">
          </va-data-table>
        </va-card>  
        </form>
    </div>
</template>

<script>
import DatePicker from 'vuestic-ui/src/components/vuestic-components/va-date-picker/VaDatePicker'
export default {
  name: 'full-statement',
  components: {
    DatePicker
  },
  methods: {
   async onSubmit(){
         this.fromDateErrors = this.fromDate ? [] : ["1"]
         this.toDateErrors = this.toDate ? [] : ["1"]
         if(!this.formReady) return  
          
         let data = {
             "countryCode": "KE",
            "accountNumber": this.$store.state.activeAccount.accountNumber,
            "fromDate": this.getDate(this.fromDate),
            "toDate": this.getDate(this.toDate),
            "limit": 1000,
            "reference": "",
            "serial": "",
            "postedDateTime": "",
            "date": "",
            "runningBalance": {
                "currency": "",
                "amount": 0.0
            }
         }

       
         let ans = await this.$swal.fire({
            title: `Get full statement ? \n Charges 100 per page`,
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#4AE392',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
         })
         
         if(!ans.value) return
         this.$store.commit('setLoading', true) 
      this.$http.post(`${this.$apiUrl}jenga/fullstatement/${this.$store.state.activeAccount.accountNumber}`,data)
       .then(data=>{
           this.$store.commit('setLoading', false) 
           this.data = data.data.transactions
           this.$store.dispatch('fullstatement',data.data.transactions)
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
     },
    getDate(date){
        let today = new Date(date);
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
  computed :{
     formReady(){
          return this.fromDate.length && this.toDate.length
     },
     fullStatement(){
         if(this.$store.state.fullstatement != undefined){
            return this.$store.state.fullstatement
         }
         return this.data
     }
  },
  data(){
      return{
         fromDate : "",
         fromDateErrors : [],
         toDateErrors : [],
         toDate : "",
         fields :[
            {
              name : "reference",
              title: 'Reference'
             },
            {
              name :"date",
              title : "Date"
            },
            {
              name : "description",
              title: "Description"
            },
            {
              name : "amount",
              title : "Amount"
            },
            {
              name : "serial",
              title : "Serial"
            },
            {
              name: "postedDateTime",
              title : "Posted Date Time"
             },
            {
              name: "type",
              title: "Type"
             },
            {
              name: "runningBalance.amount",
              title:"Running Balance"
            },
         ],
         data : [
           
          ]
      }
}
}
</script>

<style lang="scss">

</style>
