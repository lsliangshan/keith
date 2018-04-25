<template>
  <div class="ads_index_container">
    <div class="ads_index_inner">
      <div class="ads_index_header">
        <p class="ads_group_description" v-text="adsData && adsData.description"></p>
        <div class="ads_group_operation_container">
          <div class="ads_group_operation_item">
            <Tooltip content="编辑" placement="bottom">
              <div class="tooltip_inner">
                <Icon type="edit" size="20"></Icon>
              </div>
            </Tooltip>
          </div>
          <div class="ads_group_operation_item">
            <Tooltip :content="cacheAdsData.status === 'ENABLE' ? '停用' : '启用'" placement="bottom">
              <div class="tooltip_inner">
                <i-switch size="small" :value="cacheAdsData.status === 'ENABLE'" @on-change="changeGroupStatus"></i-switch>
              </div>
            </Tooltip>
          </div>
          <div class="ads_group_operation_item ads_group_operation_delete">
            <Tooltip content="删除" placement="bottom">
              <div class="tooltip_inner">
                <Icon type="android-delete" size="24"></Icon>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      <div class="ads_index_body" :ref="adsIndexBody.ref">
        <Table class="ads_index_body_table" :loading="loadingTableData" :height="adsIndexBody.height - 1" border :columns="adsKeys" :data="allAds"></Table>
      </div>

      <div class="edit_ads_container" :class="{shown: showEditContainer}">
        <div class="edit_ads_header">
          <div class="edit_ads_back_container" @click="closeEditContainer">
            <Icon type="ios-arrow-back"></Icon>
            <span>返回</span>
          </div>
          <p class="edit_ads_header_text">
            <span style="margin-left: 15px;">修改 {{$route.fullPath.split('/')[2]}} - <span style="font-weight: bold;">【 {{editAdsData.description}} 】</span></span>
          </p>
        </div>
        <div class="edit_ads_body">
          <!--<keep-alive>-->
            <edit-ads :edit-data="editAdsData" v-if="showEditContainer" :show-advanced="false" @close="closeEditContainer"></edit-ads>
          <!--</keep-alive>-->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .ads_index_container {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  .ads_index_inner {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .ads_index_header {
    padding: 0 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    background-color: #495060;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ads_group_description {
    line-height: 40px;
    color: #ffffff;
    font-size: 14px;
  }
  .ads_group_operation_container {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
  }
  .ads_group_operation_item {
    width: 40px;
    height: 40px;
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .ads_group_operation_item:active i {
    opacity: 0.7;
  }
  .ads_group_operation_delete {
    color: #e13c13;
    /*color: #d9534f;*/
  }
  .tooltip_inner {
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .ads_index_body {
    /*padding: 15px;*/
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
    width: 100%;
    height: calc(100% - 40px);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ads_index_body_table {
    width: 100%;
    height: 100%;
  }

  .edit_ads_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    opacity: 0;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -ms-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    -webkit-transform: translate(100%, 0);
    -moz-transform: translate(100%, 0);
    -ms-transform: translate(100%, 0);
    -o-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
  .edit_ads_container.shown {
    opacity: 1;
    -webkit-transform: translate(0, 0);
    -moz-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    -o-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  .edit_ads_back_container {
    position: absolute;
    height: 40px;
    left: 15px;
    top: 0;
    line-height: 40px;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
  }
  .edit_ads_header {
    padding: 0 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    background-color: #495060;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .edit_ads_header_text {
    line-height: 40px;
    color: #ffffff;
    font-size: 14px;
  }
  .edit_ads_body {
    width: 100%;
    height: calc(100% - 40px);
  }
</style>
<script>
  import * as types from '../../store/mutation-types'
  import utils from '../../utils/index'
  export default {
    name: 'AdsIndex',
    data () {
      return {
        requestInfo: this.$store.state.requestInfo,
        cacheAdsData: {},
        loadingTableData: true,
        adsKeys: [
          {
            title: '编号',
            key: 'name',
            width: 150,
            fixed: 'left'
          },
          {
            title: '广告位标题',
            key: 'description',
            width: 150,
            fixed: 'left'
          },
          {
            title: '排序',
            key: 'sort',
            width: 80
          },
          {
            title: '图片标题',
            key: 'tempImgDesc',
            width: 150
          },
          {
            title: '图片地址',
            key: 'tempImgPath',
            width: 200,
            render: (h, params) => {
              if (params.row.tempImgPath) {
                return h('div', {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                }, [
                  h('div', {
                    style: {
                      padding: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                  }, [
                    h('img', {
                      attrs: {
                        src: params.row.tempImgPath
                      },
                      style: {
                        maxWidth: '150px',
                        maxHeight: '150px',
                        backgroundColor: '#f9f9f9'
                      }
                    })
                  ])
//                  ,
//                  h('span', params.row.tempImgPath)
                ])
              } else {
                return h('span', params.row.tempImgPath)
              }
            }
          },
          {
            title: '跳转链接',
            key: 'tempRedirectUrl',
            width: 200
          },
          {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (h, params) => {
              return h('div', {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }, [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.openEditContainer(params.row)
                    }
                  }
                }, '设置'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        allAds: [],
        adsIndexBody: {
          ref: 'ads-index-body-ref',
          height: 400
        },
        showEditContainer: false,
        editAdsData: {}
      }
    },
    computed: {
      menuItems () {
        return this.$store.state.menuItems
      },
      adsData: {
        get () {
          let _data = this.$route.params.data
          if (_data) {
            return JSON.parse(JSON.stringify(_data))
          } else {
            return this.findDataByName(this.$route.fullPath.split('/')[1], this.$route.fullPath.split('/')[2])
          }
        },
        set () {
        }
      }
    },
    methods: {
      openEditContainer (data) {
        this.editAdsData = JSON.parse(JSON.stringify(data))
        this.showEditContainer = true
      },
      closeEditContainer () {
        this.editAdsData = {}
        this.showEditContainer = false
      },
      findDataByName (group, name) {
        let menuItems = JSON.parse(JSON.stringify(this.$store.state.menuItems))
        let i = 0
        let outData = {}
        for (i; i < menuItems.length; i++) {
          if (menuItems[i].name === group) {
            let j = 0
            for (j; j < menuItems[i].children.length; j++) {
              if (menuItems[i].children[j].name === name) {
                outData = menuItems[i].children[j].data
                j = menuItems[i].children.length
              }
            }
            i = menuItems.length
          }
        }
        return outData
      },
      changeGroupStatus (e) {
        this.cacheAdsData.status = (e ? 'ENABLE' : 'DISABLE')
      },
      formatAdsForTable (list) {
        let outList = JSON.parse(JSON.stringify(list))
        let i = 0
        let tempData = {}
        for (i; i < outList.length; i++) {
          if (!outList[i].operationModuleInfo) {
            outList[i].operationModuleInfo = {
              params: {}
            }
          }
          if (!outList[i].adConfigWithData) {
            outList[i].adConfigWithData = {
              datas: []
            }
          }
          if (outList[i].adConfigWithData && outList[i].adConfigWithData.datas.length > 0) {
            tempData = JSON.parse(outList[i].adConfigWithData.datas[0].data)
            outList[i].tempImgDesc = tempData.title
            outList[i].tempImgPath = tempData.imgUrl
            outList[i].tempRedirectUrl = tempData.url
          }
        }
        return outList
      },
      async getAllAdsByGroupId () {
        this.loadingTableData = true
        if (!this.adsData || !this.adsData.id) {
          this.loadingTableData = false
          return
        }
        let allAdsData = await this.$store.dispatch(types.AJAX, {
          baseUrl: this.requestInfo.baseUrl,
          url: this.requestInfo.getAllOperationConfigUnit + '?access_token=' + this.requestInfo.token + '&groupId=' + this.adsData.id,
          method: 'GET'
        })
        if (allAdsData.status === 200) {
          // 获取数据失败
          this.$router.go(0)
        } else {
          this.allAds = this.formatAdsForTable(allAdsData.data) // .concat(allAdsData.data, allAdsData.data, allAdsData.data)
          setTimeout(() => {
            this.loadingTableData = false
          }, 800)
        }
      }
    },
    async created () {
      const that = this
      this.$nextTick(() => {
        this.cacheAdsData = JSON.parse(JSON.stringify(this.adsData))
        this.adsIndexBody.height = this.$refs[this.adsIndexBody.ref].getBoundingClientRect().height
      })
      window.onresize = function () {
        that.adsIndexBody.height = that.$refs[that.adsIndexBody.ref].getBoundingClientRect().height
      }
      await this.getAllAdsByGroupId()
    },
    watch: {
      'adsData': async function (val) {
        if (!utils.isEmptyObj(val)) {
          this.cacheAdsData = JSON.parse(JSON.stringify(val))
          await this.getAllAdsByGroupId()
        }
      },
      '$route': function (val) {
        this.closeEditContainer()
      }
    },
    components: {
      EditAds: () => import('./edit.vue')
    }
  }
</script>
