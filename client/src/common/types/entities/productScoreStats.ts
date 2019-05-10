export default interface ProductScoreStats {
  subVertical: string
  count: number
  totalViewAvg: number
  totalViewStddev: number
  recentViewAvg: number
  recentViewStddev: number
  recentZzimAvg: number
  recentZzimStddev: number
  createdAvg: number
  createdStddev: number
  satisfactionAvg: number
  satisfactionStddev: number
  totalSaleAvg: number
  totalSaleStddev: number
  recentSaleAvg: number
  recentSaleStddev: number
  createdAt: Date
}
