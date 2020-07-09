import React from "react";

const CategorySelect = (props) => {
  function getUnique(arr, comp) {
    const unique = arr
      .map((e) => e[comp])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => arr[e])
      .map((e) => arr[e]);
    return unique;
  }

  let uniqueCategory = getUnique(props.orgs, "category");
  return (
    <div>
      <div class="cards-container">
        <select class="select" value={props.orgs} onChange={props.handleChange}>
          {uniqueCategory.map((org) => (
            <option key={org.id} value={org.category}>
              {org.category}
            </option>
          ))}
        </select>
      </div>
      <div class="row">
        <div class="card-columns">
          {props.filterDropdown.map((org) => (
            <div class="org-card">
              <div class="card border-info mb-3 w-50 h-75 " key={org.id}>
                <div class="card-header">{org.name} </div>
                <div class="card-img-top">
                  <div class="card-body">
                    <p class="card-text">{org.description}</p>
                    <a href={org.donate} class="btn btn-warning mr-1">
                      Donate
                    </a>
                    <a href={org.website} class="btn btn-info">
                      Visit Website
                    </a>
                    <p class="card-text">
                      <small class="text-muted">
                        <div>Causes: {org.category}</div>
                        <div>Location: {org.location}</div>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelect;
