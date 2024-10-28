google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    fetch('/api/leave-requests/') // İzin verilerini çeken API endpoint
        .then(response => response.json())
        .then(data => {
            const allMonths = [
                'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
            ];

            // Başlangıç ve bitiş tarihleri arasında gün hesaplama
            function calculateDaysInMonth(startDate, endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const daysInMonth = {};

                // Günleri her ay için ayır
                while (start <= end) {
                    const month = start.toLocaleString('tr-TR', { month: 'long' });
                    const startOfMonth = new Date(start.getFullYear(), start.getMonth(), 1);
                    const endOfMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0);

                    const startInMonth = Math.max(start, startOfMonth);
                    const endInMonth = Math.min(end, endOfMonth);

                    const dayCount = Math.max(0, Math.ceil((endInMonth - startInMonth) / (1000 * 60 * 60 * 24)) + 1);

                    if (!daysInMonth[month]) {
                        daysInMonth[month] = 0;
                    }

                    daysInMonth[month] += dayCount;

                    // Ayı birer birer artır
                    if (start.getMonth() === end.getMonth()) {
                        break; // Son ayın içinde kalıyor
                    }
                    
                    start.setMonth(start.getMonth() + 1);
                    start.setDate(1);
                }

                return daysInMonth;
            }

            const monthlyCounts = {};

            data.forEach(request => {
                const startDate = new Date(request.start_date);
                const endDate = new Date(request.end_date);

                const daysInMonth = calculateDaysInMonth(startDate, endDate);

                for (const [month, days] of Object.entries(daysInMonth)) {
                    if (!monthlyCounts[month]) {
                        monthlyCounts[month] = 0;
                    }
                    monthlyCounts[month] += days;
                }
            });

            // Grafik verisi hazırlama
            const chartData = [['Ay', 'İzin Süresi (Gün)']];
            allMonths.forEach(month => {
                if (monthlyCounts[month] !== undefined) {
                    chartData.push([month, monthlyCounts[month]]);
                } else {
                    chartData.push([month, 0]); // Veri olmayan aylar için 0 ekleyin
                }
            });

            const dataTable = google.visualization.arrayToDataTable(chartData);

            const options = {
                title: 'Aylık İzin Kullanımı',
                titleTextStyle: {
                    color: '#333',
                    fontSize: 22,
                    bold: true,
                },
                hAxis: {
                    title: 'Aylar',
                    textStyle: { fontSize: 12, color: '#555' },
                    titleTextStyle: { fontSize: 14, bold: true, color: '#333' },
                    slantedText: true,
                    slantedTextAngle: 45,
                },
                vAxis: {
                    title: 'İzin Süresi (Gün)',
                    minValue: 0,
                    textStyle: { fontSize: 12, color: '#555' },
                    titleTextStyle: { fontSize: 14, bold: true, color: '#333' },
                    gridlines: { color: '#eee' },
                },
                backgroundColor: '#f9f9f9',
                colors: ['#4a90e2'],
                bar: { groupWidth: '60%' },
                chartArea: { width: '75%', height: '70%' },
                legend: { position: 'none' },
                tooltip: {
                    textStyle: { color: '#333' },
                    trigger: 'both',
                    isHtml: true
                },
                animation: {
                    startup: true,
                    duration: 1200,
                    easing: 'out',
                },
            };

            const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
            chart.draw(dataTable, options);
        })
        .catch(error => {
            console.error('Veri yüklenirken hata oluştu:', error);
        });
}
