<template>
       <div class="row">
        <div
          class="flex xs12"
        >
          <va-card class="mb-4" :color="style.color">
            <div class="row flex mt-3 pb-4">
              <div class="xs12 flex" style="justify-content:center;align-content:center;">
                  <h6>Request Full Statement</h6>
                  <va-button color="success"
                    to="/admin/accountoperations"
                  >
                    Get Full Statement
                  </va-button>
              </div>
           </div>
          </va-card>
        </div>
      </div>
</template>

<script>

export default {
  name : 'full-statement',  
  data () {
    return {
      style :{
        color : 'info'
      }
    }
  },
  computed: {
 
  },
  methods: {
  },
}
</script>

<style lang="scss">
</style>
