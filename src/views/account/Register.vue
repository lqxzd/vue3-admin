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
                <a-form-item name="username">
                    <label>用户名</label>
                    <a-input
                        v-model:value="account_form.username"
                        type="text"
                        autocomplete="off"
                    />
                </a-form-item>

                <a-form-item name="password">
                    <label>密码</label>
                    <a-input
                        v-model:value="account_form.password"
                        type="password"
                        autocomplete="off"
                    />
                </a-form-item>

                <a-form-item name="confirmPass">
                    <label>确认密码</label>
                    <a-input
                        v-model:value="account_form.confirmPass"
                        type="password"
                        autocomplete="off"
                    />
                </a-form-item>

                <a-form-item name="code">
                    <label>验证码</label>
                    <a-row :gutter="15">
                        <a-col :span="14">
                            <a-input
                                v-model:value="account_form.code"
                                type="text"
                                autocomplete="off"
                            />
                        </a-col>
                        <a-col :span="10">
                            <a-button type="primary" 
                                block 
                                :loading="button_loading" 
                                :disabled="button_disabled" 
                                @click="getCode"
                            >
                                {{ button_text }}
                            </a-button>
                        </a-col>
                    </a-row>
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" html-type="submit" block>注册</a-button>
                </a-form-item>
            </a-form>
            <div class="text-center fs-12">
                <!--
                    路由跳转：
                    使用<router-link to=""></router-link>标签，
                    一定要加 to 属性，不然会报错 
                -->
                <router-link class="color-white" to="/forget">忘记密码</router-link> |
                <router-link class="color-white" to="/">登录</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { checkPhone, checkPassword, checkCode } from "@/utils/verification";
import { onMounted, reactive, toRef, toRefs } from "vue";
import { message } from 'ant-design-vue';
export default {
    name: "Register",
    // eslint-disable-next-line no-unused-vars
    setup(props) {

        //验证手机号
        let checkUsername = async (rule, value) => {
            if (!value) {
                return Promise.reject('请输入用户名'); //判空的错误提示
            }else if(!checkPhone(value)){
                return Promise.reject('请输入正确手机号');
            }else{
                // callback();
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

        //验证确认密码
        let checkConfirmPass = async(rule, value, callback) => {
            //获取密码框中输入的密码
            const password = formConfig.account_form.password;

            if (!value) {
                return Promise.reject('请再一次输入密码'); //判空的错误提示
            }else if(password && value && (value !== password)){
                //验证两次密码是否一致
                return Promise.reject('两次密码不一致');
            }else{
                // callback();
                return Promise.resolve();
            }
        };

        //建议验证码
        let verifyCode = async(rule, value, callback) => {
            if (!value) {
                return Promise.reject('请输入6位验证码'); //判空的错误提示
            }else if(!checkCode(value)){
                return Promise.reject('请输入6位的数字+字母');
            }else{
                // callback();
                return Promise.resolve();
            }
        }

        const formConfig = reactive({
            layout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            },
            account_form: {
                username: "",
                password: "",
                confirmPass: "",  //确认密码
                code: ""
            },
            rules_form: {
                username: [{ validator: checkUsername, trigger: 'change', },],
                password: [{ validator: checkPass, trigger: 'change', },],

                //验证确认密码
                confirmPass: [{ validator: checkConfirmPass, trigger: 'change', },],
                code: [{ validator: verifyCode, trigger: 'change', },],
            },
        })

        const dataItem = reactive({
            button_text: "获取验证码",
            button_loading: false,
            button_disabled: false,
            sec: 60,

            //定时器对象
            timer: null
        })

        const form = toRefs(formConfig);
        const data = toRefs(dataItem);

        //提交表单
        const handleFinish = () => {
            alert("hello")
        }

        //获取验证码
        const getCode = () =>{
            // 判断用户名是否为空
            if(!formConfig.account_form.username){
                message.error('用户名不能为空');
                return false
            }
            //优先判断定时器是否存在，存在则先清除再开启
            if(dataItem.timer){ clearInterval(dataItem.timer) }
            //开启定时器
            dataItem.timer = setInterval(() => {
                const s = dataItem.sec--;
                dataItem.button_text = `${s}秒`;
                if(s <= 0){
                    clearInterval(dataItem.timer);
                    dataItem.button_text = `重新获取`;
                }
            }, 1000)
        }

        onMounted(() => {})

        return {
            ...form,
            ...data,
            handleFinish,
            getCode
        }
    }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
