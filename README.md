#MorphDoc Pro — Gelişmiş DOCX Optimizasyon Aracı

**MorphDoc Pro**, Microsoft Word (`.docx`) belgelerinin içerisindeki görselleri tarayıcı üzerinde, sunucuya hiçbir veri göndermeden (tamamen güvenli ve gizli bir şekilde) toplu olarak optimize eden, yeniden boyutlandıran ve formatlarını dönüştüren modern bir web uygulamasıdır.

![MorphDoc Pro](https://img.shields.io/badge/Status-Aktif-success)
![Lisans](https://img.shields.io/badge/Lisans-MIT-blue)
![Platform](https://img.shields.io/badge/Platform-Web_Taray%C4%B1c%C4%B1s%C4%B1-orange)

---

## Özellikler

- **🔒 %100 Gizlilik ve Güvenlik:** İşlemlerin tamamı istemci tarafında (tarayıcınızda) gerçekleşir. Belgeleriniz hiçbir sunucuya yüklenmez.
- **⚡ Toplu İşleme:** Aynı anda **20 adede kadar** `.docx` dosyasını sürükle-bırak yöntemiyle ekleyip tek tıkla işleyebilirsiniz.
- **🎨 Akıllı Yeniden Boyutlandırma:** Görsellerin en-boy oranını koruyarak veya akıllı arka plan bulanıklaştırma (blur) teknikleriyle hedef çözünürlüğe (Örn: 1000x450 px) kusursuz uyarlar.
- **🗂️ Format Dönüştürme:** Görselleri ihtiyacınıza göre **JPEG**, **PNG** veya **WebP** formatlarına dönüştürerek dosya boyutundan ciddi oranda tasarruf sağlar.
- **🎛️ Kalite Ayarı:** Çıktı görsel kalitesini (%10 - %100 arası) dilediğiniz gibi ayarlayabilirsiniz.
- **💎 Modern Arayüz:** Tailwind CSS ve Lucide ikonları ile tasarlanmış, premium ve kullanıcı dostu bir arayüze sahiptir.

---

## 🚀 Kullanım

1. **Dosyaları Yükleyin:**
   - `.docx` uzantılı belgelerinizi ekrandaki **"Dosyaları Buraya Bırak"** alanına sürükleyin veya alana tıklayarak bilgisayarınızdan seçin.

2. **Parametreleri Belirleyin:**
   - **Hedef Çözünürlük:** Çıktıdaki görsellerin genişlik ve yükseklik değerlerini girin (Standart: `1000x450 px`).
   - **Çıktı Formatı:** Web siteniz veya arşiviniz için en uygun formatı seçin (Önerilen: `WebP` veya `JPEG`).
   - **Görsel Kalitesi:** Dosya boyutu ile görüntü kalitesi arasındaki dengeyi ayarlayın (Önerilen: `%85`).

3. **İşlemi Başlatın:**
   - Sayfanın alt kısmında beliren **"İşlemi Başlat"** butonuna tıklayın.
   - İşlenen dosyalar otomatik olarak `[orijinal-isim]-morphdoc.docx` adıyla bilgisayarınıza indirilecektir.

---

## 🛠️ Teknolojiler ve Mimari

Proje, kolay bakım yapılabilmesi ve geliştirilebilmesi amacıyla modüler olarak **3 ana dosyaya** bölünmüştür:

- **`index.html`**: Sayfa iskeleti, Tailwind CSS CDN entegrasyonu ve bileşen yapısı.
- **`style.css`**: Özel font tanımlamaları (Inter), Glassmorphism efektleri ve özelleştirilmiş bileşen stilleri.
- **`app.js`**: 
  - **JSZip** kütüphanesi kullanılarak `.docx` (ZIP mimarisi) dosyalarının ayrıştırılması ve yeniden paketlenmesi.
  - HTML5 **Canvas API** ile görsellerin yeniden boyutlandırılması ve filtrelenmesi.
  - Dinamik durum yönetimi ve arayüz bildirimleri.

---

## 📦 Kurulum ve Çalıştırma

Proje statik dosyalardan oluştuğu için herhangi bir sunucu kurulumu veya derleme gerektirmez.

1. Projeyi bilgisayarınıza indirin veya klonlayın:
   ```bash
   git clone https://github.com/enesakssuu/morphdoc-pro.git
   ```
2. Klasör içerisindeki **`index.html`** dosyasını herhangi bir modern web tarayıcısında (Chrome, Edge, Firefox, Safari vb.) açmanız yeterlidir.

---

## 🌐 Canlı Demo (GitHub Pages)

Bu projeyi GitHub Pages üzerinde ücretsiz olarak yayınlayıp dilediğiniz yerden erişebilirsiniz.
Yayınlamak için:
1. Deponuzda **Settings > Pages** sekmesine gidin.
2. **Branch** kısmından `main`'i seçip kaydedin.
3. Siteniz kısa süre içinde yayına girecektir.

---

## 📄 Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır. Dilediğiniz gibi kullanabilir, değiştirebilir ve dağıtabilirsiniz.
