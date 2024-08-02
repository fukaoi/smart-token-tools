// sum.test.js
import { expect, test } from 'vitest'
import { tokenMint } from '~/utils/token-mint'

test('Mint token', () => {
  const owner = '';
  const file = '';
  const metadata = {
    name: 'smt',
    symbol: 'SMT',
    decimals: 5,
    tokenSupply: 1000000,
  }
  
  const res = tokenMint('devnet', owner, file, metadata);
  expect(res).toBeTruthy();
})
