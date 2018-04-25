<template>
  <div class="cards_index_container">
    <div class="cards_index_inner">
      <div class="cards_index_header">
        <div class="cards_group_description">app首页卡片管理</div>
      </div>
      <div class="cards_body_container">
        <div class="cards_body_active_container cards_body_item_container bb">
          <zpm-draggable element="ul" class="cards_body_draggable_container" v-model="activeCards" :options="dragOptions" :move="onMove">
            <transition-group>
              <li class="card_item item_card" v-for="(card, index) in activeCards" :key="card.name">
                <zpm-card :data="card" @change=""></zpm-card>
                <div slot="foot" class="tag_container">
                  <Icon type="pin" size="20"></Icon>
                  <div class="tag_container_angle_1"></div>
                  <div class="tag_container_angle_2"></div>
                </div>
              </li>
            </transition-group>
          </zpm-draggable>
        </div>
        <div class="" style="width: 100%; height: 100%;">
          <div class="cards_body_inactive_container cards_body_item_container">
            <zpm-draggable element="ul" class="cards_body_draggable_container" v-model="inactiveCards" :options="dragOptions" :move="onMove" v-test>
              <transition-group>
                <li class="card_item item_card" v-for="(card, index) in inactiveCards" :key="card.name">
                  <zpm-card :data="card"></zpm-card>
                </li>
                <li key="footer" class="card_plus">
                  <div class="card_plus_inner">
                    <Icon type="ios-plus-empty" size="100"></Icon>
                  </div>
                </li>
              </transition-group>
            </zpm-draggable>
          </div>
        </div>
      </div>
      <!--<div class="cards_body_container">-->
        <!--<div class="cards_body_inner" style="width: 100%; overflow-x: auto;">-->
          <!--<div class="cards_body_active_container cards_body_item_container bb">-->
            <!--<zpm-draggable element="ul" class="cards_body_draggable_container" v-model="cards" :options="dragOptions" :move="onMove">-->
              <!--<transition-group>-->
                <!--<li class="card_item" v-for="(card, index) in cards" :key="card.name">-->
                  <!--<zpm-card :data="card"></zpm-card>-->
                <!--</li>-->
              <!--</transition-group>-->
            <!--</zpm-draggable>-->
          <!--</div>-->
        <!--</div>-->

        <!--<div class="cards_body_inactive_container cards_body_item_container">-->
          <!--未激活区域-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>
