<template>
  <div>
    home
    <p>取vuex值{{this.home.webpack}}</p>
    <mt-button type="primary" @click="submitHomeAction">提交Actions</mt-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    data() {
      return {
        result: {},
      }
    },
    computed: {
      ...mapGetters([
        'home'
      ])
    },
    created() {
      axios.get('/api/current')
        .then(res => {
          console.log(res);
        }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      ...mapMutations({
        homeMutation: 'SET_HOME'
      }),
      ...mapActions([
        'homeAction',
      ]),
      submitHomeAction(){
        this.homeAction({webpack:'vue2'});
        setTimeout(()=>{
          this.homeMutation({webpack:'vue'});
        },2000)
      }
    }
  }
</script>

<style lang="scss">

</style>