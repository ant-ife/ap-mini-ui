import assert from 'assert'

import formatString from '../../lib/util/format-string'

describe('test formatting string', () => {
  it('format', async () => {
    assert.deepEqual(
      formatString('11111', '{4} {4} {4} {4} {3}', 5, false, false),
      {
        value: '1111 1',
        index: 6,
      }
    )

    assert.deepEqual(
      formatString('1111', '{4} {4} {4} {4} {3}', 5, false, false),
      {
        value: '1111',
        index: 4,
      }
    )

    assert.deepEqual(
      formatString('1111', '{4} {4} {4} {4} {3}', 5, false, true),
      {
        value: '1111 ',
        index: 5,
      }
    )
  })
})
