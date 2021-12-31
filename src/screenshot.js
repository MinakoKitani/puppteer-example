import puppeteer from 'puppeteer'

// 当截全屏的时候,因为还没有滚动到下面,所以首屏下面的图片不会加载出来,无论你等待多久都没用,所以需要实现滚动操作
async function screenshort () {
  // 启动浏览器
  const brower = await puppeteer.launch({
    headless: false,
    slowMo: 300,
    devtools: true,
    args: ['--window-size=1366, 800', '--start-maximized'] // 第一个参数是想弄窗口大小的，没有用， 第二个参数是把浏览器最大化
  })
  // 打开新页面
  const page = await brower.newPage()
  // 设置tab页的大小
  await page.setViewport({
    width: 1200,
    height: 800
  })
  // 去到特定页面
  await page.goto('https://www.wps.com/', {
    waitUntil: 'networkidle0'
  })
  // 点击同意获取cokkie
  await page.click('#__layout > div > div.gdpr-wrapper > button')
  // 滚动
  await screentscroll(page)
  try {
    // 截图
    await page.screenshot({
      path: 'C:/Users/98X5MF3/Desktop/wps.jpeg',
      type: 'jpeg',
      fullPage: true
    }).catch(err => {
      console.log('截图失败', err)
    })
  } catch (e) {
    console.log('执行异常', e)
  } finally {
    // 关闭当前页面,不关闭的话,下次调起这个页面还存在
    await page.close()
    // 关闭浏览器
    await brower.close()
  }
}

async function screentscroll (page) {
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
async function sleep (delay) {
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

screenshort()