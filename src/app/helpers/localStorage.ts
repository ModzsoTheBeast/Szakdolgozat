export function getCurrentUserID(): number {
  var suserid: string = '';
  if (localStorage.getItem('userID')) {
    suserid = localStorage.getItem('userID') as string;
  }
  var userID: number = Number(suserid);
  return userID;
}

export function getCurrentUserName(): string {
  var username = JSON.parse(localStorage.getItem('userName') || '{}');
  return username;
}

export function getCurrentProjectID(): number {
  var project = JSON.parse(localStorage.getItem('current_project') || '{}');
  return project;
}

export function getCurrentTheme(): string {
  var theme = JSON.parse(localStorage.getItem('user_theme') || '{}');
  return theme;
}
