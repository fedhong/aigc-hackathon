import { useStore } from '../../store'
import copy from 'copy-to-clipboard'
import { Row, Col, Radio, Select, Button, message } from 'antd'
import './index.less'

function component() {

    const prompt = useStore(state => state.prompt)

    const copyPrompt = (prompt) => {
        const res = copy(prompt)
        if (res) {
            message.success('复制成功!')
        } else {
            message.error('复制失败，请手动复制！')
        }
    }

    return (
        <div className='CopyPrompt'>
            <a onClick={() => { copyPrompt(prompt) }}>{prompt}</a>
        </div >
    )
}

export default component