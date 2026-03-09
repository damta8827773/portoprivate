// ==========================================================================
// 1. PENGATURAN AWAL & EVENT LISTENER UTAMA
// ==========================================================================

window.addEventListener('load', () => {
    
    // --- A. LOGIKA WELCOME SCREEN & MOUSE EFFECT ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    const heroVideo = document.getElementById('heroVideo');

    // Logika Auto Audio Berdasarkan Click
    if(heroVideo) {
        heroVideo.volume = 0.5; // Set volume 50%
        
        let isUserHasInteracted = false; 

        const enableSound = () => {
            heroVideo.muted = false;
            isUserHasInteracted = true;
            heroVideo.play().catch(e => console.log("Menunggu interaksi klik user..."));
            
            document.removeEventListener('click', enableSound);
            document.removeEventListener('touchstart', enableSound);
        };

        document.addEventListener('click', enableSound);
        document.addEventListener('touchstart', enableSound);

        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const triggerHeight = window.innerHeight * 0.5; 

            if (scrollPosition > triggerHeight) {
                if (!heroVideo.muted) {
                    heroVideo.muted = true;
                }
            } else {
                if (heroVideo.muted && isUserHasInteracted) {
                    heroVideo.muted = false;
                    heroVideo.play().catch(e => {}); 
                }
            }
        });
    }

    // Logika Animasi Layar Pembuka
    if(welcomeScreen) {
        setTimeout(() => {
            welcomeScreen.style.transition = 'opacity 1s ease';
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                if (mainContent) {
                    mainContent.style.display = 'block';
                    mainContent.style.opacity = '1';
                }
            }, 1000); 
        }, 4500); 
    }
    
    // Logika Efek Spotlight Mouse Hover
    const cards = document.querySelectorAll('.profil-card, .tech-item, .project-card, .cert-card, .vm-card, .timeline-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // --- B. LOGIKA ANIMASI SCROLL (DIPERBAIKI) ---
    // Hanya observasi elemen utama di luar popup
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 }); 

    const hiddenElements = document.querySelectorAll(
        '.hero, .profil-card, .skill-section, .project-card, .cert-card, .visi-misi-container, .vm-card, section h2, #comments, #dashboard'
    );
    hiddenElements.forEach((el) => observer.observe(el));

    // --- C. LOGIKA FIREBASE ---
    initFirebaseApps();
});


