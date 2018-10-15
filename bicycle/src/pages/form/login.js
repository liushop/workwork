import React, { Component } from 'react';
import { Card, Form, Input, Button,message,Icon,Checkbox } from 'antd';
const FormItem = Form.Item;
class FormLogin extends Component {
    goSubmit=()=>{
        //获取form表单所有的值
        let userInfo = this.props.form.getFieldsValue();
        //开始校验
        this.props.form.validateFields((err,values)=>{
            if(!err){
                message.success(`${userInfo.userName}恭喜您通过本次验证，当前密码为${userInfo.passWord}`)
            }
        })
    }
    render() {
        //getFieldDecorator是js子对象，可以验证表单
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="登录行内表单">
                    {/* <Form.Item>如果上面不提取成变量，这样也是可以的 */}
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>

                <Card title="登录水平表单" style={{ marginTop: 10 }}>
                    <Form style={{ width: 300 }}>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    //initialValue: "chao99.top",
                                     rules: [{
                                        required:true,
                                        message:"用户名不能为空"
                                    },{
                                        min:5,max:10,
                                        message:"长度在5-10之间"
                                    },{
                                        //正则表达式校验
                                        //pattern:/^\w+$/g,
                                        pattern:new RegExp('^\\w+$','g'),
                                        message:"用户名必须为字母或数字"
                                    }]
                                })(
                                    //prefix前缀直接用icon
                                    <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('passWord', {
                                    //initialValue: "chao99.top",
                                     rules: [{
                                        required:true,
                                        message:"密码不能为空"
                                     }]
                                })(
                                    <Input prefix={<Icon type="lock"/>} placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName:"checked",
                                    initialValue: true,
                                     rules: [{
                                        required:true,
                                        message:"密码不能为空"
                                     }]
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{float:'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.goSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

//Form.create()(FormLogin)只有写了这个，上面this.props才能接受到值，并且必须在这导出
export default Form.create()(FormLogin)
