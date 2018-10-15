import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;
export default {
    //header自动更新时间封装
    formateDate(time) {
        //如果时间戳为空，则返回空
        if (!time) return "";
        let date = new Date(time);
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    },

    //分页封装
    /*callback点击下一页时候执行回调 */
    pagination(data, callback) {
        let page = {
            //知道切换到哪一页
            onChange: (current) => {
                callback(current)
            },
            //当前是第几页
            current: data.data.page,
            pageSize: data.data.page_size,
            total: data.data.total,
            showTotal: () => {
                return `共${data.data.total}条`
            },
            //是否有跳转指定页码
            showQuickJumper: true
        }
        return page;
    },

    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds: selectedIds,
                selectedItem: selectedRows
            })
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows
            })
        }
    },

    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [] //[<Option value="0" key="all_key">全部</Option>];
        data.map((item)=>{
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
}