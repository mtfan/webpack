<template>
  <div class="tab-bar">
    <div class="router-item" @click="onHandleSelected('selected_home')">
      <nuxt-link to="/home">
        <img class="tab-bar-icon" src="~/assets/images/tabs/home-on.png" v-if="selected=='selected_home'" />
        <img class="tab-bar-icon" src="~/assets/images/tabs/home-off.png" v-else />
        <span>首页</span>
      </nuxt-link>
    </div>
    <div class="router-item" @click="onHandleSelected('selected_found')">
      <nuxt-link to="/found">
        <img class="tab-bar-icon" src="~/assets/images/tabs/found-on.png" v-if="selected=='selected_found'" />
        <img class="tab-bar-icon" src="~/assets/images/tabs/found-off.png" v-else />
        <span>发现</span>
      </nuxt-link>
    </div>
    <div class="router-item" @click="onHandleSelected('selected_mine')">
      <nuxt-link to="/mine">
        <img class="tab-bar-icon" src="~/assets/images/tabs/mine-on.png" v-if="selected=='selected_mine'" />
        <img class="tab-bar-icon" src="~/assets/images/tabs/mine-off.png" v-else />
        <span>我的</span>
      </nuxt-link>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      selected: 'selected_home'
    };
  },
  created() {
    this.selected = `selected_${this.$nuxt.$route.name}`;
  },
  methods: {
    onHandleSelected(v) {
      this.selected = v;
    }
  }
};
</script>

<style lang="scss">
.tab-bar {
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  width: 100%;
  .router-item {
    flex: 1;
    a {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #cccccc;
      padding: 5px 0px;
    }
  }
  .tab-bar-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
  }
  .nuxt-link-active {
    background: #eeeeee;
    span {
      color: rgb(254, 84, 109);
    }
  }
}
</style>