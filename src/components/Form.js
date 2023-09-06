// Form.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Form = (props) => {
  return (
    <form>
      <input
        type="text"
        name="city"
        placeholder="please enter city's name in english"
        onChange={(e) => props.setCity(e.target.value)}
        value={props.city}
      />

      <button type="submit" onClick={props.getWeather}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <span> </span>Current Weather
      </button>
    </form>
  );
};

export default Form;
