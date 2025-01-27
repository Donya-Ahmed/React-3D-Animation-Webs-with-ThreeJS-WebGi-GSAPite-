import React from "react";
import logo from "../../assets/images/logo.svg"
import iphone from "../../assets/images/iphone-hand.png"
export default function Jambotron() {
    const handleLearnmore =()=>{
        const element =document.querySelector(".sound-section")
        window.scrollTo({
            top:element?.getBoundingClientRect().top,
            left:0,
            behavior:"smooth"
        })
    }
  return (
    <div>
      <div class="jumbotron-section wrapper">
        <h2 class="title">New</h2>
        <p class="text">Big and bigger.</p>
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
        <img
          class="iphone-img"
          src={iphone}
          alt="iPhone"
        />
      </div>
    </div>
  );
}
