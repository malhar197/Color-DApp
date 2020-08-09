const Color = artifacts.require('./Color.sol')

require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('Color',(accounts) => {
	let contract

	before(async() => {
		contract = await Color.deployed()
	})

	describe('deployment', async() => {
		it('deploys succesfully', async() => {
			const address = contract.address
			assert.notEqual(address,'')
			assert.notEqual(address,0x0)
			assert.notEqual(address,null)
			assert.notEqual(address,undefined)
			console.log(address)
		})

		it('has a name', async() => {
			const name = await contract.name()
			assert.equal(name,'Color')
		})

		it('has a symbol', async() => {
			const symbol = await contract.symbol()
			assert.equal(symbol,'COLOR')
		})
	})

	describe('minting', async() => {
		it('creates a new token', async() => {
			const result = await contract.mint('#008b00')
			const totalSupply = await contract.totalSupply()
			assert.equal(totalSupply,1)
			console.log(result)
			const event = result.logs[0].args
			//Success
			assert.equal(event.tokenId.toNumber(),1,'id is correct')
			assert.equal(event.to,accounts[0],'to is correct')
			//Failure
			await contract.mint('#008b00').should.be.rejected;
		})
	})

	describe('indexing', async() => {
		it('lists colors', async() => {
			//Mint three tokens
			await contract.mint('#210af0')
			await contract.mint('#cadb2a')
			await contract.mint('#ac67ef')
			const totalSupply = await contract.totalSupply()

			let color
			let result = []
			for (var i = 1; i <= totalSupply; i++) {
				color = await contract.colors(i-1)
				result.push(color)
			}

			let expected = ['#008b00','#210af0','#cadb2a','#ac67ef']
			assert.equal(result.join(','),expected.join(','))
		})
	})


})