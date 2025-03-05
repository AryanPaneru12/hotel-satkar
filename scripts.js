
// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Update copyright year
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // DOM Elements
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const loginBtn = document.getElementById('loginBtn');
  const loginBtnMobile = document.getElementById('loginBtnMobile');
  const signupBtn = document.getElementById('signupBtn');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const loginModal = document.getElementById('loginModal');
  const loginTabBtn = document.getElementById('loginTabBtn');
  const signupTabBtn = document.getElementById('signupTabBtn');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const heroBookBtn = document.getElementById('heroBookBtn');
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const roomsGrid = document.getElementById('roomsGrid');
  const toast = document.getElementById('toast');
  const toastContent = document.getElementById('toastContent');
  
  // Booking Form Elements
  const guestInfoForm = document.getElementById('guestInfoForm');
  const paymentMethodForm = document.getElementById('paymentMethodForm');
  const confirmationForm = document.getElementById('confirmationForm');
  const bookingRoomType = document.getElementById('bookingRoomType');
  const bookingPrice = document.getElementById('bookingPrice');
  const bookingName = document.getElementById('bookingName');
  const bookingEmail = document.getElementById('bookingEmail');
  const bookingPhone = document.getElementById('bookingPhone');
  const bookingCheckin = document.getElementById('bookingCheckin');
  const bookingCheckout = document.getElementById('bookingCheckout');
  const bookingIdType = document.getElementById('bookingIdType');
  const bookingIdNumber = document.getElementById('bookingIdNumber');
  const bookingSpecial = document.getElementById('bookingSpecial');
  const cancelBookingBtn = document.getElementById('cancelBookingBtn');
  const nextToPaymentBtn = document.getElementById('nextToPaymentBtn');
  const backToGuestBtn = document.getElementById('backToGuestBtn');
  const processPaymentBtn = document.getElementById('processPaymentBtn');
  const backToPaymentBtn = document.getElementById('backToPaymentBtn');
  const confirmBookingBtn = document.getElementById('confirmBookingBtn');
  const paymentMethod = document.getElementById('paymentMethod');
  const selectedPaymentMethod = document.getElementById('selectedPaymentMethod');
  const paymentMethodDescription = document.getElementById('paymentMethodDescription');
  const cardPaymentFields = document.getElementById('cardPaymentFields');
  const summaryRoomType = document.getElementById('summaryRoomType');
  const summaryCheckin = document.getElementById('summaryCheckin');
  const summaryCheckout = document.getElementById('summaryCheckout');
  const summaryGuest = document.getElementById('summaryGuest');
  const summaryPayment = document.getElementById('summaryPayment');
  const summaryTotal = document.getElementById('summaryTotal');
  
  // State Management
  let isLoggedIn = false;
  let currentUser = null;
  let cart = {};
  let selectedRoom = null;
  let bookingSteps = document.querySelectorAll('.booking-step');
  
  // Sample Data for Rooms
  const rooms = [
    {
      id: 'room1',
      title: "Standard Room",
      description: "Comfortable and cozy room with essential amenities.",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
      features: ["Wi-Fi & TV", "Air Conditioning", "Mini Fridge"],
      price: 9900,
      status: 'Available',
      capacity: 2
    },
    {
      id: 'room2',
      title: "Deluxe Room",
      description: "Spacious room with premium amenities and mountain view.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      features: ["Premium Wi-Fi & Smart TV", "Mini Bar & Safe", "Bathtub & Premium Toiletries"],
      price: 14900,
      status: 'Available',
      capacity: 3
    },
    {
      id: 'room3',
      title: "Suite",
      description: "Luxurious suite with separate living area and panoramic views.",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070&auto=format&fit=crop",
      features: ["Living Room & Private Balcony", "Premium Dining & Kitchen", "Work Desk & Premium View"],
      price: 29900,
      status: 'Available',
      capacity: 3
    },
    {
      id: 'room4',
      title: "Presidential Suite",
      description: "The ultimate luxury experience with unparalleled amenities and service.",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2070&auto=format&fit=crop",
      features: ["Exclusive Panoramic Views", "Private Dining & Butler Service", "Luxury Spa Bathroom & Private Terrace"],
      price: 59900,
      status: 'Available',
      capacity: 4
    }
  ];
  
  // Sample Users
  const users = [
    {
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'customer'
    },
    {
      id: 'user2',
      name: 'Admin User',
      email: 'admin@hotel.com',
      password: 'admin123',
      role: 'admin'
    }
  ];
  
  // Handle Scroll for Navbar
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Set min dates for booking calendar
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  bookingCheckin.min = formatDate(today);
  bookingCheckout.min = formatDate(tomorrow);
  
  bookingCheckin.addEventListener('change', function() {
    // Ensure checkout date is at least one day after checkin
    const checkinDate = new Date(this.value);
    const nextDay = new Date(checkinDate);
    nextDay.setDate(nextDay.getDate() + 1);
    bookingCheckout.min = formatDate(nextDay);
    
    // If current checkout date is before new minimum, update it
    if (new Date(bookingCheckout.value) <= checkinDate) {
      bookingCheckout.value = formatDate(nextDay);
    }
  });
  
  // Helper function to format date for input field
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Format date for display
  function formatDateForDisplay(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
  
  // Format currency
  function formatCurrency(amount) {
    return 'Rs. ' + new Intl.NumberFormat('en-IN').format(amount);
  }
  
  // Toggle Mobile Menu
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  
  // Modal Handling
  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  // Open Login Modal
  loginBtn.addEventListener('click', function() {
    openModal(loginModal);
  });
  
  loginBtnMobile.addEventListener('click', function() {
    openModal(loginModal);
  });
  
  signupBtn.addEventListener('click', function() {
    openModal(loginModal);
    switchToSignupTab();
  });
  
  // Close Login Modal
  closeLoginModal.addEventListener('click', function() {
    closeModal(loginModal);
  });
  
  // Tab Switching in Login Modal
  function switchToLoginTab() {
    loginTabBtn.classList.add('active');
    signupTabBtn.classList.remove('active');
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
  }
  
  function switchToSignupTab() {
    loginTabBtn.classList.remove('active');
    signupTabBtn.classList.add('active');
    loginTab.classList.remove('active');
    signupTab.classList.add('active');
  }
  
  loginTabBtn.addEventListener('click', switchToLoginTab);
  signupTabBtn.addEventListener('click', switchToSignupTab);
  
  // Close Booking Modal
  closeBookingModal.addEventListener('click', function() {
    closeModal(bookingModal);
    resetBookingForm();
  });
  
  cancelBookingBtn.addEventListener('click', function() {
    closeModal(bookingModal);
    resetBookingForm();
  });
  
  // Check for login parameter in URL
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('login') === 'true') {
    openModal(loginModal);
  }
  
  // Form Submission Handling
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      isLoggedIn = true;
      currentUser = user;
      closeModal(loginModal);
      updateUIForLoggedInUser();
      showToast('Login successful! Welcome back, ' + user.name, 'success');
    } else {
      showToast('Invalid email or password. Please try again.', 'error');
    }
  });
  
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      showToast('Email already registered. Please log in instead.', 'warning');
      return;
    }
    
    // Create new user
    const newUser = {
      id: 'user' + (users.length + 1),
      name: name,
      email: email,
      password: password,
      role: 'customer'
    };
    
    users.push(newUser);
    isLoggedIn = true;
    currentUser = newUser;
    
    closeModal(loginModal);
    updateUIForLoggedInUser();
    showToast('Registration successful! Welcome, ' + name, 'success');
  });
  
  // Update UI for logged in user
  function updateUIForLoggedInUser() {
    loginBtn.textContent = currentUser.name;
    loginBtn.onclick = function() {
      // Show user menu or profile
      showToast('Hello, ' + currentUser.name, 'info');
    };
    
    signupBtn.textContent = 'Logout';
    signupBtn.onclick = function() {
      isLoggedIn = false;
      currentUser = null;
      resetUIForLoggedOutUser();
      showToast('You have been logged out successfully.', 'info');
    };
  }
  
  // Reset UI for logged out user
  function resetUIForLoggedOutUser() {
    loginBtn.textContent = 'Log in';
    loginBtn.onclick = function() {
      openModal(loginModal);
    };
    
    signupBtn.textContent = 'Sign Up';
    signupBtn.onclick = function() {
      openModal(loginModal);
      switchToSignupTab();
    };
  }
  
  // Toast Notification
  function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastContent = document.getElementById('toastContent');
    
    toastContent.textContent = message;
    toastContent.className = 'toast-content ' + type;
    
    toast.classList.add('show');
    
    setTimeout(function() {
      toast.classList.remove('show');
    }, 3000);
  }
  
  // Room Cards Generation
  function generateRoomCards() {
    roomsGrid.innerHTML = '';
    
    rooms.forEach(room => {
      const card = document.createElement('div');
      card.className = 'room-card';
      
      // Format price for display
      const formattedPrice = formatCurrency(room.price);
      
      card.innerHTML = `
        <div class="room-image">
          <img src="${room.image}" alt="${room.title}">
          <div class="room-badge">${formattedPrice}</div>
        </div>
        <div class="room-content">
          <h3 class="room-title">${room.title}</h3>
          <p class="room-description">${room.description}</p>
          <div class="room-features">
            ${room.features.map(feature => `
              <div class="room-feature">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                ${feature}
              </div>
            `).join('')}
          </div>
          <div class="room-footer">
            <button class="btn btn-primary btn-block book-now-btn" data-room-id="${room.id}">Book Now</button>
          </div>
        </div>
      `;
      
      roomsGrid.appendChild(card);
    });
    
    // Add event listeners to the Book Now buttons
    document.querySelectorAll('.book-now-btn').forEach(button => {
      button.addEventListener('click', function() {
        const roomId = this.getAttribute('data-room-id');
        handleBookNowClick(roomId);
      });
    });
  }
  
  // Generate room cards on page load
  generateRoomCards();
  
  // Handle Book Now button click
  function handleBookNowClick(roomId) {
    if (!isLoggedIn) {
      openModal(loginModal);
      showToast('Please log in to book a room', 'info');
      return;
    }
    
    selectedRoom = rooms.find(room => room.id === roomId);
    
    // Set booking form values
    bookingRoomType.value = selectedRoom.title;
    bookingPrice.value = formatCurrency(selectedRoom.price);
    
    // Set today as check-in date and tomorrow as check-out date
    bookingCheckin.value = formatDate(new Date());
    
    const checkoutDate = new Date();
    checkoutDate.setDate(checkoutDate.getDate() + 1);
    bookingCheckout.value = formatDate(checkoutDate);
    
    // If user is logged in, pre-fill the form
    if (currentUser) {
      bookingName.value = currentUser.name;
      bookingEmail.value = currentUser.email;
    }
    
    // Open booking modal
    openModal(bookingModal);
    
    // Set first step as active
    setActiveBookingStep(0);
  }
  
  // Hero Book Now button
  heroBookBtn.addEventListener('click', function() {
    handleBookNowClick('room1'); // Default to first room
  });
  
  // Booking Form Navigation
  nextToPaymentBtn.addEventListener('click', function() {
    // Validate first form
    if (!bookingName.value || !bookingEmail.value || !bookingPhone.value || 
        !bookingCheckin.value || !bookingCheckout.value || !bookingIdNumber.value) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    // Show payment form
    setActiveBookingStep(1);
  });
  
  backToGuestBtn.addEventListener('click', function() {
    setActiveBookingStep(0);
  });
  
  processPaymentBtn.addEventListener('click', function() {
    // Simulate payment processing
    showToast('Processing payment...', 'info');
    
    // Disable button during processing
    processPaymentBtn.disabled = true;
    processPaymentBtn.textContent = 'Processing...';
    
    setTimeout(function() {
      // Enable button
      processPaymentBtn.disabled = false;
      processPaymentBtn.textContent = 'Process Payment';
      
      // Update summary
      updateBookingSummary();
      
      // Show confirmation step
      setActiveBookingStep(2);
      
      showToast('Payment processed successfully!', 'success');
    }, 1500);
  });
  
  backToPaymentBtn.addEventListener('click', function() {
    setActiveBookingStep(1);
  });
  
  confirmBookingBtn.addEventListener('click', function() {
    // Simulate booking confirmation
    showToast('Confirming booking...', 'info');
    
    // Disable button during processing
    confirmBookingBtn.disabled = true;
    confirmBookingBtn.textContent = 'Confirming...';
    
    setTimeout(function() {
      // Close modal and reset form
      closeModal(bookingModal);
      resetBookingForm();
      
      // Show success message
      showToast('Booking confirmed successfully! Check your email for details.', 'success');
      
      // Enable button
      confirmBookingBtn.disabled = false;
      confirmBookingBtn.textContent = 'Confirm Booking';
    }, 1500);
  });
  
  // Update booking summary
  function updateBookingSummary() {
    summaryRoomType.textContent = bookingRoomType.value;
    summaryCheckin.textContent = formatDateForDisplay(bookingCheckin.value);
    summaryCheckout.textContent = formatDateForDisplay(bookingCheckout.value);
    summaryGuest.textContent = bookingName.value;
    summaryPayment.textContent = selectedPaymentMethod.textContent;
    
    // Calculate total (price * number of nights)
    const checkinDate = new Date(bookingCheckin.value);
    const checkoutDate = new Date(bookingCheckout.value);
    const nights = Math.floor((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    const totalPrice = selectedRoom.price * nights;
    
    summaryTotal.textContent = formatCurrency(totalPrice);
  }
  
  // Payment method handling
  paymentMethod.addEventListener('change', function() {
    const method = this.value;
    updatePaymentMethodDisplay(method);
  });
  
  // Update payment method display
  function updatePaymentMethodDisplay(method) {
    let methodName = '';
    let description = '';
    
    switch(method) {
      case 'cash':
        methodName = 'Cash';
        description = 'Pay cash at the reception during check-in. A receipt will be provided.';
        break;
      case 'credit':
        methodName = 'Credit Card';
        description = 'Secure payment using your credit card.';
        break;
      case 'debit':
        methodName = 'Debit Card';
        description = 'Direct payment using your debit card.';
        break;
      case 'qr':
        methodName = 'QR Code Payment';
        description = 'Scan our QR code using your preferred payment app.';
        break;
      case 'stripe':
        methodName = 'Stripe';
        description = 'Secure online payment through Stripe gateway.';
        break;
    }
    
    selectedPaymentMethod.textContent = methodName;
    paymentMethodDescription.textContent = description;
    
    // Show/hide card fields
    if (method === 'credit' || method === 'debit') {
      cardPaymentFields.style.display = 'block';
    } else {
      cardPaymentFields.style.display = 'none';
    }
  }
  
  // Set active booking step
  function setActiveBookingStep(stepIndex) {
    // Update steps UI
    bookingSteps.forEach((step, index) => {
      if (index < stepIndex) {
        step.classList.add('completed');
        step.classList.remove('active');
      } else if (index === stepIndex) {
        step.classList.add('active');
        step.classList.remove('completed');
      } else {
        step.classList.remove('active', 'completed');
      }
    });
    
    // Show active form
    document.querySelectorAll('.booking-form').forEach(form => {
      form.classList.remove('active');
    });
    
    if (stepIndex === 0) {
      guestInfoForm.classList.add('active');
    } else if (stepIndex === 1) {
      paymentMethodForm.classList.add('active');
    } else if (stepIndex === 2) {
      confirmationForm.classList.add('active');
    }
  }
  
  // Reset booking form
  function resetBookingForm() {
    // Clear form fields
    bookingName.value = '';
    bookingEmail.value = '';
    bookingPhone.value = '';
    bookingIdNumber.value = '';
    bookingSpecial.value = '';
    
    // Reset to first step
    setActiveBookingStep(0);
    
    // Reset selected room
    selectedRoom = null;
  }
  
  // Check if we should show login modal from URL param
  const params = new URLSearchParams(window.location.search);
  if (params.get('login') === 'true') {
    openModal(loginModal);
  }
});
