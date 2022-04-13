export function getCurrentUserID(): number {
  var user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  return user.id;
}

export function getCurrentUserName(): string {
  var user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  return user.name;
}

export function getCurrentProjectID(): number {
  var project = JSON.parse(localStorage.getItem('current_project') || '{}');
  return project;
}

export function getCurrentTheme(): string {
  var theme = JSON.parse(localStorage.getItem('user_theme') || '{}');
  return theme;
}
