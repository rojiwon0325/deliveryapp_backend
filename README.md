# Delivery App Service - backend

## To Do List - 새로 공부할 것들

- [x] 외부 인증 서비스를 활용한 로그인 서비스

  - [x] passport를 사용하여 카카오 인증서버로부터 데이터 불러오기
  - [x] jwt발급하여 쿠키에 저장하기 -> guard설정 변경
  - [x] kakao-login에서 유저 데이터 및 토큰 저장 => 로직 구체화할 것
        참고: https://developers.kakao.com/docs/latest/ko/kakaologin/common
  - [x] 네이버도 적용

- [ ] 로그아웃 & 회원탈퇴 기능 추가

  - [ ] 인증 서버에서 토큰 만료 -> https/post를 반환하는 과정에서 cors문제 발생
  - [ ] db에서 토큰 데이터 제거
  - [x] jwt토큰 쿠키 제거 후 redirect

- [x] 아임포트를 도입하여 결제 서비스 -> 실제 사업자가 아니면 제한이 많음, 생략

- [ ] swagger 작성법 및 RESTAPI 공부

  - [x] swagger 모듈 설치

- [x] github action
  - [x] git flow 전략을 사용한 개발 branch 분리
    - [x] main pull request시 test 실행
    - [x] main push시 jest coverage report를 자동으로 gh-page에 배포

## To Do List - 미숙한 것들

- [ ] test code 작성

  - [x] unit Test
  - [ ] e2e Test
  - [x] github action 테스트 자동화(CI)

- [ ] validation & transform
  - [ ] service함수에 validation하기 위해선 추가 구현이 필요

## Module

- [x] User
- [x] Auth

  - [x] PassportKakao
  - [x] PassportKakao

- [x] Restaurant
- [x] Category
- [ ] Menu

* 주문 서비스 개발 필요

---

- [ ] Upload
- [ ] Mail
