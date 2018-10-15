import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
export default class Axios{
    //jsonp本来是可以使用的，但是一般都再二次封装，可以拦截、报错、查看状态码和一些错误处理。
    static jsonp(options){
        return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:"callback"
            },function(err,response){
               // if()
               //debugger; //video 3-8 13:31
               if(response.status == "success"){
                   resolve(response);
               }else{
                   reject(response.message);
               }
            })
        })

    }

    //封装axios
    static ajax(options){
        //请求之前给loading
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById("ajaxLoading");
            loading.style.display="block";
        }
        let baseApi = 'https://www.easy-mock.com/mock/5b9f3f5d1f157370f7e0a38c/bicycleapi';
        //使用promise只是为了可以then
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:"get",
                baseURL:baseApi,
                timeout:5000,
                params:(options.data && options.data.params) || ""
            }).then((response)=>{
                if(options.data && options.data.isShowLoading !== false){
                    loading = document.getElementById("ajaxLoading");
                    loading.style.display="none";
                }
                if(response.status == "200"){
                    let res = response.data;
                    if(res.code == "1"){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }
                }else{
                    reject(response.data);
                }
            })
        })
    }
}