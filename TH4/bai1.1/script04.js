let students = [];

const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('studentTableBody');
const totalDisplay = document.getElementById('totalStudents');
const avgDisplay = document.getElementById('avgScore');

function getClassification(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

function renderTable() {
    tableBody.innerHTML = ''; 
    let totalScore = 0;

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        
        if (student.score < 5) {
            row.classList.add('highlight-yellow');
        }

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score.toFixed(1)}</td>
            <td>${getClassification(student.score)}</td>
            <td>
                <button class="btn-delete" data-index="${index}">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
        totalScore += student.score;
    });

    const total = students.length;
    const average = total > 0 ? (totalScore / total).toFixed(2) : 0;
    
    totalDisplay.innerText = total;
    avgDisplay.innerText = average;
}

function handleAdd() {
    const name = txtName.value.trim();
    const scoreValue = txtScore.value;
    const score = parseFloat(scoreValue);

    if (name === "" || scoreValue === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ từ 0 đến 10!");
        return;
    }

    students.push({ name, score });

    renderTable();
    txtName.value = "";
    txtScore.value = "";
    txtName.focus();
}


btnAdd.addEventListener('click', handleAdd);

txtScore.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAdd();
});

tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        students.splice(index, 1);
        renderTable();
    }
});