// Handle user authentication using localStorage
class Auth {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    signup(username, email, password) {
        // Check if user already exists
        if (this.users.some(user => user.email === email)) {
            throw new Error('Email already registered');
        }

        const user = {
            id: this.users.length + 1,
            username,
            email,
            password // In a real app, you would hash the password
        };

        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
        return user;
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }
}

const auth = new Auth();

// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                auth.login(email, password);
                window.location.href = 'index.html';
            } catch (error) {
                alert(error.message);
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                auth.signup(username, email, password);
                alert('Registration successful! Please login.');
                window.location.href = 'login.html';
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Update navigation based on auth status
    const updateNavigation = () => {
        const loggedIn = auth.isLoggedIn();
        const navbarNav = document.getElementById('navbarNav');
        
        if (navbarNav) {
            const authLinks = navbarNav.querySelector('.navbar-nav');
            if (loggedIn) {
                authLinks.innerHTML = `
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="handleLogout(event)">Logout</a>
                    </li>`;
            }
        }
    };

    updateNavigation();
});

// Handle logout
function handleLogout(event) {
    event.preventDefault();
    auth.logout();
    window.location.href = 'index.html';
}