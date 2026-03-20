// Функция для бургер-меню
function toggleBurger(id) {
    document.getElementById(id).classList.toggle('open');
}

// Для обратной совместимости
window.toggleBurger = function(id) {
    document.getElementById(id).classList.toggle('open');
};

console.log('Сайт PURECRAFT с фиксированным меню загружен');

// Функция для плавного скролла к слайдам
function smoothScrollToElement(element) {
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Функция для добавления обработчиков к элементам меню
function addClickHandlers() {
    // Находим все слайды и футер
    const firstSlide = document.querySelector('.first-slide');
    const secondSlide = document.getElementById('secondSlide');
    const thirdSlide = document.getElementById('thirdSlide');
    const fourthSlide = document.getElementById('fourthSlide');
    const footer = document.querySelector('.footer-container');

    // Элементы в хедере
    const headerAbout = document.querySelector('.fixed-header .menu-item-fixed:nth-child(1)'); // О НАС
    const headerCatalog = document.querySelector('.fixed-header .menu-item-fixed:nth-child(2)'); // КАТАЛОГ
    const headerBlog = document.querySelector('.fixed-header .menu-item-fixed:nth-child(3)'); // БЛОГ
    const headerContacts = document.querySelector('.fixed-header .menu-item-fixed:nth-child(4)'); // КОНТАКТЫ
    const headerLogo = document.querySelector('.fixed-header .header-content > div:first-child'); // PURECRAFT в хедере
    
    if (headerAbout) {
        headerAbout.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToElement(secondSlide);
        });
    }
    
    if (headerCatalog) {
        headerCatalog.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToElement(thirdSlide);
        });
    }
    
    if (headerBlog) {
        headerBlog.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToElement(fourthSlide);
        });
    }
    
    if (headerContacts) {
        headerContacts.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToElement(footer);
        });
    }
    
    // Логотип в хедере - ведет на первый слайд
    if (headerLogo) {
        headerLogo.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            smoothScrollToElement(firstSlide);
        });
        headerLogo.style.cursor = 'pointer';
    }
    
    // Элементы в футере
    const footerAbout = document.querySelector('.footer-container .footer-nav-item:nth-child(1)'); // О НАС
    const footerCatalog = document.querySelector('.footer-container .footer-nav-item:nth-child(2)'); // КАТАЛОГ
    const footerBlog = document.querySelector('.footer-container .footer-nav-item:nth-child(3)'); // БЛОГ
    const footerLogo = document.querySelector('.footer-container .footer-logo'); // PURECRAFT в футере
    const footerContacts = document.querySelector('.footer-container .footer-contacts-title'); // КОНТАКТЫ (некликабельный)
    
    if (footerAbout) {
        footerAbout.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToElement(secondSlide);
        });
    }
    
    if (footerCatalog) {
        footerCatalog.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToElement(thirdSlide);
        });
    }
    
    if (footerBlog) {
        footerBlog.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToElement(fourthSlide);
        });
    }
    
    // Логотип в футере - ведет на первый слайд (без изменения цвета)
    if (footerLogo) {
        footerLogo.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            smoothScrollToElement(firstSlide);
        });
        footerLogo.style.cursor = 'pointer';
    }
    
    // Контакты в футере делаем некликабельными
    if (footerContacts) {
        footerContacts.style.cursor = 'default';
        footerContacts.style.pointerEvents = 'none';
    }
    
    // Элементы на первом слайде
    const firstSlideAboutButton = document.querySelector('.first-slide .button-group.fly-bottom-delay-2'); // Кнопка "О НАС" на первом слайде
    const firstSlideLogo = document.querySelector('.first-slide .fly-left-logo'); // Большой логотип PURE CRAFT на первом слайде
    
    if (firstSlideAboutButton) {
        firstSlideAboutButton.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollToElement(secondSlide);
        });
    }
    
    // Большой логотип PURE CRAFT на первом слайде - ведет на первый слайд
    if (firstSlideLogo) {
        firstSlideLogo.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            smoothScrollToElement(firstSlide);
        });
        firstSlideLogo.style.cursor = 'pointer';
    }
}

// Добавляем обработчики после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    addClickHandlers();
    
    // Также добавляем обработчики после любых динамических изменений
    const observer = new MutationObserver(function() {
        addClickHandlers();
    });
    
    // Наблюдаем за изменениями в DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Скрипт для анимации появления при скролле до четвёртого слайда
