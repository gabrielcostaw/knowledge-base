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
        background: linear-gradient(135deg, #1a1a2e 0%, var(--primary) 100%);
        
        display: flex;
        justify-content: space-between;
        align-items: center;

        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        
        z-index: 10;
        position: relative;
    }

    .title {
        font-size: 1.4rem;
        color: white;
        font-weight: 300;
        letter-spacing: 2px;
        text-transform: uppercase;
        flex-grow: 1;
        text-align: center;
        user-select: none;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
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

        transition: background-color var(--transition);
    }

    a.toggle:hover {
        background-color: rgba(255, 255, 255, 0.15);
        color: white;
    }

    a.toggle, a.toggle:hover {
        color: white !important;
    }

    a.toggle i {
        transition: transform var(--transition);
    }
</style>