const url = window.location.href;
const teachers = document.getElementById('teachers');
const students = document.getElementById('students');

if (url.includes('professores')) {
    teachers.classList.add('active');
    students.classList.remove('active');
}
if (url.includes('estudantes')) {
    students.classList.add('active');
    teachers.classList.remove('active');
}
