document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
  event?.preventDefault();
  
  // Type assertions
  const profilepictureElement = document.getElementById('profilepicture') as HTMLInputElement;
  const nameElement = document.getElementById('name') as HTMLInputElement;
  const lastnameElement = document.getElementById('lastname') as HTMLInputElement;
  const emailElement = document.getElementById('email') as HTMLInputElement; 
  const mobilenumberElement = document.getElementById('mobilenumber') as HTMLInputElement;
  const addressElement = document.getElementById('address') as HTMLInputElement;
  const educationElement = document.getElementById('education') as HTMLInputElement;
  const experienceElement = document.getElementById('experience') as HTMLInputElement;
  const skillElement = document.getElementById('skill') as HTMLInputElement;
  const usernameElement = document.getElementById("username") as HTMLInputElement;

  if (profilepictureElement && nameElement && lastnameElement && emailElement && mobilenumberElement && addressElement && educationElement && experienceElement && skillElement && usernameElement) {
   
    const name = nameElement.value;
    const lastname = lastnameElement.value;
    const email = emailElement.value;
    const mobilenumber = mobilenumberElement.value;
    const address = addressElement.value;
    const education = educationElement.value;
    const experience = experienceElement.value;
    const skill = skillElement.value;

    const username = usernameElement.value;
    const uniquePath = `resume/${username.replace(/\s+/g, '')}_cv.html`; // Corrected string interpolation

    // Get profile picture file and generate URL
    const profilepicture = profilepictureElement?.files?.[0];
    const profilepictureURL = profilepicture ? URL.createObjectURL(profilepicture) : '';

    // Create the resume output
    const resumeOutput = `
      <h2>Resume</h2>
      ${profilepictureURL ? `<img src="${profilepictureURL}" alt="Profile Picture" class="profilepicture">` : ''}
      <p><strong>Name:</strong><span id="edit.name" class="editable">${name}</span></p>
      <p><strong>Last Name:</strong><span id="edit.lastname" class="editable">${lastname}</span></p>
      <p><strong>Email:</strong><span id="edit.email" class="editable">${email}</span></p>
      <p><strong>Phone:</strong><span id="edit.mobilenumber" class="editable">${mobilenumber}</span></p>
      <p><strong>Address:</strong><span id="edit.address" class="editable">${address}</span></p>

      <h3>Education</h3>
      <p id="edit.education" class="editable">${education}</p>

      <h3>Experience</h3>
      <p id="edit.experience" class="editable">${experience}</p>

      <h3>Skills</h3>
      <p id="edit.skill" class="editable">${skill}</p>
    `;

    // Create download link for resume
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutput); // Correct encoding and format
    downloadLink.download = uniquePath;
    downloadLink.textContent = 'Download your 2024 resume';

    const resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
      resumeOutputElement.innerHTML = resumeOutput;
      resumeOutputElement.appendChild(downloadLink); // Add download link to the page
    }

    makeEditable(); // Call the function to make fields editable

  } else {
    console.error('One or more input elements are missing');
  }

  // Function to make text editable on click
  function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach((element) => {
      element.addEventListener('click', function() {
        const currentElement = element as HTMLElement;
        const currentValue = currentElement.textContent || '';

        if (currentElement.tagName === 'P' || currentElement.tagName === 'SPAN') {
          const input = document.createElement('input');
          input.type = 'text';
          input.value = currentValue;
          input.classList.add('editing-input');

          input.addEventListener('blur', function() {
            currentElement.textContent = input.value;
            currentElement.style.display = 'inline'; // Show the element after editing
            input.remove(); // Remove input after editing
          });

          currentElement.style.display = 'none'; // Hide the current text element
          currentElement.parentNode?.insertBefore(input, currentElement); // Insert input field
          input.focus(); // Automatically focus the input field
        }
      });
    });
  }
});
