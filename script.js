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



















    const SHEET_NAME = "Sheet1"; // Sesuaikan jika nama sheet Anda berbeda
const NAMA_TAMU_COL = 1;     // Kolom A
const NOMOR_HP_COL = 2;      // Kolom B (untuk WhatsApp, berisi nomor HP)
const LINK_UNDANGAN_COL = 3; // Kolom C

// --- Fungsi untuk Kirim Undangan WhatsApp ---
function kirimUndanganWhatsApp() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const ui = SpreadsheetApp.getUi();

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const namaTamu = row[NAMA_TAMU_COL - 1];
        const nomorHp = row[NOMOR_HP_COL - 1];
        const linkUndangan = row[LINK_UNDANGAN_COL - 1];

        if (nomorHp && linkUndangan) {
            // --- BAGIAN INI YANG DIUBAH UNTUK PESAN WHATSAPP ---
            const message = `
Kepada Yth.
*${namaTamu}*

Assalamualaikum Warahmatullahi Wabarakaatuh.

Dengan memohon rahmat dan ridho Allah SWT, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

*Hannah & Aji*

Informasi lengkap mengenai acara dapat dilihat melalui link di bawah ini:
${linkUndangan}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Atas perhatian dan doa restunya, kami ucapkan terima kasih.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.
`;
            // --- AKHIR BAGIAN PERUBAHAN WHATSAPP ---

            const whatsappUrl = `https://wa.me/${nomorHp}?text=${encodeURIComponent(message)}`;

            ui.alert(`Kirim ke ${namaTamu}`, `Klik OK untuk membuka WhatsApp Web untuk ${namaTamu}.`, ui.ButtonSet.OK);
            SpreadsheetApp.getUi().showModelessDialog(HtmlService.createHtmlOutput(`<script>window.open("${whatsappUrl}", "_blank");</script>`), 'Membuka WhatsApp...');
            
            Utilities.sleep(1000); // Jeda 1 detik
        }
    }
    ui.alert('Proses Selesai', 'Selesai mengirim pesan WhatsApp untuk semua tamu (atau membuka tab untuk setiap tamu).', ui.ButtonSet.OK);
}

// --- Fungsi untuk Buat Draf Email Undangan ---
function buatDrafEmailUndangan() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const ui = SpreadsheetApp.getUi();

    let count = 0;
    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const namaTamu = row[NAMA_TAMU_COL - 1];
        const linkUndangan = row[LINK_UNDANGAN_COL - 1];
        const emailTamu = row[NOMOR_HP_COL - 1]; // Asumsi kolom B berisi email jika pakai email

        if (emailTamu && linkUndangan) {
            const subject = `Undangan Pernikahan: Hannah & Aji`;
            // --- BAGIAN INI YANG DIUBAH UNTUK BODY EMAIL ---
            const body = `
Yth. ${namaTamu},

Assalamualaikum Warahmatullahi Wabarakaatuh.

Dengan memohon rahmat dan ridho Allah SWT, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

Hannah & Aji

Informasi lengkap mengenai acara dapat dilihat melalui link di bawah ini:
${linkUndangan}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Atas perhatian dan doa restunya, kami ucapkan terima kasih.

Wassalamu'alaikum Warahmatullahi Wabarakaatuh.

Salam hormat,
Hannah & Aji
`;
            // --- AKHIR BAGIAN PERUBAHAN EMAIL ---

            GmailApp.createDraft(emailTamu, subject, body);
            count++;
        }
    }
    ui.alert('Proses Selesai', `${count} draf email telah dibuat di akun Gmail Anda.`, ui.ButtonSet.OK);
}

// ... (lanjutan kode doPost jika ada) ...





    // Buat instance Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Amati setiap elemen yang memiliki class .animate-on-scroll
    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // --- Tambahan: Animasi Panah Scroll-Hint ---
    // Sembunyikan panah scroll-hint setelah user mulai scroll
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        let isScrolling;
        window.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                if (window.scrollY > 50) { // Jika sudah scroll lebih dari 50px
                    scrollHint.style.opacity = '0';
                    scrollHint.style.pointerEvents = 'none'; // Agar tidak bisa diklik jika ada
                } else {
                    scrollHint.style.opacity = '1';
                    scrollHint.style.pointerEvents = 'auto';
                }
            }, 66); // Berikan sedikit debounce
        }, false);
    }

});