// ==========================================================================
// 2. FUNGSI FIREBASE (DATABASE & AUTHENTICATION)
// ==========================================================================
function initFirebaseApps() {
    const firebaseConfig = {
        apiKey: "AIzaSyC80W6y97OPM8m6VeiKs_0vt7oCd5HsTi8",
        authDomain: "projectdamta.firebaseapp.com",
        projectId: "projectdamta",
        storageBucket: "projectdamta.firebasestorage.app",
        messagingSenderId: "118530088464",
        appId: "1:118530088464:web:f193173dcc75d7557b7495"
    };

    if (typeof firebase !== 'undefined' && !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    if (typeof firebase === 'undefined') {
        console.error("Firebase script tidak terdeteksi di HTML!");
        return;
    }

    const auth = firebase.auth();
    const db = firebase.firestore();
    const provider = new firebase.auth.GoogleAuthProvider();

    // Komentar Ruang Obrolan
    const authSection = document.getElementById('auth-section');
    const commentForm = document.getElementById('comment-form');
    const listContainer = document.getElementById('comments-display-list');
    const btnLogin = document.getElementById('btn-login-google');
    const btnLogout = document.getElementById('btn-logout');

    if(btnLogin) {
        btnLogin.onclick = () => {
            auth.signInWithPopup(provider).catch((error) => {
                console.error("Error login:", error);
                alert("Gagal login: " + error.message);
            });
        };
    }

    if(btnLogout) {
        btnLogout.onclick = () => auth.signOut();
    }

    auth.onAuthStateChanged((user) => {
        if (user) {
            if(authSection) authSection.style.display = 'none';
            if(commentForm) commentForm.style.display = 'flex';
            if(document.getElementById('user-photo')) document.getElementById('user-photo').src = user.photoURL;
            if(document.getElementById('user-name-display')) document.getElementById('user-name-display').innerText = user.displayName;
        } else {
            if(authSection) authSection.style.display = 'block';
            if(commentForm) commentForm.style.display = 'none';
        }
    });

    if(commentForm) {
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const text = document.getElementById('comment-input').value;
            const ratingInput = document.querySelector('input[name="stars"]:checked');
            const rating = ratingInput ? ratingInput.value : 0;
            const user = auth.currentUser;

            if (!text || rating == 0) return alert("Isi pesan dan pilih bintang rating terlebih dahulu!");

            try {
                await db.collection("comments").add({
                    name: user.displayName,
                    photo: user.photoURL,
                    email: user.email,
                    comment: text,
                    rating: parseInt(rating),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                document.getElementById('comment-input').value = "";
                
                const radios = document.querySelectorAll('input[name="stars"]');
                radios.forEach(radio => radio.checked = false);

                alert("Pesan/ulasan berhasil terkirim!");
            } catch (error) { 
                alert("Gagal mengirim: " + error.message); 
            }
        });
    }

    if(listContainer) {
        db.collection("comments").orderBy("timestamp", "asc").onSnapshot((snapshot) => {
            listContainer.innerHTML = "";
            if (snapshot.empty) {
                listContainer.innerHTML = "<p style='text-align:center; color:var(--text-muted);'>Belum ada percakapan. Jadilah yang pertama!</p>";
                return;
            }
            snapshot.forEach((doc) => {
                const d = doc.data();
                const stars = "⭐".repeat(d.rating);
                
                const isOwner = d.email === "damtafaiz@gmail.com";
                const alignClass = isOwner ? "align-right" : "align-left";
                const bubbleClass = isOwner ? "owner" : "";
                const badgeHTML = isOwner ? `<span class="owner-badge">Owner</span>` : "";

                listContainer.innerHTML += `
                    <div class="chat-item-wrapper ${alignClass}">
                        <div class="chat-item ${alignClass}">
                            <img src="${d.photo}" class="chat-avatar" onerror="this.src='https://ui-avatars.com/api/?name=User&background=random'">
                            <div class="chat-content">
                                <div class="chat-header">
                                    <span class="chat-name">${d.name} ${badgeHTML}</span>
                                    <span class="chat-stars">${stars}</span>
                                </div>
                                <div class="chat-bubble ${bubbleClass}">
                                    ${d.comment}
                                </div>
                            </div>
                        </div>
                    </div>`;
            });
            listContainer.scrollTop = listContainer.scrollHeight;
        });
    }

    // Dasbor Firebase
    const visitorDisplay = document.getElementById('visitor-count');
    if(visitorDisplay) {
        (async () => {
            try {
                const visitorRef = db.collection("statistics").doc("visitors");
                const docSnap = await visitorRef.get();
                let targetCount = 0;

                if (!docSnap.exists) {
                    await visitorRef.set({ count: 1 });
                    targetCount = 1;
                    sessionStorage.setItem("hasVisited", "true");
                } else {
                    const hasVisited = sessionStorage.getItem("hasVisited");
                    if (!hasVisited) {
                        await visitorRef.update({ count: firebase.firestore.FieldValue.increment(1) });
                        sessionStorage.setItem("hasVisited", "true");
                        targetCount = docSnap.data().count + 1;
                    } else {
                        targetCount = docSnap.data().count;
                    }
                }
                
                animateValue(visitorDisplay, 0, targetCount, 2000, true);

            } catch (error) {
                console.error("Error Firebase Visitor:", error);
                visitorDisplay.innerText = "00000"; 
            }
        })();
    }

    // API GitHub
    fetch('https://api.github.com/users/damta8827773')
        .then(response => response.json())
        .then(data => {
            const repoDisplay = document.getElementById('repo-count');
            const followerDisplay = document.getElementById('follower-count');
            
            const repos = data.public_repos || 0;
            const followers = data.followers || 0;

            if(repoDisplay) animateValue(repoDisplay, 0, repos, 2000, false);
            if(followerDisplay) animateValue(followerDisplay, 0, followers, 2000, false);
        })
        .catch(error => {
            console.error("Gagal memuat GitHub:", error);
            if(document.getElementById('repo-count')) document.getElementById('repo-count').innerText = "-";
            if(document.getElementById('follower-count')) document.getElementById('follower-count').innerText = "-";
        });
        
    const ghChart = document.getElementById('gh-chart-img');
    if(ghChart) {
        ghChart.src = `https://ghchart.rshah.org/00f3ff/damta8827773?v=${new Date().getTime()}`;
    }
}

// Fungsi Bantuan Animasi Angka Dasbor
function animateValue(element, start, end, duration, isPadded) {
    if(!element) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let currentVal = Math.floor(progress * (end - start) + start);

        if (isPadded) {
            element.innerText = String(currentVal).padStart(5, '0');
        } else {
            element.innerText = currentVal;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}


// ==========================================================================
// 3. FUNGSI KLIK UI GLOBAL (MENU, TIMELINE, DLL)
// ==========================================================================

// PENTING: Logika ini diperbaiki agar isi timeline langsung terlihat
window.toggleHistory = function() {
    const historyPopup = document.getElementById('historyPopup');
    if(historyPopup) {
        historyPopup.classList.toggle('active');
        
        // Memaksa elemen di dalam popup langsung di-render opacity-nya menjadi 1
        if (historyPopup.classList.contains('active')) {
            const items = historyPopup.querySelectorAll('.timeline-card, .history-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.style.filter = 'blur(0)';
                }, index * 100); // Animasi masuk berurutan
            });
        }
    }
}

