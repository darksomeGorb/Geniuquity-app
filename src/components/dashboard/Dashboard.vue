<template>
  <div class="dashboard">
      <!-- details ( balance and account details) -->
      <div class="row row-equal">
        <div class="flex xs12 sm4 lg4">
           <bank-balance/>
        </div>
        <div class="flex xs12 sm4 lg4">
           <bank-details/>      
        </div>
        <div class="flex xs12 sm4 lg4">
           <full-statement/>      
        </div>
     </div>

     <div class="row row-equal">
         <div class="flex xs12">
              <mini-statement/>
         </div>
     </div>
    <!-- min stamement and full statement -->
  </div>
</template>

<script>
import BankDetails from './components/BankDetails'
import BankBalance from './components/BankBalance'
import MiniStatement from './components/MiniStatement'
import FullStatement from './components/FullStatement'
export default {
  name: 'dashboard',
  components: {
     BankDetails,
     BankBalance,
     MiniStatement,
     FullStatement
  },
  methods: {
   
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
