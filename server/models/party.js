class Parties {
	constructor(){
		this.parties = [];
	}

	createParty(data){
		const newParty = {
			id: this.parties.length + 1,
			name: data.name,
			hqAddress: data.hqAddress,
			logoUrl: data.logoUrl
		}
		this.parties.push(newParty);
		return newParty;
	}

	getAllParties(){
		return this.parties;
	}

	getSpecificParty(id) {
		const parties = this.parties;
		const result = parties.find(x => x.id == id);		
		return result;
	}

	deleteParty(id){
		const parties = this.parties;
		const i = parties.findIndex(x => x.id == id);
		parties.splice(i, 1);
	}
	
	updateParty(id, data) {
		const parties = this.parties;
		const party = parties.find(x => x.id == id);
				if(data.name) party.name = data.name;
				if(data.hqAddress) party.hqAddress = data.hqAddress;
				if(data.logoUrl) party.logoUrl = data.logoUrl;				
	}

	checkParty(data){
		const parties = this.parties;
		const party = parties.find(x => x.name == data.name || x.logoUrl == data.logoUrl);
		return party;

	}
	
}

export default new Parties();