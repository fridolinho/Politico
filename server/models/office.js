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
		const result = [];
		for(let i = 0; i < offices.length; i ++){
			if(offices[i].id == id){
				result.push(offices[i]);
			}
		}
		return result;
	}

}

export default new Offices();