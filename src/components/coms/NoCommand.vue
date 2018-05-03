<template>
  <div class="no_command_container">
    <Form :label-width="100" class="robot_select_form" :class="{hidden: connectStatus}" :ref="robotSelectFormRef">
      <FormItem label="切换Robot" :ref="selectRef">
        <Select v-model="connectRobotId" placeholder="请选择" :label-in-value="true" @on-change="robotChanged">
          <Option value="">请选择</Option>
          <Option v-for="(robot) in robots" :key="robot.uuid" :value="robot.uuid" v-text="robot.username"></Option>
        </Select>
      </FormItem>
      <FormItem label="密码">
        <Input placeholder="密码" v-model="robotPassword"/>
      </FormItem>
      <FormItem>
        <Button type="primary" :loading="connecting" @click="connectRobot" v-if="connectRobotId !== '' && robotPassword !== ''">
          <span v-if="!connecting">连接</span>
          <span v-else>连接中...</span>
        </Button>
        <Button type="primary" disabled v-else>连接</Button>
      </FormItem>
    </Form>
    <div class="cmd_container">
      <Row>
        <Col class="cmd_item_container" :xs="6" :sm="6" v-for="(cmd, index) in commands" :key="cmd.name">
          <div class="cmd_item" :data-name="cmd.name" :data-index="index" @click="showCommandDetail" :style="{width: parseFloat(windowBox.width / 4) + 'px', height: parseFloat(windowBox.width / 4) + 'px', backgroundColor: webColors[index % webColors.length].bg}">
            <span class="cmd_item_text" v-text="cmd.text"></span>
          </div>
        </Col>
      </Row>
    </div>
    <div class="popup_container" :class="{shown: popup.shown}">
      <div class="popup_header_container">
        <div class="popup_header_back_container" @click="closeCommandDetail">
          <Icon size="18" type="ios-arrow-left"></Icon>
        </div>
        <span v-text="currentCommand && currentCommand.text"></span>
      </div>
      <div class="popup_body_container">
        <component :is="popup.component"></component>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .no_command_container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .robot_select_form {
    width: 100%;
    padding-right: 30px;
    box-sizing: border-box;
    opacity: 1;
    -webkit-transition: all .5s ease-in-out;
    -moz-transition: all .5s ease-in-out;
    -ms-transition: all .5s ease-in-out;
    -o-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
  }
  .robot_select_form.hidden {
    opacity: 0;
  }
  .robot_connected_name {
    position: absolute;
    left: 108px;
    opacity: 0;
    display: block;
    height: 30px;
    line-height: 32px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*padding-left: 8px;*/
    /*padding-right: 24px;*/
    pointer-events: none;
    -webkit-transition: opacity .3s ease-in-out, top .5s ease-in-out, font-size .5s ease-in-out;
    /*-moz-transition: opacity .2s ease-in-out;*/
    /*-ms-transition: opacity .2s ease-in-out;*/
    /*-o-transition: opacity .2s ease-in-out;*/
    /*transition: opacity .2s ease-in-out;*/
  }
  .cmd_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 1;
    -webkit-transition: all .4s ease-in-out;
    -moz-transition: all .4s ease-in-out;
    -ms-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }
  .cmd_item_container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cmd_item {
    border: 1px solid #f5f5f5;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    overflow: hidden;
  }
  .cmd_item_text {
    color: #fff;
    font-size: 14px;
    pointer-events: none;
  }

  .popup_container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    opacity: 0;
    -webkit-transform: translate(0, 100%);
    -moz-transform: translate(0, 100%);
    -ms-transform: translate(0, 100%);
    -o-transform: translate(0, 100%);
    transform: translate(0, 100%);
    -webkit-transition: all .4s ease-in-out;
    -moz-transition: all .4s ease-in-out;
    -ms-transition: all .4s ease-in-out;
    -o-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
  }
  .popup_container.shown {
    opacity: 1;
    -webkit-transform: translate(0, 0%);
    -moz-transform: translate(0, 0%);
    -ms-transform: translate(0, 0%);
    -o-transform: translate(0, 0%);
    transform: translate(0, 0%);
  }
  .popup_header_container {
    position: relative;
    width: 100%;
    height: 48px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup_header_back_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 32px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup_body_container {
    width: 100%;
    height: calc(100% - 48px);
  }
</style>
<script>
import * as types from '../../store/mutation-types'
const io = require('socket.io-client')
export default {
  name: 'NoCommand',
  data () {
    return {
      robots: [],
      requestInfo: this.$store.state.requestInfo,
      connectRobotId: '',
      connectRobotName: '',
      robotPassword: '',
      connecting: false,
      connectStatus: false,
      selectRef: 'select-ref',
      robotSelectFormRef: 'robot-select-form-ref',
      socket: this.$store.state.socket,
      windowBox: {},
      popup: {
        shown: false,
        component: ''
      },
      commands: [
        {
          name: 'play-music',
          text: '播放音乐'
        }
      ],
      currentCommand: {},
      webColors: [
        {
          bg: '#9933CC',
          color: '#ffffff'
        },
        {
          bg: '#6633CC',
          color: '#ffffff'
        },
        {
          bg: '#993333',
          color: '#ffffff'
        },
        {
          bg: '#CC3333',
          color: '#ffffff'
        },
        {
          bg: '#CC6633',
          color: '#ffffff'
        },
        {
          bg: '#993366',
          color: '#ffffff'
        },
        {
          bg: '#000000',
          color: '#ffffff'
        },
        {
          bg: '#3333CC',
          color: '#ffffff'
        },
        {
          bg: '#336633',
          color: '#ffffff'
        },
        {
          bg: '#3366CC',
          color: '#ffffff'
        },
        {
          bg: '#339933',
          color: '#ffffff'
        },
        {
          bg: '#3399CC',
          color: '#ffffff'
        },
        {
          bg: '#663333',
          color: '#ffffff'
        }
      ]
    }
  },
  computed: {
    robot () {
      return this.$store.state.robot
    },
    loginInfo () {
      return this.$store.state.loginInfo
    }
  },
  async created () {
    await this.getAllRobots()
    this.$nextTick(() => {
      if (this.robot.id && this.robot.name) {
        this.connectRobotId = this.robot.id
        this.connectRobotName = this.robot.name
        this.connectStatus = true
      }

      this.windowBox = document.documentElement.getBoundingClientRect()
    })
  },
  methods: {
    async getAllRobots () {
      let listData = await this.$store.dispatch(types.AJAX, {
        baseUrl: this.requestInfo.baseUrl,
        url: this.requestInfo.listRobots,
        data: {}
      })
      if (listData.status === 200 && listData.data && listData.data.list) {
        this.robots = listData.data.list
      }
    },
    async connectRobot () {
      this.connecting = true
      let connectData = await this.$store.dispatch(types.AJAX, {
        baseUrl: this.requestInfo.baseUrl,
        url: this.requestInfo.connectRobot,
        data: {
          uuid: this.connectRobotId,
          password: this.robotPassword
        }
      })
      setTimeout(() => {
        this.connecting = false
        if (connectData.status === 200) {
          this.$Message.success('连接成功')
          this.connectStatus = true
          this.$store.commit(types.CONNECT_ROBOT, {
            robot: {
              id: this.connectRobotId,
              name: this.connectRobotName
            }
          })
          this.connectSocket()
        } else {
          this.$Message.warning('连接失败')
          this.connectStatus = false
        }
        this.robotPassword = ''
      }, 800)
    },
    robotChanged (e) {
      this.connectRobotName = e.label
      this.robotPassword = ''
    },
    sleep (ts) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true)
        }, ts)
      }).catch(() => {
        return false
      })
    },
    connectSocket () {
      const socket = io(`${this.socket.server}:${this.socket.port}`, {
        path: this.socket.path,
        query: {
          token: this.loginInfo.token,
          username: this.loginInfo.username,
          phonenum: this.loginInfo.phonenum,
          role: this.loginInfo.role
        },
        transports: ['websocket']
      })
      this.$store.commit(types.SET_SOCKET, {
        socket: socket
      })
    },
    showCommandDetail (e) {
      this.currentCommand = this.commands[Number(e.target.dataset.index)]
      this.popup.shown = true
      this.popup.component = e.target.dataset.name
    },
    closeCommandDetail () {
      this.currentCommand = {}
      this.popup.shown = false
      this.popup.component = ''
    }
  },
  components: {
    PlayMusic: () => import('./PlayMusic.vue')
  }
}
</script>
