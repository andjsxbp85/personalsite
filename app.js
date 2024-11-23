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

// ======================================= Start of Education Slideshow =======================================
const btnSlideLeft = document.querySelector('#edu-slide-left')
const btnSlideRight = document.querySelector('#edu-slide-right')
const eduItemsParent = document.querySelector('#edu-items-parent')
const orderSlideParent = document.querySelector('#order-slide-edu')
const centerSlideShowClass = 'education-slide-center'
const maxShownItems = 3;
let activeOrderIdx = getActiveOrderIdx()

//====== Slide Button =======
btnSlideLeft.addEventListener('click', () => {
    for (let [index, item] of Array.from(eduItemsParent.children).entries()) {
        swapChildren(eduItemsParent, index, eduItemsParent.children.length - 1)
    }
    updateVisibility();

    //Update order slide active
    activeOrderIdx = getActiveOrderIdx()
    let prevOrderIdx = activeOrderIdx === 0 ? orderSlideParent.children.length - 1 : activeOrderIdx - 1;
    orderSlideParent.children[activeOrderIdx].classList.remove('active')
    orderSlideParent.children[prevOrderIdx].classList.add('active')
    activeOrderIdx = Array.from(orderSlideParent.children).findIndex(child =>
        child.classList.contains('active')
    );
})

btnSlideRight.addEventListener('click', () => {
    for (let [index, item] of Array.from(eduItemsParent.children).entries()) {
        swapChildren(eduItemsParent, index + 1, index)
    }
    updateVisibility();

    //Update order slide active
    activeOrderIdx = getActiveOrderIdx()
    let nextOrderIdx = activeOrderIdx === orderSlideParent.children.length - 1 ? 0 : activeOrderIdx + 1;
    orderSlideParent.children[activeOrderIdx].classList.remove('active')
    orderSlideParent.children[nextOrderIdx].classList.add('active')
    activeOrderIdx = Array.from(orderSlideParent.children).findIndex(child =>
        child.classList.contains('active')
    );
})

//====== Order Button =======
function getActiveOrderIdx() {
    return Array.from(orderSlideParent.children).findIndex(child =>
        child.classList.contains('active')
    );
}


// Initial state set all items that index more than maxShownItems is hidden and center items is bigger
updateVisibility();

// ===== Utility ====
// Swapping Children
function swapChildren(parent, index1, index2) {
    const children = parent.children;
    if (children[index1] && children[index2]) {
        const clone1 = children[index1].cloneNode(true);
        const clone2 = children[index2].cloneNode(true);
        parent.replaceChild(clone1, children[index2]);
        parent.replaceChild(clone2, children[index1]);
    }
}

// Update visibility after reordering
function updateVisibility() {
    const children = Array.from(eduItemsParent.children);
    children.forEach((item, index) => {
        if (index < maxShownItems) {
            item.classList.remove('hidden');
            if (index === 1) {
                item.classList.add(centerSlideShowClass); // Add center class
            } else {
                item.classList.remove(centerSlideShowClass); // Remove from others
            }
        } else {
            item.classList.add('hidden'); // Hide items outside maxShownItems
        }
    });
}
// ======================================= End of Education Slideshow =======================================
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
// ======================================= Start of Skill Swipe =======================================
const containerSkill = document.querySelector('#container-skill')

// Clicking Button
const btnLeftSkill = document.querySelector('#btn-left-skill')
const btnRightSkill = document.querySelector('#btn-right-skill')
let holdingSwipeSkill

btnLeftSkill.addEventListener('mousedown', (e) => {
    holdingSwipeSkill = setInterval(() => {
        containerSkill.scrollBy({
            top: 0,
            left: -10,
            behavior: 'auto'
        })
    }, 10)
})

btnRightSkill.addEventListener('mousedown', (e) => {
    holdingSwipeSkill = setInterval(() => {
        containerSkill.scrollBy({
            top: 0,
            left: 10,
            behavior: 'auto'
        })
    }, 10)
})

window.addEventListener('mouseup', () => {
    clearInterval(holdingSwipeSkill)
})

