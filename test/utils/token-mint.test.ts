// sum.test.js
import { expect, test } from 'vitest'
import { tokenMint } from '~/utils/token-mint'

test('Mint token', () => {
  const walletAdapter = '';
  const file = '';
  const metadata = {
    name: 'smt',
    symbol: 'SMT',
    decimals: 5,
    tokenSupply: 1000000,
  }
  
  const res = tokenMint('devnet', walletAdapter, file, metadata);
  expect(res).toBeTruthy();
})
