<template>
    <div class="account">
        <div class="form-wrap">
            <a-form
                name="custom-validation"
                ref="formRef"
                @finish="handleFinish"
                :model="account_form"
                :rules="rules_form"
            >
                <a-form-item name="username" ref="username">
                    <label>用户名</label>
                    <a-input
                        v-model:value="account_form.username"
                        type="text"
                        autocomplete="off"
                        @change="() => {$refs.username.onFieldChange()}"
                        :disabled="input_disabled.username"
                    />
                </a-form-item>

                <a-form-item name="password" ref="pws">
                    <label>密码</label>
                    <a-input-password v-model:value="account_form.password" placeholder="请输入密码" @change="() => {$refs.pws.onFieldChange()}" />
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
import { onMounted, reactive, toRef, toRefs } from "vue";
//ant-design-vue
import { message } from 'ant-design-vue';
//API
import { Login } from "@/api/account";
//导入验证类方法
import { checkPhone, checkPassword } from "@/utils/verification";
//路由
import { useRouter } from 'vue-router';
//加密
import md5 from "js-md5";
//cookies
import { setToken, setUsername } from "@/utils/cookies";

export default {
    name: "Login",
    // eslint-disable-next-line no-unused-vars
    setup(props) {

        /**
         * 跳转
         * 1.js的语法跳转
         * 2.dom标签跳转
         */
        /**
         * useRouter跳转
         * 需要让用户返回上一个历史记录，就用push（追加了一个历史记录）
         * 不让用户返回上一个历史记录，就用replace（替换了当前的历史记录）
         */
        const router = useRouter();
        /**
         * 验证
         * =========================================================================================
         */
        //验证手机号
        let checkUsername = async (rule, value) => {
            if (!value) {
                // dataItem.button_disabled = true;
                return Promise.reject('请输入用户名'); //判空的错误提示
            }else if(!checkPhone(value)){
                // dataItem.button_disabled = true;
                return Promise.reject('请输入正确手机号');
            }else{
                // callback();
                // checkUsernameFn();
                // dataItem.button_disabled = false;
                return Promise.resolve();
            }
        };

        //验证密码
        let checkPass = async(rule, value, callback) => {
            if (!value) {
                return Promise.reject('请输入密码'); //判空的错误提示
            }else if(!checkPassword(value)){
                return Promise.reject('请输入6-20位数字+字母的密码');
            }else{
                // callback();
                return Promise.resolve();
            }
        };

        /**
         * 表单属性配置
         * =========================================================================================
         */

        const formConfig = reactive({
            layout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            },
            account_form: {
                username: "",
                password: "",
            },
            input_disabled: {
                username: false
            },
            rules_form: {
                username: [{ validator: checkUsername, trigger: 'change', },],
                password: [{ validator: checkPass, trigger: 'change', },],
            },
        })

        /**
         * 验证码按钮配置
         * =========================================================================================
         */

        const dataItem = reactive({})

        const form = toRefs(formConfig);
        const data = toRefs(dataItem);

        //提交表单
        const handleFinish = (value) => {
            const requestData = {
                username: formConfig.account_form.username,
                password: md5(formConfig.account_form.password),
            }
            Login(requestData).then(response => {
                const data = response.content;
                setToken({token: data.token});
                setUsername({username: data.username});
            })
        }

        return {
            ...form,
            ...data,
            handleFinish,
        }
    }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
