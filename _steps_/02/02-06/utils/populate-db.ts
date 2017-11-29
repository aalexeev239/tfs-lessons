import {database, initializeApp} from 'firebase';
import {environment} from '../environments/environment';
import {data} from './wallets-db';

initializeApp(environment.firebase);

const purchasesRef = database().ref('purchases');

async function populate() {
  await purchasesRef.set(null);

  const promises = data.map(i => purchasesRef.push(i));

  await Promise.all(promises);

  process.exit();
}

populate();

