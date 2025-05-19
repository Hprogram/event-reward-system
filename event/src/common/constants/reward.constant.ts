export const RewardType = {
  POINT: 'POINT',
  ITEM: 'ITEM',
  COUPON: 'COUPON',
} as const;

export type RewardType = (typeof RewardType)[keyof typeof RewardType];
