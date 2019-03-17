// 导入fetch
import fetch from "../../utils/utils.js";

Page({
  data: {
    imgsList: [],
    navList: []
  },

  onLoad() {
    // 导航数据
    this.getSwiper();

    // 九宫格数据
    this.getNav();
  },

  getSwiper() {
    // wx.request({
    //   url: 'https://locally.uieee.com/slides',
    //   success: res => {
    //     this.setData({
    //       imgsList: res.data
    //     })
    //   }
    // })

    // 优化调用
    fetch("slides").then(res => {
      this.setData({
        imgsList: res.data
      })
    })
  },

  getNav() {
    // wx.request({
    //   url: 'https://locally.uieee.com/categories',
    //   success: res => {
    //     this.setData({
    //       navList: res.data
    //     })
    //   }
    // })

    fetch("categories", {

    }).then(res => {
      this.setData({
        navList: res.data
      })
    })
  }

})