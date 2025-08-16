// Admin Dashboard JavaScript Functions

// Global variables
let currentPage = 1;
let currentFilters = {
    search: '',
    status: '',
    serviceType: '',
    date: ''
};

// Initialize dashboard when document is ready
$(document).ready(function () {
    loadAppointments();
    initializeEventListeners();
});

// Event Listeners
function initializeEventListeners() {
    // Auto-hide alerts after 5 seconds
    setTimeout(function () {
        $('.alert').fadeOut();
    }, 5000);

    // Enter key support for search
    $('#searchInput').on('keypress', function (e) {
        if (e.which === 13) {
            filterAppointments();
        }
    });
}

// Section Navigation
function showSection(section) {
    // Hide all sections
    $('#appointments-section, #users-section, #services-section, #reports-section').hide();

    // Show selected section
    $('#' + section + '-section').show().addClass('fade-in');

    // Update active nav link
    $('.nav-link').removeClass('active');
    $(`[onclick="showSection('${section}')"]`).addClass('active');

    // Load data based on section
    switch (section) {
        case 'appointments':
            loadAppointments();
            break;
        case 'users':
            loadUsers();
            break;
        case 'services':
            loadServices();
            break;
        case 'reports':
            loadReports();
            break;
    }
}

// Appointments Management
function loadAppointments(page = 1) {
    currentPage = page;
    const tableBody = $('#appointmentsTableBody');
    const pagination = $('#pagination');

    // Show loading state
    tableBody.html('<tr><td colspan="7" class="text-center">Loading...</td></tr>');

    // Make AJAX call to get appointments
    $.ajax({
        url: '/Admin/GetAppointments',
        method: 'GET',
        data: {
            search: currentFilters.search,
            status: currentFilters.status,
            serviceType: currentFilters.serviceType,
            date: currentFilters.date,
            page: page
        },
        success: function (response) {
            displayAppointments(response.data);
            updatePagination(response.currentPage, response.totalPages);
            $('#totalAppointments').text(response.totalCount);
        },
        error: function () {
            tableBody.html('<tr><td colspan="7" class="text-center text-danger">Error loading appointments</td></tr>');
            showToast('Error loading appointments', 'error');
        }
    });
}

function displayAppointments(appointments) {
    const tableBody = $('#appointmentsTableBody');
    let html = '';

    if (appointments.length === 0) {
        html = '<tr><td colspan="7" class="text-center">No appointments found</td></tr>';
    } else {
        appointments.forEach(appointment => {
            const statusClass = getStatusBadgeClass(appointment.status);
            html += `
                <tr>
                    <td>${appointment.id}</td>
                    <td>${appointment.patientName}</td>
                    <td>${appointment.serviceProvider}</td>
                    <td>${appointment.serviceType}</td>
                    <td>${appointment.dateTime}</td>
                    <td><span class="badge ${statusClass} status-badge">${appointment.status}</span></td>
                    <td>
                        <div class="btn-group btn-group-sm" role="group">
                            <button class="btn btn-outline-info" title="View Details" onclick="viewAppointment(${appointment.id})">
                                <i class="bi bi-eye"></i>
                            </button>
                            ${getStatusButtons(appointment.id, appointment.status)}
                            <button class="btn btn-outline-danger" title="Delete" onclick="deleteAppointment(${appointment.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
    }

    tableBody.html(html);
}

function getStatusBadgeClass(status) {
    switch (status.toLowerCase()) {
        case 'pending': return 'bg-warning';
        case 'confirmed': return 'bg-success';
        case 'completed': return 'bg-info';
        case 'cancelled': return 'bg-danger';
        default: return 'bg-secondary';
    }
}

function getStatusButtons(id, status) {
    switch (status.toLowerCase()) {
        case 'pending':
            return `<button class="btn btn-outline-success" title="Approve" onclick="updateStatus(${id}, 'confirmed')">
                        <i class="bi bi-check-circle"></i>
                    </button>`;
        case 'confirmed':
            return `<button class="btn btn-outline-warning" title="Mark Complete" onclick="updateStatus(${id}, 'completed')">
                        <i class="bi bi-check2-circle"></i>
                    </button>`;
        default:
            return '';
    }
}

// Filter Functions
function filterAppointments() {
    currentFilters = {
        search: $('#searchInput').val(),
        status: $('#statusFilter').val(),
        serviceType: $('#serviceTypeFilter').val(),
        date: $('#dateFilter').val()
    };

    loadAppointments(1);
}

function resetFilters() {
    $('#searchInput, #statusFilter, #serviceTypeFilter, #dateFilter').val('');
    currentFilters = { search: '', status: '', serviceType: '', date: '' };
    loadAppointments(1);
}

// Appointment Actions
function viewAppointment(id) {
    // Implement view appointment modal or redirect
    showToast(`Viewing appointment ${id}`, 'info');
    // You can implement a modal here or redirect to a details page
}
