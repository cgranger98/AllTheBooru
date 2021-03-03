
function Front(){
return(
    <div>
        <a id="LinkBtn" hidden="tue"></a>
            <header id="header" name="header">
            </header>
                <div>
                    <div className="checkbox">
                        <a onClick={TurnDark}>
                        <input type="checkbox" id="turnDark"/>
                        <label htmlFor="turnDark">Dark Mode
                        </label></a>
                    </div>
                </div>
                
            <div id="content" className="col-md-5 col-xs-12">
                
                <h1>All</h1><h1>The Booru</h1>
                <div className="row">
                    <div className="col-md-3 col-xs-5">
                        <label className="radio-inline spacing">
                            <input type="radio" name="type" id="radioatf" value="atf" defaultChecked={true}/>
                            <b>ATF</b>
                        </label>
                    </div>
                    <div className="col-md-3 col-xs-5">
                        <label className="radio-inline spacing">
                            <input type="radio" name="type" id="radioe621" value="e621"/>
                            <b>e621</b>
                        </label>
                    </div>
                </div>
                <div className="ui-widget">
                    <input type="text" id="searchValue"/>
                    <button id="btn1" className="hoverA" onClick={Validation}>Buscar</button>
                </div><br/>
                <p type="text" className="error" id="error" readOnly hidden></p>
                <p type="text" id="load" readOnly hidden>Cargando...</p>
            </div>
            <br/>
            <div id="results" className="results"></div>
            
            {/* <!-- carousel --> */}
            <div id="carousel" className="carousel slide" data-ride="carousel" data-touch="true" data-interval="false" hidden>

                {/* <!-- Wrapper for slides --> */}
                <div className="carousel-inner" id="carousel-inner" role="listbox">
                    
                </div>
                {/* <!-- Controls --> */}
                <a className="left carousel-control" id="prev" href="#carousel" role="button" data-slide="prev">
                    <span className="arrow control" onClick={slideFunc} title="Previous" aria-hidden="true">
                    <i className="fa fa-arrow-circle-left"></i>
                    </span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" id="next" href="#carousel" role="button" data-slide="next">
                    <span className="arrow control" onClick={slideFunc} title="Next" aria-hidden="true">
                    <i className="fa fa-arrow-circle-right"></i>
                    </span>
                    <span className="sr-only">Next</span>
                </a>
                <a className="cross-button" href="#"  role="button">
                    <span className="control cross" id="close" title="Close" aria-hidden="true" onClick={closeSlideshow}>
                    <i className="fa fa-times"></i>
                    </span>
                </a>
            </div>
            
            {/* <!-- end carousel --> */}
            <a href="#header">
                <input type="image" id="GoUp" title="Ir arriba" src="http://tiny.cc/d93pxy" />
            </a>
            {/* <!--Toast--> */}
                <div className="toast" id="toast" hidden>
                    <div className="toast-header">
                        <strong className="mr-auto text-primary">Notificación</strong>
                    </div>
                    <div className="toast-body">
                        <p id="message" style={{color:"white"}}></p>
                    </div>
                </div>
                <br/>
            {/* <!--End Toast--> */}
    </div>
)
}

//
var request = new XMLHttpRequest();
var flag=true;
var slideshow=false;





var ext;
document.onload=function(){

    //fill predictions
    var searchValue = document.getElementById('searchValue');
searchValue.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      Validation();
    }
    if ((event.keyCode>=65 & event.keyCode<=90) | event.keyCode==189 | (event.keyCode>=48 & event.keyCode<=57) | event.keyCode==8) 
    {
      var tag_query=[];
      var type = document.getElementsByName('type');
      if(type[0].checked==true){
      var json='https://booru.allthefallen.moe/tags.json?search[name_matches]='+searchValue.value+'*';		
      }else{
      var json='https://e621.net/tags.json?search[name_matches]='+searchValue.value+'*';	
      }
      
      fetch(json)
              .then(response=>{
                  return response.json()
                  })
              .then(data=>{
                  data.forEach(elem => {tag_query.push(elem.name)});
                  
                  searchValue.autocomplete.source(tag_query);
                  searchValue.trigger('keydown');
                  })
          .catch(error=>{})
    }
    
  });
  //fill predictions
}
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://booru.allthefallen.moe/posts.json', true);

