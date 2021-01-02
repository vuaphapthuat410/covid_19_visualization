import React from "react";
import "../App.css";

function About() {
  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <br />
      <h2>About</h2>
      <br />
      <a href="https://ko-fi.com/I3I51NB3J" target="_blank">
        <img
          height="36"
          src="https://cdn.ko-fi.com/cdn/kofi1.png?v=2"
          border="0"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
      <br />
      <br />
      <div
        style={{
          padding: "20px",
          backgroundColor: "grey",
          color: "white",
          margin: "20px",
          borderRadius: "20px",
        }}
      >
        <h4>Who built this website?</h4>
        <div style={{ fontSize: "20px" }}>
          This site is created by Bao Anh & Manh Le. Students from HEDSPI K62.
        </div>
        <br />
        <h4>How to connect?</h4>
      </div>
      <br />
    </div>
  );
}

export default About;
