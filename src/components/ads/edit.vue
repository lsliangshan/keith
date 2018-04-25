<template>
  <div class="com_edit_ads_container">
    <Form :ref="formRef" :label-width="90" :model="formData" :rules="formRules">
      <Row>
        <Col span="12">
          <FormItem label="标题" prop="name">
            <Input v-model="formData.name" placeholder="请输入标题"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="描述" prop="description">
            <Input v-model="formData.description" placeholder="请输入描述"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="起止时间" prop="description">
            <DatePicker type="datetimerange" :value="[new Date(formData.startTime), new Date(formData.endTime)]" placement="bottom-end" :options="searchTimeTags" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择查询起止时间" @on-change="searchTimeChanged" style="width: 100%;"></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="排序" prop="sort">
            <Input v-model="formData.sort" :number="true" placeholder="请输入排序"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="图片地址" prop="operationModuleInfo.imgUrl">
            <Input v-model="formData.operationModuleInfo.imgUrl" placeholder="请输入图片地址"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="图片名称" prop="operationModuleInfo.title">
            <Input v-model="formData.operationModuleInfo.title" placeholder="请输入图片名称"/>
          </FormItem>
        </Col>
      </Row>
      <p class="edit_form_tips" v-if="['WEEX', 'SEARCH'].indexOf(formData.operationModuleInfo.actionType) > -1">直接跳转(跳转类型为Weex或Search时)请在url后添加参数 "direct=1", 例如: http://m.zhaopin.com?direct=1 或 http://m.zhaopin.com?page=1&direct=1</p>
      <Row>
        <Col span="12">
          <FormItem label="跳转链接" prop="operationModuleInfo.url">
            <Input v-model="formData.operationModuleInfo.url" placeholder="请输入跳转链接"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="跳转类型" prop="operationModuleInfo.actionType">
            <Select v-model="formData.operationModuleInfo.actionType">
              <Option value="H5">H5</Option>
              <Option value="WEEX">WEEX</Option>
              <Option value="NATIVE">NATIVE</Option>
              <Option value="SEARCH">SEARCH</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <div class="advanced_settings_toggle">
        <div class="advanced_settings_toggle_inner" @click="toggleAdvancedSettings">
          <Icon class="advanced_settings_toggle_icon" :class="{open: showAdvancedSettings}" type="ios-arrow-down"></Icon>
          <span class="advanced_settings_toggle_text" v-text="!showAdvancedSettings ? '展开高级设置' : '收起高级设置'"></span>
        </div>
      </div>
      <div class="advanced_settings_container" :class="{shown: showAdvancedSettings}">
        <Row>
          <Col span="12">
            <FormItem label="状态">
              <Select v-model="formData.configStatus">
                <Option value="EFFECTIVE">EFFECTIVE</Option>
                <Option value="UNEFFECTIVE">UNEFFECTIVE</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="配置类型">
              <Select v-model="formData.configType" disabled>
                <Option value="UNIT">UNIT</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="conditionType">
            <Select v-model="formData.config.conditionType">
              <Option value="RANDOM">RANDOM</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="全文关键字">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_1" placeholder="请输入全文关键字"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="职位名称id">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_2" placeholder="请输入职位名称id"/>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="行业id">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_3" placeholder="请输入行业id"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="省市区id">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_4" placeholder="请输入省市区id"/>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="发布时间id">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_5" placeholder="请输入发布时间id"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="工作经验要求id">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_6" placeholder="请输入工作经验要求id"/>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="学历要求id">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_7" placeholder="请输入学历要求id"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="公司性质id">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_8" placeholder="请输入公司性质id"/>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="公司规模id">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_9" placeholder="请输入公司规模id"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="职位类型id">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_10" placeholder="请输入职位类型id"/>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="月薪id">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_11" placeholder="请输入月薪id"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="经纬度">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_12" placeholder="请输入经纬度"/>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="搜索范围">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_13" placeholder="请输入搜索范围"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="职位关键词">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_18" placeholder="请输入职位关键词"/>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="公司名称关键词">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_19" placeholder="请输入公司名称关键词"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="是否校园招聘">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_32" placeholder="请输入是否校园招聘"/>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="隐藏公司列表">
            <Input v-model="formData.operationModuleInfo.params.SF_2_100_33" placeholder="请输入隐藏公司列表"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="排序方式">
            <Input v-model="formData.operationModuleInfo.params.order" placeholder="请输入排序方式"/>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="搜索历史记录名称">
            <Input v-model="formData.operationModuleInfo.params.historyName" placeholder="请输入搜索历史记录名称"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="按距离搜索中心点经纬度">
            <Input v-model="formData.operationModuleInfo.params.SORT_SOU_COORDINATE" placeholder="按距离搜索中心点经纬度"/>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="是否学生">
            <Input v-model="formData.operationModuleInfo.params.isCompus" placeholder="请输入是否学生"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="按照公司分组查询">
            <Input v-model="formData.operationModuleInfo.params.S_SOU_EXPAND" placeholder="按照公司分组查询"/>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="公司编号（精准匹配）">
            <Input v-model="formData.operationModuleInfo.params.isCompus" placeholder="请输入公司编号（精准匹配）"/>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="isDefault">
            <Select v-model="formData.config.isDefault" :transfer="true" placement="top">
              <Option :value="0">否</Option>
              <Option :value="1">是</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="选中的城市">
            <div class="custom_input" @click="showCitySelectorContainer"></div>
          </FormItem>
          </Col>
        </Row>
      </div>
      <FormItem>
        <Button type="primary">确定</Button>
        <Button type="ghost" style="margin-left: 8px;" @click="closeEditorContainer">取消</Button>
      </FormItem>
    </Form>
    <Modal
      v-model="citySelector.shown"
      class-name="zpm_center_modal"
      width="80%"
      :mask-closable="false">
      <p slot="header" style="color: #00B285;">
        <span>选择城市信息</span>
      </p>
      <div class="selected_cities_container">
        <span class="selected_cities_label">已选中的城市:</span>
        <div class="selected_cities_item" v-for="(name, code) in selectedCities" :key="code" :data-code="code.replace(selectedCitiesOffset, '')" @click="removeSelectedCity">
          <span class="selected_cities_text" v-text="name"></span>
          <Icon class="selected_cities_icon" size="24" type="ios-close-empty"></Icon>
        </div>
        <!--<div class="selected_cities_item" v-for="(item, index) in citySelector.selected" :key="item.code" :data-code="item.code" @click="removeSelectedCity">-->
          <!--<span class="selected_cities_text" v-text="item.name"></span>-->
          <!--<Icon class="selected_cities_icon" size="24" type="ios-close-empty"></Icon>-->
        <!--</div>-->
      </div>
      <Tabs type="card" :value="citySelector.items.length > 0 ? citySelector.items[0].code : 'all'" @on-click="tabChanged">
        <TabPane label="全部" name="all">
          <div class="hot_cities_container">
            <p class="city_header">
              热门城市
            </p>
            <div class="hot_cities_list">
              <Row v-for="(item, index) in Math.ceil(hotCities.length / 6)" :key="index">
                <Col span="4" v-for="(itm, idx) in hotCities.slice(index * 6, (index + 1) * 6)" :key="idx">
                  <div class="city_item">
                    <div class="city_item_text_wrapper" :class="{active: selectedCodes.indexOf(itm.code) > -1}" :data-index="index * 6 + idx" @click="chooseFromHotCity">
                    <!--<div class="city_item_text_wrapper" :class="{active: isSelected(itm.code)}" :data-index="index * 6 + idx" @click="chooseFromHotCity">-->
                      <div class="city_item_text">
                        <span v-text="itm.name"></span>
                      </div>
                      <div class="city_item_sub_num" v-if="citySelector.selectSubNumObj[itm.code] && citySelector.selectSubNumObj[itm.code].length > 0" v-text="citySelector.selectSubNumObj[itm.code].length"></div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div class="all_provinces_container">
            <p class="city_header">
              全部省份
            </p>
            <div class="all_province_list">
              <Row v-for="(item, index) in Math.ceil(provinces.length / 6)" :key="index">
                <Col span="4" v-for="(itm, idx) in provinces.slice(index * 6, (index + 1) * 6)" :key="idx">
                  <div class="city_item">
                    <div class="city_item_text_wrapper" :class="{active: selectedCodes.indexOf(itm.code) > -1}" :data-index="index * 6 + idx" @click="chooseFromProvinces">
                      <div class="city_item_text" v-text="itm.name"></div>
                      <div class="city_item_sub_num" v-if="getSelectSubNum(itm.code) > 0" v-text="getSelectSubNum(itm.code)"></div>
                      <!--<div class="city_item_sub_num" v-if="citySelector.selectSubNumObj[itm.code] && citySelector.selectSubNumObj[itm.code].length > 0" v-text="citySelector.selectSubNumObj[itm.code].length"></div>-->
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </TabPane>
        <TabPane v-for="tab in citySelector.items" :key="tab.code" :name="tab.code" :label="tab.name">
          <Row>
            <Col span="4">
              <div class="city_item">
                <div class="city_item_text_wrapper" :class="{active: selectedCodes.indexOf(tab.code) > -1}" :data-code="tab.code" @click="toggleMainCity">
                <!--<div class="city_item_text_wrapper" :class="{active: selectedCodes.indexOf(tab.code) > -1, disabled: parentHasBeenSelected(tab.code)}" :data-code="tab.code" @click="toggleMainCity">-->
                  <div class="city_item_text" v-text="tab.name"></div>
                </div>
              </div>
            </Col>
          </Row>
          <Row v-for="(item, index) in Math.ceil((tab.data.sublist.length - 1) / 6)" :key="index">
            <Col span="4" v-for="(itm, idx) in tab.data.sublist.slice(index * 6 + 1, (index + 1) * 6 + 1)" :key="idx">
              <div class="city_item">
                <keep-alive>
                  <div class="city_item_text_wrapper" :class="{active: selectedCities.hasOwnProperty(selectedCitiesOffset + itm.code), disabled: selectedCodes.indexOf(tab.code) > -1}" :ref="cityRef.sub + itm.code" :data-name="itm.name" :data-code="itm.code" @click="toggleSubCity">
                  <!--<div class="city_item_text_wrapper" :class="{active: selectedCodes.indexOf(itm.code) > -1, disabled: selectedCodes.indexOf(tab.code) > -1 || parentHasBeenSelected(itm.code)}" :data-code="itm.code" @click="toggleSubCity">-->
                    <div class="city_item_text" v-text="itm.name"></div>
                  </div>
                </keep-alive>
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Modal>
  </div>
