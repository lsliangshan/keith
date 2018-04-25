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
    username: 'root',
    password: 'Zhaopin@123',
    author: '智愚',
    appName: 'ROADMAP',
    shortAppName: 'R',
    fullAppName: 'ROADMAP后台管理系统',
    isFullScreen: false,
    spanLeft: 4,
    spanRight: 20,
    menuFold: false, // 左侧菜单是否折叠
    menuItems: [],
    socketEvents: {
      changeUserRole: 'change-user-role',
      reviewPlugin: 'review-plugin',
      sendMessage: 'send-message'
    },
    localStorageKeys: {
      userInfo: 'user-info'
    },
    eventHub: new Vue(),
    events: {
      getNewMessage: 'get-new-message', // 获取到新消息
      updatePluginFileContent: 'update-plugin-file-content', // 更新插件内容
      updatePluginList: 'update-plugin-list', // 更新我的插件列表
      updateAvatar: 'update-avatar', // 更新我的头像
      readMessage: 'read-message' // 消息置为已读
    },
    assets: {
      maleAvatar: '/static/images/avatar_male_1.jpg',
      femaleAvatar: '/static/images/avatar_female_1.jpg'
    },
    requestInfo: {
      token: 'ee2c91d2ed36439ebccb9d8b4a67e282',
      // baseUrl: 'http://172.30.24.71:8081',
      baseUrl: 'http://operationconfig.zhaopin.com',
      // baseUrl: 'http://api.open.zhaopin.com',
      getAllOperationConfigGroup: '/operationcfg/operationconfig/getAllOperationConfigGroup',
      getAllOperationConfigUnit: '/operationcfg/operationconfig/getAllOperationConfigUnit'
    },
    loginInfo: {
      username: '',
      loginTime: ''
    },
    expiresIn: 24 * 60 * 60 * 1000, // 一天
    loaders: {}, // 页面中所有loader对象
    contentRouterViewLoader: 'content-router-view-loader',
    homeRouterViewLoader: 'home-router-view-loader',
    previewLoader: 'preview-loader',
    loadingType: 'ball-triangle-path', // loading样式
    allPlugins: [],
    allRoles: [
      {
        value: 1,
        name: '超级管理员'
      },
      {
        value: 2,
        name: '管理员'
      },
      {
        value: 3,
        name: '开发者'
      },
      {
        value: 4,
        name: '普通用户'
      }
    ],
    needlessLogin: ['Login', 'Register', 'Forget'] // 不需要登录的页面
  }
})

export default store

global.store = store
