/***
 **                                                          _ooOoo_
 **                                                         o8888888o
 **                                                         88" . "88
 **                                                         (| -_- |)
 **                                                          O\ = /O
 **                                                      ____/`---'\____
 **                                                    .   ' \\| |// `.
 **                                                     / \\||| : |||// \
 **                                                   / _||||| -:- |||||- \
 **                                                     | | \\\ - /// | |
 **                                                   | \_| ''\---/'' | |
 **                                                    \ .-\__ `-` ___/-. /
 **                                                 ___`. .' /--.--\ `. . __
 **                                              ."" '< `.___\_<|>_/___.' >'"".
 **                                             | | : `- \`.;`\ _ /`;.`/ - ` : | |
 **                                               \ \ `-. \_ __\ /__ _/ .-` / /
 **                                       ======`-.____`-.___\_____/___.-`____.-'======
 **                                                          `=---='
 **
 **                                       .............................................
 **                                              佛祖保佑             永无BUG
 **                                      佛曰:
 **                                              写字楼里写字间，写字间里程序员；
 **                                              程序人员写程序，又拿程序换酒钱。
 **                                              酒醒只在网上坐，酒醉还来网下眠；
 **                                              酒醉酒醒日复日，网上网下年复年。
 **                                              但愿老死电脑间，不愿鞠躬老板前；
 **                                              奔驰宝马贵者趣，公交自行程序员。
 **                                              别人笑我忒疯癫，我笑自己命太贱；
 **                                              不见满街漂亮妹，哪个归得程序员？
 */
/**
 * Created by liangshan on 2017/7/13.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions: actions.actions,
  mutations: mutations.mutations,
  getters: getters.getters,
  state: {
    username: 'ls',
    author: '智愚',
    appName: 'Robot Controller',
    fullAppName: 'Robot控制台',
    shortAppName: 'R',
    socket: {
      // server: 'http://192.168.189.89',
      server: 'https://kapi.dei2.com',
      // server: 'http://192.168.0.103',
      // server: PROTOCOL + '//wss.dei2.com',
      port: '3011',
      path: '/cmd',
      event: 'enkel-message',
      client: {}
    },
    musicBox: {
      play: false, // 是否播放中
      audio: {} // 音乐对象
    },
    socketEvents: {
      changeUserRole: 'change-user-role',
      reviewPlugin: 'review-plugin',
      sendMessage: 'send-message'
    },
    robot: {
      name: '',
      id: ''
    },
    localStorageKeys: {
      userInfo: 'user-info'
    },
    requestInfo: {
      // baseUrl: 'http://192.168.189.89:3001',
      baseUrl: 'https://kapi.dei2.com',
      // baseUrl: 'http://192.168.0.103:3001',
      login: '/Kapi/index/login',
      listRobots: '/Kapi/robot/list',
      connectRobot: '/Kapi/robot/connect',
      sse: '/Kapi/robot/sse',
      nem: { // 网易云音乐
        search: '/Kapi/nem/search', // 搜索歌曲列表
        url: '/Kapi/nem/url', // 通过音乐id获取音频真实地址
        detail: '/Kapi/nem/detail', // 通过音乐id获取音乐详情
        lyric: '/Kapi/nem/lyric', // 通过音乐id获取歌词
      }
    },
    loginInfo: {},
    needlessLogin: ['Login', 'Register', 'Forget', 'ActivityPreview', 'ArticleList', 'ArticleView'] // 不需要登录的页面
  }
})

export default store

global.store = store
