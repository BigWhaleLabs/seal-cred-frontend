import { Entropy, charset16 } from 'entropy-string'

export default new Entropy({ charset: charset16, risk: 1e9, total: 1e6 })
