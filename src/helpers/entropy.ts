import { Entropy, charset16 } from 'entropy-string'

export default new Entropy({ total: 1e6, risk: 1e9, charset: charset16 })
