import fetch from "../../utils/utils.js";

Page({
  data: {
    id: "",
    title: "",
    detail: {}
  },

  onLoad(query){
    this.setData({
      id: query.id,
      title: query.title
    })

    this.getDetailList();
  },

  onReady(){
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },

  getDetailList(){
    fetch(`shops/${this.data.id}`).then(res => {
      this.setData({
        detail: res.data
      })
    })
  },

  preview(e){
    let {current, urls} = e.currentTarget.dataset;

    // 由于传递的链接参数都是带w.h的，
    current = current.replace("w.h", "1000.1000");
    urls = urls.map(item => item.replace("w.h", "1000.1000"));

    console.log(current, urls);

    wx.previewImage({
      current: current,
      urls: urls
    })
  }

})