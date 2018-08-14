import assert from 'assert'
import toast from '../../lib/toast/'

import {
  coverage,
  sleep,
} from './helper'

describe('test toast', () => {
  afterEach(() => {
    coverage()
  })

  it('test basic show and hide', async () => {
    toast.show('aaa')
    await sleep(1)

    assert.ok(document.querySelector('.ap-icon') == null, 'has no icon')
    assert.equal(document.querySelector('.ap-toast').textContent.trim(), 'aaa', 'should has text `aaa`')

    toast.hide()
    await sleep(1)
    assert.ok(document.querySelector('.ap-icon') == null, 'hide should work')
  })

  it('test basic spin', async () => {
    toast.spin('ttt')
    await sleep(1)
    assert.ok(document.querySelector('.ap-icon-spin'), 'should has spin icon')
    assert.equal(document.querySelector('.ap-toast').textContent.trim(), 'ttt', 'should has text `ttt`')
    toast.hide()
    await sleep(1)
    assert.ok(document.querySelector('.ap-icon') == null, 'hide should work')
  })

  it('success and error', async () => {
    toast.success('success!')
    await sleep(1)
    assert.ok(document.querySelector('.ap-icon-success'), 'should has success icon')
    assert.equal(document.querySelector('.ap-toast').textContent.trim(), 'success!', 'should has text `success!`')
    toast.hide()
    await sleep(1)
    assert.ok(document.querySelector('.ap-icon') == null, 'hide should work')

    toast.error('error!')
    await sleep(1)
    assert.ok(document.querySelector('.ap-icon-error'), 'should has error icon')
    assert.equal(document.querySelector('.ap-toast').textContent.trim(), 'error!', 'should has text `error!`')
    toast.hide()
    await sleep(1)
    assert.ok(document.querySelector('.ap-icon') == null, 'hide should work')
  })

  it('test toast duration default 2000ms', async () => {
    toast.show()
    await sleep(1000)
    assert.ok(document.querySelector('.ap-toast'))
    await sleep(1100)
    assert.ok(document.querySelector('.ap-toast') == null)
  })

  it('test toast custom duration', async () => {
    toast.show('', {
      duration: 500,
    })
    await sleep(1)
    assert.ok(document.querySelector('.ap-toast'))
    await sleep(500)
    assert.ok(document.querySelector('.ap-toast') == null)
  })

  it('spin should not auto disappear', async () => {
    toast.spin('', {
      duration: 1000,
    })
    await sleep(3000)
    assert.ok(document.querySelector('.ap-toast'))
  })

  it('test toast promise: normal logic', async () => {
    assert.equal(toast.spin(), null, 'toast.spin should return void')
    const autoHide = await toast.show('', {
      duration: 500,
    })
    assert.equal(autoHide, true)
  })

  it('test toast promise: call hide()', async () => {
    const promise = toast.show('', {
      duration: 1000000,
    })
    toast.hide(10086)
    const result = await promise
    assert.equal(result, 10086)
  })

  it('test toast promise: interrupt by new toast', async () => {
    const promise = toast.show('aaa', {
      duration: 1000000,
    })

    toast.spin()
    const result = await promise
    assert.equal(result, false)
    assert.ok(document.querySelector('.ap-icon-spin'), 'should has spin icon')
    assert.equal(document.querySelector('.ap-toast').textContent.trim(), '', 'should has no text')
  })

  it('test custom className', async () => {
    toast.show('', {
      className: 'custom-class',
      duration: 100000,
    })

    await sleep(1)

    assert.ok(document.querySelector('.ap-toast.custom-class'))
  })
})
