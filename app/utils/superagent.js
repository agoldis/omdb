const Promise = window.Promise || require('q')
const agent = require('superagent-promise')(require('superagent'), Promise)

export default agent
