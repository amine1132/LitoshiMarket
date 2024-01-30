import React from 'react';
import Columns from './Columns';
import Pagination from './Pagination';
import generateNFTElements from './NftGesture'
import ActivityColumns from './ActivityColumns'

function WalletSection({ secondColor, backGroundColor, isBiggerButtonClicked, setIsBiggerButtonClicked }) {
  
  // Gestion NFT
  const [selectedNFTPage, setSelectedNFTPage] = React.useState(1);
  const [itemsPerPageNFT, setItemsPerPageNFT] = React.useState(5);
  const handleNFTPageChange = (page) => {
    setSelectedNFTPage(page);
  };

  const NbNFT = 29;
  const totalPagesNFT = Math.ceil(NbNFT / itemsPerPageNFT);
  // Fin Gestion NFT

  // Gestion Bouton
  const [selectedButton, setSelectedButton] = React.useState("Token");
  const handleButtonClick = (button) => {
    setSelectedButton(button);
    setCurrentPage(1);
  };
  // Fin Gestion Bouton

  // Gestion Token
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPageToken, setItemsPerPageToken] = React.useState(4);

 const data = Array.from({ length: 50 }, (_, index) => ({
    data1: `Mot ${index + 1}`,
    data2: `Mot ${index + 2}`,
    data3: `Mot ${index + 3}`,
    data4: `Mot ${index + 4}`,
    data5: `Mot ${index + 5}`,
    data6: `Mot ${index + 6}`,
    data7: `Mot ${index + 7}`,
  }));

  const tableSizeToken = {
    false: 10,
    true: 4,
  };

  const sizeButtonSrc = isBiggerButtonClicked ? "/src/assets/smaller.png" : "/src/assets/bigger.png";

  const totalPagesToken = Math.ceil(data.length / itemsPerPageToken);

  const handleBiggerButtonClick = () => {
    setIsBiggerButtonClicked(!isBiggerButtonClicked);
    setCurrentPage(1);

    setItemsPerPageToken(tableSizeToken[isBiggerButtonClicked]);
    setItemsPerPageActivity(tableSizeToken[isBiggerButtonClicked]);
  };
  // Fin Gestion Token

  // Activity
  const [itemsPerPageActivity, setItemsPerPageActivity] = React.useState(4);

  const dataActivity = Array.from({ length: 25 }, (_, index) => ({
    data1: `Mot ${index + 1}`,
    data2: `Mot ${index + 2}`,
    data3: `Mot ${index + 3}`,
    data4: `Mot ${index + 4}`,
    data5: `Mot ${index + 5}`,
    data6: `Mot ${index + 6}`,
    data7: `Mot ${index + 7}`,
  }));

  const totalPagesActivity = Math.ceil(dataActivity.length / itemsPerPageActivity);

  // Fin Activity

  return (
    <div className={`${isBiggerButtonClicked ? '' : 'mt-10'} flex justify-center`}>
      <div className={`px-10 p-5 w-[92.5%] rounded-3xl bg-[${secondColor}] ${isBiggerButtonClicked ? 'h-[790px]' : 'h-[450px]'} ${selectedButton === "NFT" && isBiggerButtonClicked && "overflow-auto"}`}>
        <div className="flex justify-between">
          <h1 className="text-lg">Wallet</h1>
          <button onClick={handleBiggerButtonClick}><img src={`${sizeButtonSrc}`} className="h-[24px]" alt="" /></button>
        </div>
        <div className='flex items-center'>
          <div className={`w-[270px] p-[0.3%] h-[45px] rounded-lg flex justify-center mt-4 bg-[${backGroundColor}]`}>
            <button className={`w-[90px] rounded-md ${selectedButton === "Token" ? `bg-[${secondColor}]` : `hover:bg-[${secondColor}]`}`} onClick={() => handleButtonClick("Token")}>
              Token
            </button>
            <button className={`w-[90px] mx-1 rounded-md ${selectedButton === "NFT" ? `bg-[${secondColor}]` : `hover:bg-[${secondColor}]`}`} onClick={() => handleButtonClick("NFT")}>
              NFT
            </button>
            <button className={`w-[90px] rounded-md ${selectedButton === "Activity" ? `bg-[${secondColor}]` : `hover:bg-[${secondColor}]`}`} onClick={() => handleButtonClick("Activity")}>
              Activity
            </button>
          </div>
          {selectedButton === "Activity" && <p className="mt-3 ml-20">500 <small>transactions</small></p>}
        </div>

          {selectedButton === "Token" && (
            <>
              <Columns data={data} currentPage={currentPage} itemsPerPage={itemsPerPageToken} backgroundColor={backGroundColor} />
              <Pagination currentPage={currentPage} totalPages={totalPagesToken} setCurrentPage={setCurrentPage} backgroundColor={backGroundColor} />
            </>
          )}


          {selectedButton === "NFT" && !isBiggerButtonClicked && (
              <>
                <div className='flex mt-4 mb-[1.2%] w-[100%] justify-left flex-wrap'>
                    {generateNFTElements(NbNFT, isBiggerButtonClicked, selectedNFTPage, itemsPerPageNFT, backGroundColor)}
                </div>
                <Pagination currentPage={selectedNFTPage} totalPages={totalPagesNFT} setCurrentPage={handleNFTPageChange} backgroundColor={backGroundColor} />
              </>
          )}
          {selectedButton === "NFT" && isBiggerButtonClicked && (
            <div className='flex mt-4 mb-[1.2%] justify-left flex-wrap'>
                {generateNFTElements(NbNFT, isBiggerButtonClicked, selectedNFTPage, itemsPerPageNFT, backGroundColor)}
            </div>
          )}


          {selectedButton === "Activity" && (
            <>
            <div className={`${!isBiggerButtonClicked ? "mb-[24px]" : "h-[617px]"}`}><ActivityColumns data={dataActivity} currentPage={currentPage} itemsPerPage={itemsPerPageToken} backgroundColor={backGroundColor} /></div>
              <Pagination currentPage={currentPage} totalPages={totalPagesActivity} setCurrentPage={setCurrentPage} backgroundColor={backGroundColor} />
            </>
          )}


      </div>
    </div>
  );
}

export default WalletSection;