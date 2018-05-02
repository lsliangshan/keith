<template>
  <div class="home_container">
    <div class="home_header_container">
      <div class="avatar_container">
        <img class="avatar_img" :src="loginInfo.headIcon"/>
      </div>
    </div>
    <div class="home_main_container">
      <component :is="currentCommand"></component>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import "../../static/css/theme";
  .home_container {
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
  .home_header_container {
    position: relative;
    width: 100%;
    height: 64px;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .avatar_container {
    position: absolute;
    top: 0;
    right: 10px;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .avatar_img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    border: 2px solid #f5f5f5;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
  }
  .home_main_container {
    width: 100%;
    height: calc(100% - 64px);
  }
</style>
<script>
export default {
  name: 'Home',
  data () {
    return {
      currentCommand: 'NoCommand'
    }
  },
  computed: {
    loginInfo () {
      return this.$store.state.loginInfo
    },
    robot () {
      return this.$store.state.robot
    }
  },
  components: {
    NoCommand: () => import('./coms/NoCommand.vue')
  }
}
</script>
