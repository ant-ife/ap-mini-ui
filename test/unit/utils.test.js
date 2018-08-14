import assert from 'assert'

import * as _ from '../../lib/util/'

import { coverage, sleep } from './helper'

describe('test utils', () => {
  afterEach(() => {
    coverage()
  })

  it('debounce work', async () => {
    const list = []
    const func = _.debounce((i) => {
      list.push(i)
    }, 50)

    func(0)
    func(1)
    await sleep(60)
    func(2)
    func(3)
    await sleep(30)
    func(4)
    await sleep(30)
    func(5)
    await sleep(30)
    func(6)
    await sleep(30)
    func(7)
    await sleep(60)
    assert.deepEqual(list, [1, 7])
  })
})
