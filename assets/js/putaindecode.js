/*! Putain de Code ! - v0.1.0-alpha.0 - 2013-11-07 */
if(window.addEventListener){var kkeys=[],konami="38,38,40,40,37,39,37,39,66,65";konami_cancel="27",el_konami=null,window.addEventListener("keydown",function(a){if(kkeys.push(a.keyCode),kkeys.toString().indexOf(konami)>=0){kkeys=[],el_konami=document.createElement("div"),el_konami.className="putainde-Konami",document.body.appendChild(el_konami);var b=[document.createElement("div"),document.createElement("div")];b[0].className="putainde-Konami-content",b[1].className="putainde-Konami-content-hiddenPart",b[1].appendChild(document.createTextNode("We've got you !")),b[0].appendChild(b[1]),el_konami.appendChild(b[0])}kkeys.toString().indexOf(konami_cancel)>=0&&el_konami&&(document.body.removeChild(el_konami),el_konami=null)},!0)}console&&console.log&&console.log("Coucou, pour le code source c'est par là https://github.com/putaindecode/website - Bisous");