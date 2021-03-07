import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Picture from './Picture.js'
import Carousel from './Carousel'
class Front  extends Component {
	constructor(){
		super();
		this.state = {
			search:'',
			site:'atf',
			picture:null,
			showPicture: false,
			showCarousel:false,
			viewId:''
		}
		this.index=React.createRef()
		this.search=this.search.bind(this);
		this.handleSearch=this.handleSearch.bind(this);
		this.handleCarousel=this.handleCarousel.bind(this);
	}
	search(e){
		e.preventDefault();	
		var json
		if(this.state.site=='atf'){
			json ='https://booru.allthefallen.moe/posts.json?tags='+this.state.search+'&is_deleted=false&is_banned=false&limit=10'
		}else{
			json ='https://e621.net/posts.json?login=nena90&api_key=Hb8qjSoFtSRxSPSaezVVJZQC&tags='+this.state.search+' -flash&limit=10'; 
		}
		
        //fetch(json url).then(response=>{return response.json()}).then(data=>{what to do}).catch(error=>{what to do})
       fetch(json).then(response=>{
               return response.json()
               })
          .then(data=>{
			  
			if(this.state.site=='atf'){
				this.setState({
					'picture':data
					})
			}else{
				this.setState({
					'picture':data.posts
					})
			}
               
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
					search:value,
				});
				
			return;
			
			case 'radio-sel':
				this.setState({
					site:value,
					showPicture:false,
				});
			return;
		}
	}
	handleCarousel(id){
		this.setState({showCarousel:!this.state.showCarousel,viewId:id})
		if(id===true){
			console.log('closed');
		}
	}
	render(){
		return(
			<div ref={this.index}>
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
				<div className="container mt-5">
						{this.state.showPicture && 
						<Picture handleCarousel={this.handleCarousel} data={this.state.picture} site={this.state.site}/>
						}
				</div>
				{this.state.showCarousel && 
						<Carousel picture={this.state.picture} handleCarousel={this.handleCarousel} site={this.state.site} id={this.state.viewId}/>
						}
				<a onClick={() => window.scrollTo(0,this.myRef)}>
					<input  type="image" id="GoUp" title="Ir arriba" src="http://tiny.cc/d93pxy" ></input>
				</a>
			</div>
		)
	}
	 
}
export default Front;