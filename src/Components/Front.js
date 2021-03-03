import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Picture from './Picture.js';
class Front  extends Component {
	constructor(){
		super();
		this.state = {
			search:'',
			site:'atf',
			picture:null,
			showPicture: false,
		}
		this.search=this.search.bind(this);
		this.handleSearch=this.handleSearch.bind(this);
	}
	search(e){
		e.preventDefault();	
		var json='https://booru.allthefallen.moe/posts.json?tags='+this.state.search+'&is_deleted=false&is_banned=false&limit=2'
        //fetch(json url).then(response=>{return response.json()}).then(data=>{what to do}).catch(error=>{what to do})
       fetch(json).then(response=>{
               return response.json()
               })
          .then(data=>{
               this.setState({
               'picture':data
               })
               console.log(this.state.picture)
			   this.setState({showPicture:true})
               })
           .catch(error=>{
           console.log(error);    
       })
		
		// ReactDOM.render(<Picture search={this.state.search} site={this.state.site}/>, document.querySelector("#results"))
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
			<div>
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
								<button className="btn btn-primary rounded-pill col-3" type="submit">Buscar</button> 
								</div>
							</div>
							</form>
					</div>
					</div>
				</div>
				<div className="container">
						{this.state.showPicture && 
						<Picture data={this.state.picture}/>
						}
				</div>
				
				{/* <div id="results"></div> */}
			</div>
		)
	}
	 
}
export default Front;