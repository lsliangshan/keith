<template>
  <div class="home_container">
    <div class="home_header_container">
      <span v-text="robot.name"></span>
      <div class="avatar_container">
        <img class="avatar_img" :src="loginInfo.headIcon"/>
      </div>
    </div>
    <div class="home_main_container">
      <component :is="currentCommand"></component>
    </div>
    <div class="global_audio_box_container" v-if="musicBox.audio.url">
      <div class="global_audio_min_box" :class="{shown: !musicBoxShown}">
        <div class="global_audio_min_box_pic" :style="{backgroundImage: `url('${musicBox.audio.album.picUrl}`}"></div>
        <div class="play_status_icon" @click="playOrPauseAudio">
          <Icon type="pause" v-if="musicBox.play"></Icon>
          <Icon type="play" style="margin-left: 2px;" v-else></Icon>
        </div>
        <div class="global_audio_toggle" @click="showMusicDetailBox">
          <div class="global_audio_toggle_bg" :style="{backgroundImage: `url('${musicBox.audio.album.picUrl}')`}"></div>
          <Icon type="chevron-right"></Icon>
        </div>
      </div>
      <div class="global_audio_max_box" :class="{shown: musicBoxShown}">
        <div class="global_audio_max_left">
          <div class="music_prev music_item">
            <Icon type="skip-backward"></Icon>
          </div>
          <div class="music_play_pause music_item">
            <div class="music_play_pause_inner" @click="playOrPauseAudio">
              <Icon type="pause" v-if="musicBox.play"></Icon>
              <Icon type="play" style="margin-left: 2px;" v-else></Icon>
            </div>
          </div>
          <div class="music_next music_item">
            <Icon type="skip-forward"></Icon>
          </div>
        </div>
        <div class="global_audio_max_right">
          <div class="global_audio_max_right_inner">
            <marquee behavior="scroll" direction="left" loop="infinite" scrollamount="5" scrolldelay="30">
              {{musicBox.audio.name}} - {{musicBox.audio.author.name}}
            </marquee>
          </div>
        </div>
        <div class="global_audio_toggle" @click="hideMusicDetailBox">
          <div class="global_audio_toggle_bg"></div>
          <Icon type="chevron-left"></Icon>
        </div>
      </div>
    </div>

    <audio :ref="globalAudioRef" :src="musicBox.audio.url" autoplay></audio>
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
    display: flex;
    align-items: center;
    justify-content: center;
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

  .global_audio_box_container {
    position: absolute;
    z-index: 99999;
    /*width: 60px;*/
    height: 60px;
    left: 0;
    bottom: 48px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  /*.global_audio_box_container:hover .global_audio_toggle {*/
    /*opacity: 1;*/
  /*}*/
  .global_audio_min_box {
    z-index: -1;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, .7);
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-transform: translate(-77px, 0);
    -moz-transform: translate(-77px, 0);
    -ms-transform: translate(-77px, 0);
    -o-transform: translate(-77px, 0);
    transform: translate(-77px, 0);
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    -ms-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }
  .global_audio_min_box.shown {
    -webkit-transform: translate(0, 0);
    -moz-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    -o-transform: translate(0, 0);
    transform: translate(0, 0);
    transition-delay: .4s;
  }
  .global_audio_min_box_pic {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;
    border-radius: 5px;
    background-size: contain;
    background-position: 50% 50%;
    filter: contrast(70%);
  }
  .global_audio_toggle {
    position: absolute;
    z-index: -1;
    right: -17px;
    width: 16px;
    height: 60px;
    /*margin-left: 1px;*/
    border-radius: 5px;
    background-color: rgba(0, 0, 0, .7);
    color: rgba(255, 255, 255, .6);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    /*opacity: 0;*/
    /*-webkit-transition: all .3s ease-in-out;*/
    /*-moz-transition: all .3s ease-in-out;*/
    /*-ms-transition: all .3s ease-in-out;*/
    /*-o-transition: all .3s ease-in-out;*/
    /*transition: all .3s ease-in-out;*/
  }
  .global_audio_toggle_bg {
    position: absolute;
    right: 0;
    z-index: -1;
    width: 16px;
    height: 60px;
    border-radius: 5px;
    background-size: cover;
    background-position: 50% 50%;
    filter: contrast(70%);
  }
  .play_status_icon {
    width: 36px;
    height: 36px;
    z-index: 1;
    border: 2px solid rgba(255, 255, 255, .5);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f5f5f5;
    -webkit-transition: all .2s ease-in-out;
    -moz-transition: all .2s ease-in-out;
    -ms-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }
  .play_status_icon:active {
    color: $theme;
    border-color: $theme;
  }

  .global_audio_max_box {
    position: fixed;
    width: 80%;
    height: 60px;
    background-color: rgba(0, 0, 0, .7);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    -webkit-transform: translate(-120%, 0);
    -moz-transform: translate(-120%, 0);
    -ms-transform: translate(-120%, 0);
    -o-transform: translate(-120%, 0);
    transform: translate(-120%, 0);
    -webkit-transition: all .4s ease-in-out;
    -moz-transition: all .4s ease-in-out;
    -ms-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }
  .global_audio_max_box.shown {
    -webkit-transform: translate(0%, 0);
    -moz-transform: translate(0%, 0);
    -ms-transform: translate(0%, 0);
    -o-transform: translate(0%, 0);
    transform: translate(0%, 0);
    transition-delay: .2s;
  }
  .global_audio_max_left {
    width: 100px;
    height: 60px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .music_item {
    height: 60px;
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    -webkit-transition: all .1s ease-in-out;
    -moz-transition: all .1s ease-in-out;
    -ms-transition: all .1s ease-in-out;
    -o-transition: all .1s ease-in-out;
    transition: all .1s ease-in-out;
  }
  .music_item:active {
    color: $theme;
  }
  .music_prev {
    width: 30px;
  }
  .music_next {
    width: 30px;
  }
  .music_play_pause {
    width: 40px;
  }
  .music_play_pause_inner {
    width: 30px;
    height: 30px;
    border: 1px solid #ffffff;
    border-radius: 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .music_play_pause_inner:active {
    border-color: $theme;
  }
  .global_audio_max_right {
    width: calc(100% - 100px);
    height: 60px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
  }
  .global_audio_max_right_inner {
    width: 95%;
    height: 30px;
    background-color: rgba(0, 0, 0, .2);
  }
  .global_audio_max_right_inner marquee {
    height: 30px;
    display: flex;
    align-items: center;
    color: #f5f5f5;
    font-size: 12px;
  }
</style>
<script>
import * as types from '../store/mutation-types'
export default {
  name: 'Home',
  data () {
    return {
      globalAudioRef: 'global-audio-ref',
      currentCommand: 'NoCommand',
      musicBoxShown: false,
      requestInfo: this.$store.state.requestInfo
    }
  },
  computed: {
    loginInfo () {
      return this.$store.state.loginInfo
    },
    robot () {
      return this.$store.state.robot
    },
    musicBox () {
      return this.$store.state.musicBox
    }
  },
  methods: {
    showMusicDetailBox () {
      this.musicBoxShown = true
    },
    hideMusicDetailBox () {
      this.musicBoxShown = false
    },
    playOrPauseAudio () {
      this.audioEle = this.$refs[this.globalAudioRef]
      if (this.musicBox.play) {
        this.audioEle.pause()
        this.$store.commit(types.PAUSE_MUSIC)
      } else {
        this.audioEle.play()
        this.$store.commit(types.PLAY_MUSIC)
      }
    }
  },
  components: {
    NoCommand: () => import('./coms/NoCommand.vue')
  }
}
</script>