window.toggleTimelineCard = function(element) {
    const details = element.querySelector('.timeline-details');
    const openText = element.querySelector('.open-text');
    const closeText = element.querySelector('.close-text');
    const icon = element.querySelector('.ri-arrow-down-s-line');

    element.classList.toggle('active');

    if (element.classList.contains('active')) {
        details.style.maxHeight = details.scrollHeight + "px";
        openText.style.display = "none";
        closeText.style.display = "inline";
        icon.classList.add('rotate');
    } else {
        details.style.maxHeight = "0px";
        openText.style.display = "inline";
        closeText.style.display = "none";
        icon.classList.remove('rotate');
    }
}

window.toggleMenu = function() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    if(navMenu) navMenu.classList.toggle('active');
    if(hamburger) hamburger.classList.toggle('active');
}

window.closeMenu = function() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    if(navMenu) navMenu.classList.remove('active');
    if(hamburger) hamburger.classList.remove('active');
}

let isLightMode = false;
window.toggleTheme = function() {
    document.body.classList.toggle('light-mode');
    const icon = document.getElementById('theme-icon');
    isLightMode = !isLightMode;
    if(isLightMode) {
        if(icon) icon.classList.replace('ri-sun-line', 'ri-moon-line');
    } else {
        if(icon) icon.classList.replace('ri-moon-line', 'ri-sun-line');
    }
}

let currentLang = 'id';
window.toggleLanguage = function() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    const langText = document.getElementById('lang-text');
    if(langText) langText.innerText = currentLang.toUpperCase();
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.innerHTML = translations[currentLang][key];
        }
    });
}