// Swipping
let draggingSkill = false;
let initialX = 0
containerSkill.addEventListener('mousedown', (e) => {
    draggingSkill = true
    initialX = e.clientX
})

window.addEventListener('mouseup', () => {
    draggingSkill = false
})

containerSkill.addEventListener('mousemove', (e) => {
    if (draggingSkill) {
        const shiftX = e.clientX - initialX;
        const currentScroll = containerSkill.scrollLeft;

        // containerSkill.scrollLeft -= shiftX;
        containerSkill.scrollBy({
            top: 0,
            left: -shiftX,
            behavior: 'smooth'
        })
    }
})

// ======================================= End of Skill Swipe =======================================



//========================== start of coba ==============================

// Listen to scroll events for both directions
const scrollContainer = document.getElementById('coba-scroll');
const list = document.getElementById('coba-ul');
const items = Array.from(list.children);

// Clone items to enable looping
const cloneItems = () => {
    // Clone for the bottom
    items.forEach((item) => {
        const clone = item.cloneNode(true);
        list.appendChild(clone);
    });

    // Clone for the top (reverse order)
    const reversedItems = [...items].reverse();
    reversedItems.forEach((item) => {
        const clone = item.cloneNode(true);
        list.insertBefore(clone, list.firstChild);
    });
};

// Clone the items
cloneItems();

// Adjust scroll to the middle (original list position)
const adjustScrollToMiddle = () => {
    scrollContainer.scrollTop = list.scrollHeight / 3; // Middle of the original list
};

// Initialize the scroll position
adjustScrollToMiddle();

scrollContainer.addEventListener('scroll', () => {
    console.log("======================= start ============================");
    console.log("=========== scrollContainer.scrollTop=" + scrollContainer.scrollTop);
    console.log("=========== list.scrollTop=" + list.scrollTop);
    console.log("=========== scrollContainer.scrollHeight=" + scrollContainer.scrollHeight);
    console.log("=========== list.scrollHeight=" + list.scrollHeight);
    console.log("=========== scrollContainer.clientHeight=" + scrollContainer.clientHeight);
    console.log("===========  list.clientHeight=" + list.clientHeight);
    console.log("======================= END ============================");

    const scrollTop = scrollContainer.scrollTop;
    const scrollHeight = list.scrollHeight;
    const visibleHeight = scrollContainer.clientHeight;

    // When scrolling down past the end
    if (scrollTop >= scrollHeight - visibleHeight) {
        scrollContainer.scrollTop = scrollHeight / 3 - visibleHeight;
    }

    // When scrolling up past the top
    if (scrollTop <= 0) {
        scrollContainer.scrollTop = scrollHeight / 3;
    }
});
//=============================== end ofcoba ===============================

