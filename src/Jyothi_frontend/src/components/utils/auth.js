// Simple auth service using localStorage
export const auth = {
    login: (email, password, userType) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password && u.userType === userType);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { user, error: null };
      }
      return { user: null, error: 'Invalid credentials' };
    },
  
    register: (userData) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some(u => u.email === userData.email)) {
        return { error: 'Email already exists' };
      }
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      return { user: newUser, error: null };
    },
  
    logout: () => {
      localStorage.removeItem('currentUser');
    },
  
    getCurrentUser: () => {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
  };