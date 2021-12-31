module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*): (.*)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
  rules: {
    'type-enum': [2, 'always', [
      'feat',     //新功能
      'update',   //功能更新
      'fix',      //缺陷修复
      'docs',     //文档
      'style',    //样式
      'test',     //测试
      'refactor', //重构
      'chore'     //构建或辅助工具变动
    ]],
  },
}
