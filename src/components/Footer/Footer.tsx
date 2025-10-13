import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">

          {/* ----------- Left Column (Brand) ----------- */}
          <div className="col-12 col-md-3 mb-4">
            <h4 className="mb-3">CEIN.</h4>
            <p className="mb-2">FOLLOW US</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a>
            </div>
          </div>

          {/* ----------- Desktop View ----------- */}
          <div className="col-md-9 d-none d-md-flex justify-content-between">
            <div>
              <h6 className="text-white">Products</h6>
              <ul className="list-unstyled">
                <li>Inner Care</li>
                <li>Skin Care</li>
                <li>Scalp Care</li>
              </ul>
            </div>
            <div>
              <h6 className="text-white">Guides</h6>
              <ul className="list-unstyled">
                <li>News</li>
                <li>Vision</li>
                <li>Q&A</li>
              </ul>
            </div>
            <div>
              <h6 className="text-white">Service</h6>
              <ul className="list-unstyled">
                <li>About Concierge</li>
                <li>Online Consultation</li>
                <li>Market</li>
              </ul>
            </div>
            <div>
              <h6 className="text-white">Contact</h6>
              <ul className="list-unstyled">
                <li>Contact Us</li>
              </ul>
            </div>
          </div>

          {/* ----------- Mobile View (Accordion) ----------- */}
          <div className="d-md-none col-12">
            <div className="accordion" id="footerAccordion">
              {[
                {
                  id: "one",
                  title: "Products",
                  items: ["Inner Care", "Skin Care", "Scalp Care"]
                },
                {
                  id: "two",
                  title: "Guides",
                  items: ["News", "Vision", "Q&A"]
                },
                {
                  id: "three",
                  title: "Service",
                  items: ["About Concierge", "Online Consultation", "Market"]
                },
                {
                  id: "four",
                  title: "Contact",
                  items: ["Contact Us"]
                }
              ].map((section, index) => (
                <div className="accordion-item bg-dark border-0 text-white" key={index}>
                  <h2 className="accordion-header" id={`heading${section.id}`}>
                    <button
                      className="accordion-button bg-dark text-white collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${section.id}`}
                      aria-expanded="false"
                      aria-controls={`collapse${section.id}`}
                    >
                      {section.title}
                    </button>
                  </h2>
                  <div
                    id={`collapse${section.id}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#footerAccordion"
                  >
                    <div className="accordion-body">
                      <ul className="list-unstyled mb-0">
                        {section.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ----------- Footer Bottom ----------- */}
        <hr className="border-light my-4" />

        <div className="row">
          {/* ---------- Links ---------- */}
          <div className="col-12 col-md-8 mb-3 mb-md-0">
            <div className="d-flex flex-column flex-md-row flex-wrap gap-2 text-white small">
              <a href="#" className="text-decoration-none text-white">Company Profile</a>
              <a href="#" className="text-decoration-none text-white">Privacy Policy</a>
              <a href="#" className="text-decoration-none text-white">Cancellation Policy</a>
              <a href="#" className="text-decoration-none text-white">Terms of Service</a>
              <a href="#" className="text-decoration-none text-white">Refund / Return Policy</a>
            </div>
          </div>

          {/* ---------- Rights Text ---------- */}
          <div className="col-12 col-md-4 small text-white text-md-end">
            CEIN. 2019 KINS All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
