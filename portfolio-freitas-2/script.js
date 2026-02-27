// Fonctions pour le menu latéral
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


// Détection mobile (spécifique à la page portfolio)
// Ajoute la classe `mobile` sur le <body> si un appareil tactile / mobile est détecté.
document.addEventListener('DOMContentLoaded', function () {
    function isMobileDevice() {
        // User-agent + coarse pointer match : robuste pour la plupart des téléphones et tablettes
        var ua = navigator.userAgent || '';
        var uaMobile = /Mobi|Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua);
        var coarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
        return uaMobile || coarsePointer;
    }

    if (isMobileDevice()) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
});



