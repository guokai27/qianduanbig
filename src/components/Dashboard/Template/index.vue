<template>
  <div :class="rootClass">
    <ul :class="rootClass + '__wrapper'">
      <li :class="rootClass + '__item'">
        <div
          :class="classThumbnail(tplSelected.hash, blankTemplate.hash)"
          @click="onSelectImage(blankTemplate)">
          <div :class="rootClass + '__imgcont'">
            <img src="http://#"
                 :height="h"
                 :width="w"
                 :class="rootClass + '__img'">
          </div>
          <label :class="rootClass + '__lbl'">
                {{blankTemplate.name}}
          </label>
        </div>
      </li>

      <li v-for="(template, index) in templatesLocal" :key="index"
        :class="rootClass + '__item'">
        <div
          :class="classThumbnail(tplSelected.hash, template.hash)"
          @click="onSelectImage(template)">
          <div :class="rootClass + '__imgcont'">
            <img :src="template.imgUrl | fullImgUrl"
                 :height="h"
                 :width="w"
                 :class="rootClass + '__img'">
          </div>
          <label :class="rootClass + '__lbl'">
                {{template.config.title}}
          </label>
        </div>
      </li>
    </ul>

    <div v-show="imgPreview">
      <label>大屏预览</label>
      <img :src="tplSelected.imgUrl | fullImgUrl"
            :height="h"
            :width="w"
            :class="rootClass + '__img'">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateAlbum',
  filters: {
    fullImgUrl (url) {
      return process.env.BASE_API + url
    }
  },
  props: {
    templates: {
      type: Array,
      default: () => []
    },
    rootClass: {
      type: String,
      default: 'template-list'
    },
    activeClass: {
      type: String,
      default: '--selected'
    },
    h: {
      type: String,
      default: 'auto'
    },
    w: {
      type: String,
      default: 'auto'
    }
  },
  data () {
    return {
      tplSelected: {
        hash: ''
      },
      blankTemplate: {
        hash: 'blank',
        name: '空白模板'
      },
      imgPreview: false
    }
  },
  computed: {
    templatesLocal: function () {
      return this.templates || []
    }
  },
  methods: {
    classThumbnail (selectedId, imageId) {
      const baseClass = `${this.rootClass}__thumbnail`
      if (selectedId === imageId) {
        return `${baseClass} ${baseClass}${this.activeClass}`
      }
      return `${baseClass}`
    },
    onSelectImage (objectImage) {
      this.tplSelected = Object.assign({}, this.tplSelected, objectImage)
      this.imgPreview = (this.tplSelected.hash !== this.blankTemplate.hash)
      this.$emit('onselect', objectImage)
    },
    removeFromimgSelected () {
      this.imgPreview = false
      this.tplSelected = {}
      this.$emit('onselect', {})
    }
  },
  watch: {
    templates: function () {
      this.removeFromimgSelected()
    }
  }
}
</script>
<style>
.template-list__wrapper {
  overflow: auto;
  list-style-image: none;
  list-style-position: outside;
  list-style-type: none;
  padding: 0px;
  margin: 0px;
  width:auto;
  display: flex;
}

.template-list__item {
  margin: 0px 12px 12px 0px;
  float: left;
}
.template-list__imgcont{
  width: 100%;
  height: 90px;
}
.template-list__imgcont img,.template-list__imgcont span{
  display: inline-block;
  width:100%;
  height:100%;
}
.template-list__thumbnail{
  display: block;
  padding: 4px;
  line-height: 20px;
  border: 1px solid #ddd;
  width: 160px;
  cursor: pointer;

  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;

  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.055);

  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}

.template-list__thumbnail--selected{
  background: #eeeeee;;
}

.template-list__img{
  -webkit-user-drag: none;
  display: block;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.template-list__lbl{
  display: block;
  line-height: 3;
  width:100%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

@media only screen and (max-width: 200px) {
  .template-list__item {
    margin-left: 30px;
  }
}
</style>
