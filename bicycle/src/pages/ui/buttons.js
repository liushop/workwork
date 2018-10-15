import React, { Component } from 'react';
import { Card, Button, Radio } from 'antd';
import './ui.less';
export default class Buttons extends Component {


    state = {
        //给动画个初始值
        loading: true,
        //大中小按钮值
        size: 'default'
    }

    //关闭/打开动画
    closeLoading() {
        let flag = this.state.loading;
        if (flag) {
            this.setState({
                loading: false
            })
        } else {
            this.setState({
                loading: true
            })
        }
    }

    //尺寸按钮，改变大小
    goSize = (e) => {
        this.setState({
            size: e.target.value
        })
    }
    render() {
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">chao99.top</Button>
                    <Button>chao99.top</Button>
                    <Button type="dashed">chao99.top</Button>
                    <Button type="danger">chao99.top</Button>
                    <Button disabled>chao99.top</Button>
                </Card>

                <Card title="图形按钮" className="card-wrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>

                <Card title="Loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading}></Button>
                    <Button type="primary" onClick={this.closeLoading.bind(this)}>关闭</Button>
                </Card>

                <Card title="按钮组" style={{marginBottom:10}}>
                    {/* 组是Group */}
                    <Button.Group>
                        <Button icon="left">返回</Button>
                        <Button icon="right">前进</Button>
                    </Button.Group>
                </Card>

                <Card title="尺寸按钮" className="card-wrap">
                    <Radio.Group size={this.state.size} onChange={this.goSize}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>chao99.top</Button>
                    <Button size={this.state.size}>chao99.top</Button>
                    <Button type="dashed" size={this.state.size}>chao99.top</Button>
                    <Button type="danger" size={this.state.size}>chao99.top</Button>
                </Card>
            </div>
        )
    }
}
