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

                <a-form-item name="confirmPass" ref="pwss">
                    <label>确认密码</label>
                    <a-input-password v-model:value="account_form.confirmPass" placeholder="请再一次输入密码" @change="() => {$refs.pwss.onFieldChange()}" />
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
import { onMounted, reactive, toRef, toRefs } from "vue";
//ant-design-vue
import { message } from 'ant-design-vue';
//API
import { CheckUsername, Send, Register } from "@/api/account";
//导入验证类方法
import { checkPhone, checkPassword, checkCode } from "@/utils/verification";
//路由
import { useRouter } from 'vue-router';
//加密
import md5 from "js-md5";

export default {
    name: "Register",
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
                dataItem.button_disabled = true;
                return Promise.reject('请输入用户名'); //判空的错误提示
            }else if(!checkPhone(value)){
                dataItem.button_disabled = true;
                return Promise.reject('请输入正确手机号');
            }else{
                // callback();
                // checkUsernameFn();
                dataItem.button_disabled = false;
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

        //检验验证码
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
                confirmPass: "",  //确认密码
                code: ""
            },
            input_disabled: {
                username: false
            },
            rules_form: {
                username: [{ validator: checkUsername, trigger: 'change', },],
                password: [{ validator: checkPass, trigger: 'change', },],

                //验证确认密码
                confirmPass: [{ validator: checkConfirmPass, trigger: 'change', },],
                code: [{ validator: verifyCode, trigger: 'change', },],
            },
        })

        /**
         * 验证码按钮配置
         * =========================================================================================
         */

        const dataItem = reactive({
            button_text: "获取验证码",
            button_loading: false,
            button_disabled: true,
            sec: 0,

            //定时器对象
            timer: null
        })

        const form = toRefs(formConfig);
        const data = toRefs(dataItem);


        //检测用户名是否已注册
        const checkUsernameFn = () => {
            formConfig.input_disabled.username = true;
            return CheckUsername({username: formConfig.account_form.username}).then(response => {
                // 用户名状态
                const user_status = response.content.user;
                // 发送验证码按钮状态
                dataItem.button_disabled = user_status;
                // 用户名输入框状态
                formConfig.input_disabled.username = false;
                if(user_status){
                    message.error(response.msg);
                }
                return user_status;
            }).catch(error => {
                formConfig.input_disabled.username = false;
            });
        }

        const countDown = () => {
            //更新时间
            dataItem.sec = process.env.VUE_APP_COUNTDOWN;
            //优先判断定时器是否存在，存在则先清除再开启
            if(dataItem.timer){ clearInterval(dataItem.timer) }
            //开启定时器
            dataItem.timer = setInterval(() => {
                const s = dataItem.sec--;
                dataItem.button_text = `${s}秒`;
                if(s <= 0){
                    clearInterval(dataItem.timer);
                    dataItem.button_text = `重新获取`;
                    //按钮激活
                    dataItem.button_disabled = false;
                }
            }, 1000)
        }

        //获取验证码
        const getCode = async () =>{

            const usernameStatus = await checkUsernameFn(); //等待哪个接口，await就给谁用父节点要加 async
            if(usernameStatus){ return false; }

            //按钮加载
            dataItem.button_loading = true;
            //按钮文本
            dataItem.button_text = "发送中";
            //请求接口
            Send({username: formConfig.account_form.username, type: "Register"}).then(response => {
                //关闭按钮加载
                dataItem.button_loading = false;
                //按钮禁用
                dataItem.button_disabled = true;
                //倒计时
                countDown();
            })
        }

        //提交表单
        const handleFinish = (value) => {
            const requestData = {
                username: formConfig.account_form.username,
                password: md5(formConfig.account_form.password),
                code: formConfig.account_form.code
            }
            Register(requestData).then(response => {
                const code = response.content.code;
                // if(!code){
                //     message.error(response.msg);
                //     return false;
                // }else{
                //     message.success("注册成功");
                // }
                const msg = code ? "注册成功":response.msg;
                message.info(msg);
                //注册成功跳转登录页面，不需要返回上一个记录
                router.replace({
                    name: "Login"
                })
            })
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
