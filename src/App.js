import React, { Component } from "react";
import SearchForm from "./components/SearchForm/index";
import ResultList from "./components/ResultList/index";
import MapBox from "./components/MapBox/MapBox";
import axios from "axios"; 
import "./App.css";

class App extends Component {
  state = {
    boro: [],
    sel_boro: "",
    zipCode: [],
    sel_zipCode: "",
    limit: 1000,
    results: [],
    filtered: [],
  };

  componentDidMount() {
    this.setState(
      {
        sel_boro: "Bronx", 
      },
      this.searchRestaurant
    );
    this.searchBoro(); 
  }

  searchBoro = async () => {
    try {
      const res = await axios.get(
        "https://data.cityofnewyork.us/resource/43nn-pn8j.json?$group=boro&$select=boro"
      );
      console.log(res)
      this.setState({
        boro: res.data.map((x) => x.boro),
      });
    } catch (error) {
      console.log(error);
    }
  };



  
  searchRestaurant = async () => {
    const res = await axios.get(
      `https://data.cityofnewyork.us/resource/43nn-pn8j.json?$limit=${this.state.limit}`,
      {
        params: {
          boro: this.state.sel_boro,
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

  handleInputChange = (event) => {
    this.setState(
      {
        sel_boro: event.target.value,
      },
      this.searchRestaurant
    );
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-dark">
          <span className="navbar-brand mb-0 h1 text-white pt-1">
          NYC Restaurant Inspection Result Visualization
          </span>
        </nav>
        <div className="container-fluid">
          <div className="row mt-2">
            <div className="col-md-5">
            <h5>Choose A Borough</h5>
              <SearchForm
                results={this.state.boro}
                handleInputChange={this.handleInputChange}
              />

          <ResultList results={this.state.filtered} /> 
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
