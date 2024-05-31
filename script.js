document.addEventListener('DOMContentLoaded', () => {
    const kullaniciForm = document.getElementById('kullaniciForm');
    const kullaniciTablo = document.getElementById('kullaniciTablo');

    const kullanicilar = [
        { kullaniciAdi: 'kullanici1', adSoyad: 'Ahmet Yılmaz', email: 'ahmet@example.com', telefon: '555-123-4567' },
        { kullaniciAdi: 'kullanici2', adSoyad: 'Mehmet Öz', email: 'mehmet@example.com', telefon: '555-987-6543' }
    ];

    function kullaniciListele() {
        kullaniciTablo.innerHTML = '';
        kullanicilar.forEach((kullanici, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${kullanici.kullaniciAdi}</td>
                <td>${kullanici.adSoyad}</td>
                <td>${kullanici.email}</td>
                <td>${kullanici.telefon}</td>
                <td>
                    <button class="edit" onclick="kullaniciDuzenle(${index})">Düzenle</button>
                    <button class="delete" onclick="kullaniciSil(${index})">Sil</button>
                </td>
            `;
            kullaniciTablo.appendChild(row);
        });
    }

    kullaniciForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const yeniKullanici = {
            kullaniciAdi: kullaniciForm['kullanici-ad'].value,
            adSoyad: kullaniciForm['ad-soyad'].value,
            email: kullaniciForm['email'].value,
            telefon: kullaniciForm['telefon'].value
        };
        kullanicilar.push(yeniKullanici);
        kullaniciListele();
        kullaniciForm.reset();
    });

    window.kullaniciSil = function(index) {
        if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
            kullanicilar.splice(index, 1);
            kullaniciListele();
        }
    };

    window.kullaniciDuzenle = function(index) {
        const kullanici = kullanicilar[index];
        kullaniciForm['kullanici-ad'].value = kullanici.kullaniciAdi;
        kullaniciForm['ad-soyad'].value = kullanici.adSoyad;
        kullaniciForm['email'].value = kullanici.email;
        kullaniciForm['telefon'].value = kullanici.telefon;
        kullaniciForm['sifre'].value = '';
        
        kullaniciForm.removeEventListener('submit', formSubmitHandler);
        
        function formSubmitHandler(e) {
            e.preventDefault();
            kullanici.kullaniciAdi = kullaniciForm['kullanici-ad'].value;
            kullanici.adSoyad = kullaniciForm['ad-soyad'].value;
            kullanici.email = kullaniciForm['email'].value;
            kullanici.telefon = kullaniciForm['telefon'].value;
            kullaniciListele();
            kullaniciForm.reset();
            kullaniciForm.addEventListener('submit', formSubmitHandler);
        }
        
        kullaniciForm.addEventListener('submit', formSubmitHandler);
    };

    kullaniciListele();
});
