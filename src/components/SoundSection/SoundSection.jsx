import React from "react";

export default function SoundSection() {
  const handleLearnmore =()=>{
    const element =document.querySelector(".display-section")
    window.scrollTo({
        top:element?.getBoundingClientRect().bottom,
        left:0,
        behavior:"smooth"
    })
}
  return (
    <div>
      <div class="sound-section wrapper">
        <div class="body">
          <div class="sound-section-content content">
            <h2 class="title">New Sound System</h2>
            <p class="text">Feel the base.</p>
            <span class="description">
              From $41.62/mo. for 24 mo. or $999 before trade-in
            </span>
            <ul class="links">
              <li>
                <button class="button" href="/">
                  Buy
                </button>
              </li>
              <li>
                <a class="link" onClick={handleLearnmore}>Learn more</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
