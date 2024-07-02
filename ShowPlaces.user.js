// ==UserScript==
// @name         showPlace
// @namespace    http://tampermonkey.net/
// @version      v0.1
// @description  shows the place of a player
// @author       dasistdaniel
// @match        https://pr0game.com/uni*/game.php?page=galaxy*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pr0game.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const colorTop050 = "#ff0000"
    const colorTop100 = "#00ffff"
    const colorTop150 = "#00ff00"

    const table = document.querySelector(".table569")
    changeColspans(table)

    const theader = table.querySelector("tbody:nth-child(1) > tr:nth-child(2)")
    const theader_place = theader.insertCell(6)
    theader_place.outerHTML = "<th>Platz</th>"

    for (let p = 0; p < 15; p++) {
        const planetTR = document.querySelector(".table569 > tbody:nth-child(1) > tr:nth-child(" + (p+3) + ")")
        let playerplace = 0
        try {
            const playerTD = planetTR.querySelector('td:nth-child(6) .tooltip_sticky').dataset.tooltipContent
            playerplace = suche(playerTD, 'auf Platz ', '</th>')
        } catch {}

        let color = ''
        if (parseInt(playerplace) < 150) { color = colorTop150 }
        if (parseInt(playerplace) < 100) { color = colorTop100 }
        if (parseInt(playerplace) < 50) { color = colorTop050 }

        const newPlace = planetTR.insertCell(6)
        newPlace.innerText = playerplace > 0 ? playerplace : ''
        newPlace.style.color = color
    }

    function suche(daten, anfang, ende) {
        const SucheAnfang = daten.indexOf(anfang) + anfang.length
        const SucheEnde = daten.indexOf(ende, SucheAnfang)
        return daten.slice(SucheAnfang, SucheEnde)
    }

    function changeColspans(table) {
        table.querySelector("tr:nth-child(1) > th").colSpan=9
        table.querySelector("tr:nth-child(18) > td:nth-child(2)").colSpan=8
        table.querySelector("tr:nth-child(19) > td:nth-child(2)").colSpan=9
        table.querySelector("tr:nth-child(20) > td:nth-child(1)").colSpan=7
        table.querySelector("tr:nth-child(21) > td:nth-child(1)").colSpan=5
        table.querySelector("tr:nth-child(22) > td:nth-child(1)").colSpan=5
        table.querySelector("tr:nth-child(23) > td:nth-child(3)").colSpan=4
    }
})();