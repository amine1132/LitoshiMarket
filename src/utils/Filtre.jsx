export default function Filtre(dataName, setDatas, Tokens, sortOrder, setSortOrder, Arrows, setArrows) {
  console.log(Tokens)
  const TokenDatas = [...Tokens];
  let Length = Tokens.length;

  const updatedArrows = [...Arrows];
  const arrowIndex = updatedArrows.findIndex(a => a.name == dataName);

  Arrows.forEach(singleArrow => {
    singleArrow.arrow = "";
  });

  if (dataName != "token") {

    if (sortOrder != dataName || sortOrder == null) {
      for (let i = 0; i < Length; i++) {
        for (let j = 0; j < Length; j++) {
          if (TokenDatas[i][dataName] < TokenDatas[j][dataName]) {
            const tempData = TokenDatas[i];
            TokenDatas[i] = TokenDatas[j];
            TokenDatas[j] = tempData;
          setSortOrder(dataName);
          updatedArrows[arrowIndex].arrow = "▼";
          }
        }
      }
    } else {
      for (let i = 0; i < Length; i++) {
        for (let j = 0; j < Length; j++) {
          if (TokenDatas[i][dataName] > TokenDatas[j][dataName]) {
            const tempData = TokenDatas[i];
            TokenDatas[i] = TokenDatas[j];
            TokenDatas[j] = tempData;
          setSortOrder(null);
          updatedArrows[arrowIndex].arrow = "▲";
          }
        }
      }
    }

  } else {

    if (sortOrder != dataName || sortOrder == null) {
      TokenDatas.sort((a, b) => a.tick.localeCompare(b.tick));
    setSortOrder(dataName);
    updatedArrows[arrowIndex].arrow = "▼";
    } else {
      TokenDatas.sort((a, b) => b.tick.localeCompare(a.tick));
    setSortOrder(null);
    updatedArrows[arrowIndex].arrow = "▲";
    }
  }

  setArrows(updatedArrows);
  setDatas(TokenDatas);
}