import React, { Component } from 'react'
import { Card, Carousel } from 'antd'
import './ui.less'
export default class Carousels extends Component {
    render() {
        return (
            <div>
                <Card title="文字背景轮播" className="card-wrap">
                    <Carousel autoplay effect="fade">
                        <div><h3>www.chao99.top-react</h3></div>
                        <div><h3>www.chao99.top-vue</h3></div>
                        <div><h3>www.chao99.top-angular</h3></div>
                    </Carousel>
                </Card>

                 <Card title="图片背景轮播" className="slider-wrap">
                    <Carousel autoplay effect="fade">
                        <div><img src="/carousel-img/carousel-1.jpg"/></div>
                        <div><img src="/carousel-img/carousel-2.jpg"/></div>
                        <div><img src="/carousel-img/carousel-3.jpg"/></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