function RequestAtf() {
    var searchValue = document.getElementById('searchValue');
	var search = searchValue.value.replace(' ','+');
	var json = 'https://booru.allthefallen.moe/posts.json?tags='+search+'&is_deleted=false&is_banned=false&limit=100';
	
	// Begin accessing JSON data here
	var loading = document.getElementById('load');
	loading.hidden=false;
	//fetch(json url).then(response=>{return response.json()}).then(data=>{what to do}).catch(error=>{what to do})
	fetch(json)
	  .then(response => {
		return response.json()
	  })	
	  .then(data => {
          var error = document.getElementById('error');
          var content = document.getElementById('results')
		  loading.hidden=true;
		  if(data.length==0){
            ;
			content.innerHTML='';
			error.innerHTML="No encontrado";
			error.hidden=false;
			return;}else{
				error.hidden=true;
				content.innerHTML='';
			}
		// Work with JSON data here
		content.innerHTML='';
		document.getElementById('carousel-inner').innerHTML='';
		const container = document.createElement('div');
        container.setAttribute('className','contianer');
        const row = document.createElement('div');
		row.setAttribute('className','row');
        var n=1;
		data.forEach(elem => {
            console.log(elem);
		// Iterate elements here
		if (elem.is_deleted==false&elem.is_banned==false){
		var img;
		const imgdiv = document.createElement('div');
		imgdiv.setAttribute('className','col-5 square');
		var vid = document.createElement('img');
		vid.setAttribute('src','img/video.png');
		
		ext = elem.file_ext;
		switch(ext){
			case 'png': 
						img = document.createElement('img');
						img.setAttribute('src',elem.large_file_url);
						img.setAttribute('title',elem.tag_string);
						break;
			case 'jpg': img = document.createElement('img');
						img.setAttribute('src',elem.large_file_url);
						img.setAttribute('title',elem.tag_string);
						break;
			case 'gif': img = document.createElement('img');
						img.setAttribute('src',elem.large_file_url);
						img.setAttribute('title','Abrir gif');
						break;
			case 'swf': img=null;
						break;
			case 'mp4': img = document.createElement('img');
						img.setAttribute('controls','');
						img.setAttribute('style','width:70%');
						img.setAttribute('src',elem.preview_file_url);
						imgdiv.appendChild(vid);
						break;
			case 'zip': img = document.createElement('img');
						img.setAttribute('controls','');
						img.setAttribute('style','width:70%');
						img.setAttribute('src',elem.preview_file_url);
						imgdiv.appendChild(vid);
						break;
			case 'rar': img = document.createElement('img');
						img.setAttribute('controls','');
						img.setAttribute('style','width:70%');
						img.setAttribute('src',elem.preview_file_url);
						imgdiv.appendChild(vid);
						break;	
			case 'webm':img = document.createElement('img');
						img.setAttribute('controls','');
						img.setAttribute('loop','');
						img.setAttribute('src',elem.preview_file_url);
						img.setAttribute('style','width:70%');
						imgdiv.appendChild(vid);
						break;
		}
		if(img!=null){
			img.setAttribute('className','column post');
			img.id="prev"+elem.id;
			img.addEventListener('click',function(){Slideshow(img,elem)});
			vid.addEventListener('click',function(){Slideshow(img,elem)});
			img.style.cursor='pointer';
			container.appendChild(row);
            row.appendChild(imgdiv);
			imgdiv.appendChild(img);
			fillCarouselATF(elem);
		}
		
		}
		});
		content.appendChild(container);
		
		searchValue.blur();
	  })
	  .catch(err => {
		// Do something for an error here
        console.log(err);
        var error = document.getElementById('error');
		error.value = "No encontrado.";
		
	  })
}

