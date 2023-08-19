import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./step-section.css";

const STEP__DATA = [
  {
    title: "Setup your wallet",
    desc: "Setup your wallet, Setup your wallet. Setup your wallet, Setup your wallet Setup your wallet ",
    icon: "ri-wallet-line",
  },

  {
    title: "Create your collection",
    desc: "Create your collection Create your collection Create your collection Create your collection ",
    icon: "ri-layout-masonry-line",
  },

  {
    title: "Add your NFTs",
    desc: "Add your NFTs Add your NFTsAdd your NFTsAdd your NFTs Add your NFTsAdd your NFTs ",
    icon: "ri-image-line",
  },

  {
    title: "List them for sale",
    desc: "List them for sale List them for saleList them for saleList them for saleList them for sale ",
    icon: "ri-list-check",
  },
];

const StepSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4">
            <h3 className="step__title">Create and sell your NFTs</h3>
          </Col>

          {STEP__DATA.map((item, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <div className="single__step__item">
                <span>
                  <i className={item.icon}></i>
                </span>
                <div className="step__item__content">
                  <h5>
                    <Link to="/wallet">{item.title}</Link>
                  </h5>
                  <p className="mb-0">{item.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default StepSection;
