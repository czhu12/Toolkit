import React from "react";
import GalleryCard from "../../lib/components/gallery/gallery_card";

function IndexPage() {


  return (
    <div class="columns">
      {[1,2,3,4].map(x =>   <div class="column is-4"><GalleryCard /></div>)}
    </div>
  )
}

export default IndexPage;