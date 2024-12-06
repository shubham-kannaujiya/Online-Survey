// Initialize domain statistics
let domainStats = {
    'Web Development': 0,
    'Cyber Security': 0,
    'Data Analysis': 0,
    'Machine Learning': 0,
    'App Development': 0,
    'Blockchain': 0
};

// Load existing data from localStorage
if (localStorage.getItem('domainStats')) {
    domainStats = JSON.parse(localStorage.getItem('domainStats'));
}

// Function to calculate percentages
function calculatePercentages() {
    const total = Object.values(domainStats).reduce((a, b) => a + b, 0);
    return Object.values(domainStats).map(value => 
        total > 0 ? (value / total * 100).toFixed(1) : 0
    );
}

// Function to create/update chart
function createDomainChart() {
    const ctx = document.getElementById('domainChart').getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(domainStats),
            datasets: [{
                label: 'Domain Selection (%)',
                data: calculatePercentages(),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + '%';
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Form submission handler
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Get selected domain and update statistics
    const selectedDomain = data.domain;
    domainStats[selectedDomain]++;
    
    // Save to localStorage
    localStorage.setItem('domainStats', JSON.stringify(domainStats));
    localStorage.setItem('lastSubmission', JSON.stringify(data));

    // Show overlay and thank you message
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('thankYouMessage').style.display = 'block';
    
    // Create/update chart
    createDomainChart();
    
    // Disable scrolling on background
    document.body.style.overflow = 'hidden';
});

// Reset button handler
document.querySelector('.new-survey-btn').addEventListener('click', function() {
    // Enable scrolling
    document.body.style.overflow = 'auto';
    
    // Hide thank you message and overlay
    document.getElementById('thankYouMessage').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    
    // Reset form
    document.getElementById('surveyForm').reset();
});

// Optional: Clear all data function
function clearAllData() {
    localStorage.removeItem('domainStats');
    localStorage.removeItem('lastSubmission');
    domainStats = {
        'Web Development': 0,
        'Cyber Security': 0,
        'Data Analysis': 0,
        'Machine Learning': 0,
        'App Development': 0,
        'Blockchain': 0
    };
}

// Optional: Add this if you want to clear data on page load
// clearAllData();