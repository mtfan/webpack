<template>
  <div id="app">
    <!--开启缓存-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from 'components/tab-bar'

  export default {
    components: {
      TabBar
    }
  }
</script>