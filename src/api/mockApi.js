export const mockLogin = (email, password) => {
  const users = [
    { 
      id: 1, 
      email: "admin@test.com", 
      password: "admin123", 
      name: "Admin User", 
      role: "admin" 
    },
    { 
      id: 2, 
      email: "user@test.com", 
      password: "user123", 
      name: "Regular User", 
      role: "user" 
    }
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        u => u.email === email && u.password === password
      );
      
      if (user) {
        const { password: _password, ...userWithoutPassword } = user;
        resolve({
          data: {
            token: `mock-jwt-token-${user.id}-${Date.now()}`,
            user: userWithoutPassword,
          }
        });
      } else {
        reject({
          response: {
            data: { message: 'Invalid email or password' },
            status: 401,
          }
        });
      }
    }, 800); // Simulate network delay
  });
};

// Add more mock API functions as needed
export const mockGetDashboard = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          stats: {
            totalProjects: 12,
            activeTasks: 45,
            completedTasks: 128,
            teamMembers: 8
          },
          recentActivity: [
            { id: 1, action: 'Task completed', time: '2 hours ago' },
            { id: 2, action: 'New project created', time: '5 hours ago' },
          ]
        }
      });
    }, 500);
  });
};