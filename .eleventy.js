const dayjs = require('dayjs')
const modern = require('eleventy-plugin-modern')
const { htmlToText } = require('html-to-text')

const toc = require('markdown-it-toc-done-right')
module.exports = (config) => {
  config.addPlugin(
    modern({
      markdownIt(md) {
        md.use(toc)
      },
    })
  )
  config.addPassthroughCopy('_redirects')
  config.addPassthroughCopy('favicon.ico')

  config.addFilter("excerpt", (content) => {
    content = htmlToText(content, {
        wordwrap: false
    });
    return content.length > 200 ? content.substring(0, 200) + '...' : content;
});

  config.addShortcode('date', (content) => {
    return dayjs(content).format('YYYY/MM/DD')
  })
  return {
    markdownTemplateEngine: false,
    dir: {
      input: '.', // 输入路径，默认为当前目录
      output: 'docs', // 输出路径，默认为 "_site"
    },
  }
}
