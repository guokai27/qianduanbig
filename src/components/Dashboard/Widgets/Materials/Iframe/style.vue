<template>
  <div>
    <div v-show="tab === 1">
      <basic-settings :activeElement="activeElement" />
      <div class="panel-item-new">
        <div @click="isShowSet = !isShowSet" class="panel-item-title">设置<i :class="isShowSet ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" class="panel-title-arrow"></i></div>
        <div v-show="isShowSet" class="panel-item-new-set">
          <div class="panel-row">
            <div class="panel-label">连接</div>
            <div class="panel-value">
              <input
                v-model="activeElement.url"
                type="text">
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
  name: 'BraidIframeStyle',
  components: {
    BasicSettings
  },
  props: ['activeElement', 'tab'],
  data () {
    return {
      isShowSet: true
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
