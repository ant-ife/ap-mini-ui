/**
 *
 * @param {string} value
 * @param {string} tpl
 * @param {number} cursorIndex
 * @param {boolean} isBackKey
 * @param {boolean} formatAdvanced
 */
export default function formatString (
  value,
  tpl,
  cursorIndex,
  backKey,
  formatAdvanced
) {
  let currentIndex = 0
  let formatStr = ''
  const matcher = /\{(\d+)\}/g
  let matchResult
  let execIndex = 0
  let valueTooShoot = false
  let resultCursorIndex = -1

  while ((matchResult = matcher.exec(tpl)) && !valueTooShoot) {
    const num = parseInt(matchResult[1], 10)
    const oldIndex = currentIndex
    const oldExecIndex = execIndex

    currentIndex = currentIndex + num
    execIndex = matcher.lastIndex

    if (formatAdvanced || value.length > oldIndex) {
      // 格式化后的字符串 + 分隔符（如空格）+ 新片段
      const slice = value.slice(oldIndex, currentIndex)
      const breaker = tpl.slice(oldExecIndex, execIndex - matchResult[0].length)
      formatStr = formatStr + breaker + slice
    }

    if (
      currentIndex > value.length ||
      (backKey && currentIndex === value.length)
    ) {
      currentIndex = value.length
      valueTooShoot = true
    }

    // cursor position
    if (
      (
        oldIndex < cursorIndex ||
        (oldIndex === cursorIndex && (!backKey || !cursorIndex))
      ) && (
        cursorIndex < currentIndex ||
        (cursorIndex === currentIndex && backKey)
      )
    ) {
      resultCursorIndex = formatStr.length - (currentIndex - cursorIndex)
    }
  }

  if (!valueTooShoot) {
    formatStr = formatStr + tpl.slice(execIndex)
  }

  if (resultCursorIndex === -1) {
    resultCursorIndex = formatStr.length
  }

  return {
    value: formatStr,
    index: resultCursorIndex,
  }
}
