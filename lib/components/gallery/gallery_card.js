import React from "react";

const GalleryCard = () => {
  
  return (
    <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  <span>Admin <small>(Light)</small></span>
                  <span class="is-pulled-right">
       
      
                    <span class="tag is-danger">WIP</span>
                  </span>
                </p>
              </header>
              <div class="card-content">
                <figure class="image">
                  {/* <img src="../images/admin.png" alt="Admin template screenshot"> */}
                </figure>
              </div>
              <footer class="card-footer">
            <a href="templates/admin.html" class="card-footer-item"><i class="fas fa-search" aria-hidden="true"></i>Preview</a>
            <a href="https://github.com/BulmaTemplates/bulma-templates/blob/master/templates/admin.html" class="card-footer-item"><i class="fas fa-code" aria-hidden="true"></i>Source Code</a>
          </footer>
            </div>
  )
}

export default GalleryCard;