document.addEventListener('DOMContentLoaded', function() {
    const fourthSlide = document.getElementById('fourthSlide');
    
    if (fourthSlide) {
        // Получаем все элементы для анимации
        const blogTabs = document.querySelectorAll('.fourth-slide .blog-tab');
        const blogWrappers = document.querySelectorAll('.fourth-slide .blog-card-wrapper');
        
        // Убеждаемся, что классы visible удалены
        blogTabs.forEach(el => el.classList.remove('visible'));
        blogWrappers.forEach(el => el.classList.remove('visible'));
        
        // Флаг для однократного запуска
        let fourthAnimationPlayed = false;
        
        // Создаем Intersection Observer
        const fourthObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !fourthAnimationPlayed) {
                    fourthAnimationPlayed = true;
                    
                    // Анимация для кнопок - добавляем класс visible
                    blogTabs.forEach(tab => {
                        tab.classList.add('visible');
                    });
                    
                    // Анимация для карточек (появляются после кнопок)
                    setTimeout(() => {
                        blogWrappers.forEach(wrapper => {
                            wrapper.classList.add('visible');
                        });
                    }, 800);
                    
                    // Отключаем наблюдатель
                    fourthObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px'
        });
        
        fourthObserver.observe(fourthSlide);
    }
});

// Логика для переключения вкладок на 4-м слайде
document.addEventListener('DOMContentLoaded', function() {
    const fourthSlide = document.getElementById('fourthSlide');
    if (!fourthSlide) return;

    const tabs = document.querySelectorAll('.fourth-slide .blog-tab');
    const containers = {
        obzory: document.querySelector('.cards-obzory'),
        recepty: document.querySelector('.cards-recepty'),
        novosti: document.querySelector('.cards-novosti')
    };

    let activeCategory = 'obzory';
    let isAnimating = false;

    function switchCategory(newCategory) {
        if (newCategory === activeCategory || isAnimating) return;

        const oldContainer = containers[activeCategory];
        const newContainer = containers[newCategory];

        if (!oldContainer || !newContainer) return;

        isAnimating = true;

        const order = ['obzory', 'recepty', 'novosti'];
        const oldIndex = order.indexOf(activeCategory);
        const newIndex = order.indexOf(newCategory);
        const isMovingRight = newIndex > oldIndex;

        oldContainer.classList.remove(
            'active', 
            'exit-left', 'exit-right', 
            'enter-from-left', 'enter-from-right'
        );
        newContainer.classList.remove(
            'active', 
            'exit-left', 'exit-right', 
            'enter-from-left', 'enter-from-right'
        );

        if (isMovingRight) {
            oldContainer.classList.add('exit-right');
        } else {
            oldContainer.classList.add('exit-left');
        }

        setTimeout(() => {
            newContainer.style.visibility = 'visible';
            newContainer.style.opacity = '1';
            
            if (isMovingRight) {
                newContainer.classList.add('enter-from-left');
            } else {
                newContainer.classList.add('enter-from-right');
            }
        }, 50);

        setTimeout(() => {
            oldContainer.style.visibility = 'hidden';
            oldContainer.style.opacity = '0';
            oldContainer.classList.remove('exit-left', 'exit-right');

            newContainer.classList.remove('enter-from-left', 'enter-from-right');
            newContainer.classList.add('active');
            oldContainer.classList.remove('active');

            activeCategory = newCategory;

            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.category === newCategory) {
                    tab.classList.add('active');
                }
            });

            isAnimating = false;
        }, 700);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            switchCategory(category);
        });
    });

    if (containers.obzory) {
        containers.obzory.classList.add('active');
        containers.obzory.style.visibility = 'visible';
        containers.obzory.style.opacity = '1';
    }

    setTimeout(() => {
        const obzoryTab = document.querySelector('.tab-obzory');
        if (obzoryTab) {
            obzoryTab.classList.add('active');
        }
    }, 1200);
});

// Скрипт для анимации появления при скролле до третьего слайда
document.addEventListener('DOMContentLoaded', function() {
    const thirdSlide = document.getElementById('thirdSlide');
    const catalogTitle = document.querySelector('.catalog-title');
    const catalogItems = document.querySelectorAll('.catalog-item');
    const catalogArrow = document.querySelector('.catalog-arrow');
    
    let thirdAnimationPlayed = false;
    
    if (catalogTitle) {
        catalogTitle.style.opacity = '0';
    }
    
    catalogItems.forEach(item => {
        item.style.opacity = '0';
    });
    
    if (catalogArrow) {
        catalogArrow.style.opacity = '0';
        catalogArrow.classList.remove('visible');
    }
    
    const thirdObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !thirdAnimationPlayed) {
                thirdAnimationPlayed = true;
                
                if (catalogTitle) {
                    catalogTitle.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                    catalogTitle.style.opacity = '1';
                    catalogTitle.style.transform = 'translateX(0)';
                }
                
                catalogItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 200 + (index * 200));
                });
                
                if (catalogArrow) {
                    setTimeout(() => {
                        catalogArrow.classList.add('visible');
                        catalogArrow.style.opacity = '1';
                    }, 1200);
                }
                
                thirdObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px'
    });
    
    if (thirdSlide) {
        thirdObserver.observe(thirdSlide);
    }
});

// Скрипт для анимации появления футера
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer-container');
    
    if (footer) {
        footer.classList.remove('visible');
        
        let footerAnimationPlayed = false;
        
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !footerAnimationPlayed) {
                    footerAnimationPlayed = true;
                    
                    footer.classList.add('visible');
                    
                    footerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px'
        });
        
        footerObserver.observe(footer);
    }
});