<style scoped>
  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: .3;
  }

  .cards_index_container {
    width: 100%;
    height: 100%;
    background-color: transparent;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .cards_index_inner {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .cards_index_header {
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
  .cards_group_description {
    line-height: 40px;
    color: #ffffff;
    font-size: 14px;
  }
  .cards_body_container {
    position: relative;
    width: 100%;
    height: calc(100% - 40px);
    min-height: 600px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .cards_body_item_container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #f5f5f5;
  }
  .cards_body_draggable_container {
    position: absolute;
    min-width: 100%;
    height: 100%;
  }
  .cards_body_draggable_container span {
    /*width: 100%;*/
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-right: 200px;
  }
  .cards_body_active_container {
    /*background-color: #2d8cf0;*/
  }
  .cards_body_inactive_container {
    /*background-color: lightgray;*/
  }
  .bb {
    border-bottom: 1px solid #ccc;
  }
  .item_card {
    position: relative;
    width: 375px;
    height: 235px;
    /*height: 226px;*/
    /*width: 200px;*/
    /*height: 121px;*/
    /*width: 750px;*/
    /*height: 452px;*/
    margin: 0 10px;
    cursor: move;
    overflow: hidden;
  }

  .tag_container {
    position: absolute;
    right: 0;
    top: 0;
    width: 80px;
    height: 80px;
    background-color: cyan;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tag_container i {
    color: #ffffff;
    font-weight: bold;
    margin-bottom: 25%;
    margin-left: 25%;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .tag_container_angle_1 {
    position: absolute;
    right: -2px;
    top: -2px;
    width: 0;
    height: 0;
    border-top: 21px solid #ffffff;
    border-right: 21px solid #FFFFFF;
    border-left: 21px solid transparent;
    border-bottom: 21px solid transparent;
  }
  .tag_container_angle_2 {
    position: absolute;
    left: -1px;
    bottom: -1px;
    width: 0;
    height: 0;
    border-left: 41px solid #FFFFFF;
    border-bottom: 41px solid #FFFFFF;
    border-top: 41px solid transparent;
    border-right: 41px solid transparent;
  }

  .card_plus {
    position: absolute;
    right: 0;
    top: 0;
    width: 200px;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .card_plus_inner {
    width: 150px;
    height: 226px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }
  .card_plus_inner i {
    font-weight: bold;
  }
</style>
<script>
  export default {
    name: 'CardsIndex',
    data () {
      return {
        fixed: ['arrangement'],
        activeCards: [
          {
            name: 'resumePerfect',
            category: '完善简历',
            title: '你的简历不完整',
            content: '完善简历后，才可以投递哦~',
            image: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/card_resume_perfect_2.png',
            btn: {
              ok: {
                icon: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/icon_resume_perfect_2.png',
                text: '完善简历'
              }
            }
          },
          {
            name: 'forum',
            category: '精彩活动',
            title: '你的潜力 不止于此',
            content: '中国女性领导力高峰论坛开启~',
            image: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/card_forum_2.png',
            btn: {
              ok: {
                icon: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/icon_forum_2.png',
                text: '参与活动'
              }
            }
          },
          {
            name: 'arrangement',
            category: '面试安排',
            title: '你的面试安排',
            content: '面试安排详情',
            image: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/card_arrangement_2.png',
            btn: {
              ok: {
                icon: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/icon_arrangement_2.png',
                text: '查看'
              }
            }
          },
          {
            name: 'invitation',
            category: '面试邀请',
            title: '你的面试邀请',
            content: '面试邀请详情',
            image: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/card_invitation_2.png',
            btn: {
              ok: {
                icon: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/icon_invitation_2.png',
                text: '查看'
              }
            }
          }
        ],
        inactiveCards: [
          {
            name: 'in-resumePerfect',
            category: 'in-完善简历',
            title: 'in-你的简历不完整',
            content: 'in-完善简历后，才可以投递哦~',
            image: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/card_resume_perfect_2.png',
            btn: {
              ok: {
                icon: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/icon_resume_perfect_2.png',
                text: 'in-完善简历'
              }
            }
          },
          {
            name: 'in-forum',
            category: 'in-精彩活动',
            title: 'in-你的潜力 不止于此',
            content: 'in-中国女性领导力高峰论坛开启~',
            image: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/card_forum_2.png',
            btn: {
              ok: {
                icon: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/icon_forum_2.png',
                text: 'in-参与活动'
              }
            }
          },
          {
            name: 'in-arrangement',
            category: 'in-面试安排',
            title: 'in-你的面试安排',
            content: 'in-面试安排详情',
            image: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/card_arrangement_2.png',
            btn: {
              ok: {
                icon: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/icon_arrangement_2.png',
                text: 'in-查看'
              }
            }
          },
          {
            name: 'in-invitation',
            category: 'in-面试邀请',
            title: 'in-你的面试邀请',
            content: 'in-面试邀请详情',
            image: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/card_invitation_2.png',
            btn: {
              ok: {
                icon: 'https://img09.zhaopin.cn/2012/other/mobile/weex/interviewCard/icon_invitation_2.png',
                text: 'in-查看'
              }
            }
          }
        ],
        showFooter: false
      }
    },
    computed: {
      dragOptions () {
        return {
          animation: 300,
          group: 'description',
          disabled: false,
          ghostClass: 'ghost',
          draggable: '.item_card'
        }
      }
    },
    methods: {
      onMove ({relatedContext, draggedContext}) {
//        const relatedElement = relatedContext.element
//        const draggedElement = draggedContext.element
//        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      }
    },
    directives: {
      test: function (el) {
        console.log('>>>>', el)
      }
    },
    components: {
      ZpmCard: () => import('./ZpmCard.vue')
    }
  }
</script>
