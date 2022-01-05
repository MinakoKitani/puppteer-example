import puppeteer from 'puppeteer'

import { screentscroll } from './util.js'

// 生成pdf
async function pdf () {
  const brower = await puppeteer.launch({
    // headless: false,                    // 无头模式,注意！一定要在无头模式下才能生成pdf
    args: ['--start-maximized']
  })
  const page = await brower.newPage()
  await page.setViewport({                        // tab页的窗口大小
    width: 1360,
    height: 800
  })
  await page.goto('https://www.wps.com/')
  await page.click('#__layout > div > div.gdpr-wrapper > button')
  await screentscroll(page)
  // 改变页面的css媒体类型为scrren,如果不设置则是默认类型为print
  await page.emulateMediaType('screen')
  try {
    await page.pdf({
      path: 'C:/Users/98X5MF3/Desktop/wps.pdf',    // pdf保存路径
      printBackground: true,                       // 是否把背景图也加上
      width: 1360,                                 // 每页pdf的长度
      height: 5000,                                // 每页pdf的高度,不够高则再弄一张新的页面
      //'-webkit-print-color-adjust': 'exact'        // 为pdf渲染上css颜色
    }).catch(err => {
      console.log('生成pdf失败', err)
    })
  } catch (err) {
    console.log('执行异常', err)
  } finally {
    await page.close()
    await brower.close()
  }
}

pdf()
