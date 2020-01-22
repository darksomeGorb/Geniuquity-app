<template>
  <va-dropdown
    class="color-dropdown"
    offset="0, 13px"
  >
    <va-icon
      name="fa fa-bank"
      slot="anchor"
      class="account_dropdown"
      color="white"
    />

    <div  class="account-dropdown__content pl-4 pr-4 pt-2 pb-2">
      <va-dropdown v-for="account in accounts" class="account-item-dropdown mt-1 mb-1">
        <va-badge style="cursor:pointer;" class="account-item-dropdown__badge" color="dark" slot="anchor">
          <p @click="changeAccount(account.accountNumber)">{{account.name}}</p>
        </va-badge>
      </va-dropdown> 
    </div>
  </va-dropdown>
</template>

<script>

export default {
  data () {
    return {
       accounts : this.$store.state.accounts
    }
  },
  methods:{
    changeAccount(accountNumber){
       this.$store.dispatch('activeaccount',accountNumber)
       this.$http.post(`${this.$apiUrl}/jenga/balance/${accountNumber}`,{})
       .then(data=>{
          let currentBalance = data.data.balances[0].amount
          let availableBalance =  data.data.balances[1].amount
          let balances = {current : currentBalance, available :availableBalance}
          this.$store.commit('balances',balances)    
       }) 
       .catch(err => {
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
  }
}
</script>

<style lang="scss">
@import '~vuestic-ui/src/components/vuestic-sass/resources/resources';

.account-dropdown {
  cursor: pointer;
  margin-top: 0.3rem;

  &__icon {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__content {
    background-color: $dropdown-background;
    box-shadow: $gray-box-shadow;
    border-radius: .5rem;

    .account-item-dropdown {
      display: flex;
      justify-content: center;

      &__badge {
        /* Badges have 0.5rem to the right by default */
        margin-left: 0.5rem;
      }
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>
