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
		let result = [];
		for(let i = 0; i < parties.length; i ++){
			if(parties[i].id == id){
				result.push(parties[i]);
			}
		}
		return result;
	}

	deleteParty(id){
		const parties = this.parties;
		for(let i = 0; i < parties.length; i ++){
			if(parties[i].id == id){
				parties.splice(i, 1);
			}
		}
		return parties;
	}
	updateParty(id, data) {
		const parties = this.parties;
		console.log(data);
		for(let i = 0; i < parties.length; i ++){
			if(parties[i].id == id){
				if(data.name) parties[i].name = data.name;
				if(data.hqaddress) parties[i].hqaddress = data.hqaddress;
				if(data.logourl) parties[i].logourl = data.logourl;
			}
		}
		
	}

	checkParty(data){
		const parties = this.parties;
		const party = parties.find(x => x.name == data.name || x.logoUrl == data.logoUrl);
		return party;

	}
	
}

export default new Parties();