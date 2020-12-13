'use strict';
let gCanvas;
let gCtx;
let gRowsCount = 1;


let onInit = () => {
  createImgs();
  renderImgs();
  getCanvas();
  makePalteWhite();
}


let renderImgs = (filter = 'funny') => {
  let imgs = getGImgs();

  let strHTMLs = imgs.map(img => {
    if (img.keywords[0].includes(filter) || img.keywords[1].includes(filter)) {
      return `<div class="img-wrapper"><img data-id="${img.id}" src="${img.url}" alt=""
      onclick="onImgClick('${img.url}', ${img.id})"></div>`;
    }
  });

  document.querySelector('.imgs-container').innerHTML = strHTMLs.join('');
}


let getCanvas = () => {
  gCanvas = document.getElementById('meme-canvas');
  gCtx = gCanvas.getContext('2d');
}


let onImgClick = (imgUrl, imgId) => {
  updateGMemeId(imgId);

  _displayImgToCanvas(imgUrl);
  document.querySelector('main').style.display = 'none';
  document.querySelector('.filter-imgs').style.display = 'none';
  document.querySelector('.editor-container').style.display = 'flex';
  resizeCanvas();
  document.querySelector('.meme-txt input').focus();
}


let _displayImgToCanvas = imgUrl => {
  let img = new Image();
  img.src = imgUrl;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    displayTxtToCanvas();
  };
}


let onGetUserTxt = txt => {
  let memeStat = getGMeme();
  if (memeStat.lines.length === 0) return;

  displayAfterChange();
  let lineIdx = memeStat.selectedLineIdx;
  memeStat.lines[lineIdx].txt = txt;
  let currLine = memeStat.lines[lineIdx];
  drawText(currLine);
}


let drawText = (currLine) => {
  if (!currLine.txt) return;

  gCtx.beginPath();
  gCtx.lineWidth = '2';
  gCtx.font = `${currLine.size}px ${currLine.font}`;
  gCtx.fillStyle = currLine.color;
  gCtx.strokeStyle = currLine.stroke;
  gCtx.textAlign = currLine.align;
  let txtWidth = gCtx.measureText(currLine.txt).width;

  if (currLine.align === 'Right') currLine.pos.x = (txtWidth + 7);
  else if (currLine.align === 'right') currLine.pos.x = (gCanvas.width - 7) - (txtWidth / txtWidth);
  else if (currLine.align === 'center') currLine.pos.x = (gCanvas.width / 2) - (txtWidth / txtWidth);

  gCtx.fillText(currLine.txt, currLine.pos.x, currLine.pos.y);
  gCtx.strokeText(currLine.txt, currLine.pos.x, currLine.pos.y);
}


let onAddLine = () => {
  let elInput = document.querySelector('.meme-txt input');
  addLine();
  elInput.value = '';
  makePalteWhite();

  if(gRowsCount === 0) drawSqure(gCanvas.width / 100 , gCanvas.height / 100);
  else if(gRowsCount === 1) drawSqure(gCanvas.width / 100 , gCanvas.height - 52);
  else if (gRowsCount > 1) drawSqure(gCanvas.width / 100 , gCanvas.height / 2 - 42);
  
  gRowsCount++;
  elInput.focus();
}


let drawSqure = (x = 5, y = 5, width = 490, height = 50) => {
  gCtx.beginPath();
  gCtx.rect(x, y, width, height);
  gCtx.closePath();
  gCtx.strokeStyle = 'yellow';
  gCtx.stroke();
}


let onSwitchLine = () => {
  let elSelect = document.querySelector('select');
  let elColor = document.querySelector('.inner-color');
  let elInput = document.querySelector('.meme-txt input');
  let memeStat = getGMeme();


  if (memeStat.selectedLineIdx + 1 === memeStat.lines.length) memeStat.selectedLineIdx = 0;
  else memeStat.selectedLineIdx += 1;

  let currLine = memeStat.lines[memeStat.selectedLineIdx];

  elSelect.value = currLine.font;
  elColor.value = currLine.color;
  elInput.value = currLine.txt;
  elInput.focus();

  let txtX = currLine.pos.x;
  let txtY = currLine.pos.y - currLine.size;
  let txtHeight = currLine.size;
  let txtWidth = gCtx.measureText(currLine.txt).width;

  drawSqure(txtX, txtY, txtWidth, txtHeight);
}


let onChangeFont = font => {
  updateFont(font);
  displayAfterChange();
  document.querySelector('.meme-txt input').focus();
}


let onChangeTextColor = color => {
  updateColor(color);
  displayAfterChange();
  document.querySelector('.meme-txt input').focus();
}


let makePalteWhite = () => {
  document.querySelector('.inner-color').value = '#ffffff';
}


let onFontSizing = operator => {
  updateFontSize(operator);
  displayAfterChange();
}


let onFontAligment = dirName => {
  updateFontAligment(dirName);
  displayAfterChange();
}


let onDeleteLine = () => {
  gRowsCount--;

  let lineIdx = deleteLine();
  let memeStat = getGMeme();
  let lineTxt;
  if (lineIdx === '') lineTxt = '';
  else lineTxt = memeStat.lines[lineIdx].txt;

  displayAfterChange();
  document.querySelector('.meme-txt input').value = lineTxt;
}


let onChangeStrokeColor = color => {
  updateStrokeColor(color);
  displayAfterChange();
  document.querySelector('.meme-txt input').focus();
}


let displayAfterChange = () => {
  let memeStat = getGMeme();
  let img = getImgById(memeStat.selectedImgId);
  _displayImgToCanvas(img.url);
}


let onDownloadCanvas = elLink => {
  const data = gCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'my-meme.jpg';
}


let resizeCanvas = () => {
  let elContainer = document.querySelector('.canvas-container');
  gCanvas.width = elContainer.offsetWidth;
  gCanvas.height = elContainer.offsetHeight;
}


let onMemeFilter = that => {
  renderImgs(that.value);
}


let displayTxtToCanvas = () => {
  let memeStat = getGMeme();
  let linesCount = memeStat.lines.length;

  for (let i = 0; i < linesCount; i++) {
    let currLine = memeStat.lines[i];
    drawText(currLine);
  }
}


