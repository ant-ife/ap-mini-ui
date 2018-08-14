import Vue from 'vue'

/**
 * create and mount a vue component into body
 * @param {*} component
 */
export const createVueInstance = (component) => {
  const instance = new Vue(component)
  document.body && document.body.appendChild(instance.$mount().$el)
  return instance
}

/**
 * Load image from a src
 * @param {string} src
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage (src) {
  const img = new Image()
  img.src = src

  return new Promise((resolve, reject) => {
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load img: ${src}`))
  })
}

export const getViewportScale = () => {
  const meta = document.querySelector('meta[name="viewport"]')
  if (!meta) return 1

  const matched = meta.content.match(/initial-scale=([\d.]+)/)
  const scale = Number(matched && matched[1])

  if (!scale || isNaN(scale)) return 1

  return scale
}

const UA = window.navigator.userAgent

/**
 * Device detect
 * @example
 * if (device.iOS) ssomething()
 *
 */
export const device = {
  iOS: /iPhone|iPad|iPod/i.test(UA),
  Android: /Android/i.test(UA),
}

/**
 * Debounce function
 * @param fn
 * @param delay
 */
export const debounce = (fn, delay) => {
  let timer
  // NOT an arrow function, because `this` keyword being used
  return function () {
    const args = arguments
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
