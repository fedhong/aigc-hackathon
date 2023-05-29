import { useEffect } from 'react'
import { useStore } from '../../store'
import { Row, Col, Radio, Select, Input } from 'antd'
import './index.less'

function component() {
    const options = useStore(state => state.options)
    const setBizOptionSelected = useStore(state => state.setBizOptionSelected)
    const bizOptionSelected = useStore(state => state.bizOptionSelected)

    const onChange = (key, value) => {
        setBizOptionSelected(key, value)
    }

    return (
        <div className='Step1'>
            <Row justify="center" align="middle">
                <Col span={2} align="right">推广场景：</Col>
                <Col span={6}>
                    <Radio.Group value={bizOptionSelected.adType} onChange={(e) => { onChange('adType', e.target.value) }} options={options.adType} optionType="button" buttonStyle="solid" />
                </Col>
                <Col span={1}></Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={2} align="right">推广节日：</Col>
                <Col span={6}>
                    <Select placeholder="请选择推广节日" allowClear value={bizOptionSelected.festival} onChange={(value) => { onChange('festival', value) }} options={options.festival}></Select>
                </Col>
                <Col span={1}></Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={2} align="right">推广时段：</Col>
                <Col span={6}>
                    <Select placeholder="请选择推广时段" allowClear value={bizOptionSelected.period} onChange={(value) => { onChange('period', value) }} options={options.period}></Select>
                </Col>
                <Col span={1}></Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={2} align="right">定向人群：</Col>
                <Col span={6}>
                    <Radio.Group value={bizOptionSelected.persona} onChange={(e) => { onChange('persona', e.target.value) }} options={options.persona} optionType="button" buttonStyle="solid" />
                </Col>
                <Col span={1}></Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={2} align="right">投放品类：</Col>
                <Col span={6}>
                    <Select placeholder="请选投放品类" allowClear value={bizOptionSelected.category} onChange={(value) => { onChange('category', value) }} options={options.category}></Select>
                </Col>
                <Col span={1}></Col>
            </Row>
            <Row justify="center" align="middle">
                <Col span={2} align="right">广告语：</Col>
                <Col span={6}>
                    <Input placeholder="请输入广告语" allowClear value={bizOptionSelected.txt} onChange={(e) => { onChange('txt', e.target.value) }}></Input>
                </Col>
                <Col span={1}></Col>
            </Row>
        </div >
    )
}

export default component