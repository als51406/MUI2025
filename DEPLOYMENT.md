# 🚀 배포 가이드

## 빌드 완료 ✅

프로젝트가 `/mui` 서브 경로에서 호스팅되도록 빌드되었습니다.

### 📦 빌드 결과
- **빌드 폴더**: `build/`
- **메인 JS 파일**: 181.93 kB (gzip 후)
- **CSS 파일**: 796 B (gzip 후)
- **호스팅 경로**: `/mui/`

---

## 🌐 외부 서버 배포 방법

### 방법 1: Apache 서버

1. **빌드 폴더 업로드**
   ```bash
   # build 폴더의 모든 파일을 서버의 /var/www/html/mui/ 경로에 업로드
   scp -r build/* user@your-server.com:/var/www/html/mui/
   ```

2. **.htaccess 설정** (build 폴더에 이미 있다면 스킵)
   ```apache
   # /var/www/html/mui/.htaccess
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /mui/
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /mui/index.html [L]
   </IfModule>
   ```

3. **접속 URL**
   ```
   https://your-domain.com/mui
   ```

---

### 방법 2: Nginx 서버

1. **빌드 폴더 업로드**
   ```bash
   # build 폴더의 모든 파일을 서버의 /usr/share/nginx/html/mui/ 경로에 업로드
   scp -r build/* user@your-server.com:/usr/share/nginx/html/mui/
   ```

2. **Nginx 설정**
   ```nginx
   # /etc/nginx/sites-available/default
   server {
       listen 80;
       server_name your-domain.com;

       location /mui {
           alias /usr/share/nginx/html/mui;
           try_files $uri $uri/ /mui/index.html;
           index index.html;
       }
   }
   ```

3. **Nginx 재시작**
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **접속 URL**
   ```
   https://your-domain.com/mui
   ```

---

### 방법 3: Node.js (Express) 서버

1. **Express 서버 설정**
   ```javascript
   // server.js
   const express = require('express');
   const path = require('path');
   const app = express();

   // /mui 경로로 정적 파일 서빙
   app.use('/mui', express.static(path.join(__dirname, 'build')));

   // SPA 라우팅 처리
   app.get('/mui/*', (req, res) => {
       res.sendFile(path.join(__dirname, 'build', 'index.html'));
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
       console.log(`Access at: http://localhost:${PORT}/mui`);
   });
   ```

2. **서버 실행**
   ```bash
   node server.js
   ```

---

### 방법 4: GitHub Pages

1. **package.json 확인**
   ```json
   {
     "homepage": "/mui"
   }
   ```

2. **배포**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **package.json에 scripts 추가**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

4. **배포 실행**
   ```bash
   npm run deploy
   ```

5. **접속 URL**
   ```
   https://your-username.github.io/mui
   ```

---

### 방법 5: Vercel

1. **Vercel CLI 설치**
   ```bash
   npm i -g vercel
   ```

2. **vercel.json 생성**
   ```json
   {
     "rewrites": [
       { "source": "/mui/(.*)", "destination": "/mui/" }
     ]
   }
   ```

3. **배포**
   ```bash
   vercel --prod
   ```

---

### 방법 6: Netlify

1. **netlify.toml 생성**
   ```toml
   [build]
     command = "npm run build"
     publish = "build"

   [[redirects]]
     from = "/mui/*"
     to = "/mui/index.html"
     status = 200
   ```

2. **배포**
   - Netlify 사이트에서 폴더 드래그 앤 드롭
   - 또는 Netlify CLI 사용

---

## 📁 빌드 폴더 구조

```
build/
├── index.html              # 메인 HTML
├── favicon.ico             # 파비콘
├── manifest.json           # PWA 매니페스트
├── robots.txt              # SEO 설정
├── images/                 # 이미지 폴더
│   ├── 1.png ~ 8.png
│   ├── Icon1.png ~ Icon4.png
│   ├── Nike.png
│   ├── iPhone12.png
│   └── ro1.png ~ ro4.png
└── static/
    ├── css/
    │   └── main.*.css      # 스타일시트
    └── js/
        └── main.*.js       # JavaScript 번들
```

---

## ✅ 배포 체크리스트

- [x] `homepage: "/mui"` 설정 확인
- [x] 모든 이미지 경로 `process.env.PUBLIC_URL` 사용
- [x] 빌드 성공 (에러 없음)
- [ ] 서버에 업로드
- [ ] 서버 설정 (Apache/Nginx)
- [ ] 브라우저에서 접속 테스트
- [ ] 모든 이미지 로드 확인
- [ ] 차트 정상 동작 확인
- [ ] 테이블 정렬 기능 확인

---

## 🔧 문제 해결

### 이미지가 안 보이는 경우
- 서버의 `/mui/images/` 폴더가 존재하는지 확인
- 이미지 파일 권한 확인 (`chmod 644`)

### CSS가 안 적용되는 경우
- 브라우저 캐시 삭제 (Ctrl + Shift + R)
- `homepage` 설정 확인

### 404 에러 발생 시
- 서버 리라이트 규칙 확인
- SPA 라우팅 설정 확인

---

## 📞 접속 URL

배포 완료 후 다음 URL로 접속:
```
https://your-domain.com/mui
```

---

## 🎉 배포 완료!

모든 설정이 완료되었습니다.  
위 방법 중 하나를 선택하여 배포하세요.
