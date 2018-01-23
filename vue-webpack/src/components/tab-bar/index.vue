<template>
  <mt-tabbar>
    <mt-tab-item>
      <router-link to="/home" class="tab" exact>
        home
      </router-link>
    </mt-tab-item>
    <mt-tab-item>
      <router-link to="/product" class="tab">
        product
      </router-link>
    </mt-tab-item>
  </mt-tabbar>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style lang="scss">
  .mint-tab-item{
    padding: 0;
  }
  .tab{
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px 0;
  }
  .router-link-active{
    background: #333;
    color: red;
  }
</style>