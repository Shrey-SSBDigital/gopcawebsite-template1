const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('==> Warning: Vercel Root Directory was detected as "api".');
console.log('==> Attempting fallback build of client from parent directory...');

try {
  const clientDir = path.join(__dirname, '..', 'client');
  if (fs.existsSync(clientDir)) {
    console.log('==> Running Vite build in client directory...');
    execSync('npm run build', { cwd: clientDir, stdio: 'inherit' });

    // Copy dist into api/dist and api/client/dist so Vercel can find it
    const srcDist = path.join(clientDir, 'dist');
    const apiDist = path.join(__dirname, 'dist');
    const nestedDist = path.join(__dirname, 'client', 'dist');
    if (fs.existsSync(srcDist)) {
      fs.cpSync(srcDist, apiDist, { recursive: true, force: true });
      fs.mkdirSync(path.dirname(nestedDist), { recursive: true });
      fs.cpSync(srcDist, nestedDist, { recursive: true, force: true });
      console.log('==> Successfully built client and mirrored dist artifacts.');
    }
  } else {
    console.log('==> No client directory found in parent.');
  }
} catch (err) {
  console.error('==> Fallback build failed:', err.message);
  process.exit(1);
}
