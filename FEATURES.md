# 🚀 Finansal Kontrol Merkezi (FKM Pro) - Özellikler

Bu belge, **Finansal Kontrol Merkezi** uygulamasının sunduğu tüm premium özellikleri ve teknik altyapıyı detaylandırmaktadır.

---

## 🎨 Tasarım ve Kullanıcı Deneyimi (UI/UX)

### 1. Premium Glassmorphism Arayüzü
Uygulama, modern web tasarımının en üst standartları olan **Glassmorphism** (cam efekti) ile inşa edilmiştir.
- **Bulanık Arka Planlar:** Kartlar ve sidebar, `backdrop-blur` teknolojisi ile derinlik kazanır.
- **Gelişmiş Renk Paleti:** `Zinc-950` temelli koyu mod, `Emerald-400` ve `Blue-500` gradyanları ile zenginleştirilmiştir.
- **Özel Scrollbar:** Tasarımla uyumlu, minimalist ve estetik kaydırma çubukları.

### 2. Mikro-Animasyonlar (Framer Motion)
Kullanıcı etkileşimini artırmak için akıcı animasyonlar entegre edilmiştir:
- **Giriş Animasyonları:** Sayfa yüklendiğinde elementlerin yumuşak bir şekilde belirmesi (`fade-up`, `stagger`).
- **Hover Efektleri:** Kartlar ve butonlar üzerinde interaktif ölçeklendirme ve renk değişimleri.
- **Spring Physics:** Gerçekçi ve doğal hissettiren yay tabanlı hareketler.

---

## 📊 Fonksiyonel Özellikler

### 1. Akıllı Dashboard (Kontrol Paneli)
Finansal durumunuzun anlık görüntüsünü sunan merkezi ekran:
- **Bakiye Özeti:** Toplam varlıkların net görünümü.
- **Gelir/Gider Takibi:** Aylık bazda finansal akışın yüzdesel değişimlerle izlenmesi.
- **Yatırım Portföyü:** Mevcut yatırımların performans takibi.

### 2. İşlem Geçmişi ve Yönetimi
- **Detaylı Listeleme:** Son işlemlerin kategori, tarih ve miktar bazlı gösterimi.
- **Kategorizasyon:** Harcamaların (Gıda, Teknoloji, Eğlence vb.) ikonlarla görselleştirilmesi.
- **Gelir/Gider Ayrımı:** Renk kodlu (Yeşil/Beyaz) işlem türleri.

### 3. Bütçe ve Analiz
- **Harcama Dağılımı:** Harcamaların hangi kategorilerde yoğunlaştığını gösteren görsel analiz halkası.
- **Hedef Takibi:** Belirlenen bütçe hedeflerine ne kadar yaklaşıldığının takibi.

---

## 🛠️ Teknik Altyapı ve Konfigürasyon

### 1. Modern Teknoloji Yığını (Tech Stack)
- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS (V3)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Build Tool:** Vite

### 2. PWA (Progressive Web App) Desteği
Uygulama bir PWA olarak yapılandırılmıştır:
- **Çevrimdışı Çalışma:** Servis işçileri (Service Workers) sayesinde internet olmadan da erişilebilir.
- **Yüklenebilirlik:** Masaüstü veya mobil cihazlara bir uygulama gibi yüklenebilir.
- **Hızlı Yükleme:** Statik varlıkların önbelleğe alınmasıyla anlık açılış hızı.

### 3. SEO ve Performans
- **Semantic HTML:** Doğru hiyerarşide başlıklar ve etiketler.
- **SEO Meta:** Dinamik başlıklar ve açıklama etiketleri.
- **Optimize Varlıklar:** Hızlı yükleme süresi için optimize edilmiş fontlar ve scriptler.

---

## 🗺️ Gelecek Planlaması (Roadmap)
- [ ] Gerçek banka API entegrasyonları.
- [ ] Detaylı grafik analizleri (Chart.js / Recharts).
- [ ] Çoklu para birimi desteği.
- [ ] Harcama limitleri için bildirim sistemi.

---
*FKM Pro - Finansal Özgürlüğünüzü Tasarlayın.*
