const commentsCollection = db.collection('comments');

function renderComments(postId, commentListEl) {
commentListEl.innerHTML = '<em>Loading comments…</em>';
commentsCollection
.where('postId', '==', postId)
.orderBy('timestamp', 'asc')
.get()
.then(snapshot => {
commentListEl.innerHTML = '';
const isAdmin = sessionStorage.getItem('cc_admin') === 'true';
snapshot.forEach(doc => {
const data = doc.data();
const div = document.createElement('div');
div.className = 'comment';
div.textContent = data.text;

if (isAdmin) {
const btn = document.createElement('button');
btn.textContent = 'Delete';
btn.className = 'delete-btn';
btn.style.display = 'block';
btn.onclick = () => {
if (confirm('Delete this comment?')) {
commentsCollection.doc(doc.id).delete();
div.remove();
}
};
div.appendChild(btn);
}

commentListEl.appendChild(div);
});

if (isAdmin) {
const name = sessionStorage.getItem('cc_admin_name') || 'Admin';
const note = document.createElement('div');
note.style.fontSize = '0.9rem';
note.style.color = '#555';
note.style.marginBottom = '0.5rem';
note.textContent = 'Logged in as: ' + name;
commentListEl.parentElement.insertBefore(note, commentListEl);
}
});
}

function setupCommentForm(postId, formEl, commentListEl) {
formEl.addEventListener('submit', e => {
e.preventDefault();
const textarea = formEl.querySelector('textarea');
const val = textarea.value.trim();
if (!val) return;
commentsCollection.add({
postId,
text: val,
timestamp: firebase.firestore.FieldValue.serverTimestamp()
}).then(() => {
textarea.value = '';
renderComments(postId, commentListEl);
});
});
}

document.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('.post').forEach(postEl => {
const postId = postEl.getAttribute('data-post-id');
if (!postId) return;

const commentList = postEl.querySelector('.comment-section');
const formEl = postEl.querySelector('.comment-form');
renderComments(postId, commentList);
setupCommentForm(postId, formEl, commentList);
});
});