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
  // 直接取到图片搜索的url，不然这边会出现直接跳到登录页面了，不知道google是怎么弄的
  await page.goto('https://www.google.com/imghp', {
    waitUntil: 'networkidle0',
    timeout: 0
  })
  // 点击搜索栏的上传图片按钮
  try {
    await page.click('.tdPRye', {
      delay: 1000
    }).catch (err => {
      console.log('点击上传图片搜索失败！', err)
    })
  } catch (err) {
    console.log('点击上传图片搜索执行异常', err)
  }
  await page.waitForTimeout(1000)
  // 切换上传本地图片tab
  try {
    await page.click('.iOGqzf.H4qWMc.aXIg1b', {
      delay: 1000
    }).catch(err => {
      console.log('切换上传图片tab失败！', err)
    })
  } catch (err) {
    console.log('切换上传图片tab执行异常', err)
  }
  await page.waitForTimeout(1000)
  // 点击上传图片按钮
  let uploadBtn = null
  try {
    uploadBtn = await page.waitForSelector('#awyMjb', {
      timeout: 1000
    }).catch (err => {
      console.log('选择上传图片按钮失败！', err)
    })
  } catch (err) {
    console.log('选择上传图片按钮执行异常', err)
  }
  await page.waitForTimeout(1000)
  // 上传图片
  try {
    await uploadBtn.uploadFile('C:/Users/98X5MF3/Pictures/Saved Pictures/QQ图片20210727130026.jpg')
      .catch (err => {
        console.log('上传图片失败！', err)
      })
  } catch (err) {
    console.log('上传图片执行异常', err)
  }
  // 等到图片上传完成并且搜索，这里使用的是跳到结果页后会在搜索框中显示图片的上传名称，用这个来表示加载完成的标志
  // 上面的方法...会省略过长的图片名称
  // 直接如果展示搜索框就表明搜索结果了
  let result = null
  try {
    result = await page.waitForSelector('#sbtc')
      .catch (err => {
        console.log('找不到图片上传后显示图片的元素，表明上传失败！', err)
      })
  } catch (err) {
    console.log('寻找图片上传后显示图片的元素执行异常', err)
  }
  await page.waitForTimeout(3000)
  // 截图搜索结果
  try {
    await page.screenshot({
      path: 'C:/Users/98X5MF3/Desktop/search.jpeg',
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
