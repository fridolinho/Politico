class Offices {
	constructor(){
		this.offices = [];
	}

	createOffice(data){
		const newOffice = {
			id: this.offices.length + 1,
			type: data.type,
			name: data.name
		}
		this.offices.push(newOffice);
		return newOffice;
	}

	getAllOffices(){
		return this.offices;
	}

	getSpecificOffice(id) {
		const offices = this.offices
		const result = offices.find(x => x.id == id);		
		return result;
	}

	checkOffice(name){
		const offices = this.offices;
		const office = offices.find(x => x.name == name);
		return office;

	}

}

export default new Offices();