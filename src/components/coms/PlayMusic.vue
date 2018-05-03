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
      <Table stripe :columns="columns" :data="searchResults" v-if="searchResults.length > 0"></Table>
    </div>
  </div>
</template>
<style scoped>
  .play_music_container {
    width: 100%;
    height: 100%;
    padding: 0 10px;
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
</style>
<script>
import * as types from '../../store/mutation-types'
export default {
  name: 'PlayMusic',
  data () {
    return {
      requestInfo: this.$store.state.requestInfo,
      searchKey: '',
      searchResults: [],
      columns: [
        {
          type: 'index',
          width: 20,
          align: 'center'
        },
        {
          title: '音乐标题',
          key: 'name'
        },
        {
          title: '歌手',
          key: 'ar[0].name'
        },
        {
          title: '时长',
          key: 'dt',
          render: (h, params) => {
            let _dt = Number(params.row.dt) / 1000
            let _out = ''
            let _h = parseInt(_dt / (60 * 60))
            if (_h > 0) {
              _h = (_h < 10 ? ('0' + _h) : _h)
              _out = _h + ':'
            }
            _dt = _dt % (60 * 60)
            let _m = parseInt(_dt / 60)
            _m = (_m < 10 ? ('0' + _m) : _m)
            _out += _m + ':'
            let _s = _dt % 60
            _s = (_s < 10 ? ('0' + _s) : _s)
            _out += parseInt(_s)
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
      console.log('>>>>>>>>>>', JSON.stringify(searchData))
    }
  },
  components: {}
}
</script>
