export const canSee = (requirement: string) => {
  const role = localStorage.getItem('role');

  switch (requirement) {
    case 'admin':
      return role === 'admin' ? true : false;
    case 'moderator':
      return role === 'admin' || role === 'moderator' ? true : false;
    case 'user':
      return role === 'admin' || role === 'moderator' || role === 'user'
        ? true
        : false;
    default:
      return false;
  }
};
