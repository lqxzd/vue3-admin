/* eslint-disable vue/valid-v-else */
<template>
    <a-sub-menu :key="menu.path">
        <template #title>{{ menu.meta && menu.meta.title }}</template>
        <template v-if="menu.children.length">
            <template v-for="item in menu.children">
                <!-- 不存在子级的 -->
                <a-menu-item v-if="!item.children" :key="item.path">
                    <router-link
                        :to="item.path"
                    >{{ item.meta && item.meta.title }}</router-link>
                </a-menu-item>

                <!-- 存在子级的 -->
                <!-- eslint-disable-next-line vue/valid-v-for -->
                <Menu v-else :menu="item" />
            </template>
        </template>
    </a-sub-menu>
</template>

<script>
export default {
    name: "Menu",
    props: {
        menu: {
            type: Object,

        }
    },
    data() {
        return {
            counter: this.menu
        }
    }
}
</script>

<style>
</style>