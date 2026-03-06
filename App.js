/* ==========================================================================
   APP.JS - CORE LOGIC
   AUTHOR: Damta Noviyan Muhamad Faiz
   ========================================================================== */

const translations = {
    id: {
        nav_home: "Beranda", 
        nav_profil: "Profil", 
        nav_skill: "Kemampuan", 
        nav_project: "Proyek",
        nav_cert: "Pencapaian", 
        about_us: "Tentang Saya", 
        nav_contact: "Kontak",
        hero_title: "HAI, SAYA <br> <span class='hero-name-text'>DAMTA NOVIYAN MUHAMAD FAIZ.</span>",
        hero_subtitle: "Pengembang Frontend & Backend | Mahasiswa Sistem Informasi | Ketertarikan Tinggi di Bidang Teknologi",
        profil_title: "PROFIL", 
        label_user: "Nama:", 
        label_loc: "Lokasi:", 
        label_guild: "Kampus:", 
        label_role: "Posisi:",
        profil_singkat: "Profil Singkat Saya Selengkapnya di Tentang.", 
        skill_title: "Alat & Kemampuan", 
        project_title: "Proyek Unggulan",
        desc_p1: "Website interaktif yang dibangun menggunakan HTML, CSS, dan JavaScript murni (Vanilla JS) tanpa framework, menonjolkan desain UI/UX yang romantis dan personal.",
        desc_p2: "Website portofolio profesional bergaya modern dengan efek Glassmorphism dan animasi Neon 6D. Dikembangkan secara dinamis dan responsif menggunakan framework React.js, HTML5, and CSS3.",
        desc_p3: "Sistem absensi berbasis web terintegrasi yang memanfaatkan PHP dan MySQL untuk verifikasi kehadiran karyawan secara real-time. Dilengkapi fitur unggah foto bukti fisik dan laporan otomatis dalam format Excel.",
        desc_p4: "Sistem toko online berbasis database yang mengintegrasikan logika PHP Native untuk menampilkan produk secara dinamis. Menggunakan CSS modern untuk efek visual Glassmorphism dan tata letak responsif yang rapi di perangkat mobile.",
        desc_p5: "Web App Roadmap menggunakan PHP, HTML5, and CSS3 Neon Style. Backend menggunakan MySQL dengan fitur keamanan Login Google (OAuth 2.0).",
        desc_p6: "Sistem pemesanan web interaktif dengan menggunakan PHP Native dan MySQL. Dilengkapi fitur kustomisasi desain (Tema/Font), manajemen database pesanan, serta integrasi invoice otomatis ke WhatsApp.",
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
        about_title_main: "Visi & Misi",
        bio_heading: "Tentang",
        about_bio_1: "Pengenalan singkat mengenai siapa saya.",
        about_bio_2: "Saya Damta Noviyan Muhamad Faiz, seorang Full Stack Developer yang berbasis di Jakarta, berdedikasi untuk membangun solusi digital yang berdampak dan memanjakan mata. Saya spesialis dalam pengembangan platform web dinamis menggunakan tech stack modern, termasuk React.js, JavaScript, PHP, serta manajemen basis data relasional.",
        about_bio_3: "Fokus utama saya adalah merancang arsitektur sistem yang tidak hanya memiliki antarmuka (UI/UX) yang interaktif, tetapi juga terstruktur dengan baik di sisi backend, mudah dipelihara, dan skalabel untuk memenuhi kebutuhan bisnis. Saya percaya bahwa kode berkualitas tinggi harus berjalan beriringan dengan efisiensi sistem dan pengalaman pengguna yang mulus.",
        about_bio_4: "Sebagai seseorang yang memiliki ketertarikan tinggi di bidang inovasi teknologi, saya memadukan keahlian teknis dengan pemikiran kritis, komunikasi proaktif, and kolaborasi tim yang efektif. Saya terus berkembang untuk memastikan setiap proyek memberikan hasil optimal dan dampak nyata.",
        about_bio_5: "Salam hangat,",
        visi_title: "Visi",
        visi_desc: "Menjadi seseorang yang haus akan pengetahun teknologi, terus membuat inovasi baru dan mengimplementasikan di dunia nyata apa yang ada di dalam ide dan pikiran.",
        misi_title: "Misi",
        misi_desc: "Membangun keterampilan komunikasi terhadap tim yang efektif dan kolaboratif.",
        career_title: "Karier & Pendidikan",
        tl_title_1: "Full Stack Developer",
        tl_comp_1: "PT. Biro Klasifikasi Indonesia (Persero)",
        tl_date_1: "2026 - Sekarang • Jakarta, Indonesia",
        tl_desc_1: "Menjadi pengembang profesional di BKI dan berkontribusi pada proyek nasional. Bertanggung jawab dalam merancang arsitektur perangkat lunak yang fungsional dan efisien.",
        tl_title_2: "Mahasiswa Sistem Informasi",
        tl_comp_2: "UIN Syarif Hidayatullah Jakarta",
        tl_date_2: "2025 - Sekarang • Ciputat, Indonesia",
        tl_desc_2: "Lulus dari SMK Yappenda dan melanjutkan pendidikan tinggi di UIN Jakarta. Titik awal saya mendalami dunia Web Developer secara komprehensif.",
        tl_title_3: "Teknik Komputer Jaringan (TKJ)",
        tl_comp_3: "SMK Yappenda Jakarta",
        tl_date_3: "2022 - 2025 • Jakarta, Indonesia",
        tl_desc_3: "Fokus mendalami ilmu Teknik Komputer Jaringan. Aktif di ekstrakurikuler dan Ekskill untuk penajaman skill. Menguasai CISCO dan mempraktekannya dalam PKL.",
        show_detail: "Tampilkan detail",
        hide_detail: "Sembunyikan detail",
        history_title: "Perjalanan Berdasarkan Tahun",
        hist_2022: "Started the journey in the technology world and basic programming. Tried VSCode, stopped briefly because it was hard, but remained curious.",
        hist_2023: "Started using CISCO compared to early 11th grade and began Internship (PKL).",
        hist_2024: "12th grade, focused on deepening networking skills.",
        hist_2025: "Graduated SMK Yappenda, entered UIN Jakarta. The starting point for Web Development.",
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
        country_desc: "Website visitors by country origin"
    },
    en: {
        nav_home: "Home", 
        nav_profil: "Profile", 
        nav_skill: "Skills", 
        nav_project: "Projects", 
        nav_cert: "Achievements", 
        about_us: "About", 
        nav_contact: "Contact",
        hero_title: "HI, I AM <br> <span class='hero-name-text'>DAMTA NOVIYAN MUHAMAD FAIZ.</span>",
        hero_subtitle: "Full Stack Developer | Information Systems Student | Tech Enthusiast",
        profil_title: "PROFILE", 
        label_user: "Name:", 
        label_loc: "Location:", 
        label_guild: "Campus:", 
        label_role: "Role:",
        profil_singkat: "My Full Profile is Available in About.", 
        skill_title: "Weapons & Skills", 
        project_title: "Featured Projects",
        desc_p1: "An interactive website built using pure HTML, CSS, and JavaScript (Vanilla JS) without a framework, featuring a romantic and personal UI/UX design.",
        desc_p2: "A modern professional portfolio website with Glassmorphism effects and Neon 6D animations. Developed dynamically and responsively using the React.js framework, HTML5, and CSS3.",
        desc_p3: "An integrated web-based attendance system that utilizes PHP and MySQL for real-time employee attendance verification. Equipped with a feature to upload physical proof photos and automatic reports in Excel format.",
        desc_p4: "A database-based online store system that integrates PHP Native logic to display products dynamically. Uses modern CSS for Glassmorphism visual effects and a neat responsive layout on mobile devices.",
        desc_p5: "Web App Roadmap using PHP, HTML5, and CSS3 Neon Style. The backend uses MySQL with Google Login security features (OAuth 2.0).",
        desc_p6: "An interactive web ordering system using PHP Native and MySQL. Equipped with design customization features (Themes/Fonts), order database management, and automatic invoice integration to WhatsApp.",
        btn_view: "View Website",
        cert_title: "Achievements", 
        cert_1: "Learning Public Speaking", 
        desc_c1: "Completed a program focused on Public Speaking skills.",
        cert_2: "Learning Basic AI", 
        desc_c2: "Completed effective ways to use Artificial Intelligence.",
        cert_3: "CISCO Packet Tracer", 
        desc_c3: "In-depth understanding of Independent Project creation.",
        cert_4: "Microsoft APPS", 
        desc_c4: "Learning Office Applications.",
        cert_5: "Extra Skill", 
        desc_c5: "Learning how to solve Air Conditioning (AC) system problems.",
        cert_6: "REDHAT", 
        desc_c6: "Learning the basics of Red Hat System Administration.",
        about_title_main: "Vision & Mission",
        bio_heading: "About",
        about_bio_1: "A brief introduction about who I am.",
        about_bio_2: "I am Damta Noviyan Muhamad Faiz, a Full Stack Developer based in Jakarta, dedicated to building impactful and visually pleasing digital solutions. I specialize in developing dynamic web platforms using modern tech stacks, including React.js, JavaScript, PHP, and relational database management.",
        about_bio_3: "My main focus is designing system architectures that not only feature interactive user interfaces (UI/UX) but are also well-structured on the backend, maintainable, and scalable to meet business needs. I believe that high-quality code must go hand in hand with system efficiency and a seamless user experience.",
        about_bio_4: "With a strong passion for technological innovation, I combine technical expertise with critical thinking, proactive communication, and effective team collaboration. I continuously strive to ensure every project delivers optimal results and tangible impact.",
        about_bio_5: "Warm regards,",
        visi_title: "Vision",
        visi_desc: "To become someone thirsty for technological knowledge, constantly innovating and implementing ideas in the real world.",
        misi_title: "Mission",
        misi_desc: "Building effective and collaborative communication skills with the team.",
        career_title: "Career & Education",
        tl_title_1: "Full Stack Developer",
        tl_comp_1: "PT. Biro Klasifikasi Indonesia (Persero)",
        tl_date_1: "2026 - Present • Jakarta, Indonesia",
        tl_desc_1: "Becoming a professional developer at BKI and contributing to national projects.",
        tl_title_2: "Information Systems Student",
        tl_comp_2: "UIN Syarif Hidayatullah Jakarta",
        tl_date_2: "2025 - Present • Ciputat, Indonesia",
        tl_desc_2: "Graduated from SMK Yappenda and continued higher education at UIN Jakarta.",
        tl_title_3: "Computer Network Engineering (TKJ)",
        tl_comp_3: "SMK Yappenda Jakarta",
        tl_date_3: "2022 - 2025 • Jakarta, Indonesia",
        tl_desc_3: "Focused on Computer Network Engineering. Active in extracurriculars.",
        show_detail: "Show detail",
        hide_detail: "Hide detail",
        history_title: "Journey By Year",
        hist_2022: "Started the journey in the technology world and basic programming. Tried VSCode, stopped briefly because it was hard, but remained curious.",
        hist_2023: "Started using CISCO compared to early 11th grade and began Internship (PKL).",
        hist_2024: "12th grade, focused on deepening networking skills.",
        hist_2025: "Graduated SMK Yappenda, entered UIN Jakarta. The starting point for Web Development.",
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
        country_desc: "Website visitors by country origin"
    }
};

