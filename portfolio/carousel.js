// Données des projets par année et type
const projectData = {
    2024: {
        iut: [
            { 
                title: 'SAE32', 
                desc: 'SAE32: Développer des applications communicantes', 
                img: 'assets/image/icon/icon_sae32.png', 
                link: 'assets/pdf/SAE32.pdf' 
            },
            { 
                title: 'SAE15', 
                desc: 'SAE15 : Traitement des données s', 
                img: 'assets/image/icon/icon_sae15.png', 
                link: 'assets/pdf/SAE15.pdf' 
            },
            { 
                title: 'SAE24', 
                desc: 'SAE24 : Proget intégratif creation d\'un reseau d\'entreprise', 
                img: 'assets/image/icon/icon_sae24.png', 
                link: 'assets/pdf/SAE15.pdf' 
            },
            { 
                title: "R2.04 : Téléphonie d'entreprise", 
                desc: "Configuration complète d'un réseau téléphonique IP d'entreprise", 
                img: 'assets/image/icon/icon_telephonie.png', 
                link: 'assets/pdf/TP_Telephonie.pdf' 
            },
            { 
                title: 'R2.03 : Services réseaux', 
                desc: 'Installation et configuration d\'un serveur FTP sous Linux', 
                img: 'assets/image/icon/ftp.jpg', 
                link: 'assets/pdf/TP_FTP.pdf' 
            },
        ],
        perso: [
            { 
                title: 'Création d\'un serveur personnel', 
                desc: 'Mise en place d\'un serveur personnel à domicile pour hébergement et stockage de fichiers.', 
                img: 'assets/image/icon/impression_3d.jpg', 
                link: '#' 
            },
            { 
                title: 'Création d\'une horloge connectée', 
                desc: 'Mise en place d\'un serveur personnel à domicile pour hébergement et stockage de fichiers.', 
                img: 'assets/image/icon/impression_3d.jpg', 
                link: '#' 
            },
        ]
    },
    2025: {
        iut: [
            { 
                title: 'SAE32', 
                desc: 'SAE32: Développer des applications communicantes', 
                img: 'assets/image/icon/icon_sae32.png', 
                link: 'assets/pdf/SAE32.pdf' 
            },
            { 
                title: 'SAE32', 
                desc: 'SAE32: Développer des applications communicantes', 
                img: 'assets/image/icon/icon_sae32.png', 
                link: 'assets/pdf/SAE32.pdf' 
            },
        
        ],
        perso: []
    },
    2026: {
        iut: [],
        perso: []
    }
};

// Class pour gérer le carousel
class ProjectCarousel {
    constructor(wrapper, prevButton, nextButton, year) {
        this.year = year;
        this.currentCategory = 'iut';
        this.currentIndex = 0;
        this.isAnimating = false;
        this.wrapper = wrapper;
        this.prevButton = prevButton;
        this.nextButton = nextButton;
        this.tabs = document.querySelectorAll('.proj-tab');
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Gestion des onglets (synchronisé sur tous les carrousels)
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.tab;
                if (category === this.currentCategory) return;
                this.currentCategory = category;
                this.currentIndex = 0;
                // Synchronise tous les carrousels
                window.allCarousels.forEach(carousel => {
                    carousel.currentCategory = category;
                    carousel.currentIndex = 0;
                    carousel.render();
                });
            });
        });
        // Gestion des boutons de navigation
        this.prevButton.addEventListener('click', () => this.navigate('prev'));
        this.nextButton.addEventListener('click', () => this.navigate('next'));
    }

    navigate(direction) {
        if (this.isAnimating) return;
        const projects = projectData[this.year][this.currentCategory];
        if (!projects || projects.length <= 1) return;
        this.isAnimating = true;
        if (direction === 'prev') {
            this.currentIndex = (this.currentIndex - 1 + projects.length) % projects.length;
        } else {
            this.currentIndex = (this.currentIndex + 1) % projects.length;
        }
        this.render();
        setTimeout(() => { this.isAnimating = false; }, 600);
    }

    render() {
        const projects = projectData[this.year][this.currentCategory];
        this.wrapper.style.opacity = '0';
        setTimeout(() => {
            if (!projects || projects.length === 0) {
                // Placeholder
                this.wrapper.innerHTML = `
                    <div class="project-content">
                        <div class="project-info">
                            <h2>Projet ${this.currentCategory === 'iut' ? 'IUT' : 'Perso'} ${this.year}</h2>
                            <p>À venir</p>
                            <button class="projet-button" disabled>À venir</button>
                        </div>
                        <div class="project-image">
                            <img src="/portfolio/assets/image/icon/placeholder.png" alt="Placeholder ${this.currentCategory} ${this.year}" class="projet-icon" />
                        </div>
                    </div>
                `;
            } else {
                const project = projects[this.currentIndex];
                this.wrapper.innerHTML = `
                    <div class="project-content">
                        <div class="project-info">
                            <h2>${project.title}</h2>
                            <p>${project.desc}</p>
                            <button class="projet-button" onclick="window.open('${project.link}', '_blank')">
                                Accéder au projet
                            </button>
                        </div>
                        <div class="project-image">
                            <img src="${project.img}" alt="${project.title}" class="projet-icon" />
                        </div>
                    </div>
                `;
            }
            // Ajustements pour que l'image s'adapte à sa taille et éviter les sauts de layout
            const imgEl = this.wrapper.querySelector('.projet-icon');
            const adjustImageLayout = () => {
                if (!imgEl) return;
                imgEl.style.maxWidth = '100%';
                imgEl.style.height = 'auto';
                imgEl.style.display = 'block';
                const imgParent = imgEl.closest('.project-image');
                if (imgParent) imgParent.style.height = 'auto';
                const displayedHeight = imgEl.clientHeight || imgEl.naturalHeight || 0;
                if (displayedHeight > 0) {
                    this.wrapper.style.minHeight = displayedHeight + 'px';
                } else {
                    this.wrapper.style.minHeight = 'auto';
                }
            };
            if (imgEl) {
                if (imgEl.complete) {
                    adjustImageLayout();
                } else {
                    imgEl.addEventListener('load', adjustImageLayout);
                    imgEl.addEventListener('error', () => {
                        this.wrapper.style.minHeight = 'auto';
                    });
                }
            }
            this.wrapper.style.opacity = '1';
        }, 300);
    }
}

// Initialisation de tous les carrousels au chargement de la page
window.allCarousels = [];
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.projects-year-block').forEach(block => {
        const year = block.getAttribute('data-year');
        const wrapper = block.querySelector('.carousel-wrapper');
        const prevButton = block.querySelector('.carousel-button.prev');
        const nextButton = block.querySelector('.carousel-button.next');
        if (wrapper && prevButton && nextButton && year) {
            window.allCarousels.push(new ProjectCarousel(wrapper, prevButton, nextButton, year));
        }
    });
});