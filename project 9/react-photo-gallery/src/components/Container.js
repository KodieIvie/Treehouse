import React, {Component} from 'react';
import apiKey from '../config';
import ImgList from './ImgList';
import axios from 'axios';

class Container extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      apiKey: apiKey,
      loading: true,
      imgs: [],
      query: this.props.query
    }
  }

  performSearch = (query='Ice Castle') => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.state.apiKey}&text=${query}&per_page=24&page=1&format=json&nojsoncallback=true`)
      .then(response => {
        this.setState({loading:true});
        setTimeout(() => {
          this.setState({
            query: query,
            imgs: response.data.photos.photo,
            loading: false
          })
        }, 150);
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      })
  }

  componentWillReceiveProps(props){
    (props.query)
      ? this.performSearch(props.query)
      : this.performSearch(props.match.params.query)
  }
  
  componentWillMount(){
    this.performSearch()
  }

  render() {
    return(
      <div className="photo-container">  
        <h2>{this.state.query}</h2>
        {(this.state.loading) ? <p>Loading...</p> : 
        <ImgList data={this.state.imgs} /> }
      </div>
    )
  } 
}


export default Container;