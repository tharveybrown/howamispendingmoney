import React, { Component } from "react";
import axios from "axios";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import CategorySelect from "./CategorySelect";
import ResourcesHeader from "./ResourcesHeader";

const url = runtimeEnv().REACT_APP_API_URL;

class ResourcesContainer extends Component {
  state = {
    orgs: [],
    category: "",
  };

  componentDidMount() {
    this.useEffect();
  }

  useEffect = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${url}/resource_orgs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => resp.data)
        .then((data) => {
          console.log("USE EFFECT", data);
          this.setState({ orgs: data });
          // console.log(data)
        });
    }
  };
  handleChange = (event) => {
    this.setState({ category: event.target.value });
  };

  render() {
    const orgs = this.state.orgs;
    const org = this.state.category;

    const filterDropdown = orgs.filter(function (result) {
      return result.category === org;
    });
    return (
      <div>
        <ResourcesHeader></ResourcesHeader>
        <div>
          <h5 class="cause">Choose a Cause:</h5>
          <CategorySelect
            orgs={this.state.orgs}
            key={this.state.orgs.id}
            handleChange={this.handleChange}
            filterDropdown={filterDropdown}
          />
        </div>
      </div>
    );
  }
}
export default ResourcesContainer;
