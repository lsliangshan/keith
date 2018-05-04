<template>
  <div class="play_music_container">
    <div class="play_music_top_search_container">
      <Input placeholder="搜索音乐" @on-enter	='searchMusic' v-model="searchKey">
        <Button slot="append" icon="ios-search" @click="searchMusic"></Button>
      </Input>
    </div>
    <div class="search_music_list_container">
      <div class="empty_list" v-if="searchResults.length === 0">
        <span>暂无搜索数据</span>
      </div>
      <Table stripe :columns="columns" :data="searchResults" v-if="searchResults.length > 0" @on-row-click="playMusic"></Table>
    </div>
    <!--<audio class="sample_audio" :src="sampleAudio.url || ''" autoplay :ref="sampleAudio.ref"></audio>-->
  </div>
</template>
<style scoped>
  .play_music_container {
    width: 100%;
    height: 100%;
    padding: 0 10px 10px 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .play_music_top_search_container {
    width: 100%;
    height: 48px;
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: #fff;
  }
  .search_music_list_container {
    width: 100%;
    min-height: 60px;
    background-color: #f5f5f5;
  }
  .empty_list {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #aaa;
  }

  .sample_audio {
    position: absolute;
    left: -10000px;
    opacity: 0;
  }
</style>
<script>
import * as types from '../../store/mutation-types'
export default {
  name: 'PlayMusic',
  data () {
    return {
      sampleAudio: {
        url: '',
        ref: 'sample-audio-ref'
      },
      requestInfo: this.$store.state.requestInfo,
      searchKey: '',
      searchResults: [],
      columns: [
        {
          type: 'index',
          width: 40,
          align: 'left'
        },
        {
          title: '音乐标题',
          width: 150,
          key: 'name'
        },
        {
          title: '歌手',
          key: 'ar',
          render: (h, params) => {
            return h('span', params.row.ar[0].name)
          }
        },
        {
          title: '时长',
          key: 'dt',
          width: 80,
          render: (h, params) => {
            let _dt = Number(params.row.dt) / 1000
            let _out = ''
            let _h = Math.floor(_dt / (60 * 60))
            if (_h > 0) {
              _h = (_h < 10 ? ('0' + _h) : _h)
              _out = _h + ':'
            }
            _dt = _dt % (60 * 60)
            let _m = Math.floor(_dt / 60)
            _m = (_m < 10 ? ('0' + _m) : _m)
            _out += _m + ':'
            let _s = Math.floor(_dt % 60)
            _s = (_s < 10 ? ('0' + _s) : _s)
            _out += _s
            return h('span', _out)
          }
        }
      ]
    }
  },
  methods: {
    async searchMusic () {
      let searchData = await this.$store.dispatch(types.AJAX2, {
        baseUrl: this.requestInfo.baseUrl,
        method: 'get',
        url: this.requestInfo.nem.search + '?key=' + this.searchKey
      })
      if (searchData.status === 200 && searchData.data.result.songs.length > 0) {
        // 成功
        this.searchResults = searchData.data.result.songs
      }
    },
    async getMusicUrl (args) {
      let musicData = await this.$store.dispatch(types.AJAX2, {
        baseUrl: this.requestInfo.baseUrl,
        method: 'get',
        url: this.requestInfo.nem.url + '?id=' + args.id + '&br=' + args.br
      })
      return musicData
    },
    async sendMusicToRobot (music) {
      // let musicData = await this.getMusicUrl({
      //   id: music.id,
      //   br: music.h.br
      // })
      // console.log('.>>>>>>>>>', musicData)
    },
    getAudioObj (music, url) {
      return {
        name: music.name,
        id: music.id,
        author: music.ar[0],
        album: music.al,
        dt: music.dt,
        url: url
      }
    },
    async playMusic (music) {
//      let audioEle = this.$refs[this.sampleAudio.ref]
//      console.log('...', audioEle)
      let musicData = await this.getMusicUrl({
        id: music.id,
        br: music.h.br
      })
      if (musicData.status === 200 && musicData.data.data.length > 0 && musicData.data.data[0].url) {
        this.sampleAudio.url = musicData.data.data[0].url
        this.$store.commit(types.SET_MUSIC_BOX, {
          play: true,
          audio: this.getAudioObj(music, this.sampleAudio.url)
        })
      } else {
        this.$Message.warning('音乐地址解析失败')
      }
    }
  },
  components: {}
}
</script>
