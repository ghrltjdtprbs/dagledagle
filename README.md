# Dagledagle API
NestJS 기반의 커뮤니티 백엔드 API 서버입니다.

JWT 인증, 게시글/댓글/좋아요/알림 기능과 Swagger 문서화를 지원합니다.

---
# Tech Stack
- **Backend**: NestJS + TypeORM + PostgreSQL
- **Infra**: AWS (EC2, Lightsail, RDS, ECS, S3, CloudFront, ALB, Fargate)
- **Auth**: JWT 
- **Docs**: Swagger 
- **Deploy**: GitHub Actions, Docker

---

# API
- **Production :** https://api.dagledagle.store
- **Development :** http://dev.api.dagledagle.store

---

# Swagger
swagger는 dev서버에서만 확인하실 수 있습니다.
- http://dev.api.dagledagle.store/api-docs

---

# Architecture
- **Development** : EC2, Lightsail(DataBase)
- **Production** : ALB, ECS, Fargate, RDS
- **Resource** : CloudFront, S3
    - 파일업로드는 Presigned URL 방식을 채택하였습니다.(클라이언트에서 직접 S3에 업로드 하여야함)
    - CDN에 대체도메인을 적용해 모든 파일 URL은 https://media.dagledagle.store 로 노출됩니다.

<img width="506" alt="Image" src="https://github.com/user-attachments/assets/4d7f38ee-17b4-41e5-a745-611a8c20bc74" />

---
# ETC

### Deploy
각 환경에 맞춰 CI/CD를 구성하였습니다. .github/worflows 폴더 참고해주세요. 
- **Development**: develop 브랜치에 push → GitHub Actions → EC2 SSH 접속 후 docker-compose
- **Production**: main 브랜치에 push → GitHub Actions → ECR 이미지 → ECS Fargate 자동 배포

### Logging
실제 dev서버 로깅 이미지 첨부합니다.
- **Development**: 모든 API 요청(method, path, status) 로그 출력됨
- **Production**: NestJS Logger만 제한적으로 활성화됨
<img width="921" alt="스크린샷 2025-05-08 21 29 57" src="https://github.com/user-attachments/assets/2bfce2ed-cfc0-44a5-bc5e-a10f73109544" />


---
# ERD
![dagledagle](https://github.com/user-attachments/assets/67d9f0e2-a0c0-4430-922c-672145df94d6)

