//
var request = new XMLHttpRequest();
var flag=true;
var slideshow=false;
var error = document.getElementById('error');
var content = document.getElementById('results');
var type = document.getElementsByName('type');
var searchValue = document.getElementById('searchValue');
var loading = document.getElementById('load');
var check=document.getElementById("turnDark");
var name,ext="";
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://booru.allthefallen.moe/posts.json', true);

function RequestAtf(sestring) {
	var search;
	if(sestring==null){
		search = searchValue.value.replace(' ','+');	
	}
	else{
		search =sestring;
	}
	var json = 'https://booru.allthefallen.moe/posts.json?tags='+search+'&is_deleted=false&is_banned=false&limit=100';
	
	// Begin accessing JSON data here
	
	loading.hidden=false;
	//fetch(json url).then(response=>{return response.json()}).then(data=>{what to do}).catch(error=>{what to do})
	fetch(json)
	  .then(response => {
		return response.json()
	  })	
	  .then(data => {
		  loading.hidden=true;
		  if(data.length==0){
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
		const div = document.createElement('div');
		div.setAttribute('class','row');
		data.forEach(elem => {
		// Iterate elements here
		if (elem.is_deleted==false&elem.is_banned==false){
		var img;
		const imgdiv = document.createElement('div');
		imgdiv.setAttribute('class','col-xs-5 col-md-5 square');
		var vid = document.createElement('img');
		vid.setAttribute('style','width:20%;height:25%;margin:10px:position:fixed;z-index:1;cursor:pointer;opacity:80%');
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
			img.setAttribute('class','column post');
			img.id="prev"+elem.id;
			img.addEventListener('click',function(){Slideshow(img,elem)});
			vid.addEventListener('click',function(){Slideshow(img,elem)});
			img.style.cursor='pointer';
			div.appendChild(imgdiv);
			imgdiv.appendChild(img);
			fillCarouselATF(elem);
		}
		
		}
		});
		content.appendChild(div);
		
		searchValue.blur();
	  })
	  .catch(err => {
		// Do something for an error here
		error.value = "No encontrado.";
		
	  })
}

function RequestE621(){
	
	var search = searchValue.value.replace(' ','+');
	var json ='https://e621.net/posts.json?login=nena90&api_key=Hb8qjSoFtSRxSPSaezVVJZQC&tags='+search+' -flash&limit=100';
	
	// Begin accessing JSON data here
	
	loading.hidden=false;
	//fetch(json url).then(response=>{return response.json()}).then(data=>{what to do}).catch(error=>{what to do})
	fetch(json)
	  .then(response => {
		return response.json()
	  })	
	  .then(data => {
		  loading.hidden=true;
		  data=data.posts;
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
		div.setAttribute('class','row');
		data.forEach(elem => {
		// Iterate elements here
		var img;
		const imgdiv = document.createElement('div');
		imgdiv.setAttribute('class','col-xs-5 col-md-5 square');
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
			img.setAttribute('class','column post');
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
		// Do something for an error here
		error.value = "No encontrado.";
		
	  })
}



// Send request
request.send()
function Validation() {
	if(type[0].checked==true){
		RequestAtf();
		return;
	}else{
		RequestE621();
		return;
	}
}

//fill predictions
searchValue.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
	Validation();
  }
  if ((event.keyCode>=65 & event.keyCode<=90) | event.keyCode==189 | (event.keyCode>=48 & event.keyCode<=57) | event.keyCode==8) 
  {
	var tag_query=[];
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

function TurnDark(){
	
	document.body.style.backgroundColor = "red";
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
		img.setAttribute('class','car-vid');	
		}else{
		img.setAttribute('class','car-img');
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
		caption.innerHTML=capA+"<br>"+capB;
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
			img.setAttribute('class','car-vid');	
			}else{
			img.setAttribute('class','car-img');
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
			caption.innerHTML=capA+"<br>"+capB;
			item.append(img);
			
			item.className="item";
			item.appendChild(caption);
			document.getElementById('carousel-inner').appendChild(item);
			img.style.cursor='pointer';			
		}
		
}

function Slideshow(img){
		var car = document.getElementById('carousel-inner').children;
		var x=0;
		
		if(slideshow==false){
			document.getElementsByTagName('body')[0].className="slideshow";
			for(x;x<car.length;x++){
				if(car[x].firstChild.id==img.id.substring(4)){
					car[x].className="item active";
					var linkk=document.getElementById('download');
					linkk.addEventListener('click',function (){Download()});
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

function Download(){
	var img=document.getElementsByClassName("item active")[0].firstChild;
	var elem={name:img.id,url:img.src};
	var toast = document.getElementById('toast');
	console.log(elem);
	fetch(elem.url)
		  .then(resp => resp.blob())
		  .then(blob => {
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.style.display = 'none';
			a.href = url;
			// the filename you want
			a.download = elem.name+'.jpg';
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.getElementById("message").innerText='Se ha descargado la imagen';			// or you know, something with better UX...
			toast.hidden=false;
			setTimeout(function(){ toast.hidden=true}, 1000);
		  })
		  .catch(() => {document.getElementById("message").innerText='Algo salió mal';
			toast.hidden=false;
			setTimeout(function(){ toast.hidden=true}, 1000);});
}

function RandomSearch(){
	var search =  "order:random";
	RequestAtf(search);
}