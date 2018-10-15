import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd';
import './ui.less';
export default class Buttons extends Component {
    state = {
        showModal1:false,
        showModal2:false,
        showModal3:false,
        showModal4:false
    }
    handleOpen = (type)=>{
        //这样也可以，太冗余
        // if(type=='1'){
        //     this.setState({showModal1:true})
        // }
        this.setState({
            [type]:true
        })
    }

    handleConfirm=(type)=>{
        //这样也可以，太冗余
        // if(type=='1'){
        //     Modal.confirm({代码部分})
        // }

        /*例子：
            var a = {confirm:function({})}
            a.confirm
            a['confirm']
        */

        //对象的两种调用方式Modal.confirm == Modal['confirm']
        //这是第一次测试的Modal.confirm({

        //通过传参来改变状态
            Modal[type]({
            title:"确认？",
            content:"你确定学会React了吗？",
            onOk(){
                console.log("okk")
            },
            onCancel(){
                console.log("Cancel")
            }
        })
    }
    render(){
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal3')}>顶部20px弹窗</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>

                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleConfirm('warning')}>Warning</Button>
                </Card>

                <Modal
                //标题
                title="React"
                //是否可见
                visible={this.state.showModal1}
                //关闭弹窗
                onCancel={()=>{
                    this.setState({
                        showModal1:false
                    })
                }}
                >
                    <p>欢迎来到初心-个人博客</p>
                </Modal>

                <Modal
                //标题
                title="React"
                //确定按钮文本
                okText="好的"
                //取消按钮文本
                cancelText="算了"
                //是否可见
                visible={this.state.showModal2}
                //关闭弹窗
                onCancel={()=>{
                    this.setState({
                        showModal2:false
                    })
                }}
                >
                    <p>欢迎来到初心-个人博客</p>
                </Modal>

                 <Modal
                //标题
                title="React"
                //是否可见
                visible={this.state.showModal3}
                //需要在ui.less中修改原来样式
                style={{top:20}}
                //关闭弹窗
                onCancel={()=>{
                    this.setState({
                        showModal3:false
                    })
                }}
                >
                    <p>欢迎来到初心-个人博客</p>
                </Modal>

                <Modal
                //标题
                title="React"
                //wrapClassName外层对话框样式属性,样式在ui.less中
                wrapClassName="vertical-center-modal"
                //是否可见
                visible={this.state.showModal4}
                //关闭弹窗
                onCancel={()=>{
                    this.setState({
                        showModal4:false
                    })
                }}
                >
                    <p>欢迎来到初心-个人博客</p>
                </Modal>
            </div>
        )
    }
}