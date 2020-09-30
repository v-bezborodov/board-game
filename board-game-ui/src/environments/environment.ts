const API_URL = 'http://localhost:8080/api/';

export const environment = {
  production: false,
  staticUrl: 'http://94.250.251.166:8080/api',
  apiUrl: {
    auth: {
      signin: API_URL + 'signin',
      signup: API_URL + 'signup',
      refresh: API_URL + 'refresh'
    },
    user: {
      currentUser: API_URL + 'users/current',
      gameAdmin: (id: string) => API_URL + `users/game-admin/${id}`,
      updateData: API_URL + 'users/data',
      updateGameAdminInfo: API_URL + 'users/game-admin-info',
      updatePassword: API_URL + 'users/password',
      getAll: API_URL + 'users/all'
    },
    pattern: {
      pattern: API_URL + 'patterns',
      publish: API_URL + 'patterns/publish',
      published: API_URL + 'patterns/published/all',
      copy: API_URL + 'patterns/copy'
    },
    game: {
      game: API_URL + 'games'
    },
    file: API_URL + 'files',
    conversation: API_URL + 'conversations',
    message: API_URL + 'messages'
  }
};
