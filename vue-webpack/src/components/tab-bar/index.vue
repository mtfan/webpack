<template>
  <mt-tabbar v-model="selected">
    <mt-tab-item id="selected_home">
      <router-link to="/home" class="router-item">
        <img class="tab-bar-icon" src="../../static/images/tabs/home-on.png" v-if="selected=='selected_home'" />
        <img class="tab-bar-icon" src="../../static/images/tabs/home-off.png" v-else />
        <span>首页</span>
      </router-link>

    </mt-tab-item>
    <mt-tab-item id="selected_found">
      <router-link to="/found" class="router-item">
        <img class="tab-bar-icon" src="../../static/images/tabs/found-on.png" v-if="selected=='selected_found'" />
        <img class="tab-bar-icon" src="../../static/images/tabs/found-off.png" v-else />
        <span>发现</span>
      </router-link>
    </mt-tab-item>
    <mt-tab-item id="selected_mine">
      <router-link to="/mine" class="router-item">
        <img class="tab-bar-icon" src="../../static/images/tabs/mine-on.png" v-if="selected=='selected_mine'" />
        <img class="tab-bar-icon" src="../../static/images/tabs/mine-off.png" v-else />
        <span>我的</span>
      </router-link>
    </mt-tab-item>
  </mt-tabbar>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        selected: 'selected_home'
      };
    }
  };
</script>

<style lang="scss">
  .router-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .tab-bar-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
  }

  .router-link-active {
    color: rgb(254, 84, 109);
  }
</style>