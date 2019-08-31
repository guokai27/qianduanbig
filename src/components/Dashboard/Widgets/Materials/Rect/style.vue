<template>
  <div>
    <div v-show="tab === 1">
      <basic-settings :activeElement="activeElement" />
      <div class="panel-item-new">
        <div @click="isShowBorder = !isShowBorder" class="panel-item-title">边框<i :class="isShowBorder ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowBorder" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">边的宽度</div>
            <div class="panel-value">
              <input
                v-model="activeElement.borderWidth"
                type="number"
                min="0">
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">边的颜色</div>
            <div class="panel-colormsg">{{ activeElement.borderColor }}</div>
            <div class="panel-colorpick">
              <el-color-picker
                v-model="activeElement.borderColor"
                show-alpha
                size="small"/>
            </div>
          </div>
          <div class="panel-row">
            <div class="panel-label">圆角</div>
            <div class="panel-value">
              <input
                v-model="activeElement.radius"
                type="number"
                min="0">
            </div>
          </div>
          <div class="panel-row">
          <div class="panel-label">样式</div>
          <div
            class="radioscont">
            <el-radio label="dotted" v-model="activeElement.borderStyle">点状</el-radio>
            <el-radio label="solid" v-model="activeElement.borderStyle">实线</el-radio>
            <br>
            <el-radio label="double" v-model="activeElement.borderStyle">双线</el-radio>
            <el-radio label="dashed" v-model="activeElement.borderStyle">虚线</el-radio>
          </div>
        </div>
        </div>
      </div>
      <div class="panel-item-new">
        <div @click="isShowBg = !isShowBg" class="panel-item-title">背景<i :class="isShowBg ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowBg" class="panel-item-new-set">
          <div class="panel-item-detail">
            <div class="xf-background">
              <ul class="f-clearfix set-bgnav" style="padding-left:12px;">
                <li
                  v-for="item in backgroundCss"
                  :class="[activeElement.bgType == item.role ? ' square-box-active' : '']"
                  :key="item.role"
                  :data-role="item.role"
                  class="square-box"
                  @click="changeBackgroundCss(item.role)">
                  {{ item.value }}
                </li>
              </ul>
              <!-- 背景填充方式下拉框 end -->
              <ul class="tab-content">
                <!-- 纯色填充样式设置 begin -->
                <li
                  v-show="activeElement.bgType == 'bgColor'"
                  class="">
                  <div class="panel-row">
                    <div class="panel-label">背景色</div>
                    <div class="panel-colormsg">{{ activeElement.bgColor }}</div>
                    <div class="panel-colorpick">
                      <el-color-picker
                        v-model="activeElement.bgColor"
                        show-alpha
                        size="small"/>
                    </div>
                  </div>
                </li>
                <!-- 渐变填充样式设置 begin -->
                <li
                  v-show="activeElement.bgType == 'bgGradientcolor'"
                  class=""
                  role="tabpanel">
                  <div class="panel-row">
                    <div class="panel-label">颜色</div>
                    <div class="panel-value-new">
                      <el-color-picker
                        v-model="activeElement.bgGradientcolor1"
                        show-alpha
                        size="small"/>
                    </div>& &nbsp;&nbsp;&nbsp;
                    <div class="panel-value-new">
                      <el-color-picker
                        v-model="activeElement.bgGradientcolor2"
                        show-alpha
                        size="small"/>
                    </div>
                  </div>
                  <div class="panel-row">
                    <div class="panel-label">方向</div>
                    <div class="panel-value">
                      <select v-model="activeElement.bgGradientdir1">
                        <option value="top">向下</option>
                        <option value="bottom">向上</option>
                        <option value="left">向右</option>
                        <option value="right">向左</option>
                        <option value="top right">左下</option>
                        <option value="bottom right">左上</option>
                        <option value="top left">右下</option>
                        <option value="bottom left">右上</option>
                      </select>
                      <!--<input-->
                      <!--v-model="activeElement.bgGradientdir1"-->
                      <!--type="text"-->
                      <!--placeholder="top bottom left right 180deg" >-->
                    </div>
                  </div>
                </li>
                <!-- 图片填充样式设置 begin -->
                <li
                  v-show="activeElement.bgType == 'bgImage'"
                  class=""
                  role="tabpanel">
                  <div class="panel-row">
                    <div class="panel-label">背景图</div>
                    <div class="panel-value">
                      <div
                        :style="{ backgroundImage: 'url(' + activeElement.backPic + '), background: #eeeeee' }"
                        class="panel-preview"
                        @click="addPic">
                        点击上传
                        <vpd-icon
                          v-show="!activeElement.backPic"
                          name="plus"/>
                      </div>
                    </div>
                  </div>
                </li>
                <!-- 无填充 begin -->
                <li
                  v-show="activeElement.bgType == 'bgNone'"
                  class=""
                  role="tabpanel">
                  无填充
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicSettings from '../../CommonModule/BasicSettings'
export default {
  name: 'BraidRectStyle',
  components: {
    BasicSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowBorder: true,
      isShowBg: true,
      activeBackgroundCss: '',
      backgroundCss: [{
        role: 'bgColor',
        value: '纯色'
      }, {
        role: 'bgGradientcolor',
        value: '渐变'
      }, {
        role: 'bgImage',
        value: '图片'
      }, {
        role: 'bgNone',
        value: '无'
      }]
    }
  },
  methods: {
    addPic () {
      this.$vpd.$emit('upload', (payload) => {
        this.$vpd.commit('ADD_CONTAINER_BACKGROUND_IMAGE', payload)
      })
    },
    changeBackgroundCss (role) {
      this.activeBackgroundCss = role
      let param = {
        name: 'bgType',
        value: role
      }
      this.$vpd.commit('UPDATE_ACTIVE_ELEMENT', param)
    }
  }
}
</script>
<style>
  .panel-item-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e6eaf1;
  }
  .panel-item-detail {
    display: flex;
    font-size: 13px;
    line-height: 30px;
    padding:12px 0;
  }
  .panel-item-detail-left ,.panel-item-detail-right {
    display: flex;
  }
  .panel-item-detail span {
    padding:0 12px;
  }
  .panel-item-new .panel-item-detail .panel-item-input-line {
    margin:0 12px;
    width:260px;
    height:30px;
  }
  .panel-item-new .panel-item-detail .panel-item-detail-left input,.panel-item-new .panel-item-detail .panel-item-detail-right input {
    width:100px;
    height:30px;
  }
  .xf-background {
    width:100%;
  }
  .xf-background ul {
    overflow: hidden;
    padding:0;
    margin:0;
  }
  .square-box {
    float: left;
    width:20%;
    text-align: center;
  }
  .square-box-active {
    border-bottom:1px solid #42b983;
  }
  .xf-background .tab-content{
    margin-top:20px;
  }
  .panel-preview{
    width:70px;
    background-color:#eee;
    text-align: center;
    line-height: 32px;
  }
</style>