let currentLang = 'id';
let isLightMode = false;

window.toggleLanguage = function() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    document.getElementById('lang-text').innerText = currentLang.toUpperCase();
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if(key === 'hero_title') {
                element.innerHTML = translations[currentLang][key];
            } else {
                element.innerText = translations[currentLang][key];
            }
        }
    });
};

window.toggleTheme = function() {
    document.body.classList.toggle('light-mode');
    const icon = document.getElementById('theme-icon');
    isLightMode = !isLightMode;
    
    if(isLightMode) {
        icon.classList.replace('ri-sun-line', 'ri-moon-line');
    } else {
        icon.classList.replace('ri-moon-line', 'ri-sun-line');
    }
};

window.toggleMenu = function() {
    document.getElementById('navMenu').classList.toggle('active');
    document.getElementById('hamburger').classList.toggle('active');
};

window.closeMenu = function() {
    document.getElementById('navMenu').classList.remove('active');
    document.getElementById('hamburger').classList.remove('active');
};

window.toggleHistory = function() {
    document.getElementById('historyPopup').classList.toggle('active');
};

window.toggleTimelineCard = function(cardElement) {
    const details = cardElement.querySelector('.timeline-details');
    const openText = cardElement.querySelector('.open-text');
    const closeText = cardElement.querySelector('.close-text');
    const icon = cardElement.querySelector('.timeline-toggle-text i');

    document.querySelectorAll('.timeline-card').forEach(c => {
        if (c !== cardElement) {
            c.classList.remove('active');
            c.querySelector('.timeline-details').style.maxHeight = '0px';
            c.querySelector('.open-text').style.display = 'inline';
            c.querySelector('.close-text').style.display = 'none';
            c.querySelector('.timeline-toggle-text i').classList.remove('rotate');
        }
    });

    cardElement.classList.toggle('active');
    
    if (cardElement.classList.contains('active')) {
        details.style.maxHeight = '1000px'; 
        openText.style.display = 'none';
        closeText.style.display = 'inline';
        icon.classList.add('rotate');
    } else {
        details.style.maxHeight = '0px';
        openText.style.display = 'inline';
        closeText.style.display = 'none';
        icon.classList.remove('rotate');
    }
};

