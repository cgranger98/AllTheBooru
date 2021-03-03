import React, { Component } from 'react';

class Front  extends Component {
	constructor(){
		super();
		this.state = {
			search:'',
			site:'atf'
		}
		this.search=this.search.bind(this);
		this.handleSearch=this.handleSearch.bind(this);
	}
	search(e){
		e.preventDefault();
		console.log(this.state)
	}
	handleSearch(e){
		const {value,name} = e.target;
		switch(name){
			case 'inputSearch':
				this.setState({
					search:value
				});
			return;
			
			case 'radio-sel':
				this.setState({
					site:value
				});
			return;
		}
	}

	render(){
		return(
			<div className="container">
				<div className="row">
				<div className="col-4"></div>
					<div className="col-4">
						<h1>All The</h1>
						<h1>Booru</h1>
						<form onSubmit={this.search}>
						<div className="col">
							<input id="radio-atf" name="radio-sel" onChange={this.handleSearch} value="atf" type="radio" defaultChecked></input>
							<label htmlFor="radio-atf">ATF</label>
							<input id="radio-e621" name="radio-sel" onChange={this.handleSearch} value="e621" type="radio" className="ms-2"></input>
							<label htmlFor="radio-e621">E621</label>
							<div className="row">
							<input id="inputSearch" name="inputSearch" type="text" onChange={this.handleSearch} className="rounded col" placeholder="Buscar"/>
							<button className="btn btn-outline-primary text-primary rounded-pill col-3" type="submit">Buscar</button> 
							</div>
						</div>
						</form>
				</div>
				
				
			</div>
			</div>
		)
	}
	
}

export default Front;