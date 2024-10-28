// static/js/calendar.js

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'tr', // Türkçe dil desteği
        initialView: 'dayGridMonth', // İlk görünüm: Aylık görünüm
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: function(fetchInfo, successCallback, failureCallback) {
            fetch('/api/leave-requests/') // İzinlerin API endpoint'i
                .then(response => response.json())
                .then(data => {
                    // Verileri FullCalendar formatına dönüştür
                    const events = data.map(izin => ({
                        title: `İzin ${izin.status}`, // Örnek başlık
                        start: izin.start_date,
                        end: izin.end_date,
                        color: '#f03636' // Renk seçimi
                    }));
                    successCallback(events);
                })
                .catch(error => {
                    console.error('İzinler yüklenirken hata oluştu:', error);
                    failureCallback(error);
                });
        }
    });

    calendar.render();
});
