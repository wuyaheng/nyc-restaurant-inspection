import React, { Component } from "react";
import ResultList from "./components/ResultList/index";
import MapBox from "./components/MapBox/MapBox";
import axios from "axios"; 
import "./App.css";

class App extends Component {
  state = {
    sel_zipCode: "",
    limit: 1000,
    offset: 0,
    results: [],
    filtered: [],
  };

  componentDidMount() {
    this.setState(
      {
        sel_zipCode: "10010"
      },
      this.searchRestaurant
    );
  }


  
  searchRestaurant = async () => {
    const res = await axios.get(
      `https://data.cityofnewyork.us/resource/43nn-pn8j.json?$limit=${this.state.limit}&$offset=${this.state.offset}`,
      {
        params: {
          zipcode: this.state.sel_zipCode
        },
      }
    );
    console.log(res)
    let onlyValidRestaurants = res.data.filter(item => {
      let { latitude, longitude } = item;
      let lat = parseFloat(latitude);
      let lon = parseFloat(longitude);
      if (this.isFloat(lat) && this.isFloat(lon)) {
        return true
      }
      return false;
    })
    this.setState({
      filtered: onlyValidRestaurants,
    });

  };

  isFloat = (n) => {
    return Number(n) === n && n % 1 !== 0;
  }


  handleChange = (event) => {
    let zip = event.target.value.trim();
    let isZip = zip.match(/(^\d{5}$)|(^\d{5}-\d{4}$)/);

    if (isZip) {
      this.setState(
        {
        sel_zipCode: event.target.value,
        },
        this.searchRestaurant
        );
    }
   
  };


  advanceOffset = (val) => {
    if (val) {
      this.setState(
        {
          offset: this.state.offset + this.state.limit,
        },
        this.searchRestaurant
      );
    } else if (this.state.offset - this.state.limit >= 0) {
      this.setState(
        {
          offset: this.state.offset - this.state.limit,
        },
        this.searchRestaurant
      );
    }
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-dark">
          <span className="navbar-brand text-white">
          <h5>NYC Restaurant Inspection Result</h5>
          </span>
        </nav>
        <div className="container-fluid mt-2"> 
          <div className="row">
            <div className="col-md-4">

            <button type="button" class="btn btn-block btn-dark mb-2" data-toggle="modal" data-target=".bd-example-modal-sm">About the Project</button>

            <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content p-4">
                NYC Restaurant Inspection Results is a dashboard that enables users to find restaurant inspection results in each zip code. Makers in red indicate restaurants that have a critical flag, and a detailed description of the violation can be found on the tooltip when you hover over the marker. On the accompanying pie chart, you can find the percentage of the restaurants among those displayed that have the critical flag. Since the dashboard only displays a maximum of 1,000 restaurants, users can click “Prev” or “Next” to display additional restaurants in the selected zip code. 
                </div>
              </div>
            </div>

            <div class="input-group mb-2">
              <input type="text" class="form-control" onChange={this.handleChange} 
                    placeholder="Enter Zip Code to Locate Restaurants" aria-label="Enter Zip Code to Locate Restaurants" aria-describedby="basic-addon2"/>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">Go!</button>
              </div>
            </div>

  
            <div className="alert alert-primary mb-2" role="alert">
                Number of Restaurants Displayed: {this.state.filtered.length}
            </div>

          <ResultList results={this.state.filtered} /> 

          <div className="row text-center mb-2 mt-2">
            <div className="col-md-12">
            <button className="btn btn-outline-dark mr-1" onClick={() => this.advanceOffset(true)}>Prev</button>
              <button className="btn btn-outline-dark ml-1" onClick={() => this.advanceOffset(false)}>Next</button>
            </div>
            </div>

            </div>
            <div className="col-md-8">
              <div className="card">
                <MapBox results={this.state.filtered} />
              </div>
            </div>
       

          </div>
          <p>
                Data Source:{" "}
                <a
                  href="https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/43nn-pn8j"
                  aria-label="NYCOpenData"
                  title="NYCOpenData"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NYC OpenData
                </a>
              </p>
        </div>
      </>
    );
  }
}

export default App;
