// admin.js
document.addEventListener('DOMContentLoaded', () => {
const loginBtn = document.getElementById('admin-login-btn');
const pwdInput = document.getElementById('admin-password');
if (loginBtn) {
loginBtn.addEventListener('click', () => {
const pwd = pwdInput.value.trim();
if (pwd === 'hoslersoccer123') {
sessionStorage.setItem('cc_admin', 'true');
sessionStorage.setItem('cc_admin_name', 'Mr. Anthony');
alert('Logged in as Mr. Anthony — you can now delete comments.');
window.location.reload();
} else {
alert('Wrong password.');
}
});
}
});
