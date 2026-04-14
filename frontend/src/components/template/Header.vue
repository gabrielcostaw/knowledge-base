<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
        <i class="fa fa-lg" :class="icon()"></i>
    </a>
     <h1 class="title">
       <router-link to="/">{{ title }}</router-link>
     </h1>
     <UserDropdown v-if="!hideUserDropdown"/>
  </header>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
  name: 'Header ',
  components: { UserDropdown },
  props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
  methods: {
    toggleMenu() {
        this.$store.commit('toggleMenu')
    },
    icon() {
      return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
    }
  }

}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
      font-size: 1.6rem;
      color: white;
      font-weight: 100;
      flex-grow: 1;
      text-align: center;
      user-select: none;

    }

    .title a, .title a:hover {
      color: white;
      text-decoration: none;
      user-select: none;
    }

    a.toggle {
      width: 60px;
      height: 100%;
      color: white;
      justify-self: flex-start;
      text-decoration: none;
      user-select: none;
      
      display: flex;
      justify-content: center;
      align-items: center;
    }

    a.toggle:hover {
      background-color: rgba(0, 0, 0, 0.2);
      color: white;
    }

    a.toggle, a.toggle:hover {
    color: white !important;
    }


</style>