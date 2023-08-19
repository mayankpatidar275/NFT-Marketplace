import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/wallet.css";
import { useBlockchainContext } from "../context/BlockchainContext";

const wallet__data = [
  {
    title: "Bitcoin",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. ",
    icon: "ri-bit-coin-line",
  },

  {
    title: "Coinbase",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    icon: "ri-coin-line",
  },

  {
    title: "Metamask",
    desc: "Click here! Connect with your metamask wallet. ",
    icon: "ri-money-cny-circle-line",
  },

  {
    title: "Authereum",
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing ",
    icon: "ri-bit-coin-line",
  },
];

const Wallet = () => {

  const { connectWallet } = useBlockchainContext(); // Get the connectWallet function from the context

  const handleWalletClick = (title) => {
    if (title === "Metamask") {
      connectWallet(); // Execute connectWallet function when Metamask is clicked
    }
  };

  return (
    <>
      <CommonSection title="Connect Wallet" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <div className="w-50 m-auto">
                <h3 className="text-light">Connect your wallet</h3>
                <p>
                  Please install and connect with your Metamask wallet from below option.
                </p>
              </div>
            </Col>

            {wallet__data.map((item, index) => (
              <Col lg="3" md="4" sm="6" key={index} className="mb-4">
                {/* <div className="wallet__item"> */}
                <div
                  className={`wallet__item ${
                    item.title === "Metamask" ? "metamask" : "faded"
                  }`}
                  onClick={() => handleWalletClick(item.title)}
                >
                  <span>
                    <i className={item.icon}></i>
                  </span>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Wallet;
