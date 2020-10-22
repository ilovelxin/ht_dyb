<template>
  <div id="app" v-loading='$store.state.load'>
    <router-view ></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
</style>
