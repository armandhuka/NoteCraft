let color = document.getElementById('color');
let textColor = document.getElementById('textColor'); // New text color input
let createBtn = document.getElementById('createBtn');
let list = document.getElementById('list');

createBtn.onclick = () => {
    let newNote = document.createElement('div');
    newNote.classList.add('note');
    newNote.innerHTML = `
    <span class="close">x</span>
    <textarea
    placeholder="Write Content..."
    rows="10" cols="30" style="color: ${textColor.value}; resize: both;"></textarea>`; // Apply text color and make textarea resizable
    newNote.style.borderColor = color.value; // Apply border color
    list.appendChild(newNote);
}

document.addEventListener('click', (event) => {
    if(event.target.classList.contains('close')){
        event.target.parentNode.remove();
    }
})

let cursor = {
    x: null,
    y: null
}
let note = {
    dom: null,
    x: null,
    y: null
}
let isMoving = false; // Flag to check if the note is being moved

// Handle double click for desktop
document.addEventListener('dblclick', (event) => {
    if(event.target.classList.contains('note')){
        startMoving(event);
    }
});

// Handle touch start for mobile
document.addEventListener('touchstart', (event) => {
    if(event.target.classList.contains('note')){
        startMoving(event);
    }
});

function startMoving(event) {
    isMoving = true; // Enable moving on double click or touch
    cursor = {
        x: event.clientX || event.touches[0].clientX,
        y: event.clientY || event.touches[0].clientY
    }
    note = {
        dom: event.target,
        x: event.target.getBoundingClientRect().left,
        y: event.target.getBoundingClientRect().top
    }
}

// Handle mouse move for desktop
document.addEventListener('mousemove', (event) => {
    moveNote(event);
});

// Handle touch move for mobile
document.addEventListener('touchmove', (event) => {
    moveNote(event);
});

function moveNote(event) {
    if(!isMoving || note.dom == null) return;
    let currentCursor = {
        x: event.clientX || event.touches[0].clientX,
        y: event.clientY || event.touches[0].clientY
    }
    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y
    }
    note.dom.style.left = (note.x + distance.x) + 'px';
    note.dom.style.top = (note.y + distance.y) + 'px';
    note.dom.style.cursor = 'grab';
}

// Handle mouse up for desktop
document.addEventListener('mouseup', () => {
    stopMoving();
});

// Handle touch end for mobile
document.addEventListener('touchend', () => {
    stopMoving();
});

function stopMoving() {
    if(note.dom == null) return;
    note.dom.style.cursor = 'auto';
    note.dom = null;  
    isMoving = false; // Disable moving on mouse up or touch end
}