<template>
  <va-navbar class="app-navbar">
    <header-selector slot="selector" :minimized.sync="minimizedProxy"/>
    <template slot="logo">
        <h1 style="color:white;">Genius </h1>
    </template>
 
    <div class="app-navbar__actions row flex-nowrap align--center">
      <accounts-dropdown class="va-navbar__item"/>
      <notification-dropdown class="va-navbar__item"/>
      <profile-dropdown class="va-navbar__item">
        <span>{{userName}}</span>
      </profile-dropdown>
    </div>
  </va-navbar>
</template>

<script>
import HeaderSelector from './components/HeaderSelector'
import ProfileDropdown from './components/dropdowns/ProfileDropdown'
import NotificationDropdown from './components/dropdowns/NotificationDropdown'
import AccountsDropdown from './components/dropdowns/AccountsDropdown'

export default {
  name: 'app-navbar',
  components: {
    HeaderSelector,
    NotificationDropdown,
    ProfileDropdown,
    AccountsDropdown
  },
  props: {
    minimized: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      userName: this.$store.state.user.name,
    }
  },
  computed: {
    minimizedProxy: {
      get () {
        return this.minimized
      },
      set (minimized) {
        this.$emit('update:minimized', minimized)
      },
    },
  },
}
</script>
<style lang="scss">
.app-navbar {
  &__button {
    width: 10.8125rem;
    .va-button__content__icon-left.fa-github {
      font-size: 1.5rem;
    }
  }
  &__actions {
    justify-content: flex-end;
  }
  &__mailto-link:hover {
    filter: brightness(85%);
  }
  @include media-breakpoint-down(lg) {
    &__button {
      display: none !important;
    }
    .profile-dropdown {
      margin: auto 0 auto .75rem;
    }
  }
  @include media-breakpoint-down(md) {
    @at-root .va-navbar__text {
      display: none !important;
    }
  }
  @include media-breakpoint-down(sm) {
    &__button {
      display: none !important;
    }
    &__actions {
      justify-content: space-around;
      padding: 0 .5rem;
    }
    .profile-dropdown {
      position: absolute;
      right: .75rem;
      top: 1.25rem;
      height: fit-content;
      margin: auto;
    }
  }
}
</style>
