<template>
  <div>
    <div>asyncData:{{username}}{{user.qqusername}}</div>
    <div>vuex:{{user.username}}</div>
    <mt-button type="primary" @click="submit">提交vuex</mt-button>
  </div>
</template>

<script>
import { userServer } from '~/api/UserServer';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  async asyncData({ params }) {
    let { data } = await userServer.getUserInfo();
    return { username: data.username };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapMutations({
      homeMutation: 'USER'
    }),
    ...mapActions(['userAction', 'getUserInfo']),
    submit() {
      this.homeMutation({ username: 'tom' });
      setTimeout(() => {
        this.getUserInfo({ username: 'hulei' });
      }, 2000);
    }
  }
};
</script>

<style lang="scss">
</style>