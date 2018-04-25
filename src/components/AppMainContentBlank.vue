<template>
  <div class="app_main_content_blank_container">
    <div class="app_main_content_blank_wrapper">
      <p class="copy_text">powered by &copy; {{author}}</p>
      <p class="sub_text">一群被研发耽误的前端</p>
    </div>
  </div>
</template>
<style scoped>
  .app_main_content_blank_container {
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: transparent;
  }
  .app_main_content_blank_wrapper {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: #464c5b;
    padding: 20px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .copy_text {
    font-size: 20px;
  }
  .sub_text {
    margin-top: 10px;
    opacity: 0.3;
  }
</style>
<script>
  export default {
    name: 'AppMainContentBlank',
    data () {
      return {
        author: this.$store.state.author
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      }
    }
  }
</script>
