import { createIPX, createIPXMiddleware } from 'ipx'

// https://github.com/unjs/ipx
const ipx = createIPX({
  dir: '', // absolute path to images dir
  domains: ['https://scontent.cdninstagram.com'], // allowed external domains (should match domains option in nuxt.config)
  alias: {
    instagram: 'https://scontent.cdninstagram.com',
  },
  sharp: {}, // sharp options
})

export default createIPXMiddleware(ipx)