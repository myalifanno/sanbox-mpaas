Page({
  data: {
    count: 0,
    progress: 0,
    maxProgress: 100,
    progress1: 10,
    current: 0,
    items: [
      {
        title: 'Step 1',
        description: 'Your first step!',
      },
      {
        title: 'Step 2',
        description: 'Keep going!',
      },
      {
        title: 'Step 3',
        description: 'Almost there!',
      },
      {
        title: 'Step 4',
        description: 'You reached the end!',
      }
    ],
    iconList: [
      'SmileFill',
      '',
      'StarFill'
    ],
  },
  onLoad() {},
  handleAdd () {
    const progress1 = this.data.progress1 + 20
    this.setData({
      progress1: Math.max(Math.min(progress1, 100), 0)
    })
  },
  handleDelete () {
    const progress1 = this.data.progress1 - 20
    this.setData({
      progress1: Math.max(Math.min(progress1, 100), 0)
    })
  },
  onNextTap() {
    if (this.data.current === this.data.items.length - 1) {
      my.alert({
        content: "Yes, You've reached the end"
      });
      return;
    }
    this.setData({
      current: this.data.current + 1,
    });
  },
  onPrevTap() {
    if (this.data.current === 0) {
      return;
    }
    this.setData({
      current: this.data.current - 1,
    });
  },
  handleButton() {
    this.data.count++
    console.log(this.data.count)
  },
  handleButtonDecrement() {
    this.data.count--
    console.log(this.data.count)
  },
  handlePrevious() {
    let { progress } = this.data
    if (progress > 0) {
      progress -= 20
      this.setData({
        progress
      })
    }
  },
  handleNext() {
    let { progress, maxProgress } = this.data
    if (progress < maxProgress) {
      progress += 20
      this.setData({
        progress
      })
    }
  }
});
