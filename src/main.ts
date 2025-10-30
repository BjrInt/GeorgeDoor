import { GeorgeDoorScene } from './GeorgeDoorScene';

const app = document.getElementById('app');
if (!app) {
  throw new Error('Could not find app element');
}

new GeorgeDoorScene(app);