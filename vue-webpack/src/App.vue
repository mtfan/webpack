<template>
  <div id="app">
    <!--开启缓存-->
    <keep-alive>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </keep-alive>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from "components/tab-bar";

  export default {
    components: {
      TabBar
    }
  };
</script>
<style scoped>
  /*淡入淡出*/
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>