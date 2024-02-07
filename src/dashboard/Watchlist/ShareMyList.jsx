import ShareWatchListSM from "./ShareMyListSM";
import ShareWatchListSMNext from "./ShareMyListSMnext";
import React from "react";

export default function ShareWatchList({ SecondColor, toggleSetShowShareWatchList }) {
    const [selectedContent, setSelectedContent] = React.useState(null);
    let contentToRender;
    const handleMyBRCButtonClick = (content) => {
        setSelectedContent(content);
        console.log(selectedContent);
    };

    if (selectedContent == null) {
        contentToRender = <ShareWatchListSM toggleSetShowShareWatchList={toggleSetShowShareWatchList} SecondColor={SecondColor} handleMyBRCButtonClick={handleMyBRCButtonClick} />;
    } else {
        contentToRender = <ShareWatchListSMNext toggleSetShowShareWatchList={toggleSetShowShareWatchList} SecondColor={SecondColor} handleMyBRCButtonClick={handleMyBRCButtonClick} />;
    }

    return (
        <>
            {contentToRender}
        </>
    );
}