function RequestE621(){
	var searchValue = document.getElementById('searchValue');
	var search = searchValue.value.replace(' ','+');
	var json ='https://e621.net/posts.json?login=nena90&api_key=Hb8qjSoFtSRxSPSaezVVJZQC&tags='+search+' -flash&limit=100';
	
	// Begin accessing JSON data here
	var loading = document.getElementById('load');
	loading.hidden=false;
	//fetch(json url).then(response=>{return response.json()}).then(data=>{what to do}).catch(error=>{what to do})
	fetch(json)
	  .then(response => {
		return response.json()
	  })	
	  .then(data => {
		  loading.hidden=true;
		  data=data.posts;
          var error = document.getElementById('error');
            var content = document.getElementById('results');
		  if(data.length==0){
            
			content.innerHTML='';
			error.innerHTML="No encontrado";
			error.hidden=false;
			return;}else{
				error.hidden=true;
				content.innerHTML='';
			}
		console.log(data);
		// Work with JSON data here
		content.innerHTML='';
		document.getElementById('carousel-inner').innerHTML='';
		const div = document.createElement('div');
		div.setAttribute('className','row');
		data.forEach(elem => {
		// Iterate elements here
		var img;
		const imgdiv = document.createElement('div');
		imgdiv.setAttribute('className','col-xs-5 col-md-5 square');
		var vid = document.createElement('img');
		vid.setAttribute('style','width:20%;height:25%;margin:10px:position:fixed;z-index:1;cursor:pointer;opacity:80%');
		vid.setAttribute('src','img/video.png');
		ext = elem.file.ext;
		switch(ext){
			case 'png': img = document.createElement('img');
						img.setAttribute('src',elem.file.url);
						img.setAttribute('title',elem.tags.artist+','+elem.tags.character+','+elem.tags.copyright);
						break;
			case 'jpg': img = document.createElement('img');
						img.setAttribute('src',elem.file.url);
						img.setAttribute('title',elem.tags.artist+','+elem.tags.character+','+elem.tags.copyright);
						break;
			case 'gif': img = document.createElement('img');
						img.setAttribute('src',elem.file.url);
						img.setAttribute('title','Abrir gif');
						break;
			case 'swf': img=null;
						break;
			case 'mp4': img = document.createElement('img');
						img.setAttribute('controls','');
						img.setAttribute('title',elem.tags.artist+','+elem.tags.character+','+elem.tags.copyright);
						img.setAttribute('src',elem.preview.url);
						img.setAttribute('style','width:70%');
						img.appendChild(vid);
						break;
			case 'zip': img = document.createElement('img');
						img.setAttribute('controls','');
						img.setAttribute('title',elem.tags.artist+','+elem.tags.character+','+elem.tags.copyright);
						img.setAttribute('src',elem.preview.url);
						img.setAttribute('style','width:70%');
						imgdiv.appendChild(vid);
						break;
			case 'rar': img = document.createElement('img');
						img.setAttribute('controls','');
						img.setAttribute('title',elem.tags.artist+','+elem.tags.character+','+elem.tags.copyright);
						img.setAttribute('src',elem.preview.url);
						img.setAttribute('style','width:70%');
						imgdiv.appendChild(vid);
						break;	
			case 'webm':img = document.createElement('img');
						img.setAttribute('controls','');
						img.setAttribute('loop','');
						img.setAttribute('title',elem.tags.artist+','+elem.tags.character+','+elem.tags.copyright);
						img.setAttribute('src',elem.preview.url);
						img.setAttribute('style','width:70%');
						imgdiv.appendChild(vid);
						break;
		}
		
		
		if(elem.file.url!=null&img!=null){
			img.id="prev"+elem.id;
			img.addEventListener('click',function(){Slideshow(img,elem)});
			vid.addEventListener('click',function(){Slideshow(img,elem)});
			img.setAttribute('className','column post');
			img.style.cursor='pointer';
			imgdiv.appendChild(img);
			div.appendChild(imgdiv);
			fillCarousel621(elem);
		}
		
		});
		content.appendChild(div);
		searchValue.blur();
	  })
	  .catch(err => {
          console.log(err);
		// Do something for an error here
        var error = document.getElementById('error');
		error.value = "No encontrado.";
		
	  })
}



