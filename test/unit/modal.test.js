import assert from 'assert'
import modal from '../../lib/modal/'

import {
  coverage,
  sleep,
} from './helper'

/**
 *
 * @param {string} x
 * @return {Element}
 */
const $ = x => document.querySelector(x)

describe('test modal', () => {
  afterEach(() => {
    coverage()
  })

  it('test modal alert()', async () => {
    modal.alert('message')
    await sleep(1)

    assert.ok($('.ap-modal .ap-modal-mask'), 'has mask')
    assert.ok($('.ap-modal .ap-modal-wrap'), 'has container')
    assert.equal($('.ap-modal-content').textContent.trim(), 'message')
    assert.equal($('.ap-modal-button a').textContent.trim(), 'OK')
  })

  it('test modal confirm()', async () => {
    modal.confirm('message')
    await sleep(1)

    assert.ok($('.ap-modal .ap-modal-mask'), 'has mask')
    assert.ok($('.ap-modal .ap-modal-wrap'), 'has container')
    assert.equal($('.ap-modal-content').textContent.trim(), 'message')
    assert.equal($('.ap-modal-button a:first-child').textContent.trim(), 'Cancel', 'has cancel button')
    assert.equal($('.ap-modal-button a:last-child').textContent.trim(), 'OK', 'has ok button')
  })

  it('test alert click', async () => {
    modal.alert('message')
    await sleep(1)
    $('.ap-modal-button a').click()
    await sleep(500)
    assert.equal($('.ap-modal'), null)
  })

  it('test confirm click ok', async () => {
    const promise = modal.confirm('message')
    await sleep(1)
    $('.ap-modal-button a:last-child').click()
    const result = await promise
    // sleep because of transaction
    await sleep(500)
    assert.equal($('.ap-modal'), null)
    assert.equal(result, 1)
  })

  it('test confirm click cancel', async () => {
    const promise = modal.confirm('message')
    await sleep(1)
    $('.ap-modal-button a:first-child').click()
    const result = await promise
    // sleep because of transaction
    await sleep(500)
    assert.equal($('.ap-modal'), null)
    assert.equal(result, 0)
  })

  it('test interrupt', async () => {
    const promise = modal.confirm('message')
    modal.alert('3')
    const result = await promise
    assert.ok($('.ap-modal'))
    assert.equal(result, undefined)
  })

  it('test custom className', async () => {
    modal.confirm('message', {
      className: 'my-class',
    })

    await sleep(1)
    assert.ok($('.ap-modal.my-class'))
  })

  it('test custon title / text / href', async () => {
    modal.confirm('message', {
      title: 'my-title',
      okText: 'ok',
      cancelText: 'cancel',
      okHref: 'https://example.com/ok',
      cancelHref: 'https://example.com/cancel',
    })

    await sleep(1)

    const cancelButton = $('.ap-modal-button a:first-child')
    const okButton = $('.ap-modal-button a:last-child')
    assert.equal($('.ap-modal-header').textContent.trim(), 'my-title')
    assert.equal(okButton.textContent.trim(), 'ok')
    assert.equal(cancelButton.textContent.trim(), 'cancel')
    assert.equal(okButton.href, 'https://example.com/ok')
    assert.equal(cancelButton.href, 'https://example.com/cancel')
  })
})
