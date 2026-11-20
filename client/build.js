const { execSync } = require('child_process');

try {
  console.log('==> Building GOPCA client with Vite...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('==> Client build completed successfully.');
} catch (err) {
  console.error('==> Client build failed:', err.message);
  process.exit(1);
}
