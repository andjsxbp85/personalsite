function hideElement(elementSelector) {
    document.querySelector(elementSelector).style.display = 'none';
}

function showElement(elementSelector) {
    document.querySelector(elementSelector).style.display = 'block';
}

function addClass(element, className) {
    element.classList.add(className)
}

function removeClass(element, className) {
    element.classList.remove(className)
}

function goToUrl(url) {
    window.location.assign(url)
}

function openUrl(url) {
    window.open(url)
}

// ========================== Start of Top Navbar ==========================
const topNavbar = document.querySelector('#top-navbar');
const subNavbars = document.querySelectorAll('.sub-navbar')
let anyActiveSubNavbar = false
window.onscroll = () => {
    if (window.scrollY > 100) {
        topNavbar.classList.add('active');
    } else {
        subNavbars.forEach(items => {
            if (items.classList.contains('active')) anyActiveSubNavbar = true;
        })
        if (!anyActiveSubNavbar) topNavbar.classList.remove('active');
    }
};

//========= activate sub-navbar =========
for (let subNavbar of subNavbars) {
    //mouse hovering
    subNavbar.addEventListener("mouseover", () => {
        topNavbar.classList.add('active');
        subNavbar.classList.add('active');
    }, false);
    subNavbar.addEventListener("mouseout", () => {
        subNavbar.classList.remove("active");
        if (window.scrollY < 100) {
            topNavbar.classList.remove('active');
        }
    }, false);

    //user click
    subNavbar.addEventListener("click", () => {
        if (!subNavbar.classList.contains('mobile-active')) subNavbar.classList.add('mobile-active');
        else subNavbar.classList.remove('mobile-active')
    }, false);
}

// Mobile
const toggleNavbar = document.querySelector('#toggle-navbar')
const closeNavbar = document.querySelector('#close-navbar')
const listNavbar = document.querySelector('#list-navbar')
toggleNavbar.addEventListener("click", () => {
    listNavbar.classList.remove('hidden')
    closeNavbar.classList.remove('hidden')
    toggleNavbar.classList.add('hidden')
});

closeNavbar.addEventListener("click", () => {
    listNavbar.classList.add('hidden')
    closeNavbar.classList.add('hidden')
    toggleNavbar.classList.remove('hidden')
});
// ========================== End of Navbar ==========================
// ======================================= Start of Button Form  =======================================
window.addEventListener('DOMContentLoaded', () => {
    const formMsg = document.querySelector('#msg-form')
    const inputName = document.querySelector('#msgName')
    const inputEmail = document.querySelector('#msgEmail')
    const inputPhone = document.querySelector('#msgPhone')
    const inputSubject = document.querySelector('#msgSubject')
    const inputTxtMsg = document.querySelector('#msgTxt')
    const btnSendWA = document.querySelector('#btnSendWA')
    const btnSendEmail = document.querySelector('#btnSendEmail')
    const renderBodyMessage = (socialtType) => {
        let bdyMsg = `Subject: ${inputSubject.value}\nHi, I'm  ${inputName.value},\nE-mail: ${inputEmail.value}\nPhone: ${inputPhone.value}\n\n\n${inputTxtMsg.value}`
        if (socialtType === 'wa') bdyMsg = encodeURI(`https://api.whatsapp.com/send/?phone=6281901777719&text=${bdyMsg}&type=phone_number&app_absent=0`)
        else bdyMsg = encodeURI(`mailto:anjasmuhamadb123@gmail.com?subject=${inputSubject.value}&body=${bdyMsg}`)
        window.open(bdyMsg, '_blank')
    }

    btnSendWA.addEventListener('click', () => {
        renderBodyMessage('wa')
    });
    btnSendEmail.addEventListener('click', () => {
        renderBodyMessage('email')
    });
});
// ======================================= End of Button Form =======================================