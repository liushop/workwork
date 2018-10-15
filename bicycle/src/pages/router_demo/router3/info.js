import React, { Component } from 'react'
export default class Info extends Component {
    render() {
        return (
            <div>
                这里是测试动态路由,动态路由的值：
                {/* value是路由那边设置的变量 */}
                {this.props.match.params.value}
                </div>
        )
    }
}
