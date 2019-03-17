// 把wx.request 封装实现支持 promise

const BASE_URL = "https://locally.uieee.com/";

// 调用方式
// 1. fetch("地址");
// 2. fetch("地址", {});
// 3. fetch({});

export default function fetch(url, options={}){

  if(typeof url === "string"){
    options.url = url;
  }

  if(typeof url === "object"){
    options = url;
  }

  return new Promise(function(reslove, reject){
    wx.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      success: function(res){
        reslove(res)
      },
      fail(err){
        reject(res);
      }
    })
  });
}