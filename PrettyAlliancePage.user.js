// ==UserScript==
// @name         PrettyAlliancePage
// @namespace    http://tampermonkey.net/
// @version      v0.1
// @description  adds Markdown Support to the Alliancepages at pr0game.com
// @author       dasistdaniel
// @match        https://pr0game.com/uni*/game.php?page=alliance
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pr0game.com
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/marked/marked.min.js
// ==/UserScript==

(function() {
    'use strict';

    const ally_desc = document.querySelector(".table519 > tbody:nth-child(1) > tr:nth-child(8) > td:nth-child(1)")
    const ally_internal = document.querySelector(".table519 > tbody:nth-child(1) > tr:nth-child(10) > td:nth-child(1)")

    // fix some styling
    ally_desc.style.textAlign = "left"
    ally_desc.style.padding = "10px"

    ally_internal.style.textAlign = "left"
    ally_internal.style.padding = "10px"

    ally_desc.innerHTML = marked.parse(ally_desc.innerText)
    ally_internal.innerHTML = marked.parse(ally_internal.innerText)

})();