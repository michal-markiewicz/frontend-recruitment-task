"use strict";

const moduleButtons = document.querySelectorAll(".module-button");
moduleButtons.forEach((moduleButton) => {

    if (localStorage.getItem(`Button${moduleButton.dataset.id} clicks`) === null)
    {   
        localStorage.setItem(`Button${moduleButton.dataset.id} clicks`, '0');
    }

    moduleButton.addEventListener('click', openPopup);
})

function openPopup(e)
{
    updateClicksCount(e.target.dataset.id);
    const buttonId = e.target.dataset.id;

    const popup = document.createElement('div');
    document.body.appendChild(popup);
    popup.outerHTML = `
    <section id="module-overlay">
        <div id="module-alert">
            <h2>Alert!</h2>
            <p>You have clicked <b id="clicks-count">${getClicksCount(buttonId)} times</b> to related button.</p>
            ${getClicksCount(buttonId) > 5 ? `<button class="reset-count-button" onclick='resetClicksCount(${buttonId})'>Reset count</button>` : ""}
        </div>
    </section>`;

    const overlay = document.getElementById('module-overlay');
    overlay.addEventListener('click', closePopup);
}

function closePopup(e)
{
    if (e.target.id === "module-overlay")
    {
        e.target.remove();
    }
}

function getClicksCount(buttonId)
{
    return localStorage.getItem(`Button${buttonId} clicks`);
}

function updateClicksCount(buttonId)
{
    let currentCount = getClicksCount(buttonId);  

    localStorage.setItem(`Button${buttonId} clicks`, `${++currentCount}`);
}

function resetClicksCount(buttonId)
{
    localStorage.setItem(`Button${buttonId} clicks`, `0`);

    const clicksCount = document.getElementById('clicks-count');
    clicksCount.textContent = getClicksCount(buttonId) + " times";
}