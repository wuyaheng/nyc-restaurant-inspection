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
    this.setState(
      {
      sel_zipCode: event.target.value,
      },
      this.searchRestaurant
      );
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
          <span className="navbar-brand mb-0 text-white">
          <h5>NYC Restaurant Inspection Result</h5>
          </span>
        </nav>
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-md-5">
            <div class="input-group mb-1">
              <input type="text" class="form-control" value={this.state.sel_zipCode} onChange={this.handleChange}
                    placeholder="Enter Another Zip Code" aria-label="Enter Another Zip Code" aria-describedby="basic-addon2"/>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">Go!</button>
              </div>
            </div>

          <ResultList results={this.state.filtered} /> 
          <div className="row text-center mb-2 mt-2">
            <div className="col-md-12">
            <button className="btn btn-outline-dark mr-1" onClick={() => this.advanceOffset(true)}>Prev</button>
              <button className="btn btn-outline-dark ml-1" onClick={() => this.advanceOffset(false)}>Next</button>
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
            <div className="col-md-7">
              <div className="card">
                <MapBox results={this.state.filtered} />
              </div>
            </div>
       

          </div>
        </div>
      </>
    );
  }
}

export default App;
