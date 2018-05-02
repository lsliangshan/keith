<template>
  <div class="login_container">
    <div class="login_bg_container"></div>
    <div class="login_form">
      <div class="login_form_header">
        <span v-text="shortAppName"></span>
      </div>
      <div class="login_form_item">
        <div class="login_form_input">
          <div class="login_form_input_icon_container">
            <img class="login_form_input_icon" src="/static/images/username.png">
          </div>
          <input type="text" v-model="formData.username" placeholder="用户名"/>
        </div>
        <span class="login_form_item_tip" v-text="validateMessages.username"></span>
      </div>
      <div class="login_form_item">
        <div class="login_form_input">
          <div class="login_form_input_icon_container">
            <img class="login_form_input_icon" style="width: 15px; height: 15px;" src="/static/images/password.png">
          </div>
          <input type="text" v-model="formData.password" placeholder="密码"/>
        </div>
        <span class="login_form_item_tip" v-text="validateMessages.password"></span>
      </div>
      <div class="login_form_item">
        <button :class="{disabled: !loginAvailable}" @click="login">登录</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @import "../../static/css/theme";
  .login_container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login_bg_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: url("https://static.dei2.com/plugins_admin/assets/img/bg_login.jpg");
    background-size: cover;
    background-attachment: fixed;
    background-position: 50% 50%;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=5, MakeShadow=false);
  }
  .login_form {
    width: 80%;
    /*min-height: 400px;*/
    border-radius: 5px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .login_form_header {
    width: 100%;
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
  }
  .login_form_item {
    width: 100%;
    height: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .login_form_input {
    position: relative;
    width: 80%;
    height: 36px;
  }
  .login_form_input_icon_container {
    position: absolute;
    width: 36px;
    height: 36px;
    left: 0;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login_form_input_icon {
    width: 24px;
    height: 24px;
  }
  .login_form_item input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    outline: none;
    border: none;
    padding: 0 10px 0 36px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 3px;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -ms-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }
  .login_form_item button {
    width: 80%;
    height: 36px;
    outline: none;
    border: none;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 3px;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -ms-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }
  .login_form_item button.disabled {
    background-color: buttonface;
    color: #ababab;
  }
  .login_form_item button {
    background-color: $theme;
    color: #fff;
  }
  .login_form_item button:active {
    opacity: 0.7;
  }
  .login_form_item button.disabled:active {
    background-color: buttonface;
    color: #ababab;
    opacity: 1;
  }
  .login_form_item_tip {
    width: 80%;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 10px;
    color: red;
  }
</style>
<script>
import utils from '../utils'
import * as types from '../store/mutation-types'
export default {
  name: 'Login',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    shortAppName () {
      return this.$store.state.shortAppName
    },
    validateMessages () {
      return this.verify()
    },
    loginAvailable () {
      return (Object.keys(this.validateMessages).length === 0)
    }
  },
  methods: {
    verify () {
      let _formData = this.formData
      let outMessages = {}
      if (!_formData.username || _formData.username.trim() === '') {
        outMessages.username = '用户名不能为空'
      }
      if (!_formData.password || _formData.password.trim() === '') {
        outMessages.password = '密码不能为空'
      }
      return outMessages
    },
    resetFormItems () {
      this.formData.password = ''
    },
    login () {
      const that = this
      this.$store.dispatch(types.LOGIN, {
        username: this.formData.username,
        password: this.formData.password,
        callback (res) {
          that.resetFormItems()
          if (Number(res.status) === 200) {
            // 登录成功
            if (res.data.status === 1) {
              alert('登录成功')
              utils.storage.setItem(that.$store.state.localStorageKeys.userInfo, res.data)
              that.$store.commit(types.UPDATE_LOGIN_INFO, res.data)
            } else {
              utils.storage.removeItem(that.$store.state.localStorageKeys.userInfo)
              alert('您的账号已经被锁定，请联系管理员')
            }
          } else {
            alert('登录失败: ' + res.message)
          }
        }
      })
    }
  },
  components: {}
}
</script>
