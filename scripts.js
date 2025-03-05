
// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const loginBtn = document.getElementById('loginBtn');
const loginBtnMobile = document.getElementById('loginBtnMobile');
const signupBtn = document.getElementById('signupBtn');
const heroBookBtn = document.getElementById('heroBookBtn');
const loginModal = document.getElementById('loginModal');
const bookingModal = document.getElementById('bookingModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeBookingModal = document.getElementById('closeBookingModal');
const loginTabBtn = document.getElementById('loginTabBtn');
const signupTabBtn = document.getElementById('signupTabBtn');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const bookingForm = document.getElementById('bookingForm');
const roomsGrid = document.getElementById('roomsGrid');
const toast = document.getElementById('toast');
const toastContent = document.getElementById('toastContent');
const yearEl = document.getElementById('year');

// Set current year in footer
yearEl.textContent = new Date().getFullYear();

// Mock Data
const ROOM_DATA = [
  {
    id: 'room1',
    title: "Standard Room",
    description: "Comfortable and cozy room with essential amenities.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
    features: ["Wi-Fi & TV", "Air Conditioning", "Mini Fridge"],
    price: 9900
  },
  {
    id: 'room2',
    title: "Deluxe Room",
    description: "Spacious room with premium amenities and mountain view.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    features: ["Premium Wi-Fi & Smart TV", "Mini Bar & Safe", "Bathtub & Premium Toiletries"],
    price: 14900
  },
  {
    id: 'room3',
    title: "Suite",
    description: "Luxurious suite with separate living area and panoramic views.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070&auto=format&fit=crop",
    features: ["Living Room & Private Balcony", "Premium Dining & Kitchen", "Work Desk & Premium View"],
    price: 29900
  },
  {
    id: 'room4',
    title: "Presidential Suite",
    description: "The ultimate luxury experience with unparalleled amenities and service.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2070&auto=format&fit=crop",
    features: ["Exclusive Panoramic Views", "Private Dining & Butler Service", "Luxury Spa Bathroom & Private Terrace"],
    price: 59900
  }
];

// Mock User Data
const USERS = [
  { email: 'admin@satkar.com', password: 'password123', name: 'Admin User', role: 'admin' },
  { email: 'customer@satkar.com', password: 'password123', name: 'John Doe', role: 'customer' }
];

// User Authentication
let currentUser = null;

// Check for saved session
const loadUserFromLocalStorage = () => {
  const savedUser = localStorage.getItem('satkar_user');
  if (savedUser) {
    try {
      currentUser = JSON.parse(savedUser);
      showToast(`Welcome back, ${currentUser.name}!`, 'success');
      updateUIForLoggedInUser();
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem('satkar_user');
    }
  }
};

// Initialize the app
const initApp = () => {
  renderRooms();
  loadUserFromLocalStorage();
  initEventListeners();
};

// Set up event listeners
const initEventListeners = () => {
  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('show');
  });

  // Modal handling
  loginBtn.addEventListener('click', () => showModal(loginModal));
  loginBtnMobile.addEventListener('click', () => showModal(loginModal));
  signupBtn.addEventListener('click', () => {
    showModal(loginModal);
    activateTab(signupTabBtn, signupTab);
  });
  heroBookBtn.addEventListener('click', handleBookNowClick);
  
  closeLoginModal.addEventListener('click', () => hideModal(loginModal));
  closeBookingModal.addEventListener('click', () => hideModal(bookingModal));

  // Close modal when clicking on overlay
  window.addEventListener('click', (e) => {
    if (e.target === loginModal) hideModal(loginModal);
    if (e.target === bookingModal) hideModal(bookingModal);
  });

  // Tab switching
  loginTabBtn.addEventListener('click', () => activateTab(loginTabBtn, loginTab));
  signupTabBtn.addEventListener('click', () => activateTab(signupTabBtn, signupTab));

  // Form submissions
  loginForm.addEventListener('submit', handleLoginSubmit);
  signupForm.addEventListener('submit', handleSignupSubmit);
  bookingForm.addEventListener('submit', handleBookingSubmit);

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        // Close mobile menu if open
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('show');
      }
    });
  });
};

