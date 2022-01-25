/* eslint-disable vue/valid-v-else */
<template>
    <a-sub-menu :key="menu.path">
        <template #title>
            <span class="anticon">
                <i class="icon icon-size-21 mb--5" :class="menu.meta && menu.meta.icon"></i>
            </span>
            <span>
                {{ menu.meta && menu.meta.title }}
            </span>
        </template>
        <template v-if="menu.children.length">
            <template v-for="item in menu.children">
                <template v-if="!item.hidden">
                    <!-- 不存在子级的 -->
                    <a-menu-item v-if="!item.children" :key="item.path">
                        <router-link :to="item.path">
                            <span>{{ item.meta && item.meta.title }}</span>
                        </router-link>
                    </a-menu-item>

                    <!-- 存在子级的 -->
                    <Menu v-else :menu="item" :key="item.path" />             
                </template>

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
            default: () => ({})
        }
    },
    data() {
        return {
            counter: this.menu
        }
    }
}
</script>

<style lang="scss" scoped>
.aside-home {
    i.icon {
        margin-right: 5px;
        opacity: 0.6;
    }
    .ant-menu-submenu-open {    
        > div{
            i.icon {
                opacity: 1;
            }
        }
    }
}
</style>