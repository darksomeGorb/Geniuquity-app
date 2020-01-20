<template>
    <va-card
        stripe="info"
        title="Account "
      >
         <div style="text-align:center;">
              <h6  id="account-details-name">{{ accountName }}</h6>
              <h6  id="account-details-number">{{ accountNumber }}</h6>
              <h6 id="account-ownername">{{ holderName }}</h6>
              <p id="account-details-description">
                  {{ accountDescription }}
              </p>
         </div>
      </va-card>
</template>

<script>

export default {
  name : 'bank-details',  
  data () {
    return {
    
    }
  },
  computed: {
     accountName(){
       return this.$store.state.activeAccount.name
     },
     accountNumber(){
       return this.$store.state.activeAccount.accountNumber
     },
     holderName(){
       return this.$store.state.activeAccount.holderName
     },
     accountDescription(){
       return this.$store.state.activeAccount.description
     }

  },
  methods: {
    
  },
}
</script>

<style lang="scss">
</style>
