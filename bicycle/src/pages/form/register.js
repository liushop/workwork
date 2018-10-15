import React, { Component } from 'react'
import { Card, Form, Input, Button, message, Icon, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, InputNumber } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
class FormRegister extends Component {
    //下面判断是否有图片做判断使用
    state = { userImg: "" };
    //获取图片base64字符串
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    //上传成功后的回调
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            //这边应该写上传的地址
            console.log(info.file.originFileObj);
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                //将base64位给当前页面
                userImg: imageUrl,
                loading: false,
            }));
        }
    }

    //注册按钮
    goSubmit = () => {
        //获取form表单所有的值
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo));
        //开始校验
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`${userInfo.userName}恭喜您通过本次验证，当前密码为${userInfo.passWord}`)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const Option = Select.Option;
        const formItemLayout = {
            //lable宽度
            labelCol: {
                //栅格布局，自适应，根据分辨率
                xs: 24,
                sm: 4
            },
            //input宽度
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        //协议向右偏移
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }
        return (
            <div>
                <Card title="注册表单">
                    {/* horizontal默认的，可以不写 */}
                    <Form layout="horizontal">
                        <FormItem label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator('userName', {
                                    rules: [{
                                        required: true,
                                        message: "用户名不能为空"
                                    }]
                                })(
                                    <Input placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>

                        <FormItem label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator('passWord', {
                                    initialValue: ""
                                })(
                                    <Input type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>

                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: "1"
                                })(
                                    <RadioGroup>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>

                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>

                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: "1"
                                })(
                                    <Select>
                                        <Option value="1">React</Option>
                                        <Option value="2">Vue</Option>
                                        <Option value="3">PHP</Option>
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('likes', {
                                    initialValue: ["1", "3"]
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">学习</Option>
                                        <Option value="2">跑步</Option>
                                        <Option value="3">篮球</Option>
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>

                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment("2018-09-17 13:14:52")
                                })(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                )
                            }
                        </FormItem>

                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: "河北省邯郸市"
                                })(
                                    <TextArea
                                        autosize={{
                                            minRows: 5,
                                            maxRows: 6
                                        }}
                                    />
                                )
                            }
                        </FormItem>

                        <FormItem label="活动时间" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker />
                                )
                            }
                        </FormItem>

                        <FormItem label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload
                                        listType="picture-card"
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        showUploadList={false}
                                        onChange={this.handleChange}
                                    >{this.state.userImg ? <img src={this.state.userImg} /> : <Icon type="plus" />}</Upload>
                                )
                            }
                        </FormItem>

                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('xy')(
                                    <Checkbox>我已阅读过<a href="http://www.chao99.top" target="_banck">初心-个人博客注册协议</a></Checkbox>
                                )
                            }
                        </FormItem>

                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('reg')(
                                    <Button type="primary" onClick={this.goSubmit}>注册</Button>
                                )
                            }
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
//创建一个新表单，把当前表单传进去，通过antd重新创建from，并导出
export default Form.create()(FormRegister)
