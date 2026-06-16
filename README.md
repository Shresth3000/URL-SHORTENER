# 🔗 URL Shortener

A lightweight full-stack **URL Shortener** built with **Node.js**, **Express.js**, **MongoDB**, and **EJS**.

Paste any long URL and instantly receive a clean, shareable short link. The application also tracks click analytics for every shortened URL and prevents duplicate entries by returning the same short URL for previously shortened links.

---

## ✨ Features

* 🔗 Generate unique 8-character short URLs using **NanoID**
* ♻️ Duplicate URL detection (returns the same short URL if it already exists)
* 📊 Click analytics with timestamp history
* 📋 Dashboard displaying all shortened URLs
* 🚀 Instant redirection to the original URL
* 💾 MongoDB persistence using Mongoose
* 🎨 Simple and responsive EJS interface

---

## 🛠️ Tech Stack

| Layer              | Technology    |
| ------------------ | ------------- |
| Runtime            | Node.js       |
| Framework          | Express.js v5 |
| Database           | MongoDB       |
| ODM                | Mongoose      |
| Template Engine    | EJS           |
| Short ID Generator | NanoID        |
| Development        | Nodemon       |

---

## 📂 Project Structure

```text
Short-Url/
├── controllers/
│   └── url.js
├── middleware/
│   └── index.js
├── models/
│   └── url.js
├── public/
│   ├── style.css
│   └── screenshot.png
├── routes/
│   ├── staticRoute.js
│   └── url.js
├── views/
│   └── home.ejs
├── connection.js
├── index.js
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18 or above)
* MongoDB installed and running locally

### Installation

```bash
# Clone the repository
git clone https://github.com/Shresth3000/URL-SHORTENER.git

# Move into the project directory
cd URL-SHORTENER

# Install dependencies
npm install

# Start the server
npm start
```

The application will be available at:

```text
http://localhost:8001
```

---

## 📌 API Endpoints

| Method | Endpoint                  | Description              |
| ------ | ------------------------- | ------------------------ |
| GET    | `/`                       | Render home page         |
| POST   | `/url`                    | Generate a short URL     |
| GET    | `/url/:shortId`           | Redirect to original URL |
| GET    | `/url/analytics/:shortId` | View analytics           |

---

## 📄 Example Usage

### Generate Short URL

**Request**

```http
POST /url
Content-Type: application/x-www-form-urlencoded

url=https://www.example.com/very/long/url
```

**Response**

```text
http://localhost:8001/url/aB3xYz9q
```

---

### Get Analytics

```http
GET /url/analytics/aB3xYz9q
```

Response

```json
{
  "totalClicks": 5,
  "analytics": [
    {
      "timestamp": 1718500000000
    },
    {
      "timestamp": 1718500200000
    }
  ]
}
```

---

## 🗃️ Database Schema

```javascript
{
  shortId: String,
  redirectURL: String,
  visitHistory: [
    {
      timestamp: Number
    }
  ]
}
```

---

## ⚡ How It Works

1. User submits a long URL.
2. The server checks whether the URL already exists in MongoDB.
3. If it exists, the existing short URL is returned.
4. Otherwise, NanoID generates a new 8-character short ID.
5. The mapping is stored in MongoDB.
6. Every visit to the short URL:

   * Redirects the user to the original URL.
   * Stores a timestamp in `visitHistory`.
7. Analytics can be viewed using the analytics endpoint.

---

## 📸 Screenshots

### Home Page

> Replace this image with your own application screenshot.

```text
public/screenshot.png
```

```md
![Home Page](./public/screenshot.png)
```

---

## 🚀 Future Improvements

* [ ] User authentication
* [ ] Custom short URL aliases
* [ ] QR code generation
* [ ] Link expiration (TTL)
* [ ] Delete/Edit URLs
* [ ] Search and filter URLs
* [ ] Charts for click analytics
* [ ] REST API with JSON responses
* [ ] Docker support
* [ ] Deployment on Render/Vercel

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

## 👨‍💻 Author

**Shresth Agrawal**

* GitHub: https://github.com/Shresth3000

---

⭐ If you found this project useful, consider giving it a **star** on GitHub!
