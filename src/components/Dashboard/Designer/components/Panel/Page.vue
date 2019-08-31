<template>
  <div
    v-if="activeElement.page && tab === 1"
    class="panel-wrap">
    <div
      class="panel-row"
      flex>
      <div class="panel-label">大屏名称</div>
      <div class="panel-value">
        <input
          v-model="activeElement.title"
          type="text">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <div class="panel-label">大屏简介</div>
      <div class="panel-value">
        <textarea
          class="panel-textarea"
          v-model="activeElement.about">
        </textarea>
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <div class="panel-label">页面宽度</div>
      <div class="panel-value">
        <input
          v-model.number="activeElement.width"
          type="number">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <div class="panel-label">页面高度</div>
      <div class="panel-value">
        <input
          v-model.number="activeElement.height"
          type="number">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <div class="panel-label">页面背景色</div>
      <div class="panel-value">
        <el-color-picker
          v-model="activeElement.backgroundColor"
          show-alpha
          size="small"/>
      </div>
    </div>
    <div class="panel-row">
      <div class="panel-label">背景图</div>
      <div class="panel-value">
        <div
          :style="{ backgroundImage: activeElement.backPic}"
          class="panel-preview pic-updata-btn"
          @click="addPic">
          {{ (activeElement.backPic == '' || activeElement.backPic == 'url()') ? '点击上传' : '重新上传'}}
          <!--<vpd-icon-->
            <!--v-show="!activeElement.backPic"-->
            <!--name="plus"/>-->
        </div>
        <button
          v-show="activeElement.backPic !== '' && activeElement.backPic !== 'url()'"
          class="panel-page-del-btn"
          @click="delBgImg">清空背景图</button>
      </div>
    </div>

    <div class="panel-row">
      <div class="panel-label">主题颜色</div>
      <div class="panel-value panel-colorTheme">
        <div v-for="item in colors" :key="item.name" class="coloritem" :data-detheme="activeTheme" :class="item.name == activeTheme ? 'selected' : ''" @click="selColorTheme(item.name)">
          <span class="coloritem-span"
            :style="{
            background: 'linear-gradient(135deg, '+ item.value[0] + ' 0%, ' + item.value[1] + ' 50%, ' + item.value[6] + ' 51%, ' + item.value[7] + ' 100%)'
          }"></span>
          <div class="color-cont">
            <p>{{item.name}}</p>
            <a v-for="color in item.value" :key="color">
              <span :style="{background: color}"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vpd from '../../mixins/vpd'
export default {
  mixins: [vpd],
  props: ['activeElement', 'tab'],
  data () {
    return {
      activeTheme: this.$vpd.state.page.colors.name || '配色1',
      colors: [
        { name: '配色1', value: ['#8378ea', '#96bfff', '#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e062ae', '#e690d1', '#e7bcf3', '#9d96f4'] },
        { name: '配色2', value: ['#37a2da', '#96bfff', '#ffdb5c', '#ff9f7f', '#fb7293', '#e062ae', '#e690d1', '#e7bcf3', '#9d96f4', '#8378ea', '#32c5e9', '#67e0e3', '#9fe6b8'] },
        { name: '配色3', value: ['#00a64f', '#ffdb5c', '#cc9932', '#ff6201', '#f03636', '#993499', '#6666cc', '#0171ff', '#00f2ff', '#3eb7a8', '#86922c', '#d9ec78', '#ffff99'] },
        { name: '配色4', value: ['#dd6b66', '#749aa0', '#e69d87', '#8dc1a9', '#ea7e52', '#eedd78', '#74a373', '#74b9bc', '#7289ab', '#92ca8c', '#f49f42', '#fabe89', '#bdbe8f'] }
      ]
    }
  },
  methods: {
    selColorTheme (name) {
      this.activeTheme = name
      let arr = this.colors.filter(item => {
        return item.name === this.activeTheme
      })
      // let param = arr[0].value
      this.$vpd.commit('UPDATE_PAGE_COLOR_THEME', arr[0])
    },
    addPic () {
      this.$vpd.$emit('upload', (payload) => {
        this.$vpd.commit('ADD_PAGE_BACKGROUND_IMAGE', payload)
      })
    },
    delBgImg () {
      let params = [{ url: '' }]
      this.$vpd.commit('ADD_PAGE_BACKGROUND_IMAGE', params)
    }
  }
}
</script>
<style>
  .panel-preview.pic-updata-btn{
    width: 70px;
    background-color: #eee;
    text-align: center;
    line-height: 32px;
  }
  .panel-row .panel-page-del-btn{
    height:32px;
    line-height: 32px;
    margin: 0 8px;
    padding:0 6px;
    border: none;
    background: #42b983;
    color: #fff;
    cursor: pointer;
    border-radius: 2px;
  }
  .panel-colorTheme{
    position: relative;
  }
  .coloritem{
    /*position: relative;*/
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    width: 28px;
    height: 28px;
    margin: 0 16px 0 0;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    background: #fff;
  }
  .selected{
    border: 1px solid #0543b0;
  }
  .coloritem .coloritem-span,.color-cont span{
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 2px;
    margin-top: 2px;
  }
  .color-cont{
    display: none;
    position: absolute;
    width:220px;
    left:-50px;
    top: 40px;

    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    padding: 4px;
    background-color: #fff;
    color: #58666e;
    height:auto;
    /*overflow-y: auto;*/
  }
  .color-cont p{
    margin:0;
  }
  .coloritem:hover .color-cont{
    display: block;
  }

</style>
