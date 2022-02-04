<template>
  <div id="header">
    <div class="collapsed-button" @click="collapsedButton">
      <i class="icon icon-size-20 mb--5 icon-header-collapsed"></i>
    </div>
    <div class="header-menu">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <img src="../../../assets/images/blackhole.png" style="height: 24px; width: 24px;"/>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <div class="menu-item">
                <i class="icon icon-size-20 mb--5 icon-header-user"></i>
                ZeroData
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="1">
              <div class="menu-item menu-lang">
                <i class="icon icon-size-20 mb--5 icon-header-language"></i>
                <span 
                  v-for="item in data.lang" 
                  :key="item.value" 
                  @click="toggleLang(item.value)" 
                  :class="{ 'current': data.lang_current == item.value }"
                >
                  {{ item.label }}
                </span>
              </div>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">
              <div class="menu-item">
                <i class="icon icon-size-20 mb--5 icon-header-exit"></i>
                {{ $t("header_menu.logout") }}
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>

import { reactive, getCurrentInstance } from "vue"
import { useI18n } from 'vue-i18n'

export default {
  name: "Header",
  setup(){
    
    const { emit } = getCurrentInstance();

    const { locale } = useI18n({ useScope: 'global' });

    const data = reactive({
      lang:[
        { label: "中文", value: "ch" },
        { label: "English", value: "en" }
      ],
      lang_current: "ch"
    });

    //切换语言
    const toggleLang = (lang) => {
      locale.value = lang;
      data.lang_current = lang;
    }

    const collapsedButton = () => {
      emit("collapsed", {aa: 11,bb: "xx"})
    }

    return {
      data,
      toggleLang,
      collapsedButton
    }
  },
}
</script>

<style lang="scss">
#header{
  padding: 0 20px;
  height: 64px;
}
.header-menu{
  float: right;
  // margin-top: 15px;
}
.menu-item{
    padding: 0 20px;
    font-size: 14px;
    font-family: "黑体";
    color: #333333;
}
.menu-lang{
  color: #aeaeae;
  span{ margin: 0 5px; }
  .current{ color: #333333; }
}
.collapsed-button{
  float: left;
  cursor: pointer;
}

</style>