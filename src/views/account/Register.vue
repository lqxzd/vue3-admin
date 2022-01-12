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

                <a-form-item>
                    <label>密码</label>
                    <a-input
                        v-model="account_form.password"
                        type="password"
                        autocomplete="off"
                    />
                </a-form-item>

                <a-form-item>
                    <label>确认密码</label>
                    <a-input
                        v-model="account_form.confirmPass"
                        type="password"
                        autocomplete="off"
                    />
                </a-form-item>

                <a-form-item>
                    <label>验证码</label>
                    <a-row :gutter="15">
                        <a-col :span="14">
                            <a-input
                                v-model="account_form.code"
                                type="password"
                                autocomplete="off"
                            />
                        </a-col>
                        <a-col :span="10">
                            <a-button type="primary" block>获取验证码</a-button>
                        </a-col>
                    </a-row>
                </a-form-item>

                <a-form-item>
                    <a-button type="primary" html-type="submit" block>注册</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
    name: "Login",
    // eslint-disable-next-line no-unused-vars
    setup(props) {
        let checkUsername = async (rule, value, callback) => {
            if (!value) {
                return Promise.reject('请输入用户名'); //判空的错误提示
            }

            if (!Number.isInteger(value)) {
                return Promise.reject('Please input digits');
            } else {
                if (value < 18) {
                    return Promise.reject('Age must be greater than 18');
                } else {
                    return Promise.resolve();
                }
            }
        };
        const formConfig = reactive({
            layout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            },
            account_form: {
                username: "",
                password: "",
                confirmPass: "",
                code: ""
            },
            rules_form: {
                username: [
                    {
                        validator: checkUsername,
                        trigger: 'change',
                    },
                ],
            }
        })

        const data = toRefs(formConfig);

        //提交表单
        const handleFinish = () => {
            alert("hello")
        }

        return {
            ...
            data,
            handleFinish
        }
    }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
