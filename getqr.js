import {onClick} from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js';
import {addScriptInHead} from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js';



const id_qr = "whatsauthqr";
let mobile;
let waurl;




if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    mobile = true;
  }else{
    mobile = false;
  }

const urlgetparams = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

function svgqrjsonclick(){
  if (mobile){
    window.open(waurl);
  }
}

function makeQrCode(text){
  addScriptInHead('https://cdn.jsdelivr.net/gh/englishextra/qrjs2@latest/js/qrjs2.min.js');
  qr = QRCode.generateSVG(text, {
      ecclevel: "M",
      fillcolor: "#FFFFFF",
      textcolor: "#000000",
      margin: 4,
      modulesize: 8
  });
  var svg = document.getElementById(id_qr);
	svg.replaceChild(qr,svg.firstElementChild);
}

function showQR(text){
  if (typeof text === 'string' && text.length === 0) {
    document.getElementById('qrcode').style.display = 'none';
  } else {
    makeQrCode(text);
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}


function checkCookies() {
  const qrcontent = getCookie("qrcontent");
  const alias = getCookie("alias");

  if (!qrcontent || !alias) {
      document.getElementById('userModal').style.display = 'flex';
      console.log("tampilkan modal");
  } else {
      document.getElementById('userModal').style.display = 'none';
      console.log("sembunyikan modal");
  }
}

function saveUserInfo() {
  const alias = document.getElementById('alias').value;
  const qrcontent = document.getElementById('qrcontent').value;

  if (alias && qrcontent) {
      setCookie("alias", alias, 365);
      setCookie("qrcontent", qrcontent, 365);
      document.getElementById('userModal').style.display = 'none';
  } else {
      alert("Silakan masukkan semua informasi.");
  }
}

const urlhashcontent = window.location.hash.substring(1);
console.log(urlhashcontent);
if (urlhashcontent){
  console.log("hash terdeteksi");
  showQR(urlhashcontent);
}else{
  console.log("hash tidak terdeteksi");
  checkCookies();
  //saveUserInfo();
}

onClick('buttonsimpaninfouser',saveUserInfo);