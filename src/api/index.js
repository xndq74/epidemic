import request from '@/utils/request'

export const news = () => request({
  url: '/ncov/index',
  method: 'get',
  params: {
    key: '38ca5f9ac7dd69424fb535dc223a072f'
  }
})
