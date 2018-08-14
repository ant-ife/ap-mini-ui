import runtime from 'macaca-coverage/lib/web/runtime'
export const coverage = runtime.coverage

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
