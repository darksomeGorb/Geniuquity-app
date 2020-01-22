<template>
       <div class="row">
        <div
          class="flex xs12"
        >
          <va-card class="mb-4" :color="style.color">
            <p>Account Balance</p>
            <p class="display-2 mb-1 account-balance" style="color: white;font-size:20px;"> Current : {{ account.currentBalance }} ksh</p>
            <p class="display-2 mb-0 account-balance" style="color: white;font-size:20px;"> Availbale : {{ account.availableBalance   }} ksh</p>
            <div class="row mt-3 pb-4">
              <va-button color="success" @click="fetchBalance">
                refresh
              </va-button>
           </div>
          </va-card>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name : 'bank-balance',  
  data () {
    return {
      style :{
        color : 'info'
      },
    }
  },
  computed: {
      account(){
          return this.$store.state.activeAccount
      }
  },
  methods: {
    fetchBalance(){
         this.$store.commit('setLoading', true)
          this.$http.post(`${this.$apiUrl}/jenga/balance/${this.$store.state.activeAccount.accountNumber}`,{})
       .then(data=>{
          let currentBalance = data.data.balances[0].amount
          let availableBalance =  data.data.balances[1].amount
          let balances = {current : currentBalance, available :availableBalance}
          this.$store.dispatch('balances',balances)    
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
  mounted(){
     this.$store.subscribe((mutation, state) => {
      switch(mutation.type) {
        case 'balances_set':
          this.$forceUpdate();
          break;
      }
    })
  }
}
</script>

<style lang="scss">
</style>
