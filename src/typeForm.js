import puppeteer from 'puppeteer'

(async function () {
  const brower = await puppeteer.launch({
    headless: false,
    slowMo: 300,
    devtools: true,
    args: ['--start-maximized']
  })
  const page = await brower.newPage()
  await page.setViewport({
    width: 1200,
    height: 800
  })
  await page.goto('https://www.google.com', {
    waitUntil: 'networkidle0'
  })
  // 聚焦在输入框
  try {
    await page.focus('.gLFyf.gsfi').catch (err => {
      console.log('聚焦失败！', err)
    })
  } catch (err) {
    console.log('聚焦执行异常', err)
  }
  // 输入搜索词，直接在chrome打开的input是有id的，但是无头chrome打开的是没带id
  try {
    await page.type('.gLFyf.gsfi', '周杰伦', {
      delay: 1000
    }).catch (err => {
      console.log('输入搜索词失败！', err)
    })
  } catch (err) {
    console.log('输入执行异常', err)
  }
  // 延迟1s后按下回车键
  try {
    await page.keyboard.press('Enter', {
      delay: 1000
    }).catch (err => {
      console.log('按下回车失败！', err)
    })
  } catch (err) {
    console.log('按下回车键执行异常', err)
  }
  await page.waitForTimeout(2000)
  try {
    await page.screenshot({
      path: 'C:/Users/98X5MF3/Desktop/Jay.jpeg',
      type: 'png',
      fullPage: true
    }).catch (err => {
      console.log('截图失败', err)
    })
  } catch (err) {
    console.log('执行异常', err)
  }
  await page.close()
  await brower.close()
})()
