/**
 * 手机号验证
 * @param {*} value 手机号 
 * @returns Boolean
 */
export function checkPhone(value){
    //手机号正则表达式
    let regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    //验证并返回结果
    return regPhone.test(value);
}

/**
 * 密码校验：6-20位数字+字母
 * @param {*} value 
 */
export function checkPassword(value){
    //密码校验正则
    let regPass = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return regPass.test(value)
}

/**
 * 检验验证码格式（检验邀请码格式）
 * @param {*} value 
 * @returns 
 */
export function checkCode(value){
    let regCode = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6}$/;
    return regCode.test(value);
}