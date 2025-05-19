export const RewardRequestStatus = {
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
} as const;

export type RewardRequestStatus =
  (typeof RewardRequestStatus)[keyof typeof RewardRequestStatus];
