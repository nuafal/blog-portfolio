// --- NAVIGATION LOGIC ---
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(sec => {
        sec.classList.remove('active');
    });
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show target section and highlight button
    document.getElementById(sectionId).classList.add('active');
    document.getElementById('btn-' + sectionId).classList.add('active');
}

// --- DARK/LIGHT MODE LOGIC ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check local storage for saved theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggleBtn.innerText = "Dark Mode [ON]";
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerText = "Dark Mode [ON]";
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerText = "Dark Mode [OFF]";
    }
});

// --- ADMIN EDITOR LOGIC ---
const adminToggleBtn = document.getElementById('admin-toggle');
adminToggleBtn.addEventListener('click', () => {
    // In a real app, this would trigger a password prompt.
    // For this frontend prototype, it unlocks the hidden editor menu.
    
    let adminBtnExists = document.getElementById('btn-admin-editor');
    
    if (!adminBtnExists) {
        // Create the sidebar button for the editor
        const navMenu = document.querySelector('.nav-menu');
        const newBtn = document.createElement('button');
        newBtn.className = 'nav-btn';
        newBtn.id = 'btn-admin-editor';
        newBtn.innerText = '/> admin_editor';
        newBtn.onclick = () => showSection('admin-editor');
        navMenu.appendChild(newBtn);
        
        alert("Admin Override Accepted. Editor module unlocked in sidebar.");
        showSection('admin-editor');
    }
});

// --- WYSIWYG EDITOR COMMANDS ---
function formatDoc(command) {
    document.execCommand(command, false, null);
}

function addLink() {
    const url = prompt('Enter the link URL:');
    if (url) {
        document.execCommand('createLink', false, url);
    }
}

function addImage() {
    // To mimic inserting a picture, we ask for an image URL.
    // In a full backend system, this would be a file upload button.
    const url = prompt('Enter the image URL:');
    if (url) {
        document.execCommand('insertImage', false, url);
    }
}

// --- PUBLISH LOGIC ---
function publishPost() {
    const editor = document.getElementById('rich-text-editor');
    const content = editor.innerHTML;
    
    if (content.trim() === '') {
        alert("Cannot publish an empty log.");
        return;
    }

    const blogFeed = document.getElementById('public-blog-feed');
    
    // Clear the "No entries yet" message if it exists
    if (blogFeed.innerText.includes("System waiting for input")) {
        blogFeed.innerHTML = '';
    }

    // Append the new post
    const newPost = document.createElement('div');
    newPost.innerHTML = `<hr style="border-top: var(--border-main); margin: 20px 0;">
                         <p style="font-size: 0.8rem; opacity: 0.7;">[LOG DATE: ${new Date().toLocaleDateString()}]</p>
                         <br>
                         ${content}`;
                         
    blogFeed.prepend(newPost);
    
    // Clear editor and go to blog page
    editor.innerHTML = '';
    alert("Log successfully published to the main feed.");
    showSection('blog');
}