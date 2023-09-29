Page({
  data: {
    liters: '3L',
    isPercentage: true,
    isRemained: true,
    percentage: '',
    percentageH: 'height: 0',
    RemainedH: 0,
    goal: 2600
  },

  // 每次进入页面后加载记录的值，执行动画
  onShow() {
    this.setData({ goal: Number(wx.getStorageSync('goal')) })
    this.updateBigCup(3000 - this.data.goal)
  },

  // 点击小杯子时的触发逻辑
  cups(data) {
    const ml = Number(data.currentTarget.dataset.ml);
    const goal = this.data.goal - ml;
    const total = 3000 - goal;
    this.setData({ goal })
    wx.setStorageSync("goal", goal);
    this.updateBigCup(total)
  },

  // 更新 UI 数据
  updateBigCup(total) {
    const { goal } = this.data;
    if (goal != 3000) {
      this.setData({
        isPercentage: true,
        percentage: `${(total / 3000 * 100).toFixed(0)}%`,
        percentageH: `height: ${total / 3000 * 330}px`
      })
    }

    if (goal <= 0) {
      this.setData({
        remainedH: 0,
        isRemained: false,
      })
    } else {
      this.setData({
        isRemained: true,
        liters: `${goal / 1000}L`
      })
    }
  },

  // 清空记录值
  update() {
    wx.removeStorage({ key: 'goal' })
    this.setData({
      goal: 3000,
      isPercentage: false,
      isRemained: true,
      remainedH: 0,
      percentageH: 'height: 0px',
      liters: '3L'
    })
  }
})
