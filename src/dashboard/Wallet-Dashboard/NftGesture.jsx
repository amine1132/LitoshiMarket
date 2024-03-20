import React from "react";
import Nftdata from "../../Data/NFT.json";
import "./NFT.css";

function generateNFTElements(
  count,
  isBiggerButtonClicked,
  selectedNFTPage,
  itemsPerPageNFT
) {
  // Sélectionnez les éléments à afficher en fonction de la pagination
  const slicedData = Nftdata.slice(
    isBiggerButtonClicked ? 0 : (selectedNFTPage - 1) * itemsPerPageNFT,
    isBiggerButtonClicked ? count : selectedNFTPage * itemsPerPageNFT
  );
  console.log(Nftdata);
  return slicedData.map((NFT, index) => (
    <div
      className={isBiggerButtonClicked ? "w-[20%] mb-4" : "w-[20%]"}
      key={index}
    >
      <div
        className={`rounded-lg h-[250px] max-w-[240px] bg-[#151516] relative`}
      >
        <div className="nft_blur"></div>
        <img className="nft_image" src={NFT.content_url} />
        <p className="absolute top-[85%] font-bold z-10">
          {NFT.inscription_name}
        </p>
      </div>
    </div>
  ));
}

export default generateNFTElements;
