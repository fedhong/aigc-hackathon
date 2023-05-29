import create from 'zustand'
import { produce } from 'immer'
import { fetchBizOptions, fetchStyleOptions } from '../service/api'
import { bizOptions, styleOptions } from '../mock/options'
import translate from '../service/translate'
import aigc from '../service/aigc'
import aigc1, { account, balance } from '../service/aigc1'
import mockImgList from '../mock/data'

const useStore = create((set, get) => {
    return {
        options: {},
        bizOptionSelected: {},
        styleOptionSelected: {},
        previewResult: [],
        prompt: '',
        setOptions: async () => {
            try {
                set({ options: { ...bizOptions, ...styleOptions } })
            } catch (error) {
                throw error
            }
        },
        setBizOptionSelected: (key, value) => {
            set(produce((state) => {
                state.bizOptionSelected[key] = value
            }))
        },
        setStyleOptionSelected: (key, value) => {
            set(produce((state) => {
                state.styleOptionSelected[key] = value
            }))
        },
        setPreviewResult: async (keywords) => {

            try {
                console.log('keywords: ', keywords)

                let prompt = keywords
                try {
                    prompt = await translate(keywords)
                } catch (error) {
                    console.error(`翻译出错：${error}`)
                }
                console.log('prompt: ', prompt)

                const aigcRes = mockImgList
                // TODO 暂时不要调用真实接口，次数有限
                // const promsieAll = await Promise.allSettled([
                //     aigc(prompt),// ClipDrop 模型
                //     aigc1(prompt),// Stability 模型
                // ])
                // const successList = promsieAll.filter(p => p.status === 'fulfilled')
                // const aigcRes = []
                // successList.map(item => {
                //     item.value.map(base64URL => {
                //         aigcRes.push(base64URL)
                //     })
                // })

                console.log('aigcRes', aigcRes)
                set({
                    previewResult: aigcRes,
                    prompt,
                })
            } catch (error) {
                throw error
            }
        }
    }
})

export {
    useStore,
}
