import React from 'react'
import "./productdetailstyle.css"
import shavingIcon from '../../../assets/images/icons8-shaving-50.png';
import skincareIcon from '../../../assets/images/icons8-skincare-64.png';
import creamIcon from '../../../assets/images/icons8-cream-bottle-64.png';

export default function SkinRoutine() {
  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#E8E8DD",
        textAlign: "center",
        padding: "80px 0",
      }}
    >
      <h6 style={{ fontSize: "14px", color: "#4c4a4aff" }}>Skin Routine</h6>
      <h4 style={{ fontWeight: "400", paddingBottom: "20px" }}>
        Gentle Care For Delicate Skin
      </h4>

      <div className="routine-container">
        <div className="routine-card text-center">
          <div className="routine-number">01</div>
          <img
            src={shavingIcon}
            alt="Cleansing"
            className="routine-icon"
          />
          <h6>Cleansing</h6>
        </div>

        <span className="plus">+</span>

        <div className="routine-card text-center">
          <div className="routine-number">02</div>
          <img
            src={skincareIcon}
            alt="Toner"
            className="routine-icon"
          />
          <h6>Tone</h6>
        </div>

        <span className="plus">+</span>

        <div className="routine-card text-center">
          <div className="routine-number">03</div>
          <img
            src={creamIcon}
            alt="Cream"
            className="routine-icon"
          />
          <h6>Cream</h6>
        </div>
      </div>
    </section>
  )
}
