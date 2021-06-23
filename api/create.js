const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { keyring } =  require('@polkadot/ui-keyring')
const { mnemonicGenerate } =  require('@polkadot/util-crypto')
const mnemonic = mnemonicGenerate(12);
cryptoWaitReady().then(() => {
 keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
	const { pair, json } = keyring.addUri(mnemonic, 'My_strong_password', { name: 'Das_Zimmer' });
	console.log(json)
 });

