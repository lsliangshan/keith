<template>
  <div class="no_command_container">
    <select v-model="connectRobot">
      <option value="">请选择</option>
      <option v-for="(robot) in robots" :key="robot.uuid" :value="robot.uuid" v-text="robot.username"></option>
    </select>
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
</style>
<script>
import * as types from '../../store/mutation-types'
export default {
  name: 'NoCommand',
  data () {
    return {
      robots: [],
      requestInfo: this.$store.state.requestInfo,
      connectRobot: ''
    }
  },
  async created () {
    await this.getAllRobots()
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
    }
  },
  components: {}
}
</script>
