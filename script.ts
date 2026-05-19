/**
 * Professional Resume Builder - Core Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
    const resumePreview = document.getElementById('resumePreview') as HTMLElement;
    const templateSelector = document.getElementById('templateSelector') as HTMLSelectElement;
    const themeColorPicker = document.getElementById('themeColor') as HTMLInputElement;
    const downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement;
    const profilePicInput = document.getElementById('profilepicture') as HTMLInputElement;

    // --- State ---
    let profilePicURL = '';

    // --- Core Functions ---

    /**
     * Updates the resume preview based on current form data
     */
    const updatePreview = () => {
        const formData = new FormData(resumeForm);
        
        // Extract values (using IDs directly since FormData requires 'name' attribute which I might have missed in HTML, 
        // let's use direct element access for reliability)
        const data = {
            name: (document.getElementById('name') as HTMLInputElement).value || 'Your',
            lastname: (document.getElementById('lastname') as HTMLInputElement).value || 'Name',
            email: (document.getElementById('email') as HTMLInputElement).value || 'hello@example.com',
            phone: (document.getElementById('mobilenumber') as HTMLInputElement).value || '+1 234 567 890',
            address: (document.getElementById('address') as HTMLInputElement).value || 'Location, Country',
            education: (document.getElementById('education') as HTMLTextAreaElement).value || 'Your Education details...',
            experience: (document.getElementById('experience') as HTMLTextAreaElement).value || 'Your Work Experience...',
            skills: (document.getElementById('skill') as HTMLTextAreaElement).value || 'Your Skills...'
        };

        const template = templateSelector.value;

        // Generate Resume HTML
        resumePreview.innerHTML = `
            <div class="resume-header">
                <div class="header-main">
                    <h2 class="editable">${data.name} ${data.lastname}</h2>
                    <div class="contact-info">
                        <p>${data.email} | ${data.phone}</p>
                        <p>${data.address}</p>
                    </div>
                </div>
                ${profilePicURL ? `<img src="${profilePicURL}" class="preview-pic" alt="Profile">` : ''}
            </div>

            <div class="resume-section">
                <h3>Education</h3>
                <p class="editable" style="white-space: pre-line;">${data.education}</p>
            </div>

            <div class="resume-section">
                <h3>Experience</h3>
                <p class="editable" style="white-space: pre-line;">${data.experience}</p>
            </div>

            <div class="resume-section">
                <h3>Skills</h3>
                <p class="editable" style="white-space: pre-line;">${data.skills}</p>
            </div>
        `;

        // Apply Template Class
        resumePreview.className = `resume-paper ${template}-template`;
    };

    // --- Event Listeners ---

    // Live update on any input
    resumeForm.addEventListener('input', () => {
        updatePreview();
    });

    // Template selection
    templateSelector.addEventListener('change', () => {
        updatePreview();
    });

    // Theme color update
    themeColorPicker.addEventListener('input', (e) => {
        const color = (e.target as HTMLInputElement).value;
        document.documentElement.style.setProperty('--primary-color', color);
    });

    // Profile Picture Handling
    profilePicInput.addEventListener('change', (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            profilePicURL = URL.createObjectURL(file);
            updatePreview();
        }
    });

    // PDF Download (Print)
    downloadBtn.addEventListener('click', () => {
        window.print();
    });

    // Initial Preview
    updatePreview();
});
