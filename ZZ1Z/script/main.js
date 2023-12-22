document.addEventListener('DOMContentLoaded', function () {
    const pages = document.querySelectorAll('.page_');
    const navLinks = document.querySelectorAll('.nav-item');
    const mainContent = document.querySelector('.main');
    navLinks.forEach((link, index) => {
        link.addEventListener('click', () => {
            const currentPage = mainContent.querySelector('.page-visible');
            if (currentPage) {
                currentPage.classList.remove('page-visible');
                currentPage.classList.add('page-hidden');
            }
            pages[index].classList.remove('page-hidden');
            pages[index].classList.add('page-visible');
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main');
        const collapseButton = document.querySelector('.collapse-button');

        collapseButton.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-collapsed');
            mainContent.classList.toggle('main-collapsed');
        });
    });