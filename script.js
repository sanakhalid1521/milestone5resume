/**
 * Professional Resume Builder Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm');
    const resumePreview = document.getElementById('resumePreview');
    const templateSelector = document.getElementById('templateSelector');
    const themeColorPicker = document.getElementById('themeColor');
    const downloadBtn = document.getElementById('downloadBtn');
    const profilePicInput = document.getElementById('profilepicture');
    const themeToggle = document.getElementById('themeToggle');
    
    // Shareable Elements
    const usernameInput = document.getElementById('username');
    const shareLinkContainer = document.getElementById('shareLinkContainer');
    const shareableLinkSpan = document.getElementById('shareableLink');
    const copyLinkBtn = document.getElementById('copyLinkBtn');

    // --- State ---
    let profilePicURL = '';

    /**
     * Updates the resume preview and shareable link
     */
    const updatePreview = () => {
        const data = {
            username: usernameInput.value.trim(),
            name: document.getElementById('name').value || '',
            email: document.getElementById('email').value || '',
            phone: document.getElementById('mobilenumber').value || '',
            address: document.getElementById('address').value || '',
            linkedin: document.getElementById('linkedin').value || '',
            github: document.getElementById('github').value || '',
            education: document.getElementById('education').value || '',
            experience: document.getElementById('experience').value || '',
            skill: document.getElementById('skill').value || '',
            projectLink: document.getElementById('projectLink').value || ''
        };

        // Construct Resume HTML
        resumePreview.innerHTML = `
            <div class="resume-header">
                <div class="header-text">
                    <h2>${data.name || 'Your Name'}</h2>
                    <div class="contact-links">
                        <span><i class="fas fa-envelope"></i> ${data.email || 'email@example.com'}</span>
                        <span><i class="fas fa-phone"></i> ${data.phone || '+1 234 567 890'}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${data.address || 'City, Country'}</span>
                        ${data.linkedin ? `<span><i class="fab fa-linkedin"></i> ${data.linkedin}</span>` : ''}
                        ${data.github ? `<span><i class="fab fa-github"></i> ${data.github}</span>` : ''}
                    </div>
                </div>
                ${profilePicURL ? `<img src="${profilePicURL}" class="resume-pic" alt="Profile">` : ''}
            </div>

            <div class="resume-section">
                <h3>Education</h3>
                <p>${data.education || 'Your Education details...'}</p>
            </div>

            <div class="resume-section">
                <h3>Experience</h3>
                <p>${data.experience || 'Your Experience details...'}</p>
            </div>

            <div class="resume-section">
                <h3>Skills</h3>
                <p>${data.skill || 'Your Skills...'}</p>
            </div>

            ${data.projectLink ? `
                <div class="resume-section">
                    <h3>Featured Project</h3>
                    <div class="project-box">
                        <p><i class="fas fa-link"></i> <a href="${data.projectLink}" target="_blank">${data.projectLink}</a></p>
                    </div>
                </div>
            ` : ''}
        `;

        // Apply Template Class
        resumePreview.className = `resume-paper ${templateSelector.value}-template`;

        // Update Shareable Link and Save to LocalStorage
        if (data.username) {
            const baseUrl = window.location.origin + window.location.pathname;
            const uniqueUrl = `${baseUrl}?username=${data.username}`;
            shareableLinkSpan.textContent = uniqueUrl;
            shareLinkContainer.style.display = 'block';
            
            // Save to localStorage for persistence
            localStorage.setItem(data.username, JSON.stringify(data));
        } else {
            shareLinkContainer.style.display = 'none';
        }
    };

    /**
     * Load data from LocalStorage or URL
     */
    const loadSavedData = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');

        if (username) {
            const savedData = localStorage.getItem(username);
            if (savedData) {
                const data = JSON.parse(savedData);
                
                // Fill form
                usernameInput.value = username;
                document.getElementById('name').value = data.name;
                document.getElementById('email').value = data.email;
                document.getElementById('mobilenumber').value = data.phone;
                document.getElementById('address').value = data.address;
                document.getElementById('linkedin').value = data.linkedin;
                document.getElementById('github').value = data.github;
                document.getElementById('education').value = data.education;
                document.getElementById('experience').value = data.experience;
                document.getElementById('skill').value = data.skill;
                document.getElementById('projectLink').value = data.projectLink;
                
                updatePreview();
            }
        }
    };

    /**
     * Copy Link to Clipboard
     */
    copyLinkBtn.addEventListener('click', () => {
        const link = shareableLinkSpan.textContent;
        navigator.clipboard.writeText(link).then(() => {
            alert('Link copied to clipboard!');
        });
    });

    /**
     * Dark Mode Toggle Logic
     */
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };

    // --- Listeners ---

    resumeForm.addEventListener('input', updatePreview);
    templateSelector.addEventListener('change', updatePreview);
    themeToggle.addEventListener('click', toggleDarkMode);

    themeColorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        document.documentElement.style.setProperty('--primary-color', color);
    });

    profilePicInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) {
            profilePicURL = URL.createObjectURL(file);
            updatePreview();
        }
    });

    downloadBtn.addEventListener('click', () => {
        window.print();
    });

    // Initial load
    loadSavedData();
    updatePreview();
});
