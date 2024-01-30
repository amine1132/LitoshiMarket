function generateNFTElements(count, isBiggerButtonClicked, selectedNFTPage, itemsPerPageNFT, backGroundColor){
    return Array.from({ length: count }, (_, index) => (
        <div className={isBiggerButtonClicked ? 'w-[20%] mb-4' : 'w-[20%]'}>
            <div key={index} className={`rounded-lg h-[250px] w-[200px] bg-[${backGroundColor}]`}>
                {/* Contenu de la div NFT */}
            </div>
        </div>
    )).slice(isBiggerButtonClicked ? 0 : (selectedNFTPage - 1) * itemsPerPageNFT, isBiggerButtonClicked ? count : selectedNFTPage * itemsPerPageNFT);
};

export default generateNFTElements;