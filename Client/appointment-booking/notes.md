## Implement JWT Authentication, Identity, Role-based Access, and API in .NET Core
✅ Scaffold Identity and create ApplicationUser

✅ Add roles using a static SD class

✅ Configure Identity in Program.cs

✅ Create RegisterVM (view model) for registration input

✅ Create AuthController with Register & Login endpoints

✅ Generate JWT token on login

✅ Protect API routes with [Authorize] and roles

✅ Add Swagger for testing

✅ Test with Postman/Swagger

Detailed Steps & Code
Step 1: Scaffold Identity & Create ApplicationUser
csharp
Copy
Edit
public class ApplicationUser : IdentityUser
{
    [Required]
    public string Name { get; set; }
}
Don't include fields you don't need (you already removed address, city, etc.)

Run:

pgsql
Copy
Edit
dotnet ef migrations add UpdateApplicationUser
dotnet ef database update
Step 2: Add Static Role Class SD.cs
csharp
Copy
Edit
public class SD
{
    public const string Role_Admin = "Admin";
    public const string Role_ServiceProvider = "ServiceProvider";
    public const string Role_User = "User";
}
Step 3: Configure Identity in Program.cs
csharp
Copy
Edit
builder.Services
    .AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
Also add:

csharp
Copy
Edit
builder.Services.AddAuthentication().AddJwtBearer(...); // JWT setup (will explain in step 6)
Step 4: Create RegisterVM.cs
csharp
Copy
Edit
public class RegisterVM
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; }
}
Step 5: Create AuthController.cs
csharp
Copy
Edit
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public AuthController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterVM model)
    {
        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email,
            Name = model.Name
        };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        if (!await _roleManager.RoleExistsAsync(model.Role))
            return BadRequest("Invalid role");

        await _userManager.AddToRoleAsync(user, model.Role);

        return Ok("User registered successfully");
    }
}
Step 6: Add JWT Authentication
Install NuGet package:

mathematica
Copy
Edit
Microsoft.AspNetCore.Authentication.JwtBearer
In appsettings.json:

json
Copy
Edit
"JWT": {
  "Key": "YourSuperSecretKeyHere!",
  "Issuer": "your-app",
  "Audience": "your-app"
}
In Program.cs:

csharp
Copy
Edit
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var key = Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]);
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});
Generate JWT token in your controller (Login endpoint):

csharp
Copy
Edit
var tokenHandler = new JwtSecurityTokenHandler();
var key = Encoding.UTF8.GetBytes(_config["JWT:Key"]);
var tokenDescriptor = new SecurityTokenDescriptor
{
    Subject = new ClaimsIdentity(new[]
    {
        new Claim(ClaimTypes.Name, user.Email),
        new Claim(ClaimTypes.Role, roles.FirstOrDefault())
    }),
    Expires = DateTime.UtcNow.AddHours(2),
    Issuer = _config["JWT:Issuer"],
    Audience = _config["JWT:Audience"],
    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
};
var token = tokenHandler.CreateToken(tokenDescriptor);
string tokenString = tokenHandler.WriteToken(token);
Return token in response:

csharp
Copy
Edit
return Ok(new { Token = tokenString });
Step 7: Use [Authorize] to Protect APIs
csharp
Copy
Edit
[Authorize]
[HttpGet("user/profile")]
public IActionResult Profile()
{
    var username = User.Identity.Name;
    return Ok($"Hello {username}");
}

[Authorize(Roles = SD.Role_Admin)]
[HttpGet("admin/dashboard")]
public IActionResult GetAdminDashboard()
{
    return Ok("Only Admins can see this");
}
Step 8: Add Swagger
In Program.cs:

csharp
Copy
Edit
builder.Services.AddSwaggerGen();
Then:

csharp
Copy
Edit
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
Test your register, login, and protected APIs from Swagger or Postman.

```
var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
```

