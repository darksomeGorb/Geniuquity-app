<template>
          <div class="row row-equal">
        <div class="flex xs12">
               <div class="row flex">
                    <div class="flex xs12 sm6 lg4">
                        
                    </div>
                    <div class="flex xs12 sm6 lg4">
                       <va-date-picker
                            label="Date"
                            v-model="date"
                            :error="!!dateErrors.length"
                            />
                    </div>
                    <div class="flex xs12 sm6 lg4">
                        <va-button @click="submit" color="success" >
                          Get Balances
                        </va-button>
                    </div>
               </div>
               <div v-if="data.balances">
                     <h2 style="text-align:center;">Balance Details</h2>
                     <va-data-table
                      :fields="fields"
                      :data="data.balances"
                      :per-page="2"
                      hoverable="true"
                      no-data-label="Nothing to display !">
                    </va-data-table>
               </div>
        </div>
     </div>

</template>

<script>
export default {
  name: 'day-balances',
  components: {
    
  },
  computed :{
  },
  methods: {
   submit(){
       this.dateErrors = this.date ? [] : ['']

       if(this.dateErrors.length > 0)return

       this.$store.commit('setLoading', true)
       
       let data = {
         "countryCode": "KE",
         "accountId": this.$store.state.activeAccount.accountNumber,
         "date": this.getDate(this.date)
       }

        this.$http.post(`${this.$apiUrl}jenga/query/openclose/${this.$store.state.activeAccount.accountNumber}`,data)
       .then(data=>{
           this.$store.commit('setLoading', false) 
           this.data = data.data
           this.$store.dispatch('openclose',data.data)
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
  data(){
    return{
         fields : [
           {
              name : "type",
              title : "Type"
           },
           {
             name : "amount",
             title : "Amount"
           }
         ],
         date : "",
         dateErrors : [],
         data : { }
    }
  },
  mounted(){
     if(this.$store.state.openclose != undefined){
       this.data = this.$store.state.openclose
     }
  }
}
</script>

<style lang="scss">

</style>
