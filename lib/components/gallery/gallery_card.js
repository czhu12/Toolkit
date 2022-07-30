import React, { useState } from "react";

const GalleryCard = ({title, description, runCount, visibility, userId, slug, id}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="card my-2">
      <div className="card-content">
        <div className="columns is-mobile is-justify-content-flex-around">
          <div className="column">
            <h4 className="has-text-weight-bold">{title}</h4>
            <p>{description}</p>
            <div className="columns is-two-thirds">
              <div className="column">
                <i className="fa-solid fa-person-running"></i> <span className="is-size-6">{runCount}</span>
              </div>
            </div>
          </div>
          <div className="column is-narrow has-text-right">
            <div className={`dropdown ${dropdownOpen && 'is-active' }`}>
              <div className="dropdown-trigger buttons has-addons">
                <button className="button">
                  <span>View</span>
                </button>
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <a className="dropdown-item">
                    Edit source code
                  </a>
                  <a href="#" className="dropdown-item">
                    duplicate
                  </a>
                  <a href="#" className="dropdown-item">
                    share
                  </a>
        
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryCard;