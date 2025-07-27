// commitlint.config.cjs

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',      // 新功能
        'fix',       // 修复 bug
        'docs',      // 文档变更
        'style',     // 不影响逻辑的样式调整
        'refactor',  // 重构（非新增功能或修复）
        'perf',      // 性能优化
        'test',      // 添加或修改测试
        'build',     // 构建系统变更
        'ci',        // CI 配置变更
        'chore',     // 杂项，不影响功能的修改
        'revert',    // 回滚提交
      ],
    ],
    'subject-case': [0], // 不限制描述大小写
  },
};
