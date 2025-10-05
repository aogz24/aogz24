// Konfigurasi pribadi - Silakan edit sesuai informasi Anda
const CONFIG = {
  nama: "Agus Riyanto",
  jabatan: ["Pengembang Full Stack", "Statistisi", "Pengembang Desktop"],

  // Kontak
  email: "ragus8188@gmail.com",
  github: "aogz24",
  linkedin: "agus-riyanto-482494203",

  // Keahlian
  keahlian: [
    { nama: "JavaScript", tingkat: 70, kategori: "Frontend" },
    { nama: "Tailwind CSS", tingkat: 80, kategori: "Frontend" },
    { nama: "Node.js", tingkat: 85, kategori: "Backend" },
    { nama: "Python", tingkat: 90, kategori: "Backend" },
    { nama: "PHP", tingkat: 85, kategori: "Backend" },
    { nama: "Laravel", tingkat: 75, kategori: "Backend" },
    { nama: "MySQL", tingkat: 85, kategori: "Database" },
    { nama: "MongoDB", tingkat: 80, kategori: "Database" },
    { nama: "PostgreSQL", tingkat: 70, kategori: "Database" },
    { nama: "Java", tingkat: 70, kategori: "Mobile" },
    { nama: "Git", tingkat: 90, kategori: "Tools" },
    { nama: "VS Code", tingkat: 95, kategori: "Tools" },
    { nama: "Postman", tingkat: 85, kategori: "Tools" },
    { nama: "Vercel", tingkat: 75, kategori: "Cloud" },
    { nama: "Python", tingkat: 80, kategori: "Desktop" },
  ],

  // Daftar Proyek Lain
  proyek: [
    {
      nama: "Website - Saepisan",
      deskripsi:
        "Website resmi untuk aplikasi saePisan yang menampilkan berbagai proyek dan keahlian. Dibangun dengan teknologi modern dan desain yang responsif.",
      url: "https://www.saepisan.web.id/",
      github: "https://github.com/aogz24/sae-pisan-web",
      teknologi: ["Next", "DaisyUi", "Supabase"],
      kategori: "web",
      unggulan: true,
    },
    {
      nama: "saePisan",
      deskripsi:
        "saePisan adalah aplikasi GUI desktop yang dirancang untuk melakukan Small Area Estimation (SAE) menggunakan bahasa pemrograman R dan Python. Aplikasi ini menyediakan antarmuka intuitif bagi pengguna untuk memasukkan data, memilih metode estimasi, dan memvisualisasikan hasil. Mendukung berbagai teknik SAE, termasuk Empirical Best Linear Unbiased Prediction (EBLUP) dan metode Hierarki Bayesian. Dibangun menggunakan Python dengan PyQt6 untuk GUI dan mengintegrasikan skrip R untuk komputasi statistik.",
      url: "https://www.saepisan.web.id/downloads",
      dokumentasi: "https://aogz24.github.io/sae-pisan-doc/",
      tangkapan_layar: ["assets/tampilan awal.png"],
      github: "https://github.com/aogz24/saePisan",
      teknologi: ["Python", "Qt", "R"],
      kategori: ["Desktop", "Data Science", "R", "Python"],
      unggulan:true,
    },
    {
      nama: "saePy",
      deskripsi:
        "Sebuah paket Python untuk melakukan Small Area Estimation (SAE) dengan berbagai metode statistik. Paket ini menyediakan fungsi-fungsi untuk mengolah data, melakukan estimasi, dan memvisualisasikan hasil. Mendukung teknik seperti Empirical Best Linear Unbiased Prediction (EBLUP). Dirancang untuk memudahkan peneliti dan analis data dalam melakukan SAE menggunakan Python.",
      url: "https://pypi.org/project/saePy/",
      github: "https://github.com/aogz24/saePy",
      teknologi: "Python",
      kategori: "library",
    },
    {
      nama: "KSA API",
      deskripsi:
        "API untuk aplikasi mobile dummy KSA proyek UAS Pemrograman Platform Khusus",
      github: "https://github.com/aogz24/KSA",
      teknologi: ["Java", "Spring Boot", "MySQL"],
      kategori: ["API", "Backend"],
    },
    {
      nama: "Aplikasi Mobile KSA",
      deskripsi:
        "Aplikasi mobile dummy KSA proyek UAS Pemrograman Platform Khusus",
      github: "https://github.com/aogz24/Kerangka-Sampling-area",
      teknologi: ["Java", "Android Studio"],
      kategori: ["Mobile", "Android"],
    },
    {
      nama: "Repository Lomba MMC MCF ITB 2024",
      deskripsi:
        "Repository ini berisi kode sumber dan dokumentasi untuk kompetisi MMC MCF ITB 2024. Proyek ini mencakup berbagai aspek seperti analisis data, pengembangan model, dan implementasi solusi yang relevan dengan tema lomba.",
      github: "https://github.com/aogz24/MMC-MCF-ITB-2024",
      teknologi: [
        "Python",
        "Jupyter Notebook",
        "Pandas",
        "NumPy",
        "Matplotlib",
      ],
      kategori: ["Data Science", "Machine Learning"],
    },
  ],
};

// Export untuk digunakan di file lain
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
