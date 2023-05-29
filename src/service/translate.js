// 文档
// https://ai.youdao.com/DOCSIRMA/html/%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E7%BF%BB%E8%AF%91/API%E6%96%87%E6%A1%A3/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1/%E6%96%87%E6%9C%AC%E7%BF%BB%E8%AF%91%E6%9C%8D%E5%8A%A1-API%E6%96%87%E6%A1%A3.html
import jsonp from 'jsonp'
import CryptoJS from 'crypto-js'

const URL = 'http://openapi.youdao.com/api'
const APP_KEY = '3aa76f7d32c7cf78'
const KEY = '' //TODO YOUR KEY 注意：暴露appSecret，有被盗用造成损失的风险
const FROM = 'zh-CHS'
const TO = 'en'

function _truncate(q) {
    var len = q.length
    if (len <= 20) return q
    return q.substring(0, 10) + len + q.substring(len - 10, len)
}

const translate = (query) => {
    const salt = (new Date).getTime()
    const curtime = Math.round(new Date().getTime() / 1000)
    const str1 = APP_KEY + _truncate(query) + salt + curtime + KEY
    const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex)
    const data = {
        q: query,
        appKey: APP_KEY,
        salt: salt,
        from: FROM,
        to: TO,
        sign: sign,
        signType: "v3",
        curtime: curtime,
    }
    const params = Object.keys(data).map(key => `${key}=${data[key]}`).join('&')

    return new Promise((resolve, reject) => {
        try {
            jsonp(`${URL}?${params}`, {
                prefix: '_youdao_'
            }, (err, data) => {
                err && reject(err)
                if (data && data.translation && data.translation[0]) {
                    resolve(data.translation[0])
                } else {
                    reject(data.errorCode)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

export default translate

