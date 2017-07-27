import React, { Component } from "react";

export class Footer extends Component {

  styleObj = {
    backgroundColor: "rgba(213, 213, 213, 0.5)",
    width: "100%",
    height: 100,
    border: "solid transparent",
    opacity: 0.9,
    color: "rgba(0, 0, 0, 0.68)",
    boxShadow: "10px 10px 55px #888888"

}

  render() {
    return (
      <section id="app-footer">
        <div style={ this.styleObj } >
          <h1> I am footer </h1>
          <h5> Bottom text for footer </h5>
        </div>
      </section>
    );

  }

}