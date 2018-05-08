<template>
  <div id="app">
    <router-view name="HomeRouter"></router-view>

    <transition name="fade">
      <div class="loading-container" v-if="loaderOptions.shown" :style="{backgroundColor: loaderOptions.bgColor}">
        <ls-loading :loader="loaderOptions.loader" :width="loaderOptions.width"></ls-loading>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      loaderOptions: {
        shown: false,
        loader: 0,
        bgColor: 'rgba(0, 0, 0, 1)',
        width: 50
      }
    }
  },
  created () {
    const that = this
    this.showLoading({
      loader: 1
    })
    window.onload = function () {
      that.hideLoading()
    }
  },
  methods: {
    showLoading (args) {
      this.loaderOptions = Object.assign({}, this.loaderOptions, args || {}, {
        shown: true
      })
    },
    hideLoading () {
      this.loaderOptions = Object.assign({}, this.loaderOptions, {
        shown: false
      })
    }
  },
  components: {
    LsLoading: () => import('./components/coms/LsLoading.vue')
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    outline: none;
    -webkit-appearance: none;
  }
  html, body {
    height: 100%;
  }
  #app {
    width: 100%;
    height: 100%;
  }
  .loading-container {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  /*.fade-enter, .fade-leave-active {*/
    /*opacity: 0*/
  /*}*/
</style>
