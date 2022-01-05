import puppeteer from 'puppeteer'

import { screentscroll } from './util.js'

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

screenshort()