<template>
    <div class="account">
        <div class="form-wrap">
            <a-form
                name="custom-validation"
                ref="formRef"
            >
                <a-form-item>
                    <label>用户名</label>
                    <a-input type="text" autocomplete="off"/>
                </a-form-item>

                <a-form-item>
                    <label>密码</label>
                    <a-input type="password" autocomplete="off"/>
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" html-type="submit" block>登录</a-button>
                </a-form-item>
            </a-form>
            <div class="text-center fs-12">
                <!--
                    路由跳转：
                    使用<router-link to=""></router-link>标签，
                    一定要加 to 属性，不然会报错 
                -->
                <router-link class="color-white" to="/forget">忘记密码</router-link> |
                <router-link class="color-white" to="/register">注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted, reactive, toRefs, ref } from "vue";
export default {
    name: "Login",
    // eslint-disable-next-line no-unused-vars
    setup(props){
        const formConfig = reactive({
            layout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            }
        })

        const data = toRefs(formConfig);

        return {
            ...data
        }
    }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
