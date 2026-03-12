
let students = []; 
let filterState = {
    keyword: "",
    classification: "All",
    sortDirection: null
};


const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const txtSearch = document.getElementById('txtSearch');
const selFilter = document.getElementById('selFilter');
const colScore = document.getElementById('colScore');
const sortIcon = document.getElementById('sortIcon');
const tableBody = document.getElementById('studentTableBody');
const totalDisplay = document.getElementById('totalStudents');
const avgDisplay = document.getElementById('avgScore');


function getClassification(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}


function applyFilters() {
    let filteredStudents = [...students];

    if (filterState.keyword.trim() !== "") {
        filteredStudents = filteredStudents.filter(student => 
            student.name.toLowerCase().includes(filterState.keyword.toLowerCase())
        );
    }

    if (filterState.classification !== "All") {
        filteredStudents = filteredStudents.filter(student => 
            getClassification(student.score) === filterState.classification
        );
    }

    if (filterState.sortDirection === 'asc') {
        filteredStudents.sort((a, b) => a.score - b.score);
        sortIcon.innerText = "▲";
    } else if (filterState.sortDirection === 'desc') {
        filteredStudents.sort((a, b) => b.score - a.score);
        sortIcon.innerText = "▼";
    } else {
        sortIcon.innerText = "";
    }

    renderTable(filteredStudents);
}

function renderTable(dataToRender) {
    tableBody.innerHTML = ''; 

    if (dataToRender.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="empty-message">Không có kết quả nào phù hợp</td></tr>`;
        totalDisplay.innerText = 0;
        avgDisplay.innerText = 0;
        return;
    }

    let totalScore = 0;

    dataToRender.forEach((student, index) => {
        const row = document.createElement('tr');
        if (student.score < 5) row.classList.add('highlight-yellow');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score.toFixed(1)}</td>
            <td>${getClassification(student.score)}</td>
            <td>
                <button class="btn-delete" data-id="${student.id}">Xóa</button>
            </td>
        `;
        tableBody.appendChild(row);
        totalScore += student.score;
    });

    totalDisplay.innerText = dataToRender.length;
    avgDisplay.innerText = (totalScore / dataToRender.length).toFixed(2);
}

function handleAdd() {
    const name = txtName.value.trim();
    const score = parseFloat(txtScore.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    students.push({ 
        id: Date.now().toString(), 
        name: name, 
        score: score 
    });

    txtName.value = "";
    txtScore.value = "";
    txtName.focus();

    applyFilters();
}


btnAdd.addEventListener('click', handleAdd);
txtScore.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleAdd(); });

txtSearch.addEventListener('input', (e) => {
    filterState.keyword = e.target.value;
    applyFilters();
});

selFilter.addEventListener('change', (e) => {
    filterState.classification = e.target.value;
    applyFilters();
});

colScore.addEventListener('click', () => {
    if (filterState.sortDirection === null) {
        filterState.sortDirection = 'asc';
    } else if (filterState.sortDirection === 'asc') {
        filterState.sortDirection = 'desc';
    } else {
        filterState.sortDirection = null; 
    }
    applyFilters();
});

tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const idToDelete = e.target.getAttribute('data-id');
        
        students = students.filter(student => student.id !== idToDelete);
        
        applyFilters();
    }
});