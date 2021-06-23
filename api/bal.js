const { ApiPromise, WsProvider } = require('@polkadot/api');
const provider = new WsProvider('wss://room-house.com:8442/');
const args = require('minimist')(process.argv.slice(2));
const Alice = args['address'];

async function main () {
  // Create an await for the API
  const api = await ApiPromise.create({ provider });

  const unsub = await api.query.system.account.multi([Alice], (balances) => {
    const [{ data: balance0 }] = balances;

    console.log(`${balance0.free}`);
    unsub();
    process.exit(0);
  });

}

main().catch(console.error);

