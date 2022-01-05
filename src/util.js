export async function screentscroll (page) {
  const max_height = 4800
  const scroll_step = 250
  let height_limit = false
  let sValue = {
    scroll_enable: false,
    height_limit: height_limit
  }
  while (!sValue.scroll_enable) {
    sValue = await page.evaluate((max_height, scroll_step, height_limit) => {
      // 防止网页没有body时，滚动报错
      if (document.scrollingElement) {
        let scrollTop = document.scrollingElement.scrollTop
        document.scrollingElement.scrollTop = scrollTop + scroll_step

        // 获取页面的可视高度要注意html中有没有<!DOCTYPE html>， 有则document.body.scrollHeight是总高度，document.documentElement.clientHeight是当前窗口高度，无则相反
        if (null != document.body && document.documentElement.clientHeight > max_height) {
          height_limit = true
        } else if (document.scrollingElement.scrollTop + scroll_step > max_height) {
          height_limit = true
        }

        let scrollEnableFlag = false
        if (null != document.body) {
          scrollEnableFlag = document.body.clientHeight > scrollTop + scroll_step && height_limit
        } else {
          scrollEnableFlag = document.scrollingElement.scrollTop + scroll_step > scrollTop + scroll_step && height_limit
        }

        return {
          scroll_enable: scrollEnableFlag,
          height_limit: height_limit
        }
      }
    }, max_height, scroll_step, height_limit)

    await sleep(300)
  }
  // 回到顶部才截图，不然顶部导航会处于页面不在首屏的状态，难看
  await page.evaluate(() => {
    document.scrollingElement.scrollTop = 0
  })
  await sleep(300)
}

// 延时函数
export async function sleep (delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(1)
      } catch (e) {
        reject(0)
      }
    }, delay)
  })
}
