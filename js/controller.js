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
  let memeStat = getGMeme();

  var img = new Image();
  img.src = imgUrl;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);

    if (gRowsCount === 0) return;
    drawText(memeStat.lines[0].stroke, memeStat.lines[0].align, memeStat.lines[0].size, memeStat.lines[0].font, memeStat.lines[0].txt, memeStat.lines[0].color);

    if (gRowsCount > 1) {
      drawText(memeStat.lines[1].stroke, memeStat.lines[1].align, memeStat.lines[1].size, memeStat.lines[1].font, memeStat.lines[1].txt, memeStat.lines[1].color, 40, 450);
    }
  };

}


let onGetUserTxt = txt => {
  let x = 40;
  let y;
  let memeStat = getGMeme();

  displayAfterChange();
  let lineIdx = memeStat.selectedLineIdx;

  if (lineIdx === -1) return;
  memeStat.lines[lineIdx].txt = txt;

  if (lineIdx === 0) y = 40;
  else if (lineIdx === 1) y = 450;

  drawText(memeStat.lines[lineIdx].stroke, memeStat.lines[lineIdx].align, memeStat.lines[lineIdx].size, memeStat.lines[lineIdx].font, memeStat.lines[lineIdx].txt, memeStat.lines[lineIdx].color, x, y);
}


let drawText = (stroke = '#000000', txtAlign = 'Right', fontSize = 40, font = 'Impact', txt, color = '#ffffff', x = 40, y = 40) => {
  if (!txt) return;

  gCtx.beginPath();
  gCtx.lineWidth = '2';
  gCtx.font = `${fontSize}px ${font}`;
  gCtx.fillStyle = color;
  gCtx.strokeStyle = stroke;
  gCtx.textAlign = txtAlign;
  let txtWidth = gCtx.measureText(txt).width;

  if (txtAlign === 'Right') x = (txtWidth + 7);
  else if (txtAlign === 'right') x = (gCanvas.width - 7) - (txtWidth / txtWidth);
  else if (txtAlign === 'center') x = (gCanvas.width / 2) - (txtWidth / txtWidth);

  gCtx.fillText(txt, x, y);
  gCtx.strokeText(txt, x, y);

}


let onAddLine = () => {
  if (gRowsCount === 2) return;
  let elInput = document.querySelector('.meme-txt input');
  addLine();
  elInput.value = '';
  makePalteWhite();
  gRowsCount === 0 ? drawSqure(5, 5, 'yellow') : drawSqure(5, gCanvas.height / 100 * 76, 'yellow');
  gRowsCount++;
  elInput.focus();
}


let drawSqure = (x = 5, y = 5, borderColor = 'black') => {
  gCtx.beginPath();
  gCtx.rect(x, y, 490, 100);
  gCtx.closePath();
  gCtx.strokeStyle = borderColor;
  gCtx.stroke();
}


let onSwitchLine = () => {
  let memeStat = getGMeme();
  if (memeStat.lines.length === 1) return;

  let elSelect = document.querySelector('select');
  let elColor = document.querySelector('.inner-color');

  if (memeStat.selectedLineIdx === 0) {
    memeStat.selectedLineIdx = 1;
    drawSqure(5, 380, 'yellow');
    elSelect.value = memeStat.lines[1].font;
    elColor.value = memeStat.lines[1].color;
  } else if (memeStat.selectedLineIdx === 1) {
    memeStat.selectedLineIdx = 0;
    drawSqure(5, 5, 'yellow');
    elSelect.value = memeStat.lines[0].font;
    elColor.value = memeStat.lines[0].color;
  }

  let elInput = document.querySelector('.meme-txt input');
  elInput.value = memeStat.lines[memeStat.selectedLineIdx].txt;
  elInput.focus();
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
  let lineTxt = !lineIdx ? '' : memeStat.lines[lineIdx].txt;

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