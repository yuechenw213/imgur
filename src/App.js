import React from "react";
import axios from "axios";
import { renderData } from "./Gallery";
import styles from "./App.css"
	
class App extends React.Component {
state = {
	searchKey: null,
  imgs:[]
};
	
handleInputChange = (e) => {
  // console.log(e.currentTarget.value);
  this.setState({searchKey: e.currentTarget.value});
}

	
handleSearch() {
  console.log('clicked');
	
	let formData = new FormData();
	
	axios({

	// Endpoint to send files
	url: "https://api.imgur.com/3/gallery/search/top/month/1?q="+this.state.searchKey,
	method: "GET",
	headers: {

		// Add any auth token here
		Authorization: "Client-ID a0b06f585a7315a",
    Accept: 'application/json',
	},

	// Attaching the form data
	data: formData,
	})

	// Handle the response from backend here
	.then((res) => {
    console.log(res)
    var data = res.data['data']
    var len = res.data['data'].length

    var resultImg = []
    for (var i = 0; i < len; i++) {
      try {
        var title = data[i]['title']
        var account = data[i]['account_url']
        var imglink = data[i]['images'][0]['link']
        var imgtype = data[i]['images'][0]['type']
        // console.log(imgtype,title,account,imglink);
        resultImg.push(
          {
            'title': title,
            'account': account,
            'imglink': imglink,
            'imgtype':imgtype
          })
      }catch(err) {
        console.log(err);
      }
    }
    this.setState({imgs:resultImg})


  })

	// Catch errors if any
	.catch((err) => { });

  
}


	
render() {
	return (
	<div>
  <div className='title' >
		<h1>Play with Imgur</h1>
    </div>
    <div className='row'>
    <p className="textbox">Input a keyword to search image:</p> 
    </div>
    <div className='row'>
		
          <input className="textbox" value={this.state.searchKey} onChange={this.handleInputChange}/>
    </div>
    <div className='row'>
		<button className="button" onClick={(e) => this.handleSearch(e)}>
		Go!
		</button>
    </div>
    <div className={styles.row}>
    {renderData(this.state.imgs) }
    </div>
	</div>
	);
}
}
	
export default App;
