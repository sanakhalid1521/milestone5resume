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
            name: document.getElementById('name').value || 'Your Name',
            email: document.getElementById('email').value || 'email@example.com',
            phone: document.getElementById('mobilenumber').value || '+1 234 567 890',
            address: document.getElementById('address').value || 'City, Country',
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value,
            education: document.getElementById('education').value || 'Your Education details...',
            experience: document.getElementById('experience').value || 'Your Experience details...',
            skill: document.getElementById('skill').value || 'Your Skills...',
            projectLink: document.getElementById('projectLink').value
        };

        const template = templateSelector.value;

        // Construct Resume HTML
        resumePreview.innerHTML = `
            <div class="resume-header">
                <div class="header-text">
                    <h2>${data.name}</h2>
                    <div class="contact-links">
                        <span><i class="fas fa-envelope"></i> ${data.email}</span>
                        <span><i class="fas fa-phone"></i> ${data.phone}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${data.address}</span>
                        ${data.linkedin ? `<span><i class="fab fa-linkedin"></i> ${data.linkedin}</span>` : ''}
                        ${data.github ? `<span><i class="fab fa-github"></i> ${data.github}</span>` : ''}
                    </div>
                </div>
                ${profilePicURL ? `<img src="${profilePicURL}" class="resume-pic" alt="Profile">` : ''}
            </div>

            <div class="resume-section">
                <h3>Education</h3>
                <p>${data.education}</p>
            </div>

            <div class="resume-section">
                <h3>Experience</h3>
                <p>${data.experience}</p>
            </div>

            <div class="resume-section">
                <h3>Skills</h3>
                <p>${data.skill}</p>
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
        resumePreview.className = `resume-paper ${template}-template`;

        // Update Shareable Link
        if (data.username) {
            const baseUrl = window.location.origin + window.location.pathname;
            const uniqueUrl = `${baseUrl}?username=${data.username}`;
            shareableLinkSpan.textContent = uniqueUrl;
            shareLinkContainer.style.display = 'block';
        } else {
            shareLinkContainer.style.display = 'none';
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
    updatePreview();
});
