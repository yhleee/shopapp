import { axios, CustomAxiosRequestConfig, errorPopup } from '../utils'
import { formApiErrorHandler, ValidateErrorHandler } from '../types/errors'
import { CONFLICT, NO_CONTENT, NOT_FOUND, UNPROCESSABLE_ENTITY } from 'http-status-codes'

const templateUrl = '/api/templates'

export async function getTemplateList(searchOption, errorHandler: ValidateErrorHandler) {
  try {
    return await axios.get(templateUrl, {
      params: searchOption,
      onErrorHttpStatuses: [UNPROCESSABLE_ENTITY],
    } as CustomAxiosRequestConfig)
  } catch (err) {
    formApiErrorHandler(err, errorHandler)
  }
  return null
}

export async function getTemplate(id) {
  const result = await axios.get(`${templateUrl}/${id}`)
  return result && result.data
}

export async function postTemplate(template, errorHandler: ValidateErrorHandler) {
  try {
    const result = await axios.post(templateUrl, { ...template }, {
      onErrorHttpStatuses: [UNPROCESSABLE_ENTITY, CONFLICT],
    } as CustomAxiosRequestConfig)
    return result && result.data
  } catch (err) {
    formApiErrorHandler(err, errorHandler)
    return template
  }
}

export async function putTemplate(id, template, errorHandler: ValidateErrorHandler) {
  try {
    const result = await axios.put(`${templateUrl}/${id}`, { ...template }, {
      onErrorHttpStatuses: [UNPROCESSABLE_ENTITY, NOT_FOUND],
    } as CustomAxiosRequestConfig)
    return result && result.data
  } catch (err) {
    formApiErrorHandler(err, errorHandler)

    const { status, data } = err

    if (status === NOT_FOUND) {
      errorPopup('데이터가 없습니다.')
    }
    return template
  }
}

export async function deleteTemplate(id) {
  try {
    const result = await axios.delete(`${templateUrl}/${id}`, {
      onErrorHttpStatuses: [NOT_FOUND],
    } as CustomAxiosRequestConfig)
    return result && result.data
  } catch (err) {
    const { status } = err

    if (status === NOT_FOUND) {
      errorPopup('삭제할내용이 없습니다.')
    }
  }
}

export async function patchTemplate(id, updatedTemplate) {
  try {
    const result = await axios.patch(`${templateUrl}/${id}`, { ...updatedTemplate }, {
      onErrorHttpStatuses: [NO_CONTENT],
    } as CustomAxiosRequestConfig)
    return result && result.data
  } catch (err) {
    const { status } = err

    if (status === NO_CONTENT) {
      // do nothing
    }
  }
}

export function isExposedOrder(templateId) {
  return ['GIFT_RECOMMEND_TARGET', 'GIFT_NPAY_CARD_TYPE', 'GIFT_NPAY_CARD_LIST'].includes(templateId)
}
