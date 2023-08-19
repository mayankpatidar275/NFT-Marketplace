import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./nft-card.css";

const RealNFTCard = ({tokenId, contract}) => {

  const [metadata, setMetadata] = useState(null);
  const baseIpfsUrl = "https://ipfs.io/ipfs/";

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const tokenURI = await contract.tokenURI(tokenId);
        // console.log(tokenURI);
        const fullIpfsUrl = baseIpfsUrl + tokenURI;
        // console.log(fullIpfsUrl);
        const response = await axios.get(fullIpfsUrl);
        const metadata = response.data;
        metadata.image = baseIpfsUrl + metadata.image;
        setMetadata(metadata);
      } catch (error) {
        console.log("Error fetching metadata:");
      }
    }
  
    fetchMetadata();
  }, [tokenId, contract]);
  

  if (!metadata) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={metadata.image} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/market/${tokenId}`}>{metadata.name || "No title"}</Link>
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            {/* Use metadata.image as the image source */}
            <img src={metadata.image} alt="" className="w-100" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <p>{metadata.createdBy || "Unknown Creator"}</p>
            </div>

            <div>
              <h6>Current Bid</h6>
              <p>{metadata.price} ETH</p>
            </div>
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
          >
            <i className="ri-shopping-bag-line"></i> Sell
          </button>

          <span className="history__link">
            <Link to="#">View History</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RealNFTCard;
