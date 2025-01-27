import React from "react";
import logo from "../../assets/images/logo.svg"
import search from "../../assets/images/search.svg"
import store from "../../assets/images/store.svg"
export default function NavBar() {
  return (
    <div>
      <nav class="nav-wrapper">
        <div class="nav-content">
          <ul class="list-styled">
            <li>
              <img src={logo} alt="Apple" />
            </li>
            <li>
              <a class="link-styled">Store</a>
            </li>
            <li>
              <a class="link-styled">Mac</a>
            </li>
            <li>
              <a class="link-styled">iPad</a>
            </li>
            <li>
              <a class="link-styled">iPhone</a>
            </li>
            <li>
              <a class="link-styled">Watch</a>
            </li>
            <li>
              <a class="link-styled">AirPods</a>
            </li>
            <li>
              <a class="link-styled">TV &amp; Home</a>
            </li>
            <li>
              <a class="link-styled">Entertainment</a>
            </li>
            <li>
              <a class="link-styled">Accessories</a>
            </li>
            <li>
              <a class="link-styled">Support</a>
            </li>
            <li>
              <img src={search} alt="Search" />
            </li>
            <li>
              <img src={store} alt="Store" />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
