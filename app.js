let rfiList = JSON.parse(localStorage.getItem('construction_rfis')) || [];
const rfiForm = document.getElementById('rfi-form');
const rfiLogBody = document.getElementById('rfi-log-body');

function renderTable() {
    rfiLogBody.innerHTML = '';
    rfiList.forEach((rfi, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rfi.date}</td>
            <td><strong>${rfi.subject}</strong></td>
            <td>${rfi.location}</td>
            <td>${rfi.drawing}</td>
            <td>
                ${rfi.status === 'Open' 
                    ? `<button onclick="updateStatus(${index})" class="btn-resolve">Resolve</button>` 
                    : '<span class="status-resolved">Resolved</span>'}
            </td>
        `;
        rfiLogBody.appendChild(row);
    });
}

function updateStatus(index) {
    rfiList[index].status = 'Resolved';
    localStorage.setItem('construction_rfis', JSON.stringify(rfiList));
    renderTable();
}

function exportToCSV() {
    let csvContent = "Date,Subject,Location,Drawing,Status\n";
    rfiList.forEach(rfi => {
        csvContent += `${rfi.date},"${rfi.subject}","${rfi.location}","${rfi.drawing}",${rfi.status}\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "RFI_Log.csv");
    a.click();
}

rfiForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const newRFI = {
        date: new Date().toLocaleDateString(),
        subject: document.getElementById('rfi-subject').value,
        location: document.getElementById('rfi-location').value,
        drawing: document.getElementById('rfi-drawing').value,
        status: 'Open'
    };
    rfiList.push(newRFI);
    localStorage.setItem('construction_rfis', JSON.stringify(rfiList));
    rfiForm.reset();
    renderTable();
});

renderTable();