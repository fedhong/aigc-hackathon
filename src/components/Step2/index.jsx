import { useStore } from '../../store'
import { Row, Col, Radio, Select } from 'antd'
import './index.less'

function component() {
    const options = useStore(state => state.options)
    const setStyleOptionSelected = useStore(state => state.setStyleOptionSelected)
    const styleOptionSelected = useStore(state => state.styleOptionSelected)

    const onChange = (key, value) => {
        setStyleOptionSelected(key, value)
    }

    return (
        <div className='Step2'>
            <Row justify="center" align="middle">
                <Col span={2} align="right">画面品质：</Col>
                <Col span={6}>
                    <Select placeholder="请选择画面品质" mode="multiple" allowClear value={styleOptionSelected.imageQuality} onChange={(value) => { onChange('imageQuality', value) }} options={options.imageQuality}></Select>
                </Col>
                <Col span={1}></Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={2} align="right">摄影类型：</Col>
                <Col span={6}>
                    <Select placeholder="请选择摄影类型" allowClear value={styleOptionSelected.photography} onChange={(value) => { onChange('photography', value) }} options={options.photography}></Select>
                </Col>
                <Col span={1}></Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={2} align="right">拍摄镜头：</Col>
                <Col span={6}>
                    <Select placeholder="请选择拍摄镜头" allowClear value={styleOptionSelected.shot} onChange={(value) => { onChange('shot', value) }} options={options.shot}></Select>
                </Col>
                <Col span={1}></Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={2} align="right">画幅视角：</Col>
                <Col span={6}>
                    <Select placeholder="请选择画幅视角" allowClear value={styleOptionSelected.angle} onChange={(value) => { onChange('angle', value) }} options={options.angle}></Select>
                </Col>
                <Col span={1}></Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={2} align="right">艺术风格：</Col>
                <Col span={6}>
                    <Select placeholder="请选择艺术风格" allowClear value={styleOptionSelected.art} onChange={(value) => { onChange('art', value) }} options={options.art}></Select>
                </Col>
                <Col span={1}></Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={2} align="right">艺术家：</Col>
                <Col span={6}>
                    <Select placeholder="请选择艺术家" allowClear value={styleOptionSelected.artist} onChange={(value) => { onChange('artist', value) }} options={options.artist}></Select>
                </Col>
                <Col span={1}></Col>
            </Row>
        </div >
    )
}

export default component