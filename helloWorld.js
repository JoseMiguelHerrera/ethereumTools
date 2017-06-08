const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const contractSRC = fs.readFileSync('HelloWorld.sol').toString();
const compiled = solc.compile(contractSRC, 1);

var _greeting = "Jose's first ETHEREUM SMART CONTRACT"

const bytecode = compiled.contracts[":greeter"].bytecode;
const abi = JSON.parse(compiled.contracts[":greeter"].interface);

// Contract object
const contract = web3.eth.contract(abi);

const contractInstance = contract.new({
    data: '0x' + bytecode,
    from: web3.eth.coinbase,
    gas: 90000
}, (err, res) => {
    if (err) {
        console.log(err);
        return;
    } else {

        // Log the tx, you can explore status with eth.getTransaction()
        console.log(res.transactionHash);

        // If we have an address property, the contract was deployed
        if (res.address) {
            console.log('Contract address: ' + res.address);
            // Let's test the deployed contract
            ///testContract(res.address);
        }
    }
});
