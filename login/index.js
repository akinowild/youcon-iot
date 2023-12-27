const axios = require('axios')

const API_HOST = "https://api.weixin.qq.com" // 如果是mock模式 就不配置host 会走本地Mock拦截
axios.defaults.baseURL = API_HOST

// 用户登录
function userLogin(code){
    const query = {
        appid:'wxa98d10733721a00e',
        secret:'8ad868ec06bf533e108b4742f78bf30c',
        js_code:code,
        grant_type:'client_credential'
    }
    return axios({
        url:`${API_HOST}/sns/jscode2session`,
        method:"post",
        params:query
    }).then(res=>{
        return res.data
    }).catch(error=>{
        return error.data
    })
}

// 获取用户手机号
function userPhoneNumber(code){
    return axios({
        url:`${API_HOST}/wxa/business/getuserphonenumber?access_token=75_d-BaveaMS7Yq8yvupDzwAPj4m89w9MkO9yIT24i1TdlOAiMsixifUZH4uFeMkvbIllc26vYYIHVT4hZo2qVfqC0338X7Fr2vdA-GvA-YXfq3eKNOxw3v3voovS8WABbAEAQUV`,
        method:'post',
        data:{code:code}
    }).then(res=>{
        console.log(res.data)
        return res.data
    }).catch(error=>{
        return error.data
    })
}

exports.userLogin = userLogin;
exports.userPhoneNumber = userPhoneNumber;
