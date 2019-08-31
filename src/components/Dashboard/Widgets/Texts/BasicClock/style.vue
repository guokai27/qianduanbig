<template>
  <div>
    <div v-show="tab === 1">
      <!-- 基础设置 -->
      <basic-settings :activeElement="activeElement"/>

      <hr>
      <div class="panel-row" flex>
        <div class="panel-label">字体</div>
        <div class="panel-value">
          <select v-model="activeElement.fontFamily">
            <option value="Arial">Arial</option>
            <option value="sans-serif">sans-serif</option>
            <option value="Microsoft YaHei">微软雅黑</option>
            <option value="Microsoft JhengHei">微软正黑体</option>
            <option value="SimHei">黑体</option>
            <option value="Hiragino Sans GB">Hiragino Sans GB</option>
            <option value="SimSun">宋体</option>
            <option value="FangSong">仿宋</option>
            <option value="PMingLiU">新细明体</option>
            <option value="KaiTi">楷体</option>
            <option value="DFKai-SB">标楷体</option>
          </select>
        </div>
      </div>
      <div class="panel-row" flex>
        <div class="panel-label">行高</div>
        <div>
          <input
            v-model="activeElement.height"
            type="number">
        </div>
      </div>
      <div class="panel-row" flex>
        <div class="panel-label">字号</div>
        <div>
          <input
            v-model="activeElement.fontSize"
            type="number">
        </div>
      </div>
      <div class="panel-row" flex>
        <div class="panel-label">字间距</div>
        <div>
          <input
            v-model="activeElement.fontSpacing"
            type="number">
        </div>
      </div>
      <div class="panel-row" flex>
        <div class="panel-label">颜色</div>
        <div class="panel-value">{{ activeElement.color }}</div>
        <div>
          <input type="color" v-model="activeElement.color">
        </div>
      </div>
      <div class="panel-row" flex>
        <div class="panel-label">加粗</div>
        <div class="panel-value">
          <label class="form-switch">
            <input type="checkbox" v-model="activeElement.fontWeight">
            <i class="form-icon"></i>
          </label>
        </div>
      </div>
      <div class="panel-row" flex>
        <div class="panel-label">对齐</div>
        <div class="panel-value">
          <select v-model="activeElement.textAlign">
            <option value="left">左对齐</option>
            <option value="center">居中</option>
            <option value="right">右对齐</option>
          </select>
        </div>
      </div>
    </div>
    <div v-show="tab === 2">
      <div class="panel-row" flex>
        <div class="panel-label">时间格式</div>
        <div class="panel-value">
          <select v-model="activeElement.timeType">
            <option value="y-m-d">日期</option>
            <option value="y-m-d-h-m-s">日期 + 时分秒</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicSettings from '../../CommonModule/BasicSettings'

export default {
  name: 'BasicRTClockStyle',
  components: {
    BasicSettings
  },
  props: ['activeElement', 'tab']
}
</script>
