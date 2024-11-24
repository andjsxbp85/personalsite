// ======================================= Start of Skill Swipe =======================================
const containerSkill = document.querySelector('#container-skill')

// ======= Clicking Button
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

// ======= Swipping
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

// ======= Scrolling Horizontally
// Listen to scroll events for both directions
const list = document.getElementById('skill-lists');
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
    containerSkill.scrollLeft = list.scrollWidth / 3; // Middle of the original list
};

// Initialize the scroll position
adjustScrollToMiddle();

containerSkill.addEventListener('scroll', () => {
    const scrollLeft = containerSkill.scrollLeft;
    const scrollWidth = list.scrollWidth;
    const visibleWidth = containerSkill.clientWidth;

    // When scrolling down past the end
    if (scrollLeft >= scrollWidth - visibleWidth) {
        containerSkill.scrollLeft = scrollWidth / 3 - visibleWidth;
    }

    // When scrolling up past the top
    if (scrollLeft <= 0) {
        containerSkill.scrollLeft = scrollWidth / 3;
    }
});
// ======================================= End of Skill Swipe =======================================
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