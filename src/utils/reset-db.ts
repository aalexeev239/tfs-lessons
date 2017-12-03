declare const process: any;

import {database, initializeApp} from 'firebase';
import {firebaseConfig} from '../environments/firebase.config';

initializeApp(firebaseConfig);

const usersRef = database().ref('users');

async function reset() {
  await usersRef.set(null);
  process.exit();
}

reset();
