// Import the API
const { ApiPromise } = require('@polkadot/api');
//
// Known account we want to use (available on dev chain, with funds)
const Alice = '5DqoKzgxVkh5H1izjJTGfAvU1ZACJeHnaWhVWD5b6hnH96zx';
const Bob = '5E7LzSoMcgLLRtMamCctCLjzE3ESgpWvENCe7idoPFqgiRt7';

async function main () {
  // Create an await for the API
  const api = await ApiPromise.create();

  const unsub = await api.query.system.account.multi([Alice, Bob], (balances) => {
    const [{ data: balance0 }, { data: balance1 }] = balances;

    console.log(`The balance of Alice is ${balance0.free}`);
    console.log(`The balance of Bob is ${balance1.free}`);

  });

}

main().catch(console.error);

