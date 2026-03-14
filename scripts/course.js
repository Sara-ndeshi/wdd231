const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Web Frontend Dev I', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Dev II', credits: 2, completed: false }
];

function displayCourses(filter = 'all') {
    const display = document.querySelector('#course-display');
    display.innerHTML = "";
    
    const filtered = courses.filter(c => filter === 'all' || c.subject.toLowerCase() === filter);
    
    filtered.forEach(course => {
        let card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        card.textContent = `${course.subject} ${course.number}`;
        display.appendChild(card);
    });

    const total = filtered.reduce((sum, c) => sum + c.credits, 0);
    document.getElementById('total-credits').textContent = `Total Credits: ${total}`;
}

document.querySelector('#all').addEventListener('click', () => displayCourses('all'));
document.querySelector('#wdd').addEventListener('click', () => displayCourses('wdd'));
document.querySelector('#cse').addEventListener('click', () => displayCourses('cse'));

displayCourses(); // Initial call
