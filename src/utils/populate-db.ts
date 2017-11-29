declare const process: any;

import {database, initializeApp} from 'firebase';
import {firebaseConfig} from '../environments/firebase.config';
import {data} from './wallets-db';

initializeApp(firebaseConfig);

const purchasesRef = database().ref('purchases');
const walletsRef = database().ref('wallets');
const purchasesPerWalletsRef = database().ref('purchasesPerWallets');

async function reset() {
  return Promise.all([
    purchasesRef.set(null),
    walletsRef.set(null),
    purchasesPerWalletsRef.set(null)
  ]);
}

async function addWallet(wallet) {
  const walletRef = await walletsRef.push({
    name: wallet.name,
    amount: wallet.amount
  });

  const newRefs = await Promise.all(wallet.purchases.map(purchase => purchasesRef.push(purchase)));
  const purchasesKeys = newRefs.map(({key}) => key);
  const purchasesPerWalletRef = await purchasesPerWalletsRef.child(walletRef.key);

  return Promise.all(
    purchasesKeys.map(key => purchasesPerWalletRef.child(key).set(true))
  );
}


async function populate() {
  await reset();
  await Promise.all(data.wallets.map(addWallet));

  process.exit();
}

populate();
