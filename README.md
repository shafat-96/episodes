# 📺 Episodes API

A simple API to fetch anime episode details, built on top of  
[Consumet.ts](https://github.com/consumet/consumet.ts) and [Airin](https://github.com/aniplaynow/airin).

If you find this useful, consider giving those projects a ⭐ — they deserve it! (and this repo too 😅)

---

## 🚀 Getting Started

### 📥 Clone the Repository

```sh
git clone https://github.com/2004durgesh/episodes.git
cd episodes
```

### 🔧 Install Dependencies

```sh
npm install
```

### ▶️ Run

```sh
npm run dev
```

---

## 📡 API Endpoints

### 🎯 Fetch Episodes

**GET**

```sh
http://localhost:3001/anime/episodes/{anilistId}?provider=gogoanime # or zoro
```

**GET**

```sh
http://localhost:3001/movies/episodes/{tmdbId}?type={movie} # or tv
```

---

### 🎯 Fetch Streaming Links (only for movies endpoint)

**GET**

```
http://localhost:3001/movies/watch/{tmdbId}?episodeNumber={episodeNumber}&seasonNumber={seasonNumber}&type={type}&server={server}
```

> **Note:**  
> If no `server` is provided, the API will return all available servers.

#### Query Parameters

- **type**: `movie` or `tv`
- **server**: `"hydrax", "fastx", "filmecho", "nova", "guru", "g1", "g2", "ee3", "ghost", "putafilme", "asiacloud", "kage", "multi", "stable"`