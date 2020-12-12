'use strict';

// let gKeywords = { 'happy': 12, 'funny puk': 1 };

let gImgs = [];
let gMeme = {
  selectedImgId: undefined,
  selectedLineIdx: 0,
  lines: [{
    txt: '',
    size: 40,
    align: 'right',
    color: '#ffffff',
    stroke: '#000000',
    font: 'Impact'
  }]
};


let _createImg = () => {
  return {
    id: undefined,
    url: undefined,
    keywords: ['funny']
  }
}


let createImgs = () => {
  for (let i = 0; i < 18; i++) {
    let img = _createImg();
    img.id = i + 1;
    img.url = `imgs/meme-imgs/${i + 1}.jpg`;

    if (i < 3) img.keywords = ['animal', 'funny'];
    else if (i < 6) img.keywords = ['kids', 'funny'];
    else img.keywords = ['funny', 'famous'];

    gImgs.push(img);
  }
  return gImgs;
}

let getGImgs = () => {
  return gImgs;
}


let getImgById = imgId => {
  return gImgs.find((img, idx) => {
    if (img.id === imgId) return gImgs[idx];
  });
}


let getGMeme = () => {
  return gMeme;
}


let addLine = () => {
  gMeme.lines.push({
    txt: '',
    size: 40,
    align: 'right',
    color: '#ffffff',
    stroke: '#000000',
    font: 'Impact'
  });
  gMeme.selectedLineIdx += 1;
}


let updateGMemeId = imgId => {
  gMeme.selectedImgId = imgId;
}


let updateFont = font => {
  gMeme.lines[gMeme.selectedLineIdx].font = font;
}


let updateColor = color => {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}


let updateFontSize = operator => {
  gMeme.lines[gMeme.selectedLineIdx].size += operator;
}


let updateFontAligment = dirName => {
  gMeme.lines[gMeme.selectedLineIdx].align = dirName;
}


let deleteLine = () => {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);

  if (gMeme.lines.length === 0) {
    gMeme.selectedLineIdx = -1;
    return undefined;
  }

  return gMeme.selectedLineIdx = (gMeme.selectedLineIdx === 1) ? 0 : 1;
}


let updateStrokeColor = color => {
  gMeme.lines[gMeme.selectedLineIdx].stroke = color;
}

