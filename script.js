// Memastikan DOM sudah sepenuhnya dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {



// Countdown Timer
const countdownElement = document.getElementById('countdown');
const weddingDate = new Date('Januari 22, 2027 09:00:00').getTime(); // Ganti dengan tanggal dan waktu pernikahan Anda

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "Kami Telah Menikah!";
    } else {
        countdownElement.innerHTML = `
            <div>${days}<span>Hari</span></div>
            <div>${hours}<span>Jam</span></div>
            <div>${minutes}<span>Menit</span></div>
            <div>${seconds}<span>Detik</span></div>
        `;
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Call immediately to avoid delay




// Kontrol Musik Latar
const backgroundMusic = document.getElementById('background-music');
const playMusicBtn = document.getElementById('play-music-btn');
const musicIcon = document.getElementById('music-icon');

let isPlaying = false; // Status musik

playMusicBtn.addEventListener('click', function() {
    if (isPlaying) {
        backgroundMusic.pause();
        musicIcon.textContent = '🔇'; // Ganti ikon menjadi muted
        playMusicBtn.innerHTML = '<span id="music-icon">🔇</span> Putar Musik';
        isPlaying = false;
    } else {
        backgroundMusic.play().then(() => {
            musicIcon.textContent = '🔊'; // Ganti ikon menjadi volume
            playMusicBtn.innerHTML = '<span id="music-icon">🔊</span> Hentikan Musik';
            isPlaying = true;
        }).catch(error => {
            console.error("Gagal memutar musik:", error);
            alert("Musik tidak dapat diputar. Pastikan interaksi pengguna telah dilakukan.");
        });
    }
});





    // --- Animasi Elemen yang Muncul Saat Load (Hero Section) ---
    const onLoadElements = document.querySelectorAll('.animate-on-load');
    onLoadElements.forEach((el, index) => {
        // Berikan delay kecil untuk efek stagger saat load
        // Anda bisa sesuaikan delay-nya
        setTimeout(() => {
            el.classList.add('show');
        }, 100 * index); // 100ms delay antar elemen
    });

    // --- Animasi Elemen Saat Scroll (Intersection Observer) ---
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    // Opsi untuk Intersection Observer
    const observerOptions = {
        root: null, // Mengamati viewport
        rootMargin: '0px', // Margin di sekitar root
        threshold: 0.2 // Elemen terlihat 20% sebelum class ditambahkan
    };

    // Callback function yang akan dijalankan ketika elemen intersect
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Jika elemen masuk viewport
                entry.target.classList.add('is-visible');
                // Berhenti mengamati elemen ini setelah terlihat
                observer.unobserve(entry.target);
            }
        });
    };



function getGuestNameFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    let name = urlParams.get('to');
    if (name) {
        name = decodeURIComponent(name.replace(/\+/g, ' '));
    }
    return name;
}

function displayGuestName() {
    const guestName = getGuestNameFromUrl();
    const guestNameElement = document.getElementById('guest-name-display');
    if (guestNameElement && guestName) {
        guestNameElement.textContent = `${guestName}`;
        guestNameElement.style.display = 'block';
    } else if (guestNameElement) {
        guestNameElement.style.display = 'none';
    }
}
















