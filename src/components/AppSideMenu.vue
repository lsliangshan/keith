<template>
  <div class="developer_side_menu_container">
    <Menu ref="sideMenu" theme="dark" width="auto" class="main_menu_container" @on-select="navToPluginView" :active-name="mainMenu + '-' + subMenu">
      <div v-for="(mainItem, index) in menuItems" :key="index">
        <Submenu :name="mainItem.name" v-if="!menuFold">
          <template slot="title">
            <Icon :type="mainItem.icon"></Icon>
            <span v-text="mainItem.text"></span>
          </template>
          <MenuItem v-for="(item, idx) in mainItem.children" :key="idx" :name="mainItem.name + '-' + item.name" v-text="item.text"></MenuItem>
        </Submenu>
        <a href="javascript:" class="np side_menu_item" v-else>
          <Poptip trigger="hover" :transfer="true" class="icon_only" placement="right">
            <Icon :type="mainItem.icon" size="28"></Icon>
            <div class="api" slot="content">
              <div class="menu_dropdown_items">
                <div class="menu_dropdown_item" v-for="(item, idx) in mainItem.children" :key="idx" :name="mainItem.name + '-' + item.name" v-text="item.text" @click="navToPluginView(mainItem.name + '-' + item.name)"></div>
              </div>
            </div>
          </Poptip>
        </a>
      </div>
    </Menu>
  </div>
</template>
<style>
  .developer_side_menu_container {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  .main_menu_container {
    height: 100%;
    overflow-y: auto;
  }
  .developer_side_menu_container .icon_only {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  .developer_side_menu_container .icon_only .ivu-poptip-rel {
    width: 100%;
  }
  .developer_side_menu_container .ivu-poptip-body {
    padding: 8px 0;
  }
  .developer_side_menu_container .np {
    padding-left: 0!important;
    padding-right: 0!important;
  }
  .menu_dropdown_items {
    line-height: normal;
    clear: both;
    color: rgb(73, 80, 96);
    white-space: nowrap;
    cursor: pointer;
    font-size: 12px;
    margin: 0px;
    /*padding: 7px 16px;*/
    list-style: none;
    transition: background 0.2s ease-in-out;
  }
  .menu_dropdown_item {
    /*background-color: rgba(169,134,255,0.38);*/
    margin: 0;
    line-height: normal;
    padding: 7px;
    clear: both;
    color: #495060;
    font-size: 12px!important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    -webkit-transition: background .2s ease-in-out;
    transition: background .2s ease-in-out;
  }
  .menu_dropdown_item:hover {
    background: #f3f3f3;
  }
  .side_menu_item {
    display: block;
    padding: 14px 0;
    outline: 0;
    list-style: none;
    font-size: 14px;
    position: relative;
    z-index: 1;
    cursor: pointer;
    color: rgba(255, 255, 255, .7);
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
  }
  .side_menu_item:hover {
    color: rgba(255, 255, 255, 1);
  }
</style>
<script>
  export default {
    name: 'AppSideMenu',
    props: {
      menuItems: {
        type: Array
      }
    },
    data () {
      return {
        contentRouterViewLoader: this.$store.state.contentRouterViewLoader,
        eventHub: this.$store.state.eventHub,
        events: this.$store.state.events,
        mainMenu: '',
        subMenu: ''
//        ,
//        menuItems: [
//          {
//            name: 'ads',
//            text: '页面广告位管理',
//            icon: 'stats-bars',
//            children: [
//              {
//                name: 'banner',
//                text: 'banner管理'
//              },
//              {
//                name: 'entrance',
//                text: '四大入口管理'
//              }
//            ]
//          }
//        ]
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      },
//      mainMenu () {
//        return this.$route.path.split('/')[1]
//      },
//      subMenu () {
//        return this.$route.path.split('/')[2]
//      },
      menuFold () {
        return this.$store.state.menuFold
      }
    },
    watch: {
      '$route': function (val) {
        this.mainMenu = val.path.split('/')[1]
        this.subMenu = val.path.split('/')[2]
      },
      'menuFold': function (val) {
        if (!val) {
          setTimeout(() => {
            if (this.$refs.sideMenu) {
              this.$refs.sideMenu.updateActiveName()
            }
          }, 10)
        }
      }
    },
    created () {
      this.$nextTick(() => {
        this.mainMenu = this.$route.path.split('/')[1]
        this.subMenu = this.$route.path.split('/')[2]
      })
    },
    methods: {
      findDataByName (group, name) {
        let menuItems = JSON.parse(JSON.stringify(this.menuItems))
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
      navToPluginView (e) {
        this.$router.replace({
//          name: 'AdsIndex',
          path: `/${e.split('-')[0]}/${e.split('-')[1]}`,
          params: {
            adsType: e.split('-')[1],
            data: this.findDataByName(e.split('-')[0], e.split('-')[1])
          }
        })
      }
    }
  }
</script>