/*// ======================================= Start of Testimonial Carousel =======================================
class Carousel {
    constructor(el) {
        this.el = el;
        this.carouselOptions = ['previous', 'add', 'play', 'next'];
        this.carouselData = [
            {
                'id': '1',
                'src': 'http://fakeimg.pl/300/?text=1',
            },
            {
                'id': '2',
                'src': 'http://fakeimg.pl/300/?text=2',
            },
            {
                'id': '3',
                'src': 'http://fakeimg.pl/300/?text=3',
            },
            {
                'id': '4',
                'src': 'http://fakeimg.pl/300/?text=4',
            },
            {
                'id': '5',
                'src': 'http://fakeimg.pl/300/?text=5',
            }
        ];
        this.carouselInView = [1, 2, 3, 4, 5];
        this.carouselContainer;
        this.carouselPlayState;
    }

    mounted() {
        this.setupCarousel();
    }

    // Build carousel html
    setupCarousel() {
        const container = document.createElement('div');
        const controls = document.createElement('div');

        // Add container for carousel items and controls
        this.el.append(container, controls);
        container.className = 'carousel-container';
        controls.className = 'carousel-controls';

        // Take dataset array and append items to container
        this.carouselData.forEach((item, index) => {
            const carouselItem = item.src ? document.createElement('img') : document.createElement('div');

            container.append(carouselItem);

            // Add item attributes
            carouselItem.className = `carousel-item carousel-item-${index + 1}`;
            carouselItem.src = item.src;
            carouselItem.setAttribute('loading', 'lazy');
            // Used to keep track of carousel items, infinite items possible in carousel however min 5 items required
            carouselItem.setAttribute('data-index', `${index + 1}`);
        });

        this.carouselOptions.forEach((option) => {
            const btn = document.createElement('button');
            const axSpan = document.createElement('span');

            // Add accessibilty spans to button
            axSpan.innerText = option;
            axSpan.className = 'ax-hidden';
            btn.append(axSpan);

            // Add button attributes
            btn.className = `carousel-control carousel-control-${option}`;
            btn.setAttribute('data-name', option);

            // Add carousel control options
            controls.append(btn);
        });

        // After rendering carousel to our DOM, setup carousel controls' event listeners
        this.setControls([...controls.children]);

        // Set container property
        this.carouselContainer = container;
    }

    setControls(controls) {
        controls.forEach(control => {
            control.onclick = (event) => {
                event.preventDefault();

                // Manage control actions, update our carousel data first then with a callback update our DOM
                this.controlManager(control.dataset.name);
            };
        });
    }

    controlManager(control) {
        if (control === 'previous') return this.previous();
        if (control === 'next') return this.next();
        if (control === 'add') return this.add();
        if (control === 'play') return this.play();

        return;
    }

    previous() {
        // Update order of items in data array to be shown in carousel
        this.carouselData.unshift(this.carouselData.pop());

        // Push the first item to the end of the array so that the previous item is front and center
        this.carouselInView.push(this.carouselInView.shift());

        // Update the css class for each carousel item in view
        this.carouselInView.forEach((item, index) => {
            this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
        });

        // Using the first 5 items in data array update content of carousel items in view
        this.carouselData.slice(0, 5).forEach((data, index) => {
            document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
        });
    }

    next() {
        // Update order of items in data array to be shown in carousel
        this.carouselData.push(this.carouselData.shift());

        // Take the last item and add it to the beginning of the array so that the next item is front and center
        this.carouselInView.unshift(this.carouselInView.pop());

        // Update the css class for each carousel item in view
        this.carouselInView.forEach((item, index) => {
            this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
        });

        // Using the first 5 items in data array update content of carousel items in view
        this.carouselData.slice(0, 5).forEach((data, index) => {
            document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
        });
    }

    add() {
        const newItem = {
            'id': '',
            'src': '',
        };
        const lastItem = this.carouselData.length;
        const lastIndex = this.carouselData.findIndex(item => item.id == lastItem);

        // Assign properties for new carousel item
        Object.assign(newItem, {
            id: `${lastItem + 1}`,
            src: `http://fakeimg.pl/300/?text=${lastItem + 1}`
        });

        // Then add it to the "last" item in our carouselData
        this.carouselData.splice(lastIndex + 1, 0, newItem);

        // Shift carousel to display new item
        this.next();
    }

    play() {
        const playBtn = document.querySelector('.carousel-control-play');
        const startPlaying = () => this.next();

        if (playBtn.classList.contains('playing')) {
            // Remove class to return to play button state/appearance
            playBtn.classList.remove('playing');

            // Remove setInterval
            clearInterval(this.carouselPlayState);
            this.carouselPlayState = null;
        } else {
            // Add class to change to pause button state/appearance
            playBtn.classList.add('playing');

            // First run initial next method
            this.next();

            // Use play state prop to store interval ID and run next method on a 1.5 second interval
            this.carouselPlayState = setInterval(startPlaying, 1500);
        };
    }

}

// Refers to the carousel root element you want to target, use specific class selectors if using multiple carousels
const el = document.querySelector('.carousel');
// Create a new carousel object
const exampleCarousel = new Carousel(el);
// Setup carousel and methods
exampleCarousel.mounted();
// ======================================= End of Testimonial Carousel =======================================*/