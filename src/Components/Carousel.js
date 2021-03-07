import react,{Component} from 'react';
import '../Styles/Carousel.css';
import Xcircle from "../x-circle.png";
import Xhigh from "../x-circle-highlighted.png";
import reactDom from 'react-dom';
class Carousel extends Component{
    constructor(){
        super();
        this.state={
          src:'',
          index:0,
        }
    } 
    componentDidMount(){
      document.getElementById(this.props.id).className+=' active';
      document.addEventListener('keyup',keys)
      console.log(document);
      document.getElementsByTagName('BODY')[0].style.setProperty('overflow','hidden');
    }
    componentWillUnmount(){
      document.removeEventListener('keyup',keys);
      console.log(document);
      document.getElementsByTagName('BODY')[0].style.removeProperty('overflow');
    }
    
    
    Pause(){
      var vid = document.getElementsByClassName('active')[0].firstChild;
      if(vid.tagName=='VIDEO'){
        vid.pause();
      }
    }
    render(){
      var data = {'id':'','ext':'','file_url':'','preview_file_url':'','large_file_url':'','tags':{'character':'','parody':'','artist':''}}
      var ext;
        
      
      const Items = this.props.picture.map((picture)=>{    
        
              if(this.props.site=='atf'){
                data.id=picture.id;
                data.ext=picture.file_ext;
                data.file_url=picture.file_url;
                data.preview_file_url=picture.preview_file_url;
                data.large_file_url=picture.large_file_url;
                data.tags.character=picture.tag_string_character;
                data.tags.parody=picture.tag_string_copyright;
                data.tags.artist=picture.tag_string_artist;
              }
              if(this.props.site=='e621'){
                data.id=picture.id;
                data.ext=picture.file.ext;
                data.file_url=picture.file.url;
                data.preview_file_url=picture.preview.url;
                data.large_file_url=picture.file.url;
                data.tags.character=picture.tags.character;
                data.tags.parody=picture.tags.copyright;
                data.tags.artist=picture.tags.artist;
              }
              ext = data.ext;
              if(ext=='png'||ext=='jpg'||ext=='gif'){
                return(
                  <div id={data.id} className="carousel-item" key={"key-"+data.id}>
                  <img className="img" alt="image" 
                          src={data.large_file_url}></img>
                  <div className="carousel-caption-label"></div>
                  <div className="carousel-caption">
                      
                      <h5>{data.tags.parody}</h5>
                      <p>{data.tags.character}</p>
                    </div>
                  </div>
                )}
                if(ext=='swf'){console.log('swf cannot display')}
                if(ext=='mp4'||ext=='zip'||ext=='rar'||ext=='webm'){
                  return(
                    <div id={data.id} className="carousel-item" key={"key-"+data.id}>
                    <video className="img" alt="video" 
                             src={data.large_file_url} controls loop></video>
                    <div className="carousel-caption-label"></div>
                    <div className="carousel-caption">
                    
                       <h5>{data.tags.parody}</h5>
                       <p>{data.tags.character}</p>
                     </div>
                   </div>
                )}
        })

        return(
           <div id="carousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
           <div className="carousel-inner" >
            {Items}
            </div>
             <button id="prev" onClick={()=>this.Pause()} className="carousel-control-prev carousel-arrow" type="button" data-bs-target="#carousel"  data-bs-slide="prev">
                 <span id="prev" className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
             </button>
            <button id="next" onClick={()=>this.Pause()} className="carousel-control-next carousel-arrow" type="button" data-bs-target="#carousel"  data-bs-slide="next">
                  <span id="next" className="carousel-control-next-icon" aria-hidden="true" ></span>
                  <span className="visually-hidden">Next</span>
            </button>
            <button id="close" className="carousel-cross" onClick={this.props.handleCarousel} type="button">
                  <img src={Xcircle} onMouseOver={e => (e.currentTarget.src = Xhigh)} onMouseOut={e => (e.currentTarget.src = Xcircle)}></img>
                  <span className="visually-hidden">Close</span>
            </button>
         </div>
        )
        
    }
    
}
function keys(event){
  if(event.keyCode=='27'){
    document.getElementById('close').click();
  }
  if(event.keyCode=='65'){
    document.getElementById('prev').click();
  }
  if(event.keyCode=='68'){
    document.getElementById('next').click();
  }
  console.log('keyup')
}
export default Carousel