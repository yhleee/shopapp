const isEmpty = (str: string): boolean => str === undefined || str === null || str.length < 1

const isNotEmpty = (str: string): boolean => !isEmpty(str)

const isBlank = (str: string): boolean => isEmpty(str) || str.trim().length < 1

const isNotBlank = (str: string): boolean => !isBlank(str)

export const StringUtils = { isEmpty, isNotEmpty, isBlank, isNotBlank }