// Translations Object
const translations = {
    id: {
        nav_home: "Beranda", 
        nav_profil: "Profil", 
        nav_skill: "Kemampuan", 
        nav_project: "Proyek",
        nav_cert: "Pencapaian", 
        about_us: "Tentang Saya", 
        nav_contact: "Kontak",
        hero_title: "HAI, SAYA <br> <span class='hero-name-text'>DAMTA NOVIYAN MUHAMAD FAIZ</span>",
        hero_subtitle: "Pengembang Frontend & Backend | Mahasiswa Sistem Informasi | Ketertarikan Tinggi di Bidang Teknologi",
        profil_title: "Profil", 
        label_user: "Nama:", 
        label_loc: "Lokasi:", 
        label_guild: "Kampus:", 
        label_role: "Posisi:",
        skill_title: "Alat & Kemampuan", 
        project_title: "Proyek Unggulan",
        desc_p1: "Website interaktif yang dibangun menggunakan HTML, CSS, dan JavaScript murni (Vanilla JS) tanpa framework, menonjolkan desain UI/UX yang romantis dan personal.",
        desc_p2: "Website portofolio profesional bergaya modern dengan efek visual Glassmorphism dan animasi Neon 6D. Dikembangkan secara dinamis dan responsif menggunakan framework React.js.",
        desc_p3: "Sistem absensi berbasis web terintegrasi yang memanfaatkan PHP dan MySQL untuk verifikasi kehadiran karyawan secara real-time. Dilengkapi fitur unggah foto bukti fisik.",
        desc_p4: "Sistem toko online berbasis database yang mengintegrasikan logika PHP Native untuk menampilkan produk secara dinamis. Menggunakan CSS modern untuk efek visual Glassmorphism.",
        desc_p5: "Web App Roadmap menggunakan PHP, HTML5, dan CSS3 Neon Style. Backend menggunakan MySQL dengan fitur keamanan Login Google (OAuth 2.0).",
        desc_p6: "Sistem pemesanan web interaktif dengan menggunakan PHP Native dan MySQL. Dilengkapi fitur kustomisasi desain, manajemen database pesanan, integrasi invoice WhatsApp.",
        btn_view: "Lihat Website",
        cert_title: "Pencapaian", 
        cert_1: "Belajar Public Speaking", 
        desc_c1: "Menyelesaikan Program yang Berfokus gimana caranya Public Speaking.",
        cert_2: "Belajar Dasar AI", 
        desc_c2: "Menyelesaikan gimana cara menggunakan AI yang Efektif.",
        cert_3: "CISCO Packet Tracer", 
        desc_c3: "Pemahaman mendalam tentang pembuatan Proyek Mandiri (Karya Tulis Ilmiah).",
        cert_4: "Microsoft APPS", 
        desc_c4: "Mempelajari Aplikasi Perkantoran (Spereadsheet, Document, Presentation).",
        cert_5: "Ekstra Skill", 
        desc_c5: "Mempelajari tentang gimana cara menyelesaikan Sistem Pendingin Udara (Air Conditioner/AC).",
        cert_6: "REDHAT", 
        desc_c6: "Mempelajari Tentang Dasar-dasar Red Hat System Administration.",
        about_title_main: "Tentang",
        visi_title: "Visi",
        visi_desc: "Menjadi seseorang yang haus akan pengetahun teknologi, terus membuat inovasi baru dan mengimplementasikan di dunia nyata apa yang ada di dalam ide dan pikiran.",
        misi_title: "Misi",
        misi_desc: "Membangun keterampilan komunikasi terhadap tim yang efektif dan kolaboratif.",
        bio_heading: "Tentang",
        about_bio_1: "Pengenalan singkat mengenai siapa saya.",
        about_bio_2: "Saya Damta Noviyan Muhamad Faiz, seorang Full Stack Developer yang berbasis di Jakarta, berdedikasi untuk membangun solusi digital yang berdampak dan memanjakan mata. Saya spesialis dalam pengembangan platform web dinamis menggunakan tech stack modern, termasuk React.js, JavaScript, PHP, serta manajemen basis data relasional.",
        about_bio_3: "Fokus utama saya adalah merancang arsitektur sistem yang tidak hanya memiliki antarmuka (UI/UX) yang interaktif, tetapi juga terstruktur dengan baik di sisi backend, mudah dipelihara, dan skalabel untuk memenuhi kebutuhan bisnis. Saya percaya bahwa kode berkualitas tinggi harus berjalan beriringan dengan efisiensi sistem dan pengalaman pengguna yang mulus.",
        about_bio_4: "Sebagai seseorang yang memiliki ketertarikan tinggi di bidang inovasi teknologi, saya memadukan keahlian teknis dengan pemikiran kritis, komunikasi proaktif, and kolaborasi tim yang efektif. Saya terus berkembang untuk memastikan setiap proyek memberikan hasil optimal dan dampak nyata.",
        about_bio_5: "Salam hangat,",
        career_title: "Karier & Pendidikan",
        tl_title_1: "Full Stack Developer",
        tl_comp_1: "PT. Biro Klasifikasi Indonesia (Persero)",
        tl_date_1: "2026 - Sekarang • Jakarta, Indonesia",
        show_detail: "Tampilkan detail",
        hide_detail: "Sembunyikan detail",
        tl_desc_1: "Menjadi pengembang profesional di BKI dan berkontribusi pada proyek nasional. Bertanggung jawab dalam merancang arsitektur perangkat lunak yang fungsional dan efisien.",
        tl_title_2: "Mahasiswa Sistem Informasi",
        tl_comp_2: "UIN Syarif Hidayatullah Jakarta",
        tl_date_2: "2025 - Sekarang • Ciputat, Indonesia",
        tl_desc_2: "Lulus dari SMK Yappenda dan melanjutkan pendidikan tinggi di UIN Jakarta. Titik awal saya mendalami dunia Web Developer secara komprehensif.",
        tl_title_3: "Teknik Komputer Jaringan (TKJ)",
        tl_comp_3: "SMK Yappenda Jakarta",
        tl_date_3: "2022 - 2025 • Jakarta, Indonesia",
        tl_desc_3: "Fokus mendalami ilmu Teknik Komputer Jaringan. Aktif di ekstrakurikuler dan Ekskill untuk penajaman skill. Menguasai CISCO dan mempraktekannya dalam PKL.",
        history_title: "Perjalanan Berdasarkan Tahun",
        hist_2022: "Awal mula perjalanan di dunia teknologi dan dasar pemrograman Kelas X. Awalnya coba VSCode, sempat berhenti karena susah, tapi tetap penasaran.",
        hist_2023: "Mulai bisa menggunakan CISCO dibanding awal masuk kelas XI dan mulai PKL (Praktek Kerja Lapangan).",
        hist_2024: "Kelas XII, fokus mendalami TKJ, aktif di Ekskul dan Ekskill untuk penajaman skill.",
        hist_2025: "Lulus SMK Yappenda, masuk UIN Jakarta. Titik awal mendalami Web Developer.",
        hist_2026: "Menjadi pengembang profesional di BKI dan berkontribusi pada proyek nasional.",
        comment_title: "Ruang Obrolan",
        footer: "Hak Cipta Dilindungi.",
        dashboard_title: "Dasbor Statistik",
        visitor_title: "Total Pengunjung",
        visitor_desc: "Orang telah melihat portofolio ini",
        repo_title: "Total Repositori",
        follower_title: "Pengikut",
        contrib_title: "Aktivitas Kontribusi Terakhir",
        country_title: "Demografi Negara",
        country_desc: "Asal negara pengunjung website"
    },
    en: {
        nav_home: "Home", 
        nav_profil: "Profile", 
        nav_skill: "Skills", 
        nav_project: "Projects",
        nav_cert: "Achievements", 
        about_us: "About Me", 
        nav_contact: "Contact",
        hero_title: "HI, I AM <br> <span class='hero-name-text'>DAMTA NOVIYAN MUHAMAD FAIZ</span>",
        hero_subtitle: "Frontend & Backend Developer | Information Systems Student | Tech Enthusiast",
        profil_title: "Profile", 
        label_user: "Name:", 
        label_loc: "Location:", 
        label_guild: "Campus:", 
        label_role: "Role:",
        skill_title: "Tools & Skills", 
        project_title: "Featured Projects",
        desc_p1: "An interactive website built using HTML, CSS, and pure JavaScript (Vanilla JS) without frameworks, highlighting a romantic and personal UI/UX design.",
        desc_p2: "A modern professional portfolio website with Glassmorphism visual effects and 6D Neon animation. Dynamically and responsively developed using React.js.",
        desc_p3: "An integrated web-based attendance system utilizing PHP and MySQL for real-time employee attendance verification. Equipped with physical proof photo upload features.",
        desc_p4: "A database-based online store system integrating PHP Native logic to display products dynamically. Uses modern CSS for Glassmorphism visual effects.",
        desc_p5: "Roadmap Web App using PHP, HTML5, and CSS3 Neon Style. Backend uses MySQL with Google Login security features (OAuth 2.0).",
        desc_p6: "Interactive web ordering system using PHP Native and MySQL. Equipped with design customization, order database management, and automatic WhatsApp invoice integration.",
        btn_view: "View Website",
        cert_title: "Achievements", 
        cert_1: "Learning Public Speaking", 
        desc_c1: "Completed a program focused on Public Speaking techniques.",
        cert_2: "Learning Basic AI", 
        desc_c2: "Completed how to use AI effectively.",
        cert_3: "CISCO Packet Tracer", 
        desc_c3: "In-depth understanding of making Independent Projects (Scientific Writing).",
        cert_4: "Microsoft APPS", 
        desc_c4: "Studying Office Applications (Spreadsheet, Document, Presentation).",
        cert_5: "Extra Skill", 
        desc_c5: "Learning how to solve Air Conditioning (AC) system problems.",
        cert_6: "REDHAT", 
        desc_c6: "Learning about Red Hat System Administration Basics.",
        about_title_main: "About",
        visi_title: "Vision",
        visi_desc: "To be someone hungry for technological knowledge, constantly making new innovations and implementing what is in my mind and ideas into the real world.",
        misi_title: "Mission",
        misi_desc: "Build effective and collaborative team communication skills.",
        bio_heading: "About",
        about_bio_1: "A brief introduction about who I am.",
        about_bio_2: "I am Damta Noviyan Muhamad Faiz, a Full Stack Developer based in Jakarta, dedicated to building impactful and eye-catching digital solutions. I specialize in developing dynamic web platforms using modern tech stacks, including React.js, JavaScript, PHP, and relational database management.",
        about_bio_3: "My main focus is designing system architectures that not only have interactive user interfaces (UI/UX) but are also well-structured on the backend, easily maintainable, and scalable to meet business needs. I believe that high-quality code must go hand in hand with system efficiency and seamless user experience.",
        about_bio_4: "As someone with a high interest in technological innovation, I combine technical expertise with critical thinking, proactive communication, and effective team collaboration. I am constantly growing to ensure every project delivers optimal results and real impact.",
        about_bio_5: "Warm regards,",
        career_title: "Career & Education",
        tl_title_1: "Full Stack Developer",
        tl_comp_1: "PT. Biro Klasifikasi Indonesia (Persero)",
        tl_date_1: "2026 - Present • Jakarta, Indonesia",
        show_detail: "Show details",
        hide_detail: "Hide details",
        tl_desc_1: "Became a professional developer at BKI and contributed to national projects. Responsible for designing functional and efficient software architecture.",
        tl_title_2: "Information Systems Student",
        tl_comp_2: "UIN Syarif Hidayatullah Jakarta",
        tl_date_2: "2025 - Present • Ciputat, Indonesia",
        tl_desc_2: "Graduated from SMK Yappenda and continued higher education at UIN Jakarta. The starting point for me to delve into the world of Web Developers comprehensively.",
        tl_title_3: "Computer and Network Engineering (TKJ)",
        tl_comp_3: "SMK Yappenda Jakarta",
        tl_date_3: "2022 - 2025 • Jakarta, Indonesia",
        tl_desc_3: "Focusing on Computer and Network Engineering. Active in extracurriculars for skill sharpening. Mastered CISCO and put it into practice during internship.",
        history_title: "Journey By Year",
        hist_2022: "The beginning of the journey in technology and basic programming in 10th grade. Tried VSCode, stopped because it was hard, but remained curious.",
        hist_2023: "Started being able to use CISCO compared to early 11th grade and started internship.",
        hist_2024: "12th grade, focusing on TKJ, active in extracurriculars for skill sharpening.",
        hist_2025: "Graduated from SMK Yappenda, entered UIN Jakarta. The starting point of Web Development.",
        hist_2026: "Became a professional developer at BKI and contributed to national projects.",
        comment_title: "Chat Room",
        footer: "All Rights Reserved.",
        dashboard_title: "Statistics Dashboard",
        visitor_title: "Total Visitors",
        visitor_desc: "People have viewed this portfolio",
        repo_title: "Total Repositories",
        follower_title: "Followers",
        contrib_title: "Recent Contribution Activity",
        country_title: "Country Demographics",
        country_desc: "Visitor's country of origin"
    }
};