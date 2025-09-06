
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting the traditional way

  // Clear previous error messages
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('messageError').textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let valid = true;

  // Validation
  if (!name) {
    document.getElementById('nameError').textContent = 'Name cannot be empty.';
    valid = false;
  }

  if (!email) {
    document.getElementById('emailError').textContent = 'Email cannot be empty.';
    valid = false;
  } else {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address.';
      valid = false;
    }
  }

  if (!message) {
    document.getElementById('messageError').textContent = 'Message cannot be empty.';
    valid = false;
  }

  // Proceed with sending email if all validations pass
  if (valid) {
    var params = {
      name: name,
      email: email,
      message: message,
    }; 

    //Use emailjs to Send the Form
    const serviceID = "service_pj1he13";
  const templateID = "template_8br3ro3";
    emailjs.send(serviceID, templateID, params)
      .then(res => {
        // Clear form fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';

        // Show SweetAlert2 confirmation
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your message was sent successfully!',
          confirmButtonText: 'OK'
        });
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error sending your message. Please try again.',
          confirmButtonText: 'OK'
        });
      });
  }
});






