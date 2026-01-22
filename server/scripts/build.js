// server/scripts/build.js
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

// 1️⃣ Load environment variables from .env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// 2️⃣ List of required environment variables
const requiredEnv = ['PORT', 'NODE_ENV', 'JWT_SECRET', 'JWT_EXPIRE', 'CLIENT_URL'];

// 3️⃣ Validate environment variables
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error(`❌ Missing environment variables: ${missingEnv.join(', ')}`);
  process.exit(1);
}

console.log('✅ All environment variables are set.');

// 4️⃣ Build frontend
try {
  console.log('🔨 Building frontend...');
  execSync('cd client && npm install && npm run build', { stdio: 'inherit' });
  console.log('✅ Frontend built successfully.');
} catch (err) {
  console.error('❌ Frontend build failed.');
  process.exit(1);
}

// 5️⃣ Create deployment checklist
const checklist = `
Deployment Checklist
===================
1. Environment: ${process.env.NODE_ENV}
2. PORT: ${process.env.PORT}
3. JWT_SECRET: ${process.env.JWT_SECRET.substring(0, 8)}... (hidden)
4. JWT_EXPIRE: ${process.env.JWT_EXPIRE}
5. CLIENT_URL: ${process.env.CLIENT_URL}
6. Frontend build: client/build directory exists
7. Backend server: Ensure server is running
`;

const checklistPath = path.resolve(__dirname, '../../DEPLOYMENT_CHECKLIST.txt');
fs.writeFileSync(checklistPath, checklist);
console.log(`📄 Deployment checklist generated at ${checklistPath}`);

// 6️⃣ Optional: create a simple health check endpoint reminder
console.log(`
💡 Reminder:
- Add a health check endpoint at /health in your backend.
- It should return { status: "ok" } for monitoring.
`);

console.log('🎉 Build script completed successfully.');
