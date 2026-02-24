# 🚀 Space Shooter - Git & GitHub Rehberi

Bu dosya, projenizi farklı bilgisayarlardan yönetmenize ve versiyon kontrolü yapmanıza yardımcı olacak temel komutları içerir.

## 🛠 Temel Akış (Ev-İş Arası)

### 1. Çalışmaya Başlamadan Önce (Güncel hali çekmek için)
Başka bir bilgisayarda yaptığınız değişiklikleri şu anki bilgisayarınıza indirmek için:
```powershell
git pull origin main
```

### 2. Değişiklikleri Paketlemek (Commit)
Yaptığınız çalışmaları yerel bir kayıt noktasına dönüştürmek için:
```powershell
# Tüm değişiklikleri hazırla
git add .

# Değişikliği isimlendirerek kaydet
git commit -m "Buraya ne yaptığınızı yazın (örn: Yeni düşman eklendi)"
```

### 3. Buluta Göndermek (GitHub'a Push)
Yerel kayıtlarınızı GitHub'a yüklemek için:
```powershell
git push origin main
```

---

## 🕒 Geçmişe Yolculuk (Geri Dönme)

### Hatalı Bir Değişikliği İptal Etmek
Eğer henüz commit yapmadıysanız ve dosyayı eski haline döndürmek istiyorsanız:
```powershell
git checkout -- dosya_adi.js
```

### Tüm Projeyi Son Commit'e Döndürmek
Her şeyi silip son başarılı commit'e dönmek için:
```powershell
git reset --hard HEAD
```

---

## 📌 Faydalı Komutlar
- `git status`: Şu an hangi dosyaların değiştiğini gösterir.
- `git log --oneline`: Geçmişteki commit'lerinizin kısa bir listesini verir.
- `git remote -v`: Projenin hangi GitHub adresine bağlı olduğunu gösterir.

---

**İpucu:** Antigravity (yani ben) buradayken bu komutları ezberlemenize gerek yok. Bana "Yaptıklarımı GitHub'a gönder" veya "Dünkü sürüme geri dönelim" demeniz yeterli, ben sizin için hallederim! 🚀
