import { useStore } from '../../store'
import copy from 'copy-to-clipboard'
import { Row, Col, Radio, Select, Button, message, Divider } from 'antd'
import './index.less'

function component() {

    const previewResult = useStore(state => state.previewResult)
    const bizOptionSelected = useStore(state => state.bizOptionSelected)

    const useImg = (url) => {
        if (window.top != window.self) {
            window.parent.postMessage({
                code: 0,
                data: {
                    url,
                    txt: bizOptionSelected.txt
                }
            }, '*')
        } else {
            const res = copy(url)
            if (res) {
                message.success('复制成功!')
            } else {
                message.error('复制失败，请手动复制！')
            }
        }
    }

    return (
        <div className='Preview'>
            <Row justify="center" align="middle">
                <Col className="mode-type-text" align="middle"><b>ClipDrop</b><br />创作生成</Col>
                {
                    previewResult.map((item, index) => (index < 3 && <Col key={index} align="middle">
                        <div className='img-wrapper'>
                            <div className='img-wrapper-box'>
                                <img src={item}></img>
                            </div>
                            <div className='btn-wrapper'>
                                <Button type="primary" onClick={() => { useImg(item) }}>使用</Button>
                            </div>
                        </div>
                    </Col>))
                }
            </Row>
            {
                previewResult.length > 3 && <Row justify="center" align="middle">
                    <Col className="modeTypeText" align="middle"><b>Stability</b><br />创作生成</Col>
                    {
                        previewResult.map((item, index) => ((index > 2 && index < 6) && <Col key={index} align="middle">
                            <div className='img-wrapper'>
                                <div className='img-wrapper-box'>
                                    <img src={item}></img>
                                </div>
                                <div className='btn-wrapper'>
                                    <Button type="primary" onClick={() => { useImg(item) }}>使用</Button>
                                </div>
                            </div>
                        </Col>))
                    }
                </Row>
            }
        </div >
    )
}

export default component