// ==========================================
// SCROLL ANIMATION OBSERVER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 }); 

    const hiddenElements = document.querySelectorAll(
        '.profil-card, .skill-section, .project-card, .cert-card, .vm-card, .timeline-card, .history-item, section h2, #comments, #dashboard'
    );
    hiddenElements.forEach((el) => observer.observe(el));
});

// ==========================================
// MAIN LOGIC (VISITOR, CHAT, AUDIO)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');

    setTimeout(() => {
        if(welcomeScreen) {
            welcomeScreen.style.transition = 'opacity 1s ease';
            welcomeScreen.style.opacity = '0';
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                if (mainContent) {
                    mainContent.style.display = 'block';
                    void mainContent.offsetWidth; 
                    mainContent.style.opacity = '1';
                    
                    // Render Dashboard saat konten muncul
                    runDashboardStats();
                }
            }, 1000); 
        }
    }, 4500); 

    // --- VIDEO AUDIO CONTROL ---
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.volume = 0.5;
        const enableSound = () => {
            heroVideo.muted = false;
            document.removeEventListener('click', enableSound);
            document.removeEventListener('keydown', enableSound);
            document.removeEventListener('scroll', enableSound);
        };
        document.addEventListener('click', enableSound);
        document.addEventListener('keydown', enableSound);
        document.addEventListener('scroll', enableSound);

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const threshold = window.innerHeight * 0.5; 
            if (scrollY > threshold) {
                if (!heroVideo.muted) heroVideo.muted = true;
            } else {
                if (heroVideo.muted) heroVideo.muted = false;
            }
        });
    }

    // --- MOUSE SPOTLIGHT EFFECT ---
    const cards = document.querySelectorAll('.profil-card, .tech-item, .project-card, .cert-card, .vm-card, .timeline-card, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });

    // --- DASHBOARD STATS (GITHUB & VISITOR) ---
    function animateValue(element, start, end, duration, isPadded) {
        if (!element) return;
        if(start === end) {
            element.innerText = isPadded ? String(end).padStart(5, '0') : end.toLocaleString('id-ID');
            return;
        }
        
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let currentVal = Math.floor(progress * (end - start) + start);

            if (isPadded) {
                element.innerText = String(currentVal).padStart(5, '0');
            } else {
                element.innerText = currentVal.toLocaleString('id-ID'); 
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.innerText = isPadded ? String(end).padStart(5, '0') : end.toLocaleString('id-ID');
            }
        };
        window.requestAnimationFrame(step);
    }

    const dashboardElement = document.getElementById('dashboard');
    let statsLoaded = false;
    const statObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !statsLoaded) {
            statsLoaded = true;
            runDashboardStats();
        }
    }, { threshold: 0.3 });

    if(dashboardElement) statObserver.observe(dashboardElement);

    function runDashboardStats() {
        try {
            const ghChartImg = document.getElementById('gh-chart-img');
            if(ghChartImg) {
                ghChartImg.src = "https://ghchart.rshah.org/00f3ff/damta8827773?v=" + new Date().getTime();
            }

            const fallbackRepos = 24; 
            const fallbackFollowers = 8; 

            fetch('https://api.github.com/users/damta8827773')
                .then(response => {
                    if(!response.ok) throw new Error("API Limit");
                    return response.json();
                })
                .then(data => {
                    const repoDisplay = document.getElementById('repo-count');
                    const followerDisplay = document.getElementById('follower-count');
                    const repos = data.public_repos || fallbackRepos;
                    const followers = data.followers || fallbackFollowers;
                    
                    if(repoDisplay) animateValue(repoDisplay, 0, repos, 2000, false);
                    if(followerDisplay) animateValue(followerDisplay, 0, followers, 2000, false);
                })
                .catch(error => {
                    console.warn("Using fallback Github data");
                    const repoDisplay = document.getElementById('repo-count');
                    const followerDisplay = document.getElementById('follower-count');
                    if(repoDisplay) animateValue(repoDisplay, 0, fallbackRepos, 2000, false);
                    if(followerDisplay) animateValue(followerDisplay, 0, fallbackFollowers, 2000, false);
                });
        } catch(e) { console.error("Github Error:", e) }

        // Firebase Visitor Counter
        try {
            if (typeof firebase !== "undefined") {
                const db = firebase.firestore();
                const visitorDisplay = document.getElementById('visitor-count');
                
                if (visitorDisplay) {
                    const visitorRef = db.collection("statistics").doc("visitors");
                    visitorRef.get().then((docSnap) => {
                        let targetCount = 0;
                        if (!docSnap.exists) {
                            visitorRef.set({ count: 1 });
                            targetCount = 1;
                            sessionStorage.setItem("hasVisited", "true");
                        } else {
                            const hasVisited = sessionStorage.getItem("hasVisited");
                            if (!hasVisited) {
                                visitorRef.update({ count: firebase.firestore.FieldValue.increment(1) });
                                sessionStorage.setItem("hasVisited", "true");
                                targetCount = docSnap.data().count + 1;
                            } else {
                                targetCount = docSnap.data().count;
                            }
                        }
                        animateValue(visitorDisplay, 0, targetCount, 2000, true);
                    }).catch(() => visitorDisplay.innerText = "00000");
                }
            }
        } catch(e) { console.error("Firebase Visitor Error:", e); }

        // --- AMBIL DATA NEGARA ASLI DARI BACKEND PHP ---
        const countryContainer = document.getElementById('country-list-container');
        
        if (countryContainer && countryContainer.innerHTML.trim() === "") {
            // Tampilkan teks loading saat menunggu PHP bekerja
            countryContainer.innerHTML = "<p style='color: var(--text-muted); font-size:0.9rem;'>Mengambil data live dari Analytics...</p>";

            // Fetch ke file PHP yang baru kamu buat
            fetch('api-negara.php')
                .then(response => response.json())
                .then(data => {
                    countryContainer.innerHTML = ""; // Bersihkan teks loading

                    if(data.error) {
                        console.error(data.error);
                        countryContainer.innerHTML = "<p style='color: #ff5555;'>Gagal memuat data negara.</p>";
                        return;
                    }

                    if(!Array.isArray(data) || data.length === 0) {
                        countryContainer.innerHTML = "<p style='color: var(--text-muted);'>Belum ada data negara yang tersedia.</p>";
                        return;
                    }

                    data.forEach((country, index) => {
                        // Animasi delay progress bar
                        setTimeout(() => {
                            countryContainer.innerHTML += `
                                <div class="country-item">
                                    <div class="country-info">
                                        <span class="country-name">${country.flag} ${country.name}</span>
                                        <span class="country-count">${country.percentage}%</span>
                                    </div>
                                    <div class="progress-bar-bg">
                                        <div class="progress-bar-fill" style="width: ${country.percentage}%;"></div>
                                    </div>
                                </div>
                            `;
                        }, index * 200); 
                    });
                })
                .catch(err => {
                    console.error("Gagal terhubung ke API:", err);
                    countryContainer.innerHTML = "<p style='color: #ff5555;'>Gagal terhubung ke server (Koneksi terputus).</p>";
                });
        }
    }

    // --- 4. CHAT SYSTEM ---
    try {
        if (typeof firebase !== "undefined") {
            const firebaseConfig = {
                apiKey: "AIzaSyC80W6y97OPM8m6VeiKs_0vt7oCd5HsTi8",
                authDomain: "projectdamta.firebaseapp.com",
                projectId: "projectdamta",
                storageBucket: "projectdamta.firebasestorage.app",
                messagingSenderId: "118530088464",
                appId: "1:118530088464:web:f193173dcc75d7557b7495"
            };

            if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

            const auth = firebase.auth();
            const db = firebase.firestore();
            const provider = new firebase.auth.GoogleAuthProvider();

            const authSection = document.getElementById('auth-section');
            const commentForm = document.getElementById('comment-form');
            const listContainer = document.getElementById('comments-display-list');
            const btnLoginGoogle = document.getElementById('btn-login-google');
            const btnLogout = document.getElementById('btn-logout');
            const submitCommentBtn = document.getElementById('submit-comment');

            if(btnLoginGoogle) {
                btnLoginGoogle.onclick = () => {
                    auth.signInWithPopup(provider).catch((error) => alert("Login failed: " + error.message));
                };
            }

            if(btnLogout) btnLogout.onclick = () => auth.signOut();

            auth.onAuthStateChanged((user) => {
                if (user) {
                    if(authSection) authSection.style.display = 'none';
                    if(commentForm) commentForm.style.display = 'flex';
                    document.getElementById('user-photo').src = user.photoURL;
                    document.getElementById('user-name-display').innerText = user.displayName;
                } else {
                    if(authSection) authSection.style.display = 'block';
                    if(commentForm) commentForm.style.display = 'none';
                }
            });

            if(submitCommentBtn) {
                submitCommentBtn.onclick = async (e) => {
                    e.preventDefault();
                    const text = document.getElementById('comment-input').value;
                    const ratingElement = document.querySelector('input[name="stars"]:checked');
                    const rating = ratingElement ? parseInt(ratingElement.value) : 0;

                    if (!text) return alert("Message cannot be empty!");

                    try {
                        await db.collection("comments").add({
                            name: auth.currentUser.displayName,
                            photo: auth.currentUser.photoURL,
                            email: auth.currentUser.email,
                            comment: text,
                            rating: rating,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        });
                        document.getElementById('comment-input').value = "";
                        if(ratingElement) ratingElement.checked = false;
                    } catch (err) { alert("Failed to send: " + err.message); }
                };
            }

            window.replyTo = function(name) {
                const inputArea = document.getElementById('comment-input');
                if(inputArea) {
                    inputArea.value = `@${name} ` + inputArea.value;
                    inputArea.focus();
                }
            };

            if(listContainer) {
                db.collection("comments").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                    listContainer.innerHTML = "";
                    if (snapshot.empty) {
                        listContainer.innerHTML = "<p style='text-align: center; color: var(--text-muted);'>No comments yet.</p>";
                    } else {
                        snapshot.forEach((doc) => {
                            const d = doc.data();
                            const stars = "⭐".repeat(d.rating || 0);
                            const isOwner = d.email === "damtafaiz@gmail.com"; 
                            
                            let timeString = "";
                            if (d.timestamp) {
                                const date = d.timestamp.toDate();
                                timeString = date.toLocaleDateString('id-ID', {day:'2-digit', month:'2-digit', year:'numeric'}) + ', ' + date.toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'});
                            }

                            if(isOwner) {
                                listContainer.innerHTML += `
                                    <div class="chat-item-wrapper align-right" style="justify-content: flex-end; width: 100%; margin-bottom: 15px;">
                                        <div class="chat-item" style="display: flex; gap: 15px; max-width: 85%; align-items: flex-start; justify-content: flex-end;">
                                            <div class="chat-content" style="display: flex; flex-direction: column; align-items: flex-end;">
                                                <div class="chat-header" style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                                                    <span class="chat-time" style="color: #888; font-size: 0.75rem;">${timeString}</span>
                                                    <span class="owner-badge" style="border: 1px solid #ffcc00; color: #ffcc00; font-size: 0.65rem; padding: 2px 6px; border-radius: 12px; display: flex; align-items: center; gap: 3px;">
                                                        <i class="ri-user-star-fill"></i> Author
                                                    </span>
                                                    <strong class="chat-name" style="color: var(--text-color); font-size: 0.9rem;">${d.name}</strong>
                                                </div>
                                                <div class="chat-bubble owner" style="background: #ffcc00; color: #000; padding: 12px 18px; border-radius: 15px 0 15px 15px; font-size: 0.95rem; line-height: 1.5; font-weight: 500; text-align: left; box-shadow: 0 4px 10px rgba(255, 204, 0, 0.2);">
                                                    ${d.comment}
                                                    ${d.rating > 0 ? `<div style="font-size: 0.75rem; margin-top: 5px; letter-spacing: 2px;">${stars}</div>` : ''}
                                                </div>
                                            </div>
                                            <img src="${d.photo}" alt="${d.name}" class="chat-avatar" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover;" />
                                        </div>
                                    </div>`;
                            } else {
                                listContainer.innerHTML += `
                                    <div class="chat-item-wrapper align-left" style="justify-content: flex-start; width: 100%; margin-bottom: 15px;">
                                        <div class="chat-item" style="display: flex; gap: 15px; max-width: 85%; align-items: flex-start;">
                                            <img src="${d.photo}" alt="${d.name}" class="chat-avatar" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover;" />
                                            <div class="chat-content" style="display: flex; flex-direction: column; align-items: flex-start;">
                                                <div class="chat-header" style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
                                                    <strong class="chat-name" style="color: var(--text-color); font-size: 0.9rem;">${d.name}</strong>
                                                    <span class="chat-time" style="color: #888; font-size: 0.75rem;">${timeString}</span>
                                                </div>
                                                <div class="chat-bubble" style="background: var(--chat-bubble); color: var(--text-color); border: 1px solid var(--chat-border); padding: 12px 18px; border-radius: 0 15px 15px 15px; font-size: 0.95rem; line-height: 1.5; text-align: left;">
                                                    ${d.comment}
                                                    ${d.rating > 0 ? `<div style="font-size: 0.75rem; margin-top: 5px; letter-spacing: 2px;">${stars}</div>` : ''}
                                                </div>
                                                <button type="button" class="btn-reply" onclick="replyTo('${d.name}')" title="Reply" style="background: transparent; border: none; color: #888; font-size: 0.85rem; cursor: pointer; margin-top: 5px; display: flex; align-items: center; gap: 5px;">
                                                    <i class="ri-reply-line"></i> Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>`;
                            }
                        });
                    }
                });
            }
        }
    } catch(e) { console.error("Firebase Auth/Comment Error:", e); }
});