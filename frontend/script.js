const API_URL = 'http://127.0.0.1:5000/users';
 
const userForm = document.getElementById('userForm');
const updateForm = document.getElementById('updateForm');
const userTable = document.getElementById('userTable');
 
// Fetch and display users
async function fetchUsers() {
 
    // fetch vai gerar uma promiss para acessar a API
    const response = await fetch(API_URL);
    // Trás os dados via API
    const users = await response.json();
    userTable.innerHTML = '';
    users.forEach(user => {
        userTable.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>
                    <button onclick="editUser(${user.id}, '${user.name}', '${user.email}', ${user.age})">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}
 
// Add a new user
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: parseInt(document.getElementById('age').value)
    };
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    fetchUsers();
    userForm.reset();
});
 
// Delete a user
async function deleteUser(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchUsers();
}
 
// Edit a user
function editUser(id, name, email, age) {
    updateForm.style.display = 'block';
    document.getElementById('updateId').value = id;
    document.getElementById('updateName').value = name;
    document.getElementById('updateEmail').value = email;
    document.getElementById('updateAge').value = age;
}
 
// Update a user
updateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
 
    const id = document.getElementById('updateId').value;
 
    const updatedUser = {
        name: document.getElementById('updateName').value,
        email: document.getElementById('updateEmail').value,
        age: parseInt(document.getElementById('updateAge').value)
    };
 
 
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
    });
    fetchUsers();
    updateForm.reset();
 
    // Mostrar o botão de atualização
    updateForm.style.display = 'none';
});
 
// Initial fetch
fetchUsers();
