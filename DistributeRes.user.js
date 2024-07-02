// ==UserScript==
// @name         DistributeRes
// @namespace    http://tampermonkey.net/
// @version      v0.1
// @description  Distributes Resources
// @author       dasistdaniel
// @match        https://pr0game.com/uni*/game.php?page=fleetStep2
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pr0game.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    addLink();

    // get values
    const m = document.querySelector("td.top:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1)");
    const k = document.querySelector("td.top:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2)");
    const d = document.querySelector("td.top:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3)");
    const l = document.querySelector("#remainingresources > font:nth-child(1)");

    // add boxes
    m.appendChild(addBox("metall"));
    k.appendChild(addBox("kristall"));
    d.appendChild(addBox("deuterium"));

    // add event listener to clear boxes
    m.querySelector("#metall").addEventListener('click', function(event) { this.value="";});
    k.querySelector("#kristall").addEventListener('click', function(event) { this.value="";});
    d.querySelector("#deuterium").addEventListener('click', function(event) { this.value="";});

    function addLink() {
        // add the link to the site

        // find the table
        const table = document.querySelector("td.top:nth-child(2) > table:nth-child(1)");

        // add row
        const newRow = table.insertRow(5);
        newRow.style = "height:20px;";

        // add cell
        const newCell = newRow.insertCell(0);
        newCell.classList.add("transparent");
        newCell.colSpan = 3;

        // add link
        const newLink = document.createElement("a");
        newLink.innerText = "Resourcen verteilen";

        // add event to calculate
        newLink.addEventListener('click', function(event) {
            event.preventDefault();
            disResources();
        });

        newCell.appendChild(newLink);
    }

    function addBox(name) {
        const zelle = document.createElement("td");
        zelle.innerHTML = "<input type=\"text\" id=\"" + name + "\" size=\"2\" value=\"1\"></input>";
        return zelle;
    }

    function disResources() {
        addRes(0,0,0); // clear the old values

        // get the values
        const l = parseInt(document.querySelector("#remainingresources > font:nth-child(1)").innerText.replaceAll(".", ""));
        let vm = parseFloat(document.querySelector("#metall").value.replaceAll(",", "."));
        let vk = parseFloat(document.querySelector("#kristall").value.replaceAll(",", "."));
        let vd = parseFloat(document.querySelector("#deuterium").value.replaceAll(",", "."));

        // set to zero if empty
        vm = isNaN(vm) ? 0 : vm;
        vk = isNaN(vk) ? 0 : vk;
        vd = isNaN(vd) ? 0 : vd;

        // calculate the distributions
        const sum = (vm + vk + vd);
        const ld = l / sum;

        const resm = Math.floor(ld * vm);
        const resk = Math.floor(ld * vk);
        const resd = Math.floor(ld * vd);

        // set the new values
        addRes(resm, resk, resd);
    }

    function addRes(m,k,d) {
        document.querySelector("td.top:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td > input").value = m;
        document.querySelector("td.top:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td > input").value = k;
        document.querySelector("td.top:nth-child(2) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td > input").value = d;
        calculateTransportCapacity(); // using the builtin function to calculate the new values
    }
})();