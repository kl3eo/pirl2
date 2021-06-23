//Usage: node send.js --address=5Cz7dPxsaDZY4PVUhgh8tiTbF2XavtPd7nwzJkhbsxFsJG2e --qty=1
//sends a limited amount <= 9907Pirl

const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } =  require('@polkadot/api');
const provider = new WsProvider('wss://room-house.com:8442/');
const args = require('minimist')(process.argv.slice(2));
const recv = args['address'];
const qty = args['qty'];

//sender json

const jsn = {
encoded: '####################################',
  encoding: {
    content: [ 'pkcs8', 'sr25519' ],
    type: [ 'scrypt', 'xsalsa20-poly1305' ],
    version: '3'
  },
  address: '5DqoKzgxVkh5H1izjJTGfAvU1ZACJeHnaWhVWD5b6hnH96zx',
  meta: { name: 'testA', whenCreated: 1622172591188 }
};


async function main () {

  const api = await ApiPromise.create(
{provider, types: {
"Address": "AccountId",
"LookupSource": "AccountId",
"Account": {
"nonce": "U256",
"balance": "U256"
},
"Transaction": {
"nonce": "U256",
"action": "String",
"gas_price": "u64",
"gas_limit": "u64",
"value": "U256",
"input": "Vec",
"signature": "Signature"
},
"Signature": {
"v": "u64",
"r": "H256",
"s": "H256"
},
"Keys": "SessionKeys5"
}
});
  const keyring = new Keyring({ type: 'sr25519' });
  const sndr = await keyring.createFromJson(jsn);

  const b = await sndr.unlock('My_strong_passwd');

const unsub = await api.tx.balances
  .transfer(recv, 1000000000000*qty)
  .signAndSend(sndr, (result) => {
    console.log(`Current status is ${result.status}`);

    if (result.status.isInBlock) {
      console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
	process.exit()
    } else if (result.status.isFinalized) {
      //console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
      //unsub();
    }
  });

  let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(recv);

  console.log(`${recv} has a balance of ${previousFree}, nonce ${previousNonce}`);
  api.query.system.account(recv, ({ data: { free: currentFree }, nonce: currentNonce }) => {

  const change = currentFree.sub(previousFree);

    if (!change.isZero()) {
      console.log(`New balance change of ${change}, nonce ${currentNonce}`);

      previousFree = currentFree;
      previousNonce = currentNonce;
    }
  });

}
main().catch(console.error);

