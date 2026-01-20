# Global News Hub

A modern React web application that allows users to browse top headlines from different countries around the world.

## Features

- **Country Selection**: Choose from 14 different countries using either a dropdown menu or interactive country cards
- **Real-time News**: Fetches the latest top headlines using the NewsAPI
- **Rich News Cards**: Each news article displays:
  - Cover image with fallback for missing images
  - Article title and description
  - News category badge with color coding
  - News source/channel name
  - Publication date and time
  - Direct link to the original article
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations while fetching data
- **Error Handling**: Graceful error handling with user-friendly messages

## Technologies Used

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library for Tailwind
- **NewsAPI** - Real-time news data

## Available Countries

🇺🇸 United States, 🇬🇧 United Kingdom, 🇨🇦 Canada, 🇦🇺 Australia, 🇩🇪 Germany, 🇯🇵 Japan, 🇮🇳 India, 🇧🇷 Brazil, 🇲🇽 Mexico, 🇮🇹 Italy, 🇪🇸 Spain, 🇳🇱 Netherlands, 🇸🇪 Sweden, 🇳🇴 Norway

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the provided local URL (usually `http://localhost:5173`)

## API Configuration

The app uses NewsAPI with the provided API key. For production use, consider:
- Creating your own API key at [newsapi.org](https://newsapi.org)
- Using environment variables for API key management
- Implementing rate limiting and caching

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## License

This project is open source and available under the MIT License.