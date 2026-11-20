const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  const cwd = process.cwd();
  const hasClientFolder = fs.existsSync(path.join(cwd, 'client'));

  if (hasClientFolder) {
    console.log('==> Building GOPCA Web Portal from repository root...');
    if (!fs.existsSync(path.join(cwd, 'client', 'node_modules'))) {
      console.log('==> Installing client dependencies...');
      execSync('npm --prefix client install', { stdio: 'inherit' });
    }
    console.log('==> Running Vite build...');
    execSync('npm --prefix client run build', { stdio: 'inherit' });

    // Copy dist to root dist so Vercel finds it under any outputDirectory setting
    const srcDist = path.join(cwd, 'client', 'dist');
    const rootDist = path.join(cwd, 'dist');
    if (fs.existsSync(srcDist)) {
      if (fs.existsSync(rootDist)) {
        fs.rmSync(rootDist, { recursive: true, force: true });
      }
      fs.cpSync(srcDist, rootDist, { recursive: true });
      console.log('==> Build artifacts synchronized to both client/dist and dist/');
    }
  } else {
    console.log('==> Building GOPCA Web Portal from inside client directory...');
    execSync('npm run build', { stdio: 'inherit' });
  }
  console.log('==> Build completed successfully!');
} catch (err) {
  console.error('==> Build failed:', err.message);
  process.exit(1);
}