</template>
<style scoped>
  .custom_input {
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: pointer;
    -webkit-transition: border .2s ease-in-out,background .2s ease-in-out,-webkit-box-shadow .2s ease-in-out;
    transition: border .2s ease-in-out,background .2s ease-in-out,-webkit-box-shadow .2s ease-in-out;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out,-webkit-box-shadow .2s ease-in-out;
  }
  .com_edit_ads_container {
    width: 100%;
    height: 100%;
    padding: 15px;
    overflow-y: auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .edit_form_tips {
    margin-left: 90px;
    /*color: #f0ad4e;*/
    color: #aa6708;
    font-size: 12px;
  }

  .advanced_settings_toggle {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .advanced_settings_toggle_inner {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
  }
  .advanced_settings_toggle_icon {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -ms-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }
  .advanced_settings_toggle_icon.open {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .advanced_settings_toggle_text {
    margin-left: 8px;
  }

  .advanced_settings_container {
    width: 100%;
    height: 0;
    overflow-y: hidden;
    /*-webkit-transform: scaleY(0);*/
    /*-moz-transform: scaleY(0);*/
    /*-ms-transform: scaleY(0);*/
    /*-o-transform: scaleY(0);*/
    /*transform: scaleY(0);*/
    transform-origin: 50% 0;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -ms-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }
  .advanced_settings_container.shown {
    height: 864px;
    /*-webkit-transform: scaleY(1);*/
    /*-moz-transform: scaleY(1);*/
    /*-ms-transform: scaleY(1);*/
    /*-o-transform: scaleY(1);*/
    /*transform: scaleY(1);*/
  }

  .selected_cities_container {
    width: 100%;
    line-height: 40px;
    margin-bottom: 10px;
  }
  .selected_cities_label {
    color: #999999;
    font-size: 13px;
    margin-right: 10px;
  }
  .selected_cities_item {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px 0 20px;
    margin-right: 10px;
    height: 28px;
    border-radius: 14px;
    background-color: #2d8cf0;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
  }
  .selected_cities_text {
    pointer-events: none;
  }
  .selected_cities_icon {
    position: absolute;
    right: 12px;
    font-weight: bold;
    pointer-events: none;
  }

  .hot_cities_container {
    width: 100%;
  }
  .city_header {
    /*color: #000000;*/
    font-weight: 400;
    font-size: 14px;
    font-family: 微软雅黑;
  }
  .city_item {
    width: 100%;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .city_item_text_wrapper {
    position: relative;
    max-width: 100%;
    cursor: pointer;
    color: #2d8cf0;
    border-radius: 2px;
  }
  .city_item_text {
    position: relative;
    padding: 0 10px;
    line-height: 32px;
    font-size: 13px;
    font-family: 微软雅黑;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    pointer-events: none;
  }
  /*.city_item_text:hover {*/
    /*background-color: rgba(45, 140, 240, 0.2);*/
  /*}*/
  /*.city_item_text.disabled {*/
    /*color: rgba(204, 204, 204, 1);*/
    /*cursor: not-allowed;*/
  /*}*/
  /*.city_item_text.disabled:hover {*/
    /*background-color: transparent;*/
  /*}*/
  /*.city_item_text.active {*/
    /*background-color: #2d8cf0;*/
    /*color: #ffffff;*/
    /*font-weight: bold;*/
  /*}*/
  .city_item_text_wrapper:hover {
    background-color: rgba(45, 140, 240, 0.2);
  }
  .city_item_text_wrapper.disabled {
    color: rgba(204, 204, 204, 1);
    cursor: not-allowed;
  }
  .city_item_text_wrapper.disabled:hover {
    background-color: transparent;
    color: rgba(204, 204, 204, 1);
  }
  .city_item_text_wrapper.active {
    background-color: #2d8cf0;
    color: #ffffff;
    font-weight: bold;
  }
  .city_item_sub_num {
    position: absolute;
    pointer-events: none;
    right: -15px;
    top: 0;
    height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    border-radius: 5px;
    background-color: #2d8cf0;
    color: #ffffff;
  }
  .all_provinces_container {
    width: 100%;
  }

</style>
<script>
  import { BASE_DATA_PROVINCES, BASE_DATA_HOT_CITIES } from '../../utils/data'
  import utils from '../../utils/index'
  export default {
    name: 'AdsEdit',
    props: {
      editData: {
        type: Object
      },
      showAdvanced: {
        type: Boolean
      }
    },
    data () {
      return {
        hotCities: BASE_DATA_HOT_CITIES,
        provinces: BASE_DATA_PROVINCES,
        citySelector: {
          shown: true,
          items: [],
          maxSelectedNum: 3, // 最多可选择几项
          selected: [],
          selectSubNumObj: {}
        },
        selectedCodes: [], // 选中的城市的code
        selectedItems: [], // 选中的城市  对象
        selectedCities: {}, // code: name
        selectedCitiesOffset: 'code',
        cityRef: {
          main: 'main-city-ref-',
          sub: 'sub-city-ref-'
        },
        showAdvancedSettings: this.showAdvanced,
        searchTimeTags: {
          shortcuts: [
            {
              text: '今天',
              value () {
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
                const end = new Date()
                return [start, end]
              }
            },
            {
              text: '昨天',
              value () {
                const end = new Date(new Date(new Date().toLocaleDateString()).getTime() - 1000)
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000 + 1000)
                return [start, end]
              }
            },
            {
              text: '最近一个月',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                return [start, end]
              }
            },
            {
              text: '最近三个月',
              value () {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                return [start, end]
              }
            }
          ]
        },
        formData: {
          operationModuleInfo: {
            params: {}
          },
          config: {}
        },
        formRules: {
          name: [
            {
              required: true,
              message: '标题不能为空'
            }
          ],
          description: [
            {
              required: true,
              message: '描述不能为空'
            }
          ],
          sort: [
            {
              required: true,
              message: '排序不能为空'
            },
            {
              type: 'integer',
              message: '排序只能为数字'
            }
          ],
          'operationModuleInfo.imgUrl': [
            {
              required: true,
              message: '图片地址不能为空'
            },
            {
              type: 'url',
              message: '图片地址格式不正确，请以 http:// 或 https:// 或 // 开头'
            },
            {
              pattern: /\.(jpg|jpeg|png)$/,
              message: '图片格式不正确，请输入.jpg|.jpeg|.png格式的图片地址'
            }
          ],
          'operationModuleInfo.title': [
            {
              required: true,
              message: '图片名称不能为空'
            }
          ],
          'operationModuleInfo.url': [
            {
              required: true,
              message: '跳转链接不能为空'
            },
            {
              type: 'url',
              message: '跳转链接格式不正确，请以 http:// 或 https:// 或 // 开头'
            }
          ],
          'operationModuleInfo.actionType': [
            {
              required: true,
              message: '跳转链接类型不能为空'
            }
          ]
        },
        formRef: 'edit-ads-form-ref'
      }
    },
    created () {
      this.$nextTick(() => {
        this.formData = JSON.parse(JSON.stringify(this.editData))
      })
    },
    methods: {
      canSelect () {
        if (this.citySelector.selected.length >= this.citySelector.maxSelectedNum) {
          this.$Notice.warning({
            title: '城市选择',
            desc: `最多选择${this.citySelector.maxSelectedNum}项`
          })
          return false
        }
        return true
      },
      removeFromSelectSubNumObj (code) {
        const that = this
        if (this.citySelector.selectSubNumObj.hasOwnProperty(code)) {
          delete this.citySelector.selectSubNumObj[code]
        } else {
          Object.keys(this.citySelector.selectSubNumObj).forEach(function (item) {
            for (let i = 0; i < that.citySelector.selectSubNumObj[item].length; i++) {
              if (that.citySelector.selectSubNumObj[item][i] === code) {
                that.citySelector.selectSubNumObj[item].splice(i, 1)
                i = that.citySelector.selectSubNumObj[item].length
              }
            }
          })
        }
      },
      parentHasBeenSelected (code) {
        console.time('parentHasBeenSelected')
        let _selected = this.citySelector.selected
        let flag = false
        for (let i = 0; i < _selected.length; i++) {
          if (this.isChildren(code, _selected[i].code)) {
            flag = true
            i = _selected.length
          }
        }
        console.timeEnd('parentHasBeenSelected')
        return flag
      },
      findCityObjByCodeWithDepth (code, arr, depth) {
        let _depth = depth
        if (depth === 0) {
          _depth = 0
        } else {
          _depth = depth || 1
        }
        let outObj = {}
        if (!arr || arr.length < 1) {
          return {}
        }
        let _arr = JSON.parse(JSON.stringify(arr))
        if (_depth > 0) {
          _depth -= 1
          for (let i = 0; i < _arr.length; i++) {
            if (_arr[i].code === code) {
              outObj = _arr[i]
              i = _arr.length
            } else {
              let _sublist = JSON.parse(JSON.stringify(_arr[i].sublist))
              let tempObj = this.findCityObjByCodeWithDepth(code, _sublist, _depth)
              if (!utils.isEmptyObj(tempObj)) {
                outObj = tempObj
              }
            }
          }
        }
        return outObj
      },
      isChildren (childCode, parentCode, depth) {
        let parentObj = this.findCityObjByCodeWithDepth(parentCode, this.provinces, 3)
        let flag = false
        if (!utils.isEmptyObj(parentObj) && parentObj.sublist.length > 0) {
          let _sublist = JSON.parse(JSON.stringify(parentObj.sublist))
          _sublist.shift()
          let _obj = this.findCityObjByCodeWithDepth(childCode, _sublist, depth || 2)
          flag = (!utils.isEmptyObj(_obj))
        }
        return flag
      },
      toggleMainCity (e) {
        const that = this
        let _code = e.target.dataset.code
        if (this.parentHasBeenSelected(_code)) {
          return
        }
        let _index = this.findCityIndexByCode(_code, this.citySelector.selected)
        if (_index >= 0) {
          this.citySelector.selected.splice(_index, 1)
          this.removeFromSelectSubNumObj(_code)
        } else {
          if (!this.canSelect()) {
            return
          }
//          for (let i = 0; i < this.citySelector.items[0].data.sublist.length; i++) {
//            for (let j = 0; j < this.citySelector.selected.length; j++) {
//              if (this.citySelector.items[0].data.sublist[i].code === this.citySelector.selected[j].code) {
//                this.citySelector.selected.splice(j, 1)
//                j--
//              }
//            }
//          }
          let isChild
          for (let k = 0; k < this.citySelector.selected.length; k++) {
            isChild = this.isChildren(this.citySelector.selected[k].code, _code)
            if (isChild) {
              this.citySelector.selected.splice(k, 1)
              k--
            }
          }
          Object.keys(this.citySelector.selectSubNumObj).forEach(function (item) {
            if (that.isChildren(item, _code)) {
              delete that.citySelector.selectSubNumObj[item]
            }
          })
          this.citySelector.selected.push(this.citySelector.items[0])
          if (this.citySelector.selectSubNumObj.hasOwnProperty(String(_code))) {
            delete this.citySelector.selectSubNumObj[String(_code)]
          }
        }
      },
      getSelectSubNum (code) {
        let outNum = 0
        let keys = this.citySelector.selected // Object.keys(this.citySelector.selectSubNumObj)
        for (let i = 0; i < keys.length; i++) {
          if (!this.citySelector.selectSubNumObj[keys[i].code]) {
            let parentObj = this.findCityObjByCodeWithDepth(code, this.provinces, 1)
            for (let j = 0; j < parentObj.sublist.length; j++) {
              if (parentObj.sublist[j].code === keys[i].code) {
                outNum += 1
                j = parentObj.sublist.length
              }
            }
          }
        }
        return outNum
      },
      toggleSubCity (e) {
        let _code = e.target.dataset.code
        let _name = e.target.dataset.name
        let ele = this.$refs[this.cityRef.sub + _code]
        if (ele) {
          ele = ele[0]
          if (ele.classList.contains('active')) {
            ele.classList.remove('active')
          } else {
            ele.classList.add('active')
          }
        }
        let hasSelected = this.selectedCities.hasOwnProperty(this.selectedCitiesOffset + _code)
        if (hasSelected) {
//          // 已经存在
          delete this.selectedCities[this.selectedCitiesOffset + _code]
        } else {
//          // 不存在
          this.selectedCities[this.selectedCitiesOffset + _code] = _name
        }
        this.$forceUpdate()

//        let _code = e.target.dataset.code
//        if (this.isSelected(this.citySelector.items[0].data.code) || this.parentHasBeenSelected(_code)) {
//          return
//        }
//        let _index = this.findCityIndexByCode(_code, this.citySelector.selected)
//        if (_index >= 0) {
//          this.citySelector.selected.splice(_index, 1)
//          this.removeFromSelectSubNumObj(_code)
//        } else {
//          if (!this.canSelect()) {
//            return
//          }
//          if (this.citySelector.selectSubNumObj.hasOwnProperty(_code)) {
//            delete this.citySelector.selectSubNumObj[_code]
//          } else {
//            if (this.citySelector.selectSubNumObj.hasOwnProperty(String(this.citySelector.items[0].data.code))) {
//              if (this.citySelector.selectSubNumObj[String(this.citySelector.items[0].data.code)].indexOf(_code) < 0) {
//                this.citySelector.selectSubNumObj[String(this.citySelector.items[0].data.code)].push(_code)
//              }
//            } else {
//              this.citySelector.selectSubNumObj[String(this.citySelector.items[0].data.code)] = [_code]
//            }
//          }
//
//          let _subObj = this.findCityObjByCode(_code, this.citySelector.items[0].data.sublist)
//          for (let i = 0; i < _subObj.sublist.length; i++) {
//            for (let j = 0; j < this.citySelector.selected.length; j++) {
//              if (_subObj.sublist[i].code === this.citySelector.selected[j].code) {
//                this.citySelector.selected.splice(j, 1)
//                j--
//              }
//            }
//          }
//          let _sublist = this.citySelector.items[0].data.sublist
//          let _subIndex = this.findCityIndexByCode(_code, _sublist)
//          if (_subIndex >= 0) {
//            this.citySelector.selected.push({
//              code: _sublist[_subIndex].code,
//              name: _sublist[_subIndex].name
//            })
//          }
//        }
      },
      findCityObjByCode (code, arr) {
        let i = 0
        let _obj = {}
        for (i; i < arr.length; i++) {
          if (code === arr[i].code) {
            _obj = arr[i]
            i = arr.length
          }
        }
        return _obj
      },
      findCityIndexByCode (code, arr) {
        let i = 0
        let _index = -1
        for (i; i < arr.length; i++) {
          if (code === arr[i].code) {
            _index = i
            i = arr.length
          }
        }
        return _index
      },
      removeSelectedCity (e) {
        let _code = e.target.dataset.code
        let ele = this.$refs[this.cityRef.sub + _code]
        if (ele) {
          ele = ele[0]
          if (ele.classList.contains('active')) {
            ele.classList.remove('active')
          }
        }
        if (this.selectedCities.hasOwnProperty(this.selectedCitiesOffset + _code)) {
          // 存在
          delete this.selectedCities[this.selectedCitiesOffset + _code]
          this.$forceUpdate()
        }
//        const that = this
//        let _selectedItems = this.citySelector.selected
//        let _code = e.target.dataset.code
//        let _index = this.findCityIndexByCode(_code, _selectedItems)
//        if (_index >= 0) {
//          this.citySelector.selected.splice(_index, 1)
//        }
//        if (this.citySelector.selectSubNumObj.hasOwnProperty(_code)) {
//          delete this.citySelector.selectSubNumObj[_code]
//        } else {
//          Object.keys(this.citySelector.selectSubNumObj).forEach(function (item) {
//            for (let i = 0; i < that.citySelector.selectSubNumObj[item].length; i++) {
//              if (that.citySelector.selectSubNumObj[item][i] === _code) {
//                that.citySelector.selectSubNumObj[item].splice(i, 1)
//                i = that.citySelector.selectSubNumObj[item].length
//              }
//            }
//          })
//        }
      },
      isSelected (code) {
        console.time('1')
        let _selected = this.citySelector.selected
        let i = 0
        let flag = false
        for (i; i < _selected.length; i++) {
          if (_selected[i].code === code) {
            flag = true
            i = _selected.length
          }
        }
        console.timeEnd('1')
        return flag
      },
      tabChanged (e) {
        if (e === 'all') {
          this.citySelector.items = []
        }
      },
      chooseFromHotCity (e) {
        let _selectedCity = this.hotCities[Number(e.target.dataset.index)]
        let _target = {
          type: 'hotCity',
          code: _selectedCity.code,
          name: _selectedCity.name,
          data: _selectedCity
        }
        this.citySelector.items.push(_target)
      },
      chooseFromProvinces (e) {
        let _selectedCity = this.provinces[Number(e.target.dataset.index)]
        let _target = {
          type: 'province',
          code: _selectedCity.code,
          name: _selectedCity.name,
          data: _selectedCity
        }
        this.citySelector.items.push(_target)
      },
      closeEditorContainer () {
        this.$emit('close')
      },
      showCitySelectorContainer () {
        this.citySelector.shown = true
      },
      toggleAdvancedSettings () {
        this.showAdvancedSettings = !this.showAdvancedSettings
      },
      searchTimeChanged (evt) {
        this.formData.startTime = +new Date(evt[0])
        this.formData.endTime = +new Date(evt[1])
      }
    },
    watch: {
      'editData': function (val) {
        this.formData = JSON.parse(JSON.stringify(val))
      }
//      ,
//      'citySelector.selected': function (val) {
//        let _selectedCodes = []
//        let i = 0
//        for (i; i < val.length; i++) {
//          _selectedCodes.push(val[i].code)
//        }
//        this.selectedCodes = _selectedCodes
//      }
    },
    components: {}
  }
</script>
