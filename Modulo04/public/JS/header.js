const url = window.location.pathname;
const teachers = document.getElementById('teachers');
const students = document.getElementById('students');

if (url.includes('professores')) {
    teachers.classList.add('active');
    students.classList.remove('active');
}
if (url.includes('alunos')) {
    students.classList.add('active');
    teachers.classList.remove('active');
}
