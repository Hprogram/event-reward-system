export const EventConditionType = {
  MONSTER_KILL: 'MONSTER_KILL',
  DAILY_CHECKIN: 'DAILY_CHECKIN',
  FRIEND_INVITE: 'FRIEND_INVITE',
} as const;

export type EventConditionType =
  (typeof EventConditionType)[keyof typeof EventConditionType];

export const EventStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];