[
  { "type": "name", "value": "nabiha" },
  { "type": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", "value": "12345" }
]


| Claim Type       | Description                                                             | Value    |
| ---------------- | ----------------------------------------------------------------------- | -------- |
| `name`           | The user's name                                                         | `nabiha` |
| `nameidentifier` | The user's unique ID (usually the database ID or user ID from Identity) | `12345`  |
| ?.Value |	If the claim is found, return its value (in this case: "12345"). If not, return null (to prevent error).


- Claims are key-value pairs that store user info.
- ClaimTypes.NameIdentifier is used to get the user’s unique ID.
- The code is a safe and standard way to access the currently logged-in user’s ID in ASP.NET Core.

# ASP.NET Core & EF Core Query Explanation

## 1. `[FromQuery]`
In ASP.NET Core, `[FromQuery]` is an attribute you put on a controller action parameter.

It tells the framework: **"Get this parameter's value from the query string in the URL."**

**Example:**
```csharp
public IActionResult GetAppointments([FromQuery] int page, [FromQuery] string search)

GET /appointments?page=2&search=haircut
```
page will be 2

search will be "haircut"

Without [FromQuery], ASP.NET will still bind query string values to simple parameters in most cases, but [FromQuery] makes it explicit and is required for complex types.

2. var query = _context.Appointments...
This is Entity Framework Core code. Let’s break down what’s happening:
```csharp
var query = _context.Appointments
    .Include(a => a.Service)                      // Eager-load the related Service entity
    .ThenInclude(s => s.ServiceOwner)              // Also eager-load the ServiceOwner for that Service
    .Include(a => a.User)                          // Eager-load the related User entity
    .AsQueryable();                                // Make it queryable for further filtering
```
.AsQueryable()
- Keeps the result as an IQueryable instead of executing immediately.
- This allows further filtering (like .Where(...) or .OrderBy(...)) before EF Core sends the SQL to the database.

- [FromQuery] → Explicitly read values from the URL’s query string.
- EF Core chain → Start from Appointments, eagerly load related entities (Service, ServiceOwner, and User), keep query open for more filtering.

 Final Projection and Execution

```csharp
var appointments = query
    .Select(a => new
    {
        a.Id,
        a.AppointmentDateTime,
        a.Status,
        UserName = a.User.Name,
        UserEmail = a.User.Email,
        ServiceTitle = a.Service.Title,
        ServiceProviderName = a.Service.ServiceOwner.Name,
        ServicePrice = a.Service.Price
    })
    .OrderByDescending(a => a.AppointmentDateTime)
    .ToList();

```

What’s happening:
Select(...): Shapes the result into a new anonymous object with only the required fields.

Custom property names: Example → UserName = a.User.Name.

OrderByDescending(...): Sorts results by most recent appointment first.

ToList(): Executes the query and returns a list in memory.

Why use Select here:
Performance: Only retrieves the columns you need.

Shaping data: Allows renaming and combining fields.

Lightweight: Reduces memory usage compared to loading full entity objects.

✅ Full Flow:

Read query parameters → [FromQuery].
Build base query → .Include + .ThenInclude + .AsQueryable.
Apply conditional filters → .Where(...) only if needed.
Shape & sort results → .Select(...) + .OrderByDescending(...).
Execute query → .ToList().\




Why this is useful:
- Makes the search optional — if no serviceName is provided, all appointments are returned.
- If provided, you only get appointments whose service’s title matches (case sensitivity depends on the database collation).



## Resources 
- ER diagram : https://dbdiagram.io/d/689b5d1a1d75ee360a42cbbb 

<!-- Day of week -->

<!-- UI -->
```html
<div className="hidden sm:flex gap-3">
```
sm:flex
Starting from the sm breakpoint (≥640px screen width), Tailwind will apply display: flex.
That means:
- On mobile screens (<640px) → this div is hidden.
- On tablet and larger screens (≥640px) → this div becomes a flex container



.

🔹 3. Local Storage vs Session Storage
| Feature  | **localStorage**                 | **sessionStorage**                |
| -------- | -------------------------------- | --------------------------------- |
| Lifetime | Stays even after closing browser | Cleared when browser/tab closes   |
| Capacity | \~5MB per domain                 | \~5MB per domain                  |
| Access   | `localStorage.getItem("token")`  | `sessionStorage.getItem("token")` |


👉 Which to use for JWT tokens?

localStorage → keeps user logged in even after browser restart.

sessionStorage → logs out automatically when tab/browser closes.

⚠️ Both can be read by JavaScript → vulnerable to XSS attacks. In production, storing JWTs in HTTP-only cookies is safer, but localStorage is fine for learning.



# GITHUB STEPS 

## 🔹 Step 0: Where you should be

* Open terminal in the **root of your project** (where `.git` folder is).
* Check your current branch:

  ```bash
  git branch
  ```

  Make sure you’re on `main` (with a `*` before it).

---

## 🔹 Step 1: Make some changes

Suppose you update your **server** code (e.g., add a new API endpoint).

After editing files, check what changed:

```bash
git status
```

It will list modified files.

---

## 🔹 Step 2: Commit **only Server changes**

Add only the server folder:

```bash
git add Server/
git commit -m "Server: Added XYZ API endpoint"
```

📌 Explanation:

* `git add Server/` → stages everything in the `Server` folder.
* `git commit -m "..."` → creates a commit with your message.

---

## 🔹 Step 3: Commit **only Client changes**

When you update UI (like Navbar, pages, etc.) do the same:

```bash
git add Client/
git commit -m "Client: Updated Navbar design"
```

---

## 🔹 Step 4: Push to GitHub

After committing:

```bash
git push origin main
```

This sends your commits to GitHub. ✅

---

## 🔹 Step 5: Verify on GitHub

* Go to your repo on GitHub.
* Check the **Commits** tab.
* You should see something like:

  ```
  Server: Added XYZ API endpoint
  Client: Updated Navbar design
  ```

  (plus the old mixed commit we’re keeping)

---

### 💡 Quick Workflow Recap (Every Time You Code)

1. Make changes.
2. Run `git status` to see what changed.
3. Use `git add Server/` or `git add Client/` depending on what you worked on.
4. Run `git commit -m "..."`.
5. Push with `git push origin main`.

---

🔑 Authentication Notes (JWT + Cookies)
1. What is a JWT Token?

JWT = JSON Web Token

A secure way to share user identity between client (frontend) and server (backend).

Structure:

header.payload.signature


Header → tells algorithm used (e.g. HS256).

Payload → contains user info (like userId, role).

Signature → ensures no one has tampered with the token.

2. Where JWT is stored?

After login, backend generates JWT and sends it to frontend.

Frontend can store it in:

LocalStorage → survives page refresh, but less secure.

SessionStorage → disappears when tab/browser closes.

Cookies → can be more secure if set as HttpOnly & Secure.

3. How JWT Works (Step by Step)

Login Request → user sends username + password to server.

Token Issued → if valid, server creates a JWT and gives it back.

Store Token → frontend saves it (localStorage/sessionStorage/cookie).

Send with Requests → for every API call, frontend adds JWT in Authorization Header:

Authorization: Bearer <your_jwt_token>


Server Validates → backend checks the signature and payload.

Access Granted → if token is valid, API responds with requested data.

4. What is a Cookie?

A small piece of data saved in the browser by the website.

Each cookie is like a tiny note: name=value.

Automatically sent with every request to the same domain.

5. Where are Cookies stored?

Stored in the browser.

You can check in Developer Tools → Application → Cookies.

Example:

sessionId=abc123; Path=/; Secure; HttpOnly

6. Cookie Types

Session Cookie → deleted when browser closes.

Persistent Cookie → stays until expiry date.

HttpOnly Cookie → not accessible by JavaScript (more secure).

Secure Cookie → sent only over HTTPS.

7. JWT vs Cookies
Feature	JWT in Storage (local/session)	Cookies
Where stored?	Browser storage	Browser cookies
Send with request?	You must add it manually (Authorization header)	Automatically sent with request
Security	Vulnerable to XSS if in localStorage	HttpOnly cookies protect from XSS
Use case	SPA apps (React/Angular/Blazor, etc.)	Traditional web apps

✅ Important Point for Beginners:

JWT = Proof of identity.

Cookie = Place to keep proof (like a pocket to carry JWT or session ID).

:

🔹 1. Session (Server-side)

Stored on the server (in memory, database, or distributed cache like Redis).

The server creates a unique Session ID and gives it to the client via a cookie (usually ASP.NET_SessionId).

The client sends this cookie with every request, so the server can fetch that user’s session data.

Example use: storing logged-in user’s cart, temporary data, etc.

👉 Lifetime: lasts until the session times out or the user logs out.

🔹 2. Local Storage (Client-side)

Stored in the browser, persistent (does not expire until cleared).

Can only be accessed by JavaScript on the client side.

Each domain gets its own storage.

Example use: saving JWT tokens, theme preferences, or offline app data.

👉 Lifetime: stays even after closing the browser (until manually cleared).

🔹 3. Session Storage (Client-side)

Similar to local storage, but lives only for the browser tab.

Once the tab is closed, the data is lost.

Example use: temporary form inputs, state for a tab-specific session.

👉 Lifetime: ends when the tab is closed.

✅ So difference in simple terms:

Session (server): lives on the server, identified by a cookie, used to track server-side data per user.

Local/session storage (browser): lives on client, stores data in the browser, doesn’t involve server unless you send it back manually.

🔹 Cookies

A cookie is a small piece of data that the server stores on the client’s browser.

Browser sends the cookie with every request back to the server.

Example: When you log in, the server may give you a cookie like AuthToken=xyz. Next time, your browser sends it automatically so the server knows who you are.

Stored in browser (you can see them in Chrome → DevTools → Application → Cookies).

✅ Uses:

Authentication (JWT or session IDs).

Remembering preferences (dark mode, language).

Tracking (shopping carts, analytics).\

Arrow Functions: {} vs ()

| Scenario                         | Use  |
| -------------------------------- | ---- |
| Multiple lines / side effects    | `{}` |
| Single expression / return value | `()` |

1. Block body {} → Explicit return
const add = (a, b) => {
    return a + b;
};


Use when the function has multiple statements.

Must use return to return a value.

Can perform side effects (e.g., logging, API calls).

React example:

const SignUpPage = () => {
    const handleSubmit = () => {
        console.log("Form submitted");
    };

    return <div>Signup Form</div>;
};

2. Concise body () → Implicit return
const add = (a, b) => a + b;


Only works for single expressions.

Automatically returns the result of the expression.

Cannot have multiple statements or side effects inside.

React example:

const SignUpPage = () => (
    <div>Signup Form</div>
);


hum JWT token ko cookies m store krrhy hain
1. Register

Create user in DB.

Assign role.

Generate access token (15min) + refresh token (15d).

Send access token in response body + set refresh token in cookie.

✅ User is immediately logged in.

2. Login

Validate email + password.
Same as register → generate both tokens.
Return them.

3. Authenticated Requests

Frontend uses access token in headers:

Authorization: Bearer <access_token>


Backend [Authorize] middleware checks if token is valid → attaches claims (User.Identity, User.Claims).

4. Refresh Token

When access token expires (401 Unauthorized), frontend calls /api/auth/refresh.

Backend reads refreshToken from cookie, validates it.

If valid → issues new access token.

No password needed.

5. Logout
Deletes cookie (refreshToken).

SHORT : 
- Access token will expire naturally in 15 min → user is logged out.
- JWT (access token) = proves who user is (short-lived).
- Refresh token (cookie) = allows issuing new JWT without login (long-lived).
- Cookies = safe storage for refresh tokens (HttpOnly).
- Access token goes in headers for API requests.
- Refresh token goes in cookie → backend handles refresh automatically.
- 
Refresh token only proves identity (like "yes, this user had a valid session before").
You then rebuild the access token by looking up the user in the database (and re-fetching email + roles).


# updates:
 - admin context provider in main 


catgeories page -> 
- categories
  - each category render serviceOwners 
    - each serviceOwner will openn new page-> its details + services it offers 
- all serviceOwners
    - each serviceOwner will openn new page-> its details + services it offers
      - services render a component for book appoinment a box type  
- all services
- my appointments tab (for user)

/services/allCategories
    /services/categories/ServiceOwners  
    /categories/:categoryId/owners  
    /services/categories/ServiceOwners/services 
/services/allServiceOwners
    /services/allServiceOwners/services
/services/allServices
    /services/allServices
/services/user/myAppointments 




## List of HTTP status codes
1xx informational response – the request was received, continuing process
2xx successful – the request was successfully received, understood, and accepted
3xx redirection – further action needs to be taken in order to complete the request
4xx client error – the request contains bad syntax or cannot be fulfilled
5xx server error – the server failed to fulfil an apparently valid request

# Error I faced 
- TypeError: Cannot destructure property 'fetchServiceOwner' of 'useContext(...)' as it is undefined.
    means your component (ServiceOwnerLayout) is calling useContext(ServiceOwnerContext),
but it’s not wrapped inside <ServiceOwnerProvider>.
  - Fix 1 — Wrap Your Component with the Provider
   ```
    <React.StrictMode>
    <ServiceOwnerProvider>
      <App />
    </ServiceOwnerProvider>
  </React.StrictMode>
   ```
- 415-  media typoe unsupported etc 
  - jo paramter ho wo variable same ho eg
  - api.put(`/ServiceOwner/appointment/${editingId}`, { status: editStatus });
  - backend pe status: value eexpect krha hai so status var hi bhejna hai 
    ### Summary of Fixes
    - Wrap ServiceOwnerLayout inside <ServiceOwnerProvider>.
    - Ensure consistent named imports ({ ServiceOwnerContext }).
    - Replace setCategoryError(null) → setOwnerError(null).

### Updating React State with setAppointments (Immutable Update)

This line updates your React state in an immutable way, meaning it creates a new array rather than changing the existing one.
```js
setAppointments((prev) =>
  prev.map((app) =>
    app.id === editingId ? { ...app, status: newStatus } : app
  )
);
```


1️⃣ setAppointments((prev) => ...)
- setAppointments is your state updater for the appointments array.
- It takes either a new value or a function.
- Using a function (prev) => ... is recommended when the new state depends on the previous state, which is exactly what we are doing here.
- prev = the current appointments array.

2️⃣ prev.map((app) => ...)

- .map() creates a new array by iterating over prev.
- For each app (appointment) in the array, we decide whether to update it or keep it the same.

3️⃣ app.id === editingId ? { ...app, status: newStatus } : app
- This is a ternary operator.

- If the current app.id matches the editingId (the one we just edited):
  - { ...app, status: newStatus }
  - { ...app } → creates a copy of the original appointment object (important so we don’t mutate state directly).
  - status: newStatus → overrides the status property with the new value.
- If the app.id doesn’t match, we just return the original app unchanged.


✅ Key Takeaways
- Always update state immutably in React.
- Use .map() to modify a specific item in an array.
- Use { ...object, prop: newValue } to update an object property without mutation.
- Passing a function to setState ensures safe updates based on previous state.

### another example of updating state in useState
1. prev
    -  Represents the previous state value (the current serviceOwner).
2. { ...prev, ...da }
   - Uses the spread operator (...) to copy all key-value pairs from prev and then overwrite them with any values from da.
   - It merges the two objects immutably (without directly modifying the old state).

3. setServiceOwner(...)
   - Updates the state with this new merged object.

| Part         | Meaning                         |
| ------------ | ------------------------------- |
| `prev`       | previous state value            |
| `...prev`    | copy all old properties         |
| `...da`      | overwrite/add new properties    |
| Final result | merged object for updated state |

❌ Without parentheses:
  ```
  (prev) => { ...prev, ...da }
  ```
JavaScript thinks:
- “Oh, this is a function body, not an object.”
- So it tries to run ...prev, ...da as statements, which is invalid → ❌ syntax error.

✅ With parentheses:
```
(prev) => ({ ...prev, ...da })
```
- Now, the parentheses tell JavaScript:
- “This {} is an object, not a function body.”
- So it correctly returns the merged object.