let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHTML();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? 
            JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];  
}

const createInnerHTML = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                     "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    if (empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList) {
      innerHtml = `${innerHtml}
      <tr>
        <td><img class="profile" alt="" 
                  src="${empPayrollData._profilePic}">
        </td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${stringifyDate(empPayrollData._startDate)}</td>
        <td>
          <img id="${empPayrollData._id}" onclick="remove(this)" 
             src="../assets/icons/delete-black-18dp.svg" alt="delete">
          <img id="${empPayrollData._id}" onclick="update(this)" 
             src="../assets/icons/create-black-18dp.svg" alt="edit">
        </td>
      </tr>
      `;
    }
    document.querySelector("#table-display").innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
  }