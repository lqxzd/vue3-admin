<template>
  <div>
    <!-- logo引用 -->
    <h1 id="logo">
      <img v-if="collapsed" :src="data.logo_min" alt="ZeroData" width="50" />
      <img v-else :src="data.logo" alt="ZeroData" height="50" />
    </h1>

    <a-menu
      class="aside-home"
      v-model:openKeys="data.openKeys"
      v-model:selectedKeys="data.selectedKeys"
      mode="inline"
      theme="dark"
      @click="selectMenu"
      @openChange="openMenu"
    >
      <template v-for="item in routers">
        <template v-if="!item.hidden">
          <!-- 不存在子级的 -->
          <a-menu-item v-if="hasOnlyChildren(item)" :key="item.path">
            <router-link :to="item.children[0].path">
              <span class="anticon">
                <i class="icon icon-size-21 mb--5" :class="item.meta && item.meta.icon"></i>
                <!-- <svg-icon :iconName="item.meta && item.meta.icon" className="aside-svg"></svg-icon> -->
              </span>
              <span>
                <!-- 这里注意隐藏的子级路由不要放在第一个 -->
                {{ item.children[0].meta && item.children[0].meta.title }}
              </span>
            </router-link>
          </a-menu-item>

          <!-- 存在子级的 -->
          <Menu v-else :menu="item" :key="item.path" />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>

import { reactive } from "vue"
import { useRoute, useRouter } from "vue-router";
import Menu from "./Menu";
export default {
  name: "Aside",

  components: { Menu },

  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    const { options } = useRouter();

    //路由
    const routers = options.routes;
    
    //数据
    const data = reactive({
      selectedKeys: localStorage.getItem("selectedKeys") ? [localStorage.getItem("selectedKeys")] : [],
      
      //无限级菜单存储缓存
      openKeys: localStorage.getItem("openKeys") ? JSON.parse(localStorage.getItem("openKeys")) : [],

      //logo引用
      logo: require("@/assets/logo_1.png"),
      logo_min: require("@/assets/logo_4.png"),
    });

    //选择菜单
    const selectMenu = ({ item, key, keyPath }) => {
      data.selectedKeys = [key];
      localStorage.setItem("selectedKeys", key);
    }

    //展开/关闭菜单
    const openMenu = (openKeys) => {
      data.openKeys = openKeys;

      //无限级菜单存储缓存
      localStorage.setItem("openKeys", JSON.stringify(openKeys));
    }

    //检测是否只有一个子路由
    const hasOnlyChildren = (data) => {

      //不存在子级时返回false
      if(!data.children) { return false; }

      //过滤隐藏的子级路由，这里注意隐藏的子级路由不要放在第一个
      const routers = data.children.filter(item => item.children ? false : true);

      //判断最终结果
      if(routers.length === 1) { return true; }
      return false;
    }

    return {
      data,
      routers,
      selectMenu,
      openMenu,
      hasOnlyChildren,
    };
  },
  
}
</script>

<style lang="scss" scoped>
#logo {
  // padding: 20px 0;
  border-bottom: black;
  text-align: center;
  img {
    display: inline-block;
  }
}
.aside-home {
  i.icon {
    margin-right: 5px;
    opacity: 0.6;
  }
  .ant-menu-item-selected {
    // background-color: red;
    i.icon {
      opacity: 1;
    }
  }
}
</style>