<template>
  <div>
    <a-menu
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
    >
      <template v-for="item in routers">
        <template v-if="!item.hidden">
          <!-- 不存在子级的 -->
          <a-menu-item v-if="!item.children" :key="item.path">
            <router-link :to="item.path">{{ item.meta && item.meta.title }}</router-link>
          </a-menu-item>

          <!-- 存在子级的 -->
          <!-- eslint-disable-next-line vue/valid-v-for -->
          <Menu v-else :menu="item" />
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
  setup() {
    const { options } = useRouter();
    // console.log(options);
    const routers = options.routes;
    const data = reactive({
      selectedKeys: ["1"],
      openKeys: ["sub1"],
    });
    return {
      data,
      routers
    };
  },
  components: { Menu }
}
</script>

<style lang="scss" scoped>
</style>