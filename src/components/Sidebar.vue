<template>
  <md-drawer :md-active.sync="$store.state.showNavigation">
    <md-toolbar class="md-transparent" md-elevation="0">
      <span id="home-toolbar" class="menu-button" @click="onClickMenu()">
        <MenuIcon/>
      </span> 
      <span class="md-title">{{title}}</span>
    </md-toolbar>
    <md-list>
      <md-list-item>
        <PlusIcon/>
        <span class="md-list-item-text" @click = "onClickIncrease()">Aumentar x10</span>
      </md-list-item>
      <md-list-item>
        <MinusIcon/>
        <span class="md-list-item-text" @click = "onClickDecrease()">Disminuir x10</span>
      </md-list-item>
      <md-list-item>
        <SwapIcon/>
        <span class="md-list-item-text" v-on:click="$emit('clickExhange')">Intercambiar monedas</span>
      </md-list-item>
    </md-list>
  </md-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['title'],
  methods: {
    async onClickMenu() {
      await this.$store.commit('changeShowNavigation')
    },
    async onClickIncrease() {
      await this.$store.dispatch('increasePowerOf10AndLoadNumberToTable')
      this.$store.commit('changeShowNavigation')
    },
    async onClickDecrease() {
      this.$store.dispatch('decreasePowerOf10AndLoadNumberToTable')
      this.$store.commit('changeShowNavigation')
    },
  }
}
</script>
<style scoped>
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
  background-color: white;
}
.md-content {
  padding: 16px;
}
.page-container{
  overflow: hidden;
}
#home-toolbar{
  color: #01001E;
  cursor: pointer;
  font-size: 24px!important;
}
.md-list-item{
  border-bottom: 1px solid black;
  cursor: pointer;
}
</style>