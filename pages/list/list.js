import fetch from "../../utils/utils.js";

Page({
  data: {
    id: 0,
    currentPage: 1,
    pageSize: 10,
    hasMore: true,
    title: "",
    shopList: []
  },

  // 如何获取到链接中的查询参数
  // 可以在onLoad 钩子函数中通过参数获取
  onLoad(query){
    this.setData({
      id: query.id,
      title: query.title
    })

    this.getList();
  },

  onReady(){
    wx.setNavigationBarTitle({
      title: this.data.title
    });
  },

  // 上拉加载
  onReachBottom(){
    this.setData({
      currentPage: ++this.data.currentPage
    })
    this.getList();
  },

  // 下拉刷新
  onPullDownRefresh(){
    this.data.currentPage = 1;
    this.data.shopList = [];
    this.getList();
  },

  getList(){
    let {id, currentPage, pageSize} = this.data;

    fetch(`categories/${id}/shops?_page=${currentPage}&_limit=${pageSize}`).then(res => {
      // 判断是否还有数据
      // 获取总的条数
      let total = res.header["X-Total-Count"];

      // if (currentPage < Math.ceil(total / pageSize)){
      //   this.data.hasMore = true;
      // }else{
      //   this.data.hasMore = false;
      // }

      // 优化
      this.data.hasMore = currentPage < Math.ceil(total / pageSize);

      // 更新数据，加载更多数据
      this.setData({
        shopList: this.data.shopList.concat(res.data),
        hasMore: this.data.hasMore,
      })
    })
  }

})