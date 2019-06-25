import { axios } from 'common/utils'

export const getSurveyQuestions = async (page: string) => {
  const response = await axios.get(`/api/survey/page/${page}`)
  return response && response.data
}