// Send request
request.send()
function Validation() {
    var type = document.getElementsByName('type');
	if(type[0].checked==true){
		RequestAtf();
		return;
	}else{
		RequestE621();
		return;
	}
}



function TurnDark(){
	
	var check=document.getElementById("turnDark").checked;
	if(check){document.body.style.backgroundColor = "#555";
		document.body.style.color = "#fff";
		document.getElementById("btn1").className="hoverB";
	}else{
		document.body.style.backgroundColor = "#fff";
		document.body.style.color = "#555";
		document.getElementById("btn1").className="hoverA";
		
	}
}

function fillCarouselATF(elem){
		var img;		
		ext = elem.file_ext;
		
		switch(ext){
			case 'png': 
						img = document.createElement('img');
						img.setAttribute('src',elem.large_file_url);
						img.setAttribute('title',elem.tag_string);
						break;
			case 'jpg': img = document.createElement('img');
						img.setAttribute('src',elem.large_file_url);
						img.setAttribute('title',elem.tag_string);
						break;
			case 'gif': img = document.createElement('img');
						img.setAttribute('src',elem.large_file_url);
						img.addEventListener('click',function(){
							item.className="item active";
						});
						img.setAttribute('title','Abrir gif');
						break;
			case 'mp4': img = document.createElement('video');
						img.setAttribute('controls','');
						img.addEventListener('click',function(){
							item.className="item active";
						});
						var source = document.createElement('source');
						source.setAttribute('type','video/mp4');
						source.setAttribute('src',elem.file_url);
						img.appendChild(source);
						break;
			case 'zip': img = document.createElement('video');
						img.setAttribute('controls','');
						img.addEventListener('click',function(){
							item.className="item active";
						});
						var source = document.createElement('source');
						source.setAttribute('type','video/mp4');
						source.setAttribute('src',elem.large_file_url);
						img.appendChild(source);
						break;
			case 'rar': img = document.createElement('video');
						img.setAttribute('controls','');
						img.addEventListener('click',function(){
							item.className="item active";
						});
						var source = document.createElement('source');
						source.setAttribute('type','video/mp4');
						source.setAttribute('src',elem.large_file_url);
						img.appendChild(source);
						break;	
			case 'webm':img = document.createElement('video');
						img.setAttribute('controls','');
						img.setAttribute('loop','');
						img.setAttribute('poster',elem.preview_file_url);
						img.addEventListener('click',function(){
							item.className="item active";
						});
						var source = document.createElement('source');
						source.setAttribute('type','video/webm');
						source.setAttribute('src',elem.file_url);
						img.appendChild(source);
						break;
		}
		if(img.tagName=="VIDEO"){
		img.setAttribute('className','car-vid');	
		}else{
		img.setAttribute('className','car-img');
		}
		img.setAttribute('loop','');
		img.id=elem.id;
		var item = document.createElement('div');
		item.className="item";
		var caption = document.createElement('div');
		caption.className="carousel-caption";
		caption.style="padding:0px";
		var capA = elem.tag_string_character.replace(/ /g,",");
		capA = capA.replace(/_/g," ");
		var capB = elem.tag_string_copyright.replace(/ /g,",");
		capB = capB.replace(/_/g," ");
		caption.innerHTML=capA+"<br/>"+capB;
		item.append(img);
		item.className="item";
		item.appendChild(caption);
		document.getElementById('carousel-inner').appendChild(item);
}

