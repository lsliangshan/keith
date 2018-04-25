<template>
  <div class="zpm_card_container">
    <div class="card_item">
      <div class="card_item_inner">
        <div class="card_header_title top-title">
          <span class="title" v-text="data.category" contenteditable data-type="category" @input="change"></span>
        </div>
        <div class="card_main_container">
          <div class="card_main_left">
            <img :src="data.image" class="card_main_left_image"/>
            <!--<img :src="data.image" resize="cover" class="card_main_left_image"/>-->
          </div>
          <div class="card_main_right">
            <div class="card_main_right_wrapper">
              <div class="card_main_right_title">
                <span class="card_main_right_title_text" v-text="data.title"></span>
              </div>
              <div class="card_main_right_sub_title">
                <span class="card_main_right_sub_title_text" v-text="data.content"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="card_bottom_container">
          <div class="card_bottom_left">
            <img :src="data.btn.ok.icon" class="card_bottom_left_image"/>
            <!--<img :src="data.btn.ok.icon" resize="cover" class="card_bottom_left_image"/>-->
          </div>
          <div class="card_bottom_right">
            <span class="card_bottom_right_text" v-text="data.btn.ok.text"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .zpm_card_container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card_item {
    /*width: 750px;*/
    /*height: 452px;*/

    width: 375px;
    height: 226px;
  }
  .card_item_inner {
    /*width: 750px;*/
    /*min-height: 400px;*/

    width: 375px;
    height: 100%;
    min-height: 200px;
  }

  .card_header_title {
    /*width: 750px;*/
    /*height: 28px;*/
    /*padding: 0 32px;*/
    background-color: #ffffff;

    width: 375px;
    height: 14px;
    padding: 0 16px;
  }

  .title {
    /*font-size: 32px;*/
    /*margin-top: 36px;*/
    color: #282828;
    font-weight: 500;

    font-size: 16px;
    margin-top: 18px;
  }

  .top-title {
    /*height: 76px;*/
    /*padding-left: 32px;*/
    /*padding-right: 32px;*/
    flex-direction: row;
    align-items: center;

    height: 38px;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
  }

  .card_main_container {
    /*width: 750px;*/
    /*padding: 32px;*/
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #f2f2f2;
    background-color: #ffffff;

    width: 375px;
    padding: 16px;
  }
  .card_main_left {
    /*width: 232px;*/
    /*height: 236px;*/

    width: 116px;
    height: 118px;
  }
  .card_main_left_image {
    /*width: 232px;*/
    /*height: 236px;*/

    width: 116px;
    height: 118px;
  }
  .card_main_right {
    /*width: 450px;*/
    /*height: 236px;*/
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    width: 225px;
    height: 118px;
  }
  .card_main_right_2 {
    /*width: 450px;*/
    /*height: 110px;*/
    position: relative;
    overflow: hidden;

    width: 225px;
    height: 55px;
  }
  .card_main_right_wrapper {
    /*width: 450px;*/
    /*height: 110px;*/
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    width: 225px;
    height: 55px;
  }
  .card_main_right_wrapper_2 {
    position: absolute;
    /*top: 110px;*/
    /*width: 450px;*/
    /*height: 110px;*/
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    top: 55px;
    width: 225px;
    height: 55px;
  }
  .card_main_right_title {
    /*width: 450px;*/
    /*padding-left: 32px;*/
    /*padding-right: 32px;*/

    width: 225px;
    padding-left: 16px;
    padding-right: 16px;
  }
  .card_main_right_title_text {
    /*font-size: 36px;*/
    color: #282828;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    lines: 1;

    font-size: 18px;
  }
  .card_main_right_sub_title {
    /*width: 450px;*/
    /*padding-left: 32px;*/
    /*padding-right: 32px;*/
    /*margin-top: 18px;*/

    width: 225px;
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 9px;
  }
  .card_main_right_sub_title_text {
    /*font-size: 28px;*/
    color: #666666;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    lines: 1;

    font-size: 14px;
  }
  .card_bottom_container {
    /*width: 750px;*/
    /*height: 92px;*/
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;

    width: 375px;
    height: 46px;
    display: flex;
  }
  .card_bottom_left {
    /*width: 40px;*/
    /*height: 40px;*/

    width: 20px;
    height: 20px;
  }
  .card_bottom_left_image {
    /*width: 40px;*/
    /*height: 40px;*/

    width: 20px;
    height: 20px;
  }
  .card_bottom_right {
    /*height: 40px;*/
    display: inline-flex;
    align-items: center;
    justify-content: center;

    height: 20px;
  }
  .card_bottom_right_text {
    /*margin-left: 12px;*/
    /*font-size: 28px;*/
    color: #1A8AFA;

    margin-left: 6px;
    font-size: 14px;
  }

  .card_bottom_right_android {
    /*margin-top: 2px;*/

    margin-top: 1px;
  }
</style>
<script>
  export default {
    name: 'ZpmCard',
    props: {
      data: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        cacheCardData: JSON.parse(JSON.stringify(this.data))
      }
    },
    methods: {
      change (e) {
        this.cacheCardData[e.target.dataset.type] = e.target.innerHTML
      }
    },
    watch: {
      cacheCardData: {
        deep: true,
        handler (val) {
          console.log('.........', val)
        }
      }
    },
    components: {}
  }
</script>
