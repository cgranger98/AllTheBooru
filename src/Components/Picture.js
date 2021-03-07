
import react,{Component} from 'react'
import ReactDom from 'react-dom'
class Picture extends Component{

    constructor(){
        super();
        this.state={
            'picture': null
        }
        
    }
    
    render(){
      var ext; 
      var data = {'id':'','ext':'','file_url':'','preview_file_url':'','large_file_url':'','tags':{'character':'','parody':'','artist':''}}
      
      const rend = this.props.data.map((picture)=>{
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
          var e=data.id;
          if(ext=='png'||ext=='jpg'||ext=='gif'){
            return(
              <div key={data.id} className="col">
                    <img onClick={()=> {this.props.handleCarousel(e)}} key={data.id} id={"prev"+data.id} src={data.file_url} className="card-img-top"></img>
              </div>
            )
          }
          if(ext=='swf'){console.log('swf cannot display')}
          if(ext='mp4'||ext=='zip'||ext=='rar'||ext=='webm'){
            return(
              <div key={data.id} className="col">
                    <img onClick={()=> {this.props.handleCarousel(e)}} key={data.id} id={"prev"+data.id} src={data.preview_file_url}
                    className="card-img-top" ></img>
              </div>
            )
          }
        })
        return(<div className="row row-cols-2">{rend}</div>) 
    }
}
export default Picture;
