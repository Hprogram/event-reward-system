export const EventConditionType = {
  MONSTER_KILL: 'MONSTER_KILL',
  DAILY_CHECKIN: 'DAILY_CHECKIN',
  FRIEND_INVITE: 'FRIEND_INVITE',
} as const;

export type EventConditionType =
  (typeof EventConditionType)[keyof typeof EventConditionType];

export type EventConditionPayload =
  | { type: typeof EventConditionType.MONSTER_KILL; payload: { count: number } }
  | { type: typeof EventConditionType.DAILY_CHECKIN; payload: { days: number } }
  | {
      type: typeof EventConditionType.FRIEND_INVITE;
      payload: { invites: number };
    };

export const EventStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];

// 이벤트 조건 키 맵
export const EventConditionKeyMap: Record<EventConditionType, string> = {
  MONSTER_KILL: 'count',
  DAILY_CHECKIN: 'days',
  FRIEND_INVITE: 'invites',
};
