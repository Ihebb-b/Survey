import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer({ page }) {
  return (
    <>
      <section
        class="page-section-pb"
        style={{ 
            background: "rgb(37, 31, 50)",
            zIndex: 1,
         }}
      >
        <div class="container">
          <div class="row">
            <div class="col-10 justify-center">
              <div
                class="listing-search"
                style={{ height: "8rem", width: "91rem",borderRadius: "12px", background: "#46CDD0" }}
              >
                <div class="row">
                  <div
                    class="col-md-5 text-white mx-10 my-3"
                    style={{ textAlign: "left", fontSize: "30px" }}
                  >
                    <p  style={{ fontWeight: "bold" }}>
                      STAY UP TO DATE ABOUT OUR LATEST STATISTICS
                    </p>
                  </div>
                  <div class="col-md-2"> </div>
                  <div class="col-md-4 my-3" style={{ textAlign: "center"}}>
                    <div class="input-container mb-3">
                      <input
                        type="text"
                        placeholder="Enter your email address"
                        class="form-control email-input"
                        name=""
                        style={{ borderRadius: "5rem" }}
                      />
                    </div>
                  
                    <a
                      class="subscribe-btn "
                      href="#"
                    >
                      Subscribe to Newsletter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer
        class="footer "
        style={{ textAlign: "left", background: "rgb(37, 31, 50)" }}
      >
        <div class="">
          <div class="container">
            <div class="row" style={{display: "flex" , flexWrap: "wrap"}}>
              <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="footer-logo">
                  <h3 class="text-white mb-2">MMD</h3>
                </div>
                <div class="social-icons">
                  <ul class="d-flex gap-3 list-unstyled">
                    <li>
                      <a href="#">
                        <FaFacebook style={{ color: "#46CDD0" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FaTwitter style={{ color: "#46CDD0" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FaInstagram style={{ color: "#46CDD0" }} />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FaLinkedin style={{ color: "#46CDD0" }} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-2 col-md-3 col-sm-6 ">
                <h6 class="text-white mb-3">Company</h6>
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <a href="#">About</a>
                  </li>
                  <li class="mb-2">
                    <a href="#">Features</a>
                  </li>
                  <li class="mb-2">
                    <a href="#">Works</a>
                  </li>
                  <li class="mb-2">
                    <a href="#">Career</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-2 col-md-3 col-sm-6">
                <h6 class="text-white mb-3">Help</h6>
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <a href="#">Customer Support</a>
                  </li>
                  <li class="mb-2">
                    <a href="#">Statistics</a>
                  </li>
                  <li class="mb-2">
                    <a href="#">Privacy</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-2 col-md-3 col-sm-6">
                <h6 class="text-white mb-3">FAQ</h6>
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <a href="#">Account</a>
                  </li>
                  <li class="mb-2">
                    <a href="#">Manage Stats</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-2 col-md-3 col-sm-6">
                <h6 class="text-white mb-3">Resources</h6>
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <a href="#">eBooks</a>
                  </li>
                  <li class="mb-2">
                    <a href="#">Tutorials</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="footer-widget mt-20">
              <div class="row">
                <div class="col-md-12 text-center">
                  <p class="mt-1">
                    {" "}
                    &copy;Copyright{" "}
                    <span id="copyright"> {new Date().getFullYear()}</span>{" "}
                    <a href="#"> MMD </a> All Rights Reserved{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <button
        class="back-to-top"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth", // Défilement fluide
          });
        }}
        type="button"
      ></button>
    </>
  );
}
