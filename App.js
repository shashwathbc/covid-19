import React,{useState, useEffect} from "react";
import './App.css';
import InfoBox from "./InfoBox";
import {MenuItem,FormControl,Select, Card,CardContent} from "@material-ui/core";
import Map from "./Map";
import Table from "./Table";
import {sortData} from "./util";
function App() {
  //state cmd to write variable in react

  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() =>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {setCountryInfo(data);});
  },[]);
   //useeffect runs a code by given condition
   useEffect(() => {
    //async=send a request to server ,wait for it ,do something with the info
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
            const countries = data.map((country) => (
              {
                name: country.country,  // uniteds nariom,unistwd kingdomk,insia
                value:country.countryInfo.iso2  //uk,usa,fr
              }
            ))
            const sortedData = sortData(data);
            setTableData(sortedData);
            setCountries(countries);
      })
    }
    getCountriesData();
   }, []);

   const  onCountryChange = async(event) =>{
     const countryCode = event.target.value;
     setCountry(countryCode);

     const url = countryCode === "worldwide"
                              ? "https://disease.sh/v3/covid-19/all" 
                              :  `https://disease.sh/v3/covid-19/countries/${countryCode}`
            

            await fetch (url)
            .then(response => response.json())
            .then((data) => {
              setCountry(countryCode);
                


              setCountryInfo(data);
            });
    
   };
   console.log("COUNTRY INFO >>>", countryInfo);
  
  return (
    <div className="app">
      <div className="app__left">
           {/* Header */}
         {/* title + select input dropdown field  */}
      <div className="app__header">
      <h1 className="app__title">COVID-19 TRACKER</h1>
            <FormControl className="app__dropdown">
              <Select variant="outlined" onChange={onCountryChange} value={country}  >
                {/* loop through all the contries and show a dropdown list of those countries of option */}
                 <MenuItem  value="worldwide">Worldwide</MenuItem>
                 {
                   countries.map(country =>(
                     <MenuItem value={country.value}>{country.name}</MenuItem>
                   ))
                 }

             {/*   <MenuItem value="worldwide">worldwide</MenuItem>
                <MenuItem value="worldwide">worldwsd</MenuItem>
                <MenuItem value="worldwide">worldwsdce</MenuItem>
                  <MenuItem value="worldwide">worldw3e</MenuItem>   */}
                </Select>    

            </FormControl>
        
        </div>  

        
            <div className="app__stats">
              {/* infoboxes */}
   
                    <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
                   <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
                   <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
              </div>
        {/* map */}
             <Map />
      </div>


     <Card className="app__right">
            <CardContent>
                <h3>Live cases by country</h3>
                 {/* table */}
                 <Table countries={tableData} />
                 <h3>Worldwide new cases </h3>

                  {/* graph */}



            </CardContent>
                


     </Card>

    </div>
  );
}

export default App;
