<template>
  <va-sidebar :minimized="minimized">
    <template slot="menu">

      <template v-for="(item, key) in items">
         <div v-if="allowed(item.name)">
             <va-sidebar-link-group
          :key="key"
          :minimized="minimized"
          :icon="[ 'sidebar-menu-item-icon vuestic-iconset', item.meta.iconClass ]"
          v-if="item.children"
          :title="item.displayName"
          :children="item.children"
        >
          <va-sidebar-link
            v-for="(subMenuItem, key) in item.children"
            :key="key"
            :to="{ name: subMenuItem.name }"
            :title="subMenuItem.displayName"
          />
        </va-sidebar-link-group>
        <va-sidebar-link
          v-else
          :key="key"
          :minimized="minimized"
          :activeByDefault="item.name === $route.name"
          :icon="[ 'sidebar-menu-item-icon vuestic-iconset', item.meta.iconClass ]"
          :to="{ name: item.name }">
          <span slot="title">{{ item.displayName }}</span>
        </va-sidebar-link>
         </div>
      </template>
    </template>
  </va-sidebar>
</template>

<script>
import { navigationRoutes } from './NavigationRoutes'

export default {
  name: 'app-sidebar',
  components: {
  },
  props: {
    minimized: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      items: navigationRoutes.routes,
    }
  },
  methods:{
    allowed(key){
       return this.notAllowed.indexOf(key) < 0
    }
  },
  computed :{
      admin(){
         return this.$store.state.user.admin
      },
      notAllowed(){
         if(this.admin){
           return []
         }
          return ['users','accounts']
      }
  }
  
}

</script>
