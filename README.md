# İnsan Kaynakları Paneli

**Açıklama**: Bu proje, çalışanların izin durumlarını takip edebileceği, duyuruları görebileceği ve performans/katılım gibi grafiklere ulaşabileceği bir insan kaynakları panelidir. Django ile geliştirilmiştir.

## Başlangıç

Bu talimatlar, projeyi yerel bir geliştirme ortamında çalıştırmanızı sağlayacaktır.

### Gereksinimler

- Python 3.7+
- Django 4.0+
- Virtualenv (isteğe bağlı)

### Kurulum

1. Projeyi klonlayın:

    ```bash
    git clone https://github.com/bursow/ikpanel.git
    cd ikpanel
    ```

2. Sanal bir ortam oluşturun ve etkinleştirin (isteğe bağlı fakat önerilir):

    ```bash
    python -m venv env
    source env/bin/activate  # Windows için: .\env\Scripts\activate
    ```

3. Gerekli paketleri yükleyin:

    ```bash
    pip install -r requirements.txt
    ```

4. Veritabanı migrasyonlarını yapın:

    ```bash
    python manage.py migrate
    ```

5. Sunucuyu başlatın:

    ```bash
    python manage.py runserver
    ```

6. Tarayıcıda projeyi açın: `http://127.0.0.1:8000`

### Özellikler

- **İzinler**: Çalışanlar izin durumlarını görüntüleyebilir.
- **Rapor**: Çalışan performans, katılım gibi grafiksel verilere erişim sağlar.
- **Duyurular**: Güncel duyuruların görüntülenmesi.
- **Profil**
- **Destek**

## Kullanım

1. **Giriş Yapın**: Çalışanlar kullanıcı adı ve şifreleriyle giriş yapabilir.
2. **İzinler Sayfası**: İzin taleplerini ve geçmiş izinleri görüntüleyin.
3. **Grafikler Sayfası**: Performans ve katılım gibi verileri içeren grafiklere göz atın.
4. **Duyurular**: En güncel duyurular burada listelenir.
