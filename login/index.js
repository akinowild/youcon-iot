const axios = require('axios')

const API_HOST = "https://api.weixin.qq.com/" // 如果是mock模式 就不配置host 会走本地Mock拦截
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
        url:'https://api.weixin.qq.com/sns/jscode2session',
        params:query
    }).then(res=>{
        return res.data
    }).catch(error=>{
        return error.data
    })
}

export {userLogin}