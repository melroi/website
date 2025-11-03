// Données des projets
const projectData = {
    iut: [
        { 
            title: 'SAE15', 
            desc: 'SAE15 : Traitement des données environnementales et économiques', 
            img: 'assets/image/icon/icon_sae15.png', 
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
        }
    ],
    perso: [
        { 
            title: 'Impression 3D', 
            desc: 'Conception et réalisation de projets personnels en impression 3D', 
            img: 'assets/image/icon/impression_3d.jpg', 
            link: '#' 
        },
        { 
            title: 'Cuisine & Pâtisserie', 
            desc: 'Passion pour la cuisine et création de recettes originales', 
            img: 'assets/image/icon/cuisine.png', 
            link: '#' 
        },
        { 
            title: 'Site Web Personnel', 
            desc: 'Développement de mon portfolio en HTML/CSS/JS', 
            img: 'assets/image/icon/hamburger1000x1000.png', 
            link: '#' 
        },
        {
            title: 'Lecture',
            desc: 'Passionné de littérature, notamment 1984 et Berserk',
            img: 'assets/image/icon/1984.jpg',
            link: '#'
        }
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
            this.wrapper.style.opacity = '1';
        }, 300);
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new ProjectCarousel();
});