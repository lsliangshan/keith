<template>
    <div class="data_statistics_container">
      <div class="data_statistics_wrapper" ref="statisticsWrapper">
        <div class="auto_refresh_container">
          <span class="auto_refresh_btn" v-if="!autoRefreshAvailable" @click="setAutoRefresh">允许自动刷新</span>
          <span v-else class="refresh_container">
            {{autoRefreshTime | countdownTime}}后自动刷新
            <Poptip trigger="click" placement="bottom-end" width="250" class="auto_refresh_settings">
              <Icon type="ios-gear" size="20" class=""></Icon>
              <div class="api" slot="content">
                <Card :bordered="false" style="width: 250px" :style="{'height': autoRefreshSettingContainerShown ? '210px' : 'auto'}" >
                  <div style="text-align:center">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <input type="number" min="1" :placeholder="autoRefreshDefaultTime | countdownTime(true)" @input="autoRefreshDefaultTimeChanged" style="width: 80px; border: 1px solid #dddee1; padding: 4px 7px; border-radius: 4px;"/>
                      <span style="font-size: 12px;">分钟后自动刷新</span>
                      <Button type="primary" size="small" @click="changeDefaultAutoRefreshTime">确定</Button>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: flex-end; line-height: 32px; margin-top: 10px;">
                      <span class="auto_refresh_btn ml10" @click="disableAutoRefresh">关闭自动刷新</span>
                    </div>
                  </div>
              </Card>
              </div>
            </Poptip>
            <!--<span class="auto_refresh_btn ml10" @click="disableAutoRefresh">关闭自动刷新</span>-->
          </span>
        </div>
        <div class="screen_conditions_container">
          <Form :label-width="80">
            <FormItem label="查询时间" style="margin: 0;">
              <DatePicker type="datetimerange" :value="[screenConditions.startTime, screenConditions.endTime]" :options="searchTimeTags" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择查询起止时间" @on-change="searchTimeChanged" style="width: 300px"></DatePicker>
              <Button type="primary" :loading="inSearching" :disabled="!searchAvailable" @click="search">
                <span v-if="!inSearching">查询</span>
                <span v-else>查询中...</span>
              </Button>
            </FormItem>
          </Form>
          <div class="export_xlsx_container" v-if="results.length > 0">
            <Button type="primary" size="small" :loading="exportXlsxLoading" @click="exportXlsx">
              <span v-if="!exportXlsxLoading">导出xlsx</span>
              <span v-else>导出中...</span>
            </Button>
          </div>
        </div>
        <Tabs style="height: 100%;" :value="results[currentIndex] && results[currentIndex].group || ''" @on-click="tabChanged">
          <TabPane class="tab_pane_container" v-for="(item, index) in results" :key="index" :label="item.group" :name="item.group">

            <!--<div class="screen_conditions_toggle">-->
              <!--<p class="screen_conditions_toggle_text" @click="toggleScreenCondition">-->
                <!--{{showScreenConditions ? '收起' : '筛选'}}-->
                <!--<Icon class="arrow_down" :type="showScreenConditions ? 'ios-arrow-up' : 'ios-arrow-down'"></Icon>-->
              <!--</p>-->
            <!--</div>-->
            <Table :height="contentHeight" border :columns="userKeys" :data="item.interFaces"></Table>
          </TabPane>
        </Tabs>
      </div>
    </div>
