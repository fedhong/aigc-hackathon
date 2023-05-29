import React, { useEffect, useState } from 'react'
import { Button, Steps, message, Spin } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { useStore } from './store'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Preview from './components/Preview'
import CopyPrompt from './components/CopyPrompt'
import 'antd/dist/antd.css'
import './App.less'

const { Step } = Steps

const steps = [
    {
        title: '第一步',
        subTitle: '业务配置',
        description: '业务配置',
        content: <Step1></Step1>,
    },
    {
        title: '第二步',
        subTitle: '风格配置',
        description: '风格配置',
        content: <Step2></Step2>,
    },
    {
        title: '第三步',
        subTitle: '效果预览',
        description: '效果预览',
        content: <Preview></Preview>,
    },
]

function App() {

    const [current, setCurrent] = useState(0)
    const [loading, setLoading] = useState(false)
    const setOptions = useStore(state => state.setOptions)
    const options = useStore(state => state.options)
    const bizOptionSelected = useStore(state => state.bizOptionSelected)
    const styleOptionSelected = useStore(state => state.styleOptionSelected)
    const setPreviewResult = useStore(state => state.setPreviewResult)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        setLoading(true)
        await setOptions().catch(error => {
            message.error(`获取选项数据失败：${error.message}`)
        })
        setLoading(false)
    }

    const next = async () => {
        if (current == steps.length - 2) {
            const success = await genImg()
            if (!success) return
        }
        setCurrent(current + 1)
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    const genImg = async () => {
        setLoading(true)
        const keywords = []
        // 风格key放在前面
        Object.keys({ ...styleOptionSelected, ...bizOptionSelected }).map(key => {

            // option中已选择的value
            const selectValue = bizOptionSelected[key] || styleOptionSelected[key]

            // 过滤出关键字
            if (Object.prototype.toString.call(selectValue) == '[object Array]') {
                // 多选
                options[key] && options[key].map(item => {
                    selectValue.map(sv => {
                        if (item.value === sv) {
                            keywords.push(item.keywords)
                        }
                    })
                })
            } else {
                // 单选			
                options[key] && options[key].map(item => {
                    if (item.value === selectValue) {
                        if (key == 'category') {
                            keywords.unshift(item.keywords)
                        } else {
                            keywords.push(item.keywords)
                        }
                    }
                })
            }
        })

        if (bizOptionSelected.txt) {
            // keywords.push(` with the word ${bizOptionSelected.txt}`)
        }

        if (keywords.join(',').trim() == '') {
            message.error('请选择参数')
            setLoading(false)
            return false
        }

        try {
            // keywords.push('(Size:690x338)')
            await setPreviewResult(keywords.join(', '))
        } catch (error) {
            message.error(error)
        }

        setLoading(false)
        return true
    }

    return (
        <div className="App">
            <div className="Content">
                <Spin spinning={loading}>
                    <div className="steps-bar">
                        <Steps current={current} >
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} subTitle={item.subTitle} />
                            ))}
                        </Steps>
                    </div>
                    <div className="steps-content">
                        {!loading && steps[current].content}
                    </div>
                    <div className="steps-btn">
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                上一步
                            </Button>
                        )}
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                下一步
                            </Button>
                        )}
                        {current == steps.length - 1 && (
                            <Button type="primary" onClick={() => genImg()} icon={<ReloadOutlined />} >
                                换一批
                            </Button>
                        )}
                        {
                            (current == steps.length - 1 && window.top == window.self) && <CopyPrompt />
                        }
                    </div>
                </Spin>
            </div>
        </div >
    )
}

export default App