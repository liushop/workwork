import React, { Component } from 'react'
import { Card, Row, Col,Modal } from 'antd'
import './ui.less'
export default class componentName extends Component {
    state={
        visible:false
    }
    openGaller=(imgSrc)=>{
        this.setState({
            visible:true,
            currentImg:'/gallery/'+imgSrc
        })
    }
    render() {
        const imgs = [
            ['1.png', '2.png', '3.png', '4.png', '5.png',],
            ['6.png', '7.png', '8.png', '9.png', '10.png',],
            ['11.png', '12.png', '13.png', '14.png', '15.png',],
            ['16.png', '17.png', '18.png', '19.png', '20.png',],
            ['21.png', '22.png', '23.png', '24.png', '25.png',],
        ]
        const imgList = imgs.map((list) => list.map((item) =>
        //因为下面只有一个card组件，不用大括号，两个的话，就需要大括号了
            <Card cover={<img src={'/gallery/' + item} style={{marginBottom:10}} onClick={()=>this.openGaller(item)}/>} >
                <Card.Meta
                    title="初心-个人博客"
                    description="www.chao99.top" />

            </Card>

        ))
        return (
            <div className="card-wrap">
                <Row gutter={10}>
                    <Col md={4}>
                        {imgList[0]}
                    </Col>
                    <Col md={4}>
                        {imgList[1]}
                    </Col>
                    <Col md={4}>
                        {imgList[2]}
                    </Col>
                    <Col md={4}>
                        {imgList[3]}
                    </Col>
                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal visible={this.state.visible}
                onCancel={()=>{
                    this.setState({
                        visible:false
                    })
                }}
                //把确定，取消隐藏掉
                footer={null}
                title="www.chao99.top"
                width={300}
                height={500}
                >
                    <img src={this.state.currentImg} alt="" style={{width:'100%'}}/>
                </Modal>
            </div>
        )
    }
}
