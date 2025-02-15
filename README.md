Event Ticket
===========================

![GitHub repo size](https://img.shields.io/github/repo-size/Luan-Web3/event-ticket?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/Luan-Web3/event-ticket?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/Luan-Web3/uevent-ticket?style=for-the-badge)

Simple service that allows users to verify event tickets using a blockchain smart contract.

## Deploy contract

```
npx hardhat vars set ETHERSCAN_API_KEY
```
```
npx hardhat vars set ALCHEMY_API_KEY
```
```
npx hardhat vars set SEPOLIA_PRIVATE_KEY
```
```
npx hardhat compile
```
```
npx hardhat ignition deploy ignition/modules/Ticket.js --network sepolia --deployment-id sepolia-ticket-deployment --verify
```

## Run api
```
cd api
```
Duplicate the .env.example file and rename it to .env and fill in the values.
```
npm install
```
```
node server.js
```



## Examples

### POST /issue-ticket

```
curl -X POST http://localhost:3000/issue-ticket -H "Content-Type: application/json" -d '{"recipient": "0x1234567890abcdef"}'
```

### GET /verify-ownership

```
curl http://localhost:3000/verify-ownership?owner=0x1234567890abcdef&tokenId=1
```

## License

<sup>
Licensed under either of <a href="LICENSE-APACHE">Apache License, Version
2.0</a> or <a href="LICENSE-MIT">MIT license</a> at your option.
</sup>

<br>

<sub>
Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in this crate by you, as defined in the Apache-2.0 license, shall
be dual licensed as above, without any additional terms or conditions.
</sub>
