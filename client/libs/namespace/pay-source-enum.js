
/* 订单创建渠道
    1. 包含缴费和消费两种类型
*/
let paySourceEnum = {
  // 住院预缴费
  PrepaySrc: 'prepaySrc',
  // 门诊缴费
  HisSrc: 'hisSrc',
  // 一卡通充值(缴费)
  ECardPay: 'eCardPay',
  // 预约
  Subscription: 'subscription',
  // 挂号
  Register: 'register'
}

export default paySourceEnum
