
# Gemini Intent Analysis Project

This project analyzes search query intents using Gemini API and displays insights alongside Google Search Console (GSC) data in a modern web dashboard.

## Features

- Analyze user search queries for intent and content category using Gemini AI.
- Visualize Google Search Console data with detailed insights.
- Interactive dashboard and intent report builder.
- Modern, responsive UI.

## Technologies Used

- **React** with **TypeScript**
- **Vite** for modern tooling and fast builds
- **Tailwind CSS** for styling
- **shadcn/ui** component library for elegant UIs
- **@tanstack/react-query** for data fetching and caching
- **lucide-react** for iconography

## Local Development

1. **Clone** the repository:
   ```sh
   git clone https://github.com/<YOUR_GITHUB_USERNAME>/<REPO_NAME>.git
   cd <REPO_NAME>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:5173` by default.

## Deployment

You can deploy this app via GitHub Pages, Vercel, Netlify, or any platform that supports static frontends.

### Deploying with GitHub Pages
1. Edit `vite.config.ts` to set the correct `base` path if needed.
2. Build the app:
   ```sh
   npm run build
   ```
3. Deploy the `dist` folder using the [GitHub Pages Deploy Action](https://github.com/marketplace/actions/deploy-to-github-pages) or a tool like [`gh-pages`](https://www.npmjs.com/package/gh-pages).

### Deploying on Vercel/Netlify
1. Push your code to a GitHub repository.
2. Import the repo into [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).
3. Set the build command to `npm run build` and the output directory to `dist`.
4. Deploy!

## Environment Variables

To use the Gemini API, you must provide your own Gemini API key. Set this in your deployment platform as `YOUR_GEMINI_API_KEY` or configure `.env` for local use.

## License

MIT
