import * as dayjs from 'dayjs'
export const getDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}
