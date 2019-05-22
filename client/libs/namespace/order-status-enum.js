let orderStatusEnum = {
  // 待支付
  WaitPay: '1',
  // 已支付正在通知HIS中
  NotStartToHIS: '2',
  // 退费中
  Refunding: '3',
  // 已退费 （new）
  Refunded: '41',
  // 支付成功通知HIS失败
  FailedToHIS: '7',
  // 支付成功通知HIS成功
  SucToHIS: '9',
  // 正在支付
  Paying: '6',
  // 支付失败
  Failed: '5'
}

export default orderStatusEnum
