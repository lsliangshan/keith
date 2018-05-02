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
    <span class="robot_connected_name" :ref="connectNameRef" :style="{top: selectBox.top + 'px'}" v-text="connectRobotName"></span>
  </div>
</template>
<style scoped>
  .no_command_container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
</style>
<script>
import * as types from '../../store/mutation-types'
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
      connectNameRef: 'connect-name-ref',
      robotSelectFormRef: 'robot-select-form-ref',
      selectBox: {}
    }
  },
  async created () {
    await this.getAllRobots()
    this.$nextTick(() => {
      this.selectBox = this.$refs[this.selectRef].$el.getBoundingClientRect()
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
          alert('连接成功')
          this.connectStatus = true
        } else {
          alert('连接失败')
          this.connectStatus = false
        }
        this.robotPassword = ''
      }, 800)
    },
    robotChanged (e) {
      this.connectRobotName = e.label
      this.robotPassword = ''
      setTimeout(() => {
        this.selectBox = this.$refs[this.selectRef].$el.getBoundingClientRect()
        this.animateInName()
        setTimeout(() => {
          this.animateOutName()
        }, 3000)
      }, 10)
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
    async animateInName () {
      let connectNameRefEle = this.$refs[this.connectNameRef]
      let robotSelectFormEle = this.$refs[this.robotSelectFormRef]
      connectNameRefEle.style.opacity = 1
      await this.sleep(100)
      robotSelectFormEle.$el.style.opacity = 0
      await this.sleep(500)
      robotSelectFormEle.$el.style.display = 'none'
      connectNameRefEle.style.fontSize = '18px'
      await this.sleep(200)
      connectNameRefEle.style.top = '16px'
      connectNameRefEle.style.left = (document.documentElement.getBoundingClientRect().width - connectNameRefEle.getBoundingClientRect().width) / 2 + 'px'
    },
    async animateOutName () {
      let connectNameRefEle = this.$refs[this.connectNameRef]
      let robotSelectFormEle = this.$refs[this.robotSelectFormRef]
      connectNameRefEle.style.top = this.selectBox.top + 'px'
      connectNameRefEle.style.fontSize = '12px'
      connectNameRefEle.style.left = '108px'
      await this.sleep(600)
      robotSelectFormEle.$el.style.display = 'block'
      await this.sleep(10)
      robotSelectFormEle.$el.style.opacity = '1'
      await this.sleep(200)
      connectNameRefEle.style.opacity = 0
    }
  },
  components: {}
}
</script>
