<template>
  <div class="dashboard">
      <!-- details ( balance and account details) -->
      <div class="row row-equal">
        <div class="flex xs12">
            <va-card title="Account Operations">
                <va-tabs grow v-model="tabsState">
                <va-tab>
                    Day Balances
                </va-tab>
                <va-tab>
                    Full Statement
                </va-tab>
                <va-tab>
                    Account Enquiry
                </va-tab>
                </va-tabs>
                <va-separator/>
                <component :is="tabs[tabsState]"/>
            </va-card>
        </div>
     </div>

  </div>
</template>

<script>
import AccountQuery from './components/AccountQuery'
import DayBalances from './components/DayBalances'
import FullStatement from './components/FullStatement'

export default {
  name: 'accountoperations',
  components: {
     AccountQuery,
     DayBalances,
     FullStatement    
  },
  methods: {
     
  },
  data(){
      return{
            tabsState: 1,
            tabs: [
                'DayBalances',
                'FullStatement',
                'AccountQuery',
            ],
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
