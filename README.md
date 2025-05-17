# 🎯 이벤트 / 보상 관리 시스템

## 📝 개요

본 프로젝트는 NestJS + MongoDB + Docker 환경에서 구성된 **이벤트 및 보상 관리 플랫폼**입니다.
운영자는 이벤트 및 보상을 등록하고, 유저는 조건을 만족했을 때 보상을 요청할 수 있으며, 감사자는 지급 이력을 확인할 수 있습니다.

이 시스템은 다음과 같은 세 가지 서버로 구성됩니다:

- **Gateway Server**: 모든 API 요청의 진입점. 인증 및 권한 검증 수행
- **Auth Server**: 유저 인증 및 역할(Role) 관리
- **Event Server**: 이벤트 및 보상 등록/요청 처리

## 🛠 기술 스택

| 항목      | 내용                    |
| --------- | ----------------------- |
| Language  | TypeScript              |
| Runtime   | Node.js 18              |
| Framework | NestJS                  |
| Database  | MongoDB                 |
| Auth      | JWT                     |
| Container | Docker + docker-compose |

## ⚙️ 실행 방법

```bash
# 1. 프로젝트 클론
git clone https://github.com/
cd event-reward-system

# 2. 실행 (Docker Compose)
docker-compose up --build
```
