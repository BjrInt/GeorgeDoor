import { GeorgeDoorScene } from './GeorgeDoorScene';

const app = document.getElementById('app');
if (!app) {
  throw new Error('Could not find app element');
}

try{
  await navigator.wakeLock.request('screen');
}
catch(err){
  console.error('Could not obtain wake lock:', err);
}

new GeorgeDoorScene(app);