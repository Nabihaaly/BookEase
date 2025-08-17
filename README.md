# BookEase - Appointment Booking System

A comprehensive full-stack appointment booking platform designed to streamline the scheduling process for businesses and their clients.

## 🌟 Features

- **User-Friendly Interface**: Intuitive design for both service providers and clients
- **Real-time Availability**: Live calendar updates showing available time slots
- **Automated Notifications**: Email/SMS reminders for upcoming appointments
- **Multi-Service Support**: Handle different types of services and time durations
- **Admin Dashboard**: Complete management system for businesses
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Secure Authentication**: Safe user registration and login system

## 🚀 Tech Stack

### Backend (Server)
- **Framework**: ASP.NET Core
- **Database**: SQL Server / Entity Framework Core
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful Web API

### Frontend (Client)
- **Framework**: React.js *(To be implemented)*
- **Styling**: Tailwind CSS
- **State Management**: Context API

## 📁 Project Structure

```
BookEase - Appointment Booking System/
│
├── 📁 client/                    # Frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── 📁 server/                    # Backend API
│   ├── AppointmentBookingSystem/
│   │   └── Areas/
│   │   └── Controllers/
│   │   ├── Data/
│   │   ├── Models/
│   │   └── ViewModel/
│   ├── AppointmentBookingSystem.sln
│   └── README.md
│
└── 📄 README.md                  # This file
```

## 🛠️ Getting Started

### Prerequisites
- .NET 6.0 or later
- SQL Server / SQL Server Express
- Node.js and npm (for frontend)
- Visual Studio or VS Code

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nabihaaly/BookEase-AppointmentBookingSystem.git
   cd "BookEase - Appointment Booking System"
   ```

2. **Navigate to server directory**
   ```bash
   cd server
   ```

3. **Restore dependencies**
   ```bash
   dotnet restore
   ```

4. **Update database connection string**
   - Open `appsettings.json`
   - Update the connection string to match your SQL Server setup

5. **Run database migrations**
   ```bash
   dotnet ef database update
   ```

6. **Start the API**
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:5001`

### Frontend Setup *(Coming Soon)*

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

## 📊 Database Schema

View the complete database schema and relationships:
🔗 **[Database Diagram](https://dbdiagram.io/d/689b5d1a1d75ee360a42cbbb)**

### Key Entities
- **Users**: Customer and admin user management with role-based access
- **ServiceCategories**: Categories to organize different types of services
- **ServiceOwners**: Business providers offering services
- **Services**: Specific bookable services with pricing and duration
- **Appointments**: Booking records with date, time,and status
- **Reviews**: Customer feedback and ratings for services (In progress)
- **Notifications**: System alerts and reminders (In progress)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:
```
DATABASE_CONNECTION_STRING=your_sql_server_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
EMAIL_SERVICE_API_KEY=your_email_service_key
SMS_SERVICE_API_KEY=your_sms_service_key
```

## 🧪 Testing

### Backend Tests
```bash
cd server
dotnet test
```

### Frontend Tests *(Coming Soon)*
```bash
cd client
npm test
```

## 📱 API Documentation

The API documentation is available via Swagger UI when running the application:
- Navigate to: `https://localhost:5001/swagger`

### User Endpoints
```
Authentication & Profile
GET  /api/appointment/profile           # Get user profile

Appointment Management
GET  /api/user/appointments             # Get user's own appointments only
POST /api/user/appointment              # Create new appointment
PUT  /api/user/appointment/{id}         # Update user's own appointment
DELETE /api/user/appointment/{id}       # Delete user's own appointment

Service Discovery
GET  /api/user/serviceCategories        # Get all available service categories
GET  /api/user/serviceCategory/{id}     # Get all service providers in category
GET  /api/user/serviceOwner/{id}        # Get all services of specific service provider
```

### Admin Endpoints
```
Appointment Management
GET    /api/admin/appointments          # Get all appointments with filtering
DELETE /api/admin/appointment/{id}      # Delete any appointment

User Management
GET    /api/admin/users                 # Get all users
DELETE /api/admin/user/{id}             # Delete user account

Service Provider Management
GET    /api/admin/serviceOwners         # Get all service providers
DELETE /api/admin/serviceOwner/{id}     # Delete service provider

Analytics & Reports
GET    /api/admin/dashboard             # Get dashboard statistics
```

### Service Owner Endpoints
```
Service Management
GET    /api/serviceOwner/services       # Get service owner details + services
POST   /api/serviceOwner/service        # Create new service
PUT    /api/serviceOwner/service/{id}   # Edit service details
DELETE /api/serviceOwner/service/{id}   # Delete service

Appointment Management
GET    /api/serviceOwner/appointments   # Get appointments for owner's services
PUT    /api/serviceOwner/appointment/{id} # Update appointment status
DELETE /api/serviceOwner/appointment/{id} # Cancel appointment
```

## 🚧 Development Status

- ✅ Backend API Development
- ✅ Database Design & Implementation
- ✅ Authentication System
- 🔄 Frontend Development (In Progress)
- 📋 Testing Suite (Planned)
- 📋 Documentation (Ongoing)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nabiha Aly**
- GitHub: [@Nabihaaly](https://github.com/Nabihaaly)
- LinkedIn: [[Your LinkedIn Profile](https://www.linkedin.com/in/nabiha-ali-a74199256/)]

## 📞 Support

If you have any questions or need help with setup, please open an issue or contact me directly.

---

**⭐ Star this repository if you find it helpful!**
