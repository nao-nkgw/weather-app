//App.js
import { useState, useMemo } from "react";

import axios from "axios";
import "./components/Title";
import "./style/App.css";
import Title from "./components/Title";
import Form from "./components/Form";
import Results from "./components/Results";
import Loading from "./components/Loading";
import sunnyBackground from "./style/sunny.jpg";
import rainyBackground from "./style/rainy.jpg";
import cloudyBackground from "./style/cloudy.jpg";
import thunderBackground from "./style/thunder.jpg";
import defaultBackground from "./style/default-background.jpg";

function App() {
  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState("");

  const [results, setResults] = useState({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: "",
  });

  const backgroundImage = useMemo(() => {
    switch (results.conditionText) {
      case "Sunny":
        return sunnyBackground;
      case "Rain":
      case "Moderate rain":
      case "Light rain":
        return rainyBackground;
      case "Cloudy":
      case "Partly cloudy":
        return cloudyBackground;
      case "thunder":
      case "Patchy light rain with thunder":
        return thunderBackground;
      default:
        return defaultBackground;
    }
  }, [results.conditionText]);

  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "bottom",
      backgroundRepeat: "no repeat",
    }),
    [backgroundImage]
  );

  const getWeather = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .get(
/*         `https://api.weatherapi.com/v1/current.json?key=9189be9a2ffb40a29a9134532233108&q=${city}&aqi=no` */
`https://api.weatherapi.com/v1/current.json?key=1fc664ec63e740b28ef113737231309&q=${city}&aqi=no`
      )
      .then((res) => {
        setResults({
          country: res.data.location.country,
          cityName: res.data.location.name,
          temperature: res.data.current.temp_c,
          conditionText: res.data.current.condition.text,
          icon: res.data.current.condition.icon,
        });
        setCity("");
        setLoading(false);
      })
      .catch((err) =>
        alert(`Error! "${city}" can be wrong spelling. Please try it again.`)
      );
  };

  return (
    <div style={backgroundStyle}>
      <div className="wrapper">
        <div className="container">
          <Title />
          <Form getWeather={getWeather} setCity={setCity} city={city} />
          {loading ? <Loading /> : <Results results={results} />}
        </div>
      </div>
    </div>
  );
}

export default App;