function fillCarousel621(elem){
		var img;		
		ext = elem.file.ext;
		switch(ext){
			case 'png': img = document.createElement('img');
						img.setAttribute('src',elem.file.url);
						img.setAttribute('title',elem.tags.artist+','+elem.tags.character+','+elem.tags.copyright);
						break;
			case 'jpg': img = document.createElement('img');
						img.setAttribute('src',elem.file.url);
						img.setAttribute('title',elem.tags.artist+','+elem.tags.character+','+elem.tags.copyright);
						break;
			case 'gif': img = document.createElement('img');
						img.setAttribute('src',elem.file.url);
						img.setAttribute('title','Abrir gif');
						break;
			case 'mp4': img = document.createElement('video');
						img.setAttribute('controls','');
						img.setAttribute('title',elem.tags.artist+','+elem.tags.character+','+elem.tags.copyright);
						var source = document.createElement('source');
						source.setAttribute('type','video/mp4');
						source.setAttribute('src',elem.file.url);
						img.appendChild(source);
						break;
			case 'zip': img = document.createElement('video');
						img.setAttribute('controls','');
						img.setAttribute('title',elem.tags.artist+','+elem.tags.character+','+elem.tags.copyright);
						var source = document.createElement('source');
						source.setAttribute('type','video/mp4');
						source.setAttribute('src',elem.file.url);
						img.appendChild(source);
						break;
			case 'rar': img = document.createElement('video');
						img.setAttribute('controls','');
						img.setAttribute('title',elem.tags.artist+','+elem.tags.character+','+elem.tags.copyright);
						var source = document.createElement('source');
						source.setAttribute('type','video/mp4');
						source.setAttribute('src',elem.file.url);
						img.appendChild(source);
						break;	
			case 'webm':img = document.createElement('video');
						img.setAttribute('controls','');
						img.setAttribute('loop','');
						img.setAttribute('title',elem.tags.artist+','+elem.tags.character+','+elem.tags.copyright);
						var source = document.createElement('source');
						source.setAttribute('type','video/webm');
						source.setAttribute('src',elem.file.url);
						img.appendChild(source);
						break;
						
		}
		
		if(elem.file.url!=null){
				
			if(img.tagName=="VIDEO"){
			img.setAttribute('className','car-vid');	
			}else{
			img.setAttribute('className','car-img');
			}
			img.setAttribute('loop','');
			img.id=elem.id;
			var item = document.createElement('div');
			item.className="item";
			var caption = document.createElement('div');
			caption.className="carousel-caption";
			var cap = elem.tags.character;
			var capA="";
			for(var n=0;n<cap.length;n++){
				capA=capA+","+cap[n];
			}
			cap = elem.tags.copyright;
			var capB="";
			for(var n=0;n<cap.length;n++){
				capB=capB+","+cap[n];
			}
			caption.innerHTML=capA+"<br/>"+capB;
			item.append(img);
			
			item.className="item";
			item.appendChild(caption);
			document.getElementById('carousel-inner').appendChild(item);
			img.style.cursor='pointer';			
		}
		
}

function Slideshow(img,elem){
		var car = document.getElementById('carousel-inner').children;
		var x=0;
		if(slideshow==false){
			document.getElementsByTagName('body')[0].className="slideshow";
			for(x;x<car.length;x++){
				if(car[x].firstChild.id==img.id.substring(4)){
					car[x].className="item active";
				}
			}
			flag=true;
			document.getElementById('carousel').hidden=false;
		}
		
		if(flag){window.addEventListener('keyup',function(e){
				if(e.keyCode=='39' | e.keyCode=='68'){
					document.getElementById('next').click();
				}
				if(e.keyCode=='37' | e.keyCode=='65'){
					document.getElementById('prev').click();
				}
				if(e.keyCode=='27'){
					e.preventDefault();
					document.getElementById('close').click();
				}
			})
		}
		flag=false;
		slideshow=true;
}

function slideFunc(){
	
		var vidd = document.getElementsByClassName('item active')[0].firstChild;
		if(vidd.tagName=='VIDEO'){
			vidd.pause();
		}else{
			return;
		}
	
}

function closeSlideshow(){
		slideFunc();
		var id = document.getElementsByClassName('item active')[0].firstChild.id;
		if(slideshow){
			document.getElementsByTagName('body')[0].className="";
			document.getElementsByClassName('item active')[0].className="item";
			document.getElementById('carousel').hidden=true;
			focusElement(id);
		}
		slideshow=false;
		
}

function focusElement(id) {
	var btn=document.getElementById('LinkBtn');
	btn.href="#prev"+id;
	window.setTimeout(function(){btn.click();},100);
	
}

export default Front;