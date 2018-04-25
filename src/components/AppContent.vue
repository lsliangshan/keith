<template>
  <div class="app_content" :class="{'window_full_screen': isFullScreen}">
    <Row type="flex" class="h100p">
      <Col :span="spanLeft">
        <app-side-menu :menuItems="menuItems"></app-side-menu>
      </Col>
      <Col :span="spanRight">
        <app-main-content-blank v-if="showBlankContent"></app-main-content-blank>
        <div class="content_router_container" v-else>
          <transition name="content-router-transition"
                      enter-active-class="animated fadeIn"
                      leave-active-class="animated fadeOut"
          >
            <keep-alive>
              <router-view class="content_router_view" name="ContentRouter"/>
            </keep-alive>
          </transition>
        </div>
      </Col>
    </Row>
  </div>
</template>
<style scoped>
  .h100p {
    height: 100%;
  }
  .app_content {
    position: absolute;
    top: 61px;
    left: 0;
    width: 100%;
    height: calc(100% - 61px);
    /*border-left: 1px solid #d7dde4;*/
    box-sizing: border-box;
    overflow: hidden;
    background-color: #f5f7f9;
  }
  .window_full_screen {
    top: 60px!important;
    height: calc(100% - 60px)!important;
  }
  .content_router_container {
    width: 100%;
    height: 100%;
  }
</style>
<script>
  import * as types from '../store/mutation-types'
  export default {
    name: 'AppContent',
    data () {
      return {
        appName: this.$store.state.appName,
        assets: this.$store.state.assets,
        requestInfo: this.$store.state.requestInfo,
        menuItems: []
      }
    },
    computed: {
      showBlankContent () {
        return (this.$route.path === '/')
      },
      spanLeft () {
        return this.$store.state.spanLeft
      },
      spanRight () {
        return this.$store.state.spanRight
      },
      menuFold () {
        return this.$store.state.menuFold
      },
      isFullScreen () {
        return this.$store.state.isFullScreen
      }
    },
    async created () {
      await this.getAllOperationConfigGroup()
    },
    methods: {
      packageMenuItems (groups) {
        let menuItems = [
          {
            name: 'ads',
            text: '页面广告位管理',
            icon: 'stats-bars',
            children: [
            ]
          },
          {
            name: 'cards',
            text: '首页卡片管理',
            icon: 'ios-browsers-outline',
            children: [
              {
                name: 'index',
                text: '卡片管理'
              }
            ]
          }
        ]
        let i = 0
        for (i; i < groups.length; i++) {
          menuItems[0].children.push(Object.assign({}, {
            name: groups[i].weexType.toLowerCase(),
            text: groups[i].weexType.toLowerCase()
          }, {
            data: groups[i]
          }))
        }
        this.menuItems = menuItems
        // 缓存menuItems
        this.$store.commit(types.CACHE_MENU_ITEMS, {
          menuItems: JSON.parse(JSON.stringify(menuItems))
        })
      },
      async getAllOperationConfigGroup () {
        let operationConfigGroupData = await this.$store.dispatch(types.AJAX, {
          baseUrl: this.requestInfo.baseUrl,
          url: this.requestInfo.getAllOperationConfigGroup + '?access_token=' + this.requestInfo.token,
          method: 'GET'
        })
        if (operationConfigGroupData.status === 200) {
          // 获取数据失败
          this.$router.go(0)
        } else {
          this.packageMenuItems(operationConfigGroupData.data)
        }
      }
    },
    components: {
      AppSideMenu: () => import('./AppSideMenu.vue'),
      AppMainContentBlank: () => import('./AppMainContentBlank.vue')
    }
  }
</script>
