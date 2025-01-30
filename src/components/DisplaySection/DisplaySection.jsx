import React from "react";

export default function DisplaySection({triggerPreview}) {
  const handleTopmore =()=>{
    window.scrollTo({
        top:0,
        left:0,
        behavior:"smooth"
    })
}
  return (
    <div>
      <div class="display-section wrapper">
        <h2 class="title">New</h2>
        <p class="text">Brilliant.</p>
        <span class="description">
          A display that's up to 2x brighter in the sun.
        </span>
        <button class="button" onClick={triggerPreview}>Try me!</button>
        <button class="back-button" onClick={handleTopmore}>TOP</button>
      </div>
    </div>
  );
}