</template>
<style>
  .ml10 {
    margin-left: 10px;
  }
  .auto_refresh_container {
    position: absolute;
    height: 36px;
    right: 20px;
    top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
  }
  .auto_refresh_btn {
    color: #2d8cf0;
    cursor: pointer;
  }
  .refresh_container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .auto_refresh_settings {
    cursor: pointer;
    margin-left: 15px;
  }
  .auto_refresh_settings .ivu-poptip-body {
    padding: 0!important;
  }
  .data_statistics_container .ivu-tabs {
    /*height: 100%;*/
  }
  .data_statistics_container .ivu-tabs .ivu-tabs-content {
    /*height: 100%;*/
  }
  .data_statistics_container .ivu-tabs .ivu-tabs-content .ivu-tabs-tabpane {
    /*height: calc(100% - 100px);*/
  }
  .data_statistics_container .ivu-tabs .ivu-tabs-content .ivu-tabs-tabpane .ivu-table-wrapper {
    /*height: 100%;*/
  }
  /*.data_statistics_container .ivu-table-body {*/
    /*height: calc(100% - 40px);*/
  /*}*/
  /*.data_statistics_container .ivu-table-wrapper {*/
    /*border: none!important;*/
  /*}*/
  /*.data_statistics_container .ivu-table:before {*/
    /*height: 0!important;*/
  /*}*/
  /*.data_statistics_container .ivu-table:after {*/
    /*width: 0!important;*/
  /*}*/
  .ivu-table .data_emphasize_bg {
    background-color: rgba(255, 0, 0, 0.5)!important;
    color: #ffffff;
  }
  .ivu-table .data_emphasize_bg_2 {
    background-color: rgba(252, 137, 139, 1)!important;
    color: #ffffff;
  }
  .ivu-table .bg_10_min {
    background-color: #eee;
  }
  /*.data_statistics_container .ivu-table-header table {*/
    /*border: 1px solid #dddee1;*/
    /*border-bottom: none;*/
    /*border-right: none;*/
  /*}*/
  /*.data_statistics_container .ivu-table-body table {*/
    /*border-left: 1px solid #dddee1;*/
  /*}*/
  .tab_pane_container {
    /*margin-top: 100px;*/
    /*height: calc(100% - 100px);*/
    margin-top: 40px;
    height: 100%;
    /*height: 100%;*/
    /*height: calc(100% - 60px);*/
    /*overflow-y: auto;*/
    /*padding: 0 15px 15px 15px;*/
  }
    .data_statistics_container {
      width: 100%;
      height: 100%;
      padding: 15px;
    }
  .data_statistics_wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    /*overflow-y: auto;*/
    /*padding: 15px;*/
    background-color: #ffffff;
  }
  .data_statistics_wrapper .ivu-tabs-bar {
    /*position: fixed;*/
    /*width: calc(83% - 26px);*/
    /*z-index: 2;*/
    height: 51px;
    padding: 15px 15px 0 15px;
    background-color: #ffffff;
  }
  /*.data_statistics_wrapper .ivu-table-cell {*/
    /*float: right;*/
  /*}*/
  /*.data_statistics_wrapper .ivu-table-header {*/
    /*position: fixed;*/
  /*}*/
  /*.data_statistics_wrapper .ivu-table-body {*/
    /*margin-top: 40px;*/
    /*overflow-y: auto;*/
  /*}*/
  .screen_conditions_container {
    position: fixed;
    margin-top: 51px;
    z-index: 1;
    padding-left: 15px;
    padding-right: 15px;
    width: calc(83% - 26px);
    height: 48px;
    /*left: 0;*/
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    /*-webkit-transition: all .3s ease-in-out;*/
    /*-moz-transition: all .3s ease-in-out;*/
    /*-o-transition: all .3s ease-in-out;*/
    /*transition: all .3s ease-in-out;*/
    /*-webkit-transform-origin: center top;*/
    /*-moz-transform-origin: center top;*/
    /*-o-transform-origin: center top;*/
    /*transform-origin: center top;*/
  }
  .screen_conditions_toggle {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .screen_conditions_toggle_text {
    cursor: pointer;
  }
  .arrow_down {
    margin-left: 5px;
  }
  .export_xlsx_container {
    width: 100px;
    height: 32px;
    /*position: absolute;*/
    /*right: 0;*/
    /*top: 0;*/
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
<script>
  import * as types from '../../store/mutation-types'
  import XLSX from 'xlsx'

  const numberFormat = function (num) {
    return String(num).split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('').replace(/^,/, '')
  }

  export default {
    name: 'statistics',
    data () {
      return {
        autoRefreshAvailable: true, // 允许自动刷新
        autoRefreshPaused: false, // 暂停自动刷新
        autoRefreshDefaultTime: 3 * 60 * 1000, // 默认的自动刷新时间间隔, 3min
        tempAutoRefreshDefaultTime: 0, // 临时 默认的自动刷新时间间隔
        autoRefreshTime: 0,
        autoRefreshTimeout: null,
        autoRefreshSettingContainerShown: false,
        localStorageKeys: {
          autoRefreshDefaultTime: 'auto-refresh-default-time'
        },
        screenConditions: {
          startTime: '',
          endTime: ''
        },
        resultOfTime: {
          startTime: '',
          endTime: ''
        },
        inSearching: false,
        exportXlsxLoading: false,
        searchTimeTags: {
          shortcuts: [
            {
              text: '今天',
              value () {
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
                const end = new Date()
                return [start, end]
              }
            },
            {
              text: '昨天',
              value () {
                const end = new Date(new Date(new Date().toLocaleDateString()).getTime() - 1000)
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 + 1000)
                return [start, end]
              }
            },
            {
              text: '最近一个月',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                return [start, end]
              }
            },
            {
              text: '最近三个月',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                return [start, end]
              }
            }
          ]
        },
        showScreenConditions: false,
        currentIndex: 0,
        results: [],
//        [
//          {
//            'group': 'mi',
//            'interFaces': [
//              {
//                "10minFivePlusRequests": 0,
//                "10minFivePlusRequestsPercent": "1.20%",
//                "10minOneThreeRequests": 0,
//                "10minOneThreeRequestsPercent": "0.00%",
//                "10minThreeFiveRequests": 0,
//                "10minThreeFiveRequestsPercent": "2.00%",
//                "10minTotalRequests": 343,
//                'fivePlusRequests': 1284,
//                'fivePlusRequestsPercent': '1.04%',
//                'name': '灰度项目信息',
//                'oneThreeRequests': 3192,
//                'oneThreeRequestsPercent': '2.59%',
//                'threeFiveRequests': 785,
//                'threeFiveRequestsPercent': '0.64%',
//                'totalRequests': 12323136,
//                'urlPath': 'https://mi.zhaopin.com/android/myext/GetGrayscaleProjectInfo'
//              },
//              {
//                "10minFivePlusRequests": 0,
//                "10minFivePlusRequestsPercent": "0.00%",
//                "10minOneThreeRequests": 0,
//                "10minOneThreeRequestsPercent": "0.00%",
//                "10minThreeFiveRequests": 0,
//                "10minThreeFiveRequestsPercent": "0.00%",
//                "10minTotalRequests": 343,
//                'fivePlusRequests': 3,
//                'fivePlusRequestsPercent': '0.02%',
//                'name': 'js资源获取',
//                'oneThreeRequests': 18,
//                'oneThreeRequestsPercent': '0.15%',
//                'threeFiveRequests': 13,
//                'threeFiveRequestsPercent': '1%',
//                'totalRequests': 1215372,
//                'urlPath': 'https://m.zhaopin.com/Scripts/raty/jquery.raty.js'
//              }
//            ]
//          },
//          {
//            'group': 'm站',
//            'interFaces': [
//              {
//                "10minFivePlusRequests": 0,
//                "10minFivePlusRequestsPercent": "0.00%",
//                "10minOneThreeRequests": 0,
//                "10minOneThreeRequestsPercent": "0.00%",
//                "10minThreeFiveRequests": 0,
//                "10minThreeFiveRequestsPercent": "0.00%",
//                "10minTotalRequests": 343,
//                'fivePlusRequests': 3,
//                'fivePlusRequestsPercent': '0.02%',
//                'name': 'js资源获取',
//                'oneThreeRequests': 18,
//                'oneThreeRequestsPercent': '0.15%',
//                'threeFiveRequests': 13,
//                'threeFiveRequestsPercent': '1%',
//                'totalRequests': 1215372,
//                'urlPath': 'https://m.zhaopin.com/Scripts/raty/jquery.raty.js'
//              }
//            ]
//          }
//        ],
        userKeys: [
          {
            title: '接口',
            key: 'name',
            width: 150,
            fixed: 'left'
          },
          {
            title: '总请求',
            key: 'totalRequests',
            width: 100,
            render: (h, params) => {
              return h('span', {
                style: {
                  float: 'right'
                }
              }, numberFormat(params.row.totalRequests))
            }
          },
          {
            title: '1-3秒',
            key: 'oneThreeRequests',
            width: 100,
            render: (h, params) => {
              return h('span', {
                style: {
                  float: 'right'
                }
              }, numberFormat(params.row.oneThreeRequests))
            }
          },
          {
            title: '3-5秒',
            key: 'threeFiveRequests',
            width: 100,
            render: (h, params) => {
              return h('span', {
                style: {
                  float: 'right'
                }
              }, numberFormat(params.row.threeFiveRequests))
            }
          },
          {
            title: '大于5秒',
            key: 'fivePlusRequests',
            width: 100,
            render: (h, params) => {
              return h('span', {
                style: {
                  float: 'right'
                }
              }, numberFormat(params.row.fivePlusRequests))
            }
          },
          {
            title: '1-3秒比例',
            key: 'oneThreeRequestsPercent',
            width: 100,
            render: (h, params) => {
              let _percent = parseFloat(params.row.oneThreeRequestsPercent)
              let _styles = {}
              if (_percent >= 1.0) {
                _styles = {
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '100%'
                }
              }
              return h('span', {
                style: _styles
              }, params.row.oneThreeRequestsPercent)
            }
          },
          {
            title: '3-5秒比例',
            key: 'threeFiveRequestsPercent',
            width: 100,
            render: (h, params) => {
              let _percent = parseFloat(params.row.threeFiveRequestsPercent)
              let _styles = {}
              if (_percent >= 1.0) {
                _styles = {
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '100%'
                }
              }
              return h('span', {
                style: _styles
              }, params.row.threeFiveRequestsPercent)
            }
          },
          {
            title: '大于5秒比例',
            key: 'fivePlusRequestsPercent',
            width: 100,
            render: (h, params) => {
              let _percent = parseFloat(params.row.fivePlusRequestsPercent)
              let _styles = {}
              if (_percent >= 1.0) {
                _styles = {
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '100%'
                }
              }
              return h('span', {
                style: _styles
              }, params.row.fivePlusRequestsPercent)
            }
          },
          {
            title: '总请求(10分钟)',
            key: '10minTotalRequests',
            className: 'bg_10_min',
            width: 100,
            render: (h, params) => {
              return h('span', {
                style: {
                  float: 'right'
                }
              }, numberFormat(params.row['10minTotalRequests']))
            }
          },
          {
            title: '1-3秒(10分钟)',
            key: '10minOneThreeRequests',
            className: 'bg_10_min',
            width: 100,
            render: (h, params) => {
              return h('span', {
                style: {
                  float: 'right'
                }
              }, numberFormat(params.row['10minOneThreeRequests']))
            }
          },
          {
            title: '3-5秒(10分钟)',
            key: '10minThreeFiveRequests',
            className: 'bg_10_min',
            width: 100,
            render: (h, params) => {
              return h('span', {
                style: {
                  float: 'right'
                }
              }, numberFormat(params.row['10minThreeFiveRequests']))
            }
          },
          {
            title: '大于5秒(10分钟)',
            key: '10minFivePlusRequests',
            className: 'bg_10_min',
            width: 100,
            render: (h, params) => {
              return h('span', {
                style: {
                  float: 'right'
                }
              }, numberFormat(params.row['10minFivePlusRequests']))
            }
          },
          {
            title: '1-3秒比例(10分钟)',
            key: '10minOneThreeRequestsPercent',
            className: 'bg_10_min',
            width: 100,
            render: (h, params) => {
              let _percent = parseFloat(params.row['10minOneThreeRequestsPercent'])
              let _styles = {}
              if (_percent >= 1.0) {
                _styles = {
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '100%'
                }
              }
              return h('span', {
                style: _styles
              }, params.row['10minOneThreeRequestsPercent'])
            }
          },
          {
            title: '3-5秒比例(10分钟)',
            key: '10minThreeFiveRequestsPercent',
            className: 'bg_10_min',
            width: 100,
            render: (h, params) => {
              let _percent = parseFloat(params.row['10minThreeFiveRequestsPercent'])
              let _styles = {}
              if (_percent >= 1.0) {
                _styles = {
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '100%'
                }
              }
              return h('span', {
                style: _styles
              }, params.row['10minThreeFiveRequestsPercent'])
            }
          },
          {
            title: '大于5秒比例(10分钟)',
            key: '10minFivePlusRequestsPercent',
            className: 'bg_10_min',
            width: 100,
            render: (h, params) => {
              let _percent = parseFloat(params.row['10minFivePlusRequestsPercent'])
              let _styles = {}
              if (_percent >= 1.0) {
                _styles = {
                  color: '#FFFFFF',
                  fontSize: '18px',
                  fontWeight: 'bolder',
                  display: 'inline-block',
                  textAlign: 'center',
                  width: '100%'
                }
              }
              return h('span', {
                style: _styles
              }, params.row['10minFivePlusRequestsPercent'])
            }
          },
          {
            title: '请求地址',
            key: 'urlPath',
            width: 200
          }
        ],
        xlsxKey: {},
        xlsxData: [],
        xlsxOpts: {
          bookType: 'xlsx',
          bookSST: false,
          type: 'binary'
        },
        requestInfo: this.$store.state.requestInfo,
        contentHeight: 0
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      },
      searchAvailable () {
        let flag = false
        if (this.screenConditions.startTime !== '' && this.screenConditions.endTime !== '') {
          flag = true
        }
        return flag
      },
      isFullScreen () {
        return this.$store.state.isFullScreen
      }
    },
    created () {
      const that = this
      if (localStorage.getItem(this.localStorageKeys.autoRefreshDefaultTime)) {
        this.autoRefreshDefaultTime = parseInt(localStorage.getItem(this.localStorageKeys.autoRefreshDefaultTime))
      }
      this.autoRefreshTime = this.autoRefreshDefaultTime
      this.tempAutoRefreshDefaultTime = parseInt(this.autoRefreshDefaultTime) / 60 / 1000
      setTimeout(() => {
        this.countdownRefresh()
      }, 1)
      this.$nextTick(() => {
        this.contentHeight = parseInt(this.$refs['statisticsWrapper'].offsetHeight) - (this.isFullScreen ? 20 : 100)
      })
      window.addEventListener('resize', function (e) {
        that.contentHeight = parseInt(that.$refs['statisticsWrapper'].offsetHeight) - (this.isFullScreen ? 20 : 100)
      })
      this.formatAllXlsxData()
      for (let i = 0; i < this.results.length; i++) {
        for (let j = 0; j < this.results[i].interFaces.length; j++) {
          let _outObj = {}
          let warnThreshold = parseFloat(this.results[i].interFaces[j].warnThreshold)
          if (parseFloat(this.results[i].interFaces[j].oneThreeRequestsPercent) >= warnThreshold) {
            _outObj['oneThreeRequestsPercent'] = 'data_emphasize_bg'
            _outObj['name'] = 'data_emphasize_bg_2'
          }
          if (parseFloat(this.results[i].interFaces[j].threeFiveRequestsPercent) >= warnThreshold) {
            _outObj['threeFiveRequestsPercent'] = 'data_emphasize_bg'
            _outObj['name'] = 'data_emphasize_bg_2'
          }
          if (parseFloat(this.results[i].interFaces[j].fivePlusRequestsPercent) >= warnThreshold) {
            _outObj['fivePlusRequestsPercent'] = 'data_emphasize_bg'
            _outObj['name'] = 'data_emphasize_bg_2'
          }
          if (parseFloat(this.results[i].interFaces[j]['10minOneThreeRequestsPercent']) >= warnThreshold) {
            _outObj['10minOneThreeRequestsPercent'] = 'data_emphasize_bg'
            _outObj['name'] = 'data_emphasize_bg_2'
          }
          if (parseFloat(this.results[i].interFaces[j]['10minThreeFiveRequestsPercent']) >= warnThreshold) {
            _outObj['10minThreeFiveRequestsPercent'] = 'data_emphasize_bg'
            _outObj['name'] = 'data_emphasize_bg_2'
          }
          if (parseFloat(this.results[i].interFaces[j]['10minFivePlusRequestsPercent']) >= warnThreshold) {
            _outObj['10minFivePlusRequestsPercent'] = 'data_emphasize_bg'
            _outObj['name'] = 'data_emphasize_bg_2'
          }
          this.results[i].interFaces[j].cellClassName = _outObj
        }
      }
    },
    methods: {
      autoRefreshDefaultTimeChanged (e) {
        if (!e.target.value) {
          this.tempAutoRefreshDefaultTime = parseInt(this.autoRefreshDefaultTime) / 60 / 1000
        } else {
          this.tempAutoRefreshDefaultTime = parseFloat(e.target.value)
        }
      },
      changeDefaultAutoRefreshTime () {
        this.autoRefreshDefaultTime = parseInt(this.tempAutoRefreshDefaultTime * 60 * 1000)
        localStorage.setItem(this.localStorageKeys.autoRefreshDefaultTime, this.autoRefreshDefaultTime)
        this.resetCountdownTime()
        this.startAutoRefresh()
        setTimeout(() => {
          this.countdownRefresh()
        }, 1)
        this.$Message.success({
          content: `自动刷新时间修改成功，${this.tempAutoRefreshDefaultTime}分钟后自动刷新`,
          duration: 5
        })
      },
      setAutoRefreshTime (open) {
        this.autoRefreshSettingContainerShown = open
      },
      setAutoRefresh () {
        this.autoRefreshAvailable = true
        setTimeout(() => {
          this.countdownRefresh()
        }, 1)
      },
      disableAutoRefresh () {
        this.resetCountdownTime()
        this.autoRefreshAvailable = false
      },
      stopAutoRefresh () {
        this.autoRefreshPaused = true
      },
      startAutoRefresh () {
        this.autoRefreshPaused = false
      },
      resetCountdownTime () {
        this.autoRefreshTime = this.autoRefreshDefaultTime
      },
      async countdownRefresh () {
        if (this.autoRefreshAvailable && !this.autoRefreshPaused) {
          if (this.autoRefreshTime <= 1) {
            // 调用查询接口
            this.resetCountdownTime()
            await this.autoSearch()
          } else {
            clearTimeout(this.autoRefreshTimeout)
            this.autoRefreshTimeout = setTimeout(() => {
              this.autoRefreshTime -= 1000
              this.countdownRefresh()
            }, 1000)
          }
        }
      },
      async autoSearch () {
        /**
         * 若当前时间晚于08:00，则自动搜索当天08:00-当前时间的数据
         * 若当前时间早于08:00，则自动搜索昨天08:00-当前时间的数据
         */
        let thisEight = new Date(new Date().toLocaleDateString()).getTime() + 8 * 60 * 60 * 1000
        let lastEight = new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 + 1000 + 8 * 60 * 60 * 1000
        let now = new Date()
        if (now.getTime() <= thisEight) {
          // 若当前时间早于08:00，则自动搜索昨天08:00-当前时间的数据
          this.screenConditions.startTime = new Date(lastEight)
          this.screenConditions.endTime = now
        } else {
          // 若当前时间晚于08:00，则自动搜索当天08:00-当前时间的数据
          this.screenConditions.startTime = new Date(thisEight)
          this.screenConditions.endTime = now
        }
        await this.search()
      },
      async search () {
        this.inSearching = true
        this.$store.state.iView.LoadingBar.start()
        let searchLoading = this.$Message.loading({
          content: '搜索中...',
          duration: 0
        })
        this.stopAutoRefresh()
        try {
          let queryChartData = await this.$store.dispatch(types.AJAX, {
            baseUrl: this.requestInfo.baseUrl,
            url: this.requestInfo.queryChart,
            data: {
              startTime: this.screenConditions.startTime,
              endTime: this.screenConditions.endTime
            }
          })
          this.results = (queryChartData.groups || [])
          this.resultOfTime = {
            startTime: queryChartData.startTime,
            endTime: queryChartData.endTime
          }
          this.$Message.success('搜索成功')
          setTimeout(searchLoading, 100)
          this.$store.state.iView.LoadingBar.finish()
        } catch (err) {
          this.$Message.error('搜索失败')
          setTimeout(searchLoading, 100)
          this.$store.state.iView.LoadingBar.error()
        }
        this.inSearching = false
        // 搜索完，重置自动搜索时间
        this.resetCountdownTime()
        this.startAutoRefresh()
        setTimeout(() => {
          this.countdownRefresh()
        }, 1)
      },
      tabChanged (evt) {
        let outIndex = this.currentIndex
        let i = 0
        for (i; i < this.results.length; i++) {
          if (this.results[i].group === evt) {
            outIndex = i
            i = this.results.length
          }
        }
        this.currentIndex = outIndex
      },
      toggleScreenCondition () {
        this.showScreenConditions = !this.showScreenConditions
      },
      searchTimeChanged (evt) {
        this.screenConditions.startTime = evt[0]
        this.screenConditions.endTime = evt[1]
      },
      exportXlsx () {
        this.exportXlsxLoading = true
        let results = JSON.parse(JSON.stringify(this.results))
        let i = 0
        let _sheetNames = []
        for (i; i < results.length; i++) {
          _sheetNames.push(results[i].group)
        }
        this.formatAllXlsxData()
        let wb = {SheetNames: _sheetNames, Sheets: {}, Props: {}}
        for (let j = 0; j < _sheetNames.length; j++) {
          wb.Sheets[_sheetNames[j]] = XLSX.utils.json_to_sheet(this.xlsxData[j])
        }
        let _fname = ''
        if (this.resultOfTime.startTime && this.resultOfTime.endTime) {
          _fname = this.resultOfTime.startTime + ' 至 ' + this.resultOfTime.endTime + '-'
        }
        this.saveAs(new Blob([this.s2ab(XLSX.write(wb, this.xlsxOpts))], {type: 'application/octet-stream'}), _fname + '数据报表.' + (String(this.xlsxOpts.bookType) === 'biff2' ? 'xls' : this.xlsxOpts.bookType))
        setTimeout(() => {
          this.exportXlsxLoading = false
        }, 800)
      },
      getXlsxKey () {
        let userKeys = JSON.parse(JSON.stringify(this.userKeys))
        let i = 0
        let outKey = {}
        for (i; i < userKeys.length; i++) {
          if (!outKey[userKeys[i].title]) {
            outKey[userKeys[i].title] = userKeys[i].key
          }
        }
        this.xlsxKey = outKey
      },
      formatAllXlsxData () {
        let results = JSON.parse(JSON.stringify(this.results))
        let i = 0
        let outData = []
        for (i; i < results.length; i++) {
          outData.push(this.formatXlsxData(i))
        }
        this.xlsxData = outData
      },
      formatXlsxData (index) {
        let _originData = JSON.parse(JSON.stringify(this.results[index].interFaces))
        this.getXlsxKey()
        let i = 0
        let outData = []
        for (i; i < _originData.length; i++) {
          let tempData = JSON.parse(JSON.stringify(this.xlsxKey))
          Object.keys(tempData).forEach((item) => {
            tempData[item] = _originData[i][tempData[item]]
          })
          outData.push(tempData)
        }
        return outData
      },
      saveAs (obj, fileName) {
        let tempa = document.createElement('a')
        tempa.download = fileName || '数据报表'
        tempa.href = URL.createObjectURL(obj)
        tempa.click()
        setTimeout(() => {
          URL.revokeObjectURL(obj)
        }, 100)
      },
      s2ab (s) {
        if (typeof ArrayBuffer !== 'undefined') {
          let buf = new ArrayBuffer(s.length)
          let view = new Uint8Array(buf)
          for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
          return buf
        } else {
          let buf = new Array(s.length)
          for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF
          return buf
        }
      }
    },
    components: {},
    filters: {
      'countdownTime': function (text, onlyMinute) {
        let _allSeconds = parseInt(text) / 1000
        if (onlyMinute) {
          return parseInt(_allSeconds / 60)
        }
        let _h = parseInt(_allSeconds / (60 * 60))
        _allSeconds -= _h * 60 * 60
        let _m = parseInt(_allSeconds / 60)
        _allSeconds -= _m * 60
        let _s = _allSeconds
        let outText = ''
        if (_h < 1) {
          outText = (_m < 10 ? '0' + _m : _m) + ':' + (_s < 10 ? '0' + _s : _s)
        } else {
          outText = (_h < 10 ? '0' + _h : _h) + ':' + (_m < 10 ? '0' + _m : _m) + ':' + (_s < 10 ? '0' + _s : _s)
        }
        return outText
      }
    },
    watch: {
      results: function (value) {
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value[i].interFaces.length; j++) {
            let _outObj = {}
            let warnThreshold = parseFloat(value[i].interFaces[j].warnThreshold)
            if (parseFloat(value[i].interFaces[j].oneThreeRequestsPercent) >= warnThreshold) {
              _outObj['oneThreeRequestsPercent'] = 'data_emphasize_bg'
              _outObj['name'] = 'data_emphasize_bg_2'
            }
            if (parseFloat(value[i].interFaces[j].threeFiveRequestsPercent) >= warnThreshold) {
              _outObj['threeFiveRequestsPercent'] = 'data_emphasize_bg'
              _outObj['name'] = 'data_emphasize_bg_2'
            }
            if (parseFloat(value[i].interFaces[j].fivePlusRequestsPercent) >= warnThreshold) {
              _outObj['fivePlusRequestsPercent'] = 'data_emphasize_bg'
              _outObj['name'] = 'data_emphasize_bg_2'
            }
            if (parseFloat(value[i].interFaces[j]['10minOneThreeRequestsPercent']) >= warnThreshold) {
              _outObj['10minOneThreeRequestsPercent'] = 'data_emphasize_bg'
              _outObj['name'] = 'data_emphasize_bg_2'
            }
            if (parseFloat(value[i].interFaces[j]['10minThreeFiveRequestsPercent']) >= warnThreshold) {
              _outObj['10minThreeFiveRequestsPercent'] = 'data_emphasize_bg'
              _outObj['name'] = 'data_emphasize_bg_2'
            }
            if (parseFloat(value[i].interFaces[j]['10minFivePlusRequestsPercent']) >= warnThreshold) {
              _outObj['10minFivePlusRequestsPercent'] = 'data_emphasize_bg'
              _outObj['name'] = 'data_emphasize_bg_2'
            }
            value[i].interFaces[j].cellClassName = _outObj
          }
        }
      }
    }
  }
</script>