// Render rooms in the grid
const renderRooms = () => {
  roomsGrid.innerHTML = '';
  
  ROOM_DATA.forEach(room => {
    const roomEl = document.createElement('div');
    roomEl.className = 'room-card';
    roomEl.innerHTML = `
      <div class="room-image">
        <img src="${room.image}" alt="${room.title}">
        <div class="room-badge">Rs. ${formatPrice(room.price)}</div>
      </div>
      <div class="room-content">
        <h3 class="room-title">${room.title}</h3>
        <p class="room-description">${room.description}</p>
        <ul class="room-features">
          ${room.features.map(feature => `
            <li class="room-feature">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
              ${feature}
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="room-footer">
        <button class="btn btn-primary btn-block" data-room-id="${room.id}">Book Now</button>
      </div>
    `;
    
    roomsGrid.appendChild(roomEl);
    
    // Add event listener to the book now button
    const bookBtn = roomEl.querySelector('.btn');
    bookBtn.addEventListener('click', () => handleRoomBooking(room));
  });
};

// Helper function to format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN').format(price);
};

// Handle room booking button click
const handleRoomBooking = (room) => {
  if (!currentUser) {
    showModal(loginModal);
    // Store room details for booking after login
    sessionStorage.setItem('booking_room', JSON.stringify(room));
  } else {
    showBookingModal(room);
  }
};

// Handle book now button click (hero section)
const handleBookNowClick = () => {
  if (!currentUser) {
    showModal(loginModal);
  } else {
    showBookingModal();
  }
};

// Show the booking modal with room details
const showBookingModal = (room = null) => {
  const bookingRoomSelect = document.getElementById('bookingRoom');
  
  // Set the room selection if a specific room was clicked
  if (room) {
    for (let i = 0; i < bookingRoomSelect.options.length; i++) {
      if (bookingRoomSelect.options[i].value.toLowerCase() === room.title.toLowerCase().replace(' ', '')) {
        bookingRoomSelect.selectedIndex = i;
        break;
      }
    }
  }
  
  // Pre-fill user info if logged in
  if (currentUser) {
    document.getElementById('bookingName').value = currentUser.name;
    document.getElementById('bookingEmail').value = currentUser.email;
  }
  
  showModal(bookingModal);
};

// Show a modal
const showModal = (modal) => {
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
};

// Hide a modal
const hideModal = (modal) => {
  modal.classList.remove('show');
  document.body.style.overflow = '';
};

// Activate a tab
const activateTab = (tabBtn, tabContent) => {
  // Deactivate all tabs
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  // Activate the selected tab
  tabBtn.classList.add('active');
  tabContent.classList.add('active');
};

// Handle login form submission
const handleLoginSubmit = (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Simple validation
  if (!email || !password) {
    showToast('Please enter both email and password', 'error');
    return;
  }
  
  // Find user
  const user = USERS.find(u => u.email === email && u.password === password);
  
  if (user) {
    currentUser = user;
    localStorage.setItem('satkar_user', JSON.stringify(user));
    hideModal(loginModal);
    showToast(`Welcome, ${user.name}!`, 'success');
    updateUIForLoggedInUser();
    
    // Check if there was a room selected before login
    const pendingBooking = sessionStorage.getItem('booking_room');
    if (pendingBooking) {
      const room = JSON.parse(pendingBooking);
      sessionStorage.removeItem('booking_room');
      setTimeout(() => showBookingModal(room), 500);
    }
  } else {
    showToast('Invalid email or password', 'error');
  }
};

// Handle signup form submission
const handleSignupSubmit = (e) => {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  
  // Simple validation
  if (!name || !email || !password) {
    showToast('Please fill out all fields', 'error');
    return;
  }
  
  // Check if user already exists
  if (USERS.some(u => u.email === email)) {
    showToast('This email is already registered', 'error');
    return;
  }
  
  // Create new user
  const newUser = { email, password, name, role: 'customer' };
  USERS.push(newUser);
  
  // Log in the new user
  currentUser = newUser;
  localStorage.setItem('satkar_user', JSON.stringify(newUser));
  
  hideModal(loginModal);
  showToast(`Welcome, ${name}! Your account has been created.`, 'success');
  updateUIForLoggedInUser();
};

// Handle booking form submission
const handleBookingSubmit = (e) => {
  e.preventDefault();
  
  const name = document.getElementById('bookingName').value;
  const email = document.getElementById('bookingEmail').value;
  const roomType = document.getElementById('bookingRoom').value;
  const checkin = document.getElementById('bookingCheckin').value;
  const checkout = document.getElementById('bookingCheckout').value;
  const guests = document.getElementById('bookingGuests').value;
  
  // Simple validation
  if (!name || !email || !roomType || !checkin || !checkout) {
    showToast('Please fill out all required fields', 'error');
    return;
  }
  
  // Validate dates
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  
  if (checkinDate >= checkoutDate) {
    showToast('Check-out date must be after check-in date', 'error');
    return;
  }
  
  // Simulate booking processing
  hideModal(bookingModal);
  showToast('Processing your booking...', 'info');
  
  // Simulate API call
  setTimeout(() => {
    showToast('Your booking has been confirmed!', 'success');
    
    // Reset form
    bookingForm.reset();
  }, 2000);
};

// Update UI elements for logged in user
const updateUIForLoggedInUser = () => {
  if (currentUser) {
    loginBtn.textContent = currentUser.name;
    signupBtn.textContent = 'Logout';
    signupBtn.removeEventListener('click', null);
    signupBtn.addEventListener('click', handleLogout);
  }
};

// Handle logout
const handleLogout = () => {
  currentUser = null;
  localStorage.removeItem('satkar_user');
  
  loginBtn.textContent = 'Log in';
  signupBtn.textContent = 'Sign Up';
  signupBtn.removeEventListener('click', handleLogout);
  signupBtn.addEventListener('click', () => {
    showModal(loginModal);
    activateTab(signupTabBtn, signupTab);
  });
  
  showToast('You have been logged out', 'info');
};

// Show toast notification
const showToast = (message, type = 'info') => {
  toastContent.textContent = message;
  toastContent.className = 'toast-content ' + type;
  
  toast.classList.add('show');
  
  // Hide toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
};

// Check URL parameters on page load
const checkURLParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const showLogin = urlParams.get('login');
  
  if (showLogin === 'true') {
    showModal(loginModal);
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};

// Initialize the app when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  checkURLParameters();
});
