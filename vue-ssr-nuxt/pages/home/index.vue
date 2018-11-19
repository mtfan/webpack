<template>
  <div>home>>>{{username}}</div>
</template>

<script type="text/ecmascript-6">
import { userServer } from '~/api/UserServer';
export default {
  async asyncData({ params }) {
    let { data } = await userServer.getUserInfo();
    return { username: data.username };
  }
};
</script>

<style lang="scss">
</style>