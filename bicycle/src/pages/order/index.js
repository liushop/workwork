import React, { Component } from 'react'
import { Card, Button, Table, Form, Select, Modal, message, Pagination, DatePicker } from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;
export default class Order extends Component {
    state = {}
    params = {
        page: 1
    }
    componentDidMount() {
        this.requestList()
    }
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: "/order/list",
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            this.setState({
                list: res.data.item_list.map((item, index) => {
                    //添加key
                    item.key = index;
                    return item;
                }),
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }
    render() {
        //表头
        const columns = [
            {
                title: "订单编号",
                dataIndex: "order_sn"
            }, {
                title: "车辆编号",
                dataIndex: "bick_sn"
            }, {
                title: "用户名",
                dataIndex: "user_name"
            }, {
                title: "手机号",
                dataIndex: "mobile"
            }, {
                title: "里程",
                dataIndex: "distance"
            }, {
                title: "行驶时长",
                dataIndex: "total_time"
            }, {
                title: "状态",
                dataIndex: "status"
            }, {
                title: "开始时间",
                dataIndex: "start_time"
            }, {
                title: "结束时间",
                dataIndex: "end_time"
            }, {
                title: "订单金额",
                dataIndex: "total_fee"
            }, {
                title: "实付金额",
                dataIndex: "user_pay"
            },
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>

                <Card style={{ marginTop: 10 }}>
                    <Button>订单详情</Button>
                    <Button>结束订单</Button>
                </Card>

                {/* table-start */}
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                    />
                </div>
                {/* table-end */}
            </div>
        )
    }
}
//搜索信息表单
class FilterForm extends React.Component {
    render() {
        //getFieldDecorator是js对象，可以实现数据双向绑定
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator("city_id")(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">邯郸市</Option>
                                <Option value="2">北京市</Option>
                                <Option value="3">杭州市</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label="订单时间">
                    {
                        getFieldDecorator("start_time")(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>

                <FormItem>
                    {
                        getFieldDecorator("end_time")(
                            <DatePicker style={{ marginLeft: 5 }} showTime format="YYYY-MM-DD HH:mm:ss" />
                        )
                    }
                </FormItem>

                <FormItem label="订单状态">
                    {
                        getFieldDecorator("status")(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem>
                    <Button type="primary" style={{ margin: "0 20px" }}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
//创建表单
FilterForm = Form.create({})(FilterForm);
