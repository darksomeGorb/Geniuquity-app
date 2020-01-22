<template>
      <va-card
        title="MINI STATEMENT"
      >    
            <div class="row mt-1">
              <va-button color="success" @click="getMiniStatement">
                Get Mini Statement
              </va-button>
           </div>
           <va-data-table
            :fields="fields"
            :data="ministatement"
            :per-page="50"
            :hoverable="true"
            no-data-label="Nothing to display !"
           >
</va-data-table>
      </va-card>
</template>

<script>

export default {
  name : 'mini-statement',  
  data () {
    return {
       fields:[
            { 
                name : 'date',
                title : 'Date'
             },
            { 
                name : 'description',
                title : 'Description'
             },
            { 
                name : 'amount',
                title : 'Amount'
             } ,
            {
                name : "type",
                title : "Type"
            },
            { 
                name : 'chequeNumber',
                title: 'Cheque Number' 
            }
       ],
       data : [
           
       ]
    }
  },
  computed: {
      ministatement(){
         if(this.$store.state.ministatement != undefined){
            return this.$store.state.ministatement
         }
         return this.data
      }
  },
  methods: {
      getMiniStatement(){
        this.$store.commit('setLoading', true)
           this.$http.post(`${this.$apiUrl}/jenga/ministatement/${this.$store.state.activeAccount.accountNumber}`,{})
       .then(data=>{
           this.data = data.data.transactions
           this.$store.dispatch('ministatement',data.data.transactions)
           this.$store.commit('setLoading', false)
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
      }
  },
}
</script>

<style lang="scss">
</style>
