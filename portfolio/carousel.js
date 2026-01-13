// Données des projets
const projectData = {
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
};

// Class pour gérer le carousel
class ProjectCarousel {
    constructor() {
        this.currentCategory = 'iut';
        this.currentIndex = 0;
        this.isAnimating = false;
        
        // Éléments du DOM
        this.wrapper = document.querySelector('.carousel-wrapper');
        this.prevButton = document.querySelector('.carousel-button.prev');
        this.nextButton = document.querySelector('.carousel-button.next');
        this.tabs = document.querySelectorAll('.proj-tab');
        
        if (!this.wrapper || !this.prevButton || !this.nextButton) {
            console.error('Éléments du carousel manquants');
            return;
        }

        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Gestion des onglets
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.tab;
                if (category === this.currentCategory) return;
                
                this.tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentCategory = category;
                this.currentIndex = 0;
                this.render();
            });
        });

        // Gestion des boutons de navigation
        this.prevButton.addEventListener('click', () => this.navigate('prev'));
        this.nextButton.addEventListener('click', () => this.navigate('next'));
    }

    navigate(direction) {
        if (this.isAnimating) return;
        
        const projects = projectData[this.currentCategory];
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
        const projects = projectData[this.currentCategory];
        if (!projects || projects.length === 0) return;

        const project = projects[this.currentIndex];
        this.wrapper.style.opacity = '0';
        
        setTimeout(() => {
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

            // Ajustements pour que l'image s'adapte à sa taille et éviter les sauts de layout
            const imgEl = this.wrapper.querySelector('.projet-icon');
            const adjustImageLayout = () => {
                if (!imgEl) return;
                // Rendre l'image responsive
                imgEl.style.maxWidth = '100%';
                imgEl.style.height = 'auto';
                imgEl.style.display = 'block';
                // S'assurer que le conteneur d'image s'adapte
                const imgParent = imgEl.closest('.project-image');
                if (imgParent) imgParent.style.height = 'auto';
                // Définir une min-height sur le wrapper pour réduire le saut lors de la transition
                const displayedHeight = imgEl.clientHeight || imgEl.naturalHeight || 0;
                if (displayedHeight > 0) {
                    this.wrapper.style.minHeight = displayedHeight + 'px';
                } else {
                    this.wrapper.style.minHeight = 'auto';
                }
            };

            if (imgEl) {
                if (imgEl.complete) {
                    // image déjà en cache
                    adjustImageLayout();
                } else {
                    imgEl.addEventListener('load', adjustImageLayout);
                    imgEl.addEventListener('error', () => {
                        // en cas d'erreur d'image, enlever le minHeight pour ne pas bloquer l'affichage
                        this.wrapper.style.minHeight = 'auto';
                    });
                }
            }

            this.wrapper.style.opacity = '1';
        }, 300);
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new ProjectCarousel();
});