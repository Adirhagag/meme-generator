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
    font: 'Impact',
    pos: {
      x: 40,
      y: 40
    }
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
  let y;
  if (gMeme.lines.length === 0) y = 40;
  else if (gMeme.lines.length === 1) y = gCanvas.height - 5;
  else y = gCanvas.height / 2;
  
  gMeme.lines.push({
    txt: '',
    size: 40,
    align: 'right',
    color: '#ffffff',
    stroke: '#000000',
    font: 'Impact',
    pos: {
      x: 40,
      y
    }
  });
  
  if (gMeme.lines.length === 1) gMeme.selectedLineIdx = 0;
  else gMeme.selectedLineIdx += 1;
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
  console.log('the x place:',gMeme.lines[gMeme.selectedLineIdx].pos.x)
  console.log('the y place:' ,gMeme.lines[gMeme.selectedLineIdx].pos.y)
}


let deleteLine = () => {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1);
  if (gMeme.lines.length === 0) return '';
  return gMeme.selectedLineIdx = gMeme.lines.length - 1;
}


let updateStrokeColor = color => {
  gMeme.lines[gMeme.selectedLineIdx].stroke = color;
}

