import react,{Component} from 'react';
class Picture extends Component{

    constructor(){
        super();
        this.state={
            'picture': null
        }
        
    }
    
    render(){
      var ext; 
      const rend = this.props.data.map((data)=>{
          ext = data.file_ext;
          console.log(ext);
          if(ext=='png'||ext=='jpg'||ext=='gif'){
            return(
              <div key={data.id} className="col">
                    <img key={data.id} id={data.id} src={data.file_url} className="card-img-top"></img>
              </div>
            )
          }
          if(ext=='swf'){console.log('swf cannot display')}
          if(ext='mp4'||ext=='zip'||ext=='rar'||ext=='webm'){
            return(
              <div key={data.id} className="col">
                    <img key={data.id} id={data.id} loop controls src={data.preview_file_url}
                    className="card-img-top" ></img>
              </div>
            )
          }
        })
        return(<div className="row row-cols-2">{rend}</div>) 
    }
}
export default Picture;
