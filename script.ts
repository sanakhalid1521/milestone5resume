/**
 * Professional Resume Builder - Core Logic (TypeScript)
 */

document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
    const resumePreview = document.getElementById('resumePreview') as HTMLElement;
    const templateSelector = document.getElementById('templateSelector') as HTMLSelectElement;
    const themeColorPicker = document.getElementById('themeColor') as HTMLInputElement;
    const downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement;
    const profilePicInput = document.getElementById('profilepicture') as HTMLInputElement;
    const themeToggle = document.getElementById('themeToggle') as HTMLButtonElement;
    
    // Shareable Elements
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const shareLinkContainer = document.getElementById('shareLinkContainer') as HTMLElement;
    const shareableLinkSpan = document.getElementById('shareableLink') as HTMLElement;
    const copyLinkBtn = document.getElementById('copyLinkBtn') as HTMLButtonElement;

    // --- State ---
    let profilePicURL = '';

    /**
     * Updates the resume preview based on current form data
     */
    const updatePreview = () => {
        const data = {
            username: usernameInput.value.trim(),
            name: (document.getElementById('name') as HTMLInputElement).value || '',
            email: (document.getElementById('email') as HTMLInputElement).value || '',
            phone: (document.getElementById('mobilenumber') as HTMLInputElement).value || '',
            address: (document.getElementById('address') as HTMLInputElement).value || '',
            linkedin: (document.getElementById('linkedin') as HTMLInputElement).value || '',
            github: (document.getElementById('github') as HTMLInputElement).value || '',
            education: (document.getElementById('education') as HTMLTextAreaElement).value || '',
            experience: (document.getElementById('experience') as HTMLTextAreaElement).value || '',
            skills: (document.getElementById('skill') as HTMLTextAreaElement).value || '',
            projectLink: (document.getElementById('projectLink') as HTMLInputElement).value || ''
        };

        const template = templateSelector.value;

        // Generate Resume HTML
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
                <p style="white-space: pre-line;">${data.education || 'Your Education details...'}</p>
            </div>

            <div class="resume-section">
                <h3>Experience</h3>
                <p style="white-space: pre-line;">${data.experience || 'Your Work Experience...'}</p>
            </div>

            <div class="resume-section">
                <h3>Skills</h3>
                <p style="white-space: pre-line;">${data.skills || 'Your Skills...'}</p>
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
                (document.getElementById('name') as HTMLInputElement).value = data.name;
                (document.getElementById('email') as HTMLInputElement).value = data.email;
                (document.getElementById('mobilenumber') as HTMLInputElement).value = data.phone;
                (document.getElementById('address') as HTMLInputElement).value = data.address;
                (document.getElementById('linkedin') as HTMLInputElement).value = data.linkedin;
                (document.getElementById('github') as HTMLInputElement).value = data.github;
                (document.getElementById('education') as HTMLTextAreaElement).value = data.education;
                (document.getElementById('experience') as HTMLTextAreaElement).value = data.experience;
                (document.getElementById('skill') as HTMLTextAreaElement).value = data.skills;
                (document.getElementById('projectLink') as HTMLInputElement).value = data.projectLink;
                
                updatePreview();
            }
        }
    };

    // --- Event Listeners ---

    resumeForm.addEventListener('input', updatePreview);
    templateSelector.addEventListener('change', updatePreview);

    themeColorPicker.addEventListener('input', (e) => {
        const color = (e.target as HTMLInputElement).value;
        document.documentElement.style.setProperty('--primary-color', color);
    });

    profilePicInput.addEventListener('change', (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            profilePicURL = URL.createObjectURL(file);
            updatePreview();
        }
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        }
    });

    copyLinkBtn.addEventListener('click', () => {
        const link = shareableLinkSpan.textContent || '';
        navigator.clipboard.writeText(link).then(() => {
            alert('Link copied to clipboard!');
        });
    });

    downloadBtn.addEventListener('click', () => {
        window.print();
    });

    // Initial load
    loadSavedData();
    updatePreview();
});
