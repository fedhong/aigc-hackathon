const URL_PREFIX = '/api'

const _fetch = async ({ url = '', method = 'GET', params = {}, isDownload = false }) => {

    url = URL_PREFIX + url
    method = method.toUpperCase()

    const option = {
        method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }

    if (method == 'GET') {
        const paramStr = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
        if (paramStr) {
            url = `${url}${url.indexOf('?') > -1 ? '&' : '?'}${paramStr}`
        }
    }

    if (isDownload) {
        window.location.href = url
        return
    }


    if (method == 'POST') {
        option.body = Object.keys(params).map(key => {
            return `${key}=${encodeURIComponent(params[key])}`
        }).join('&')
    }

    try {
        const response = await fetch(url, option)
        if (response.status === 200) {
            const json = await response.json()
            if (json.code === 0) {
                return json.data
            } else {
                throw new Error(json.msg ? json.msg : `code ${json.code}`)
            }
        } else {
            throw new Error(`${response.status},${response.statusText}`)
        }
    } catch (error) {
        throw error
    }
}

const fetchBizOptions = async () => {
    try {
        const url = '/option/biz'
        return await _fetch({ url })
    } catch (error) {
        throw error
    }
}

const fetchStyleOptions = async () => {
    try {
        const url = '/option/style'
        return await _fetch({ url })
    } catch (error) {
        throw error
    }
}

export {
    fetchBizOptions,
    fetchStyleOptions,
}