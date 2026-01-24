# Miss Joo Writes ✨

> *A digital sanctuary for thoughts that linger, stories that heal, and the beauty found in quiet moments.*

**Live Site**: [missjoo.com](https://missjoo.com)  
**Instagram**: [@missjooo98](https://instagram.com/missjooo98)

---

## 🌸 About

**Miss Joo Writes** is a personal blog and digital journal celebrating the art of living slowly. It's a space for authentic reflections on healing, growth, and the beautiful chaos of life.

### Philosophy

- **Slow Living**: Embracing quiet moments and intentional experiences
- **Vulnerability**: Honest writing about personal growth and mental health
- **Aesthetic Intention**: Premium, editorial design that respects the reader's attention
- **Authenticity**: Real thoughts, real feelings, real growth

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework |
| **TypeScript** | Type-safe development |
| **Vite** | Lightning-fast build tool |
| **TailwindCSS** | Utility-first styling |
| **shadcn/ui** | Accessible component library (Radix UI) |
| **React Router** | Client-side routing |
| **React Hook Form + Zod** | Form validation |

### Design System

- **Typography**: Playfair Display (serif) + DM Sans (sans-serif)
- **Colors**: Warm palette with dusty rose, cream, taupe, and soft gold
- **Animations**: Subtle fade-ins, smooth transitions (300-700ms)
- **Layout**: Minimalist editorial style with generous whitespace

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/Miss_Joo_Writes.git

# Navigate to project directory
cd Miss_Joo_Writes

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
src/
├── assets/              # Images and media
├── components/
│   ├── blog/           # Blog-specific components
│   ├── layout/         # Header, Footer, Layout wrapper
│   └── ui/             # shadcn/ui component library (53 components)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Route pages (Index, Blog, About, etc.)
├── App.tsx             # Main app with routing
├── main.tsx            # Entry point
└── index.css           # Global styles & CSS variables
```

---

## 🎨 Features

### 🏠 Homepage
- Full-screen hero with atmospheric background
- Latest blog post previews
- About section teaser
- Shared experiences highlight
- Instagram connection

### 📝 Blog
- 10 thoughtful posts across 4 categories (Healing, Life, Thoughts, Random)
- Category filtering system
- Responsive post grid
- Individual post pages with elegant typography

### 📖 Other Pages
- **About**: Personal story and mission
- **Shared Experiences**: Curated recommendations aligned with slow living
- **Contact**: Get in touch form
- **404**: Custom not-found page

### ⚡ Performance
- Vite for instant HMR
- Optimized production builds
- Minimal bundle size
- Fast page loads

### ♿ Accessibility
- WCAG-compliant components (Radix UI)
- Semantic HTML structure
- Keyboard navigation support
- Proper heading hierarchy

---

## 🎯 Current Blog Posts

1. **I'm learning to choose myself without explaining** (Jan 20, 2026)
2. **This version of me feels unfamiliar, and that's okay** (Jan 13, 2026)
3. **What I'm leaving behind without guilt** (Jan 8, 2026)
4. **Welcoming 2026 with an open heart** (Dec 31, 2025)
5. **Some days I'm strong, some days I'm just tired** (Dec 30, 2025)
6. **Learning to embrace the quiet moments** (Dec 28, 2025)
7. **On growing through change** (Dec 20, 2025)
8. **Letters I never sent** (Dec 15, 2025)
9. **A random Tuesday in December** (Dec 10, 2025)
10. **The art of letting go** (Dec 5, 2025)

---

## 🌐 Deployment

The site is configured for **GitHub Pages** deployment:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. The app uses `/Miss_Joo_Writes/` as the base path
4. SPA routing is handled by redirect scripts in `index.html` and `404.html`

### Environment Notes

- **Base URL**: Configured in `App.tsx` as `/Miss_Joo_Writes/`
- **Canonical URL**: https://missjoo.com
- **Social Images**: Hosted on Google Cloud Storage

---

## 📦 Scripts

```bash
npm run dev         # Start Vite dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

---

## 🎨 Customization

### Adding a New Blog Post

Blog posts are currently hardcoded in:

1. **`src/pages/Blog.tsx`** - Add post metadata to `allPosts` array:
   ```typescript
   {
     title: "Your Post Title",
     excerpt: "Brief preview of your post...",
     date: "Month DD, YYYY",
     category: "Healing" | "Life" | "Thoughts" | "Random",
     slug: "your-url-slug"
   }
   ```

2. **`src/pages/BlogPost.tsx`** - Add full content to `postsContent` object:
   ```typescript
   "your-url-slug": {
     title: "Your Post Title",
     date: "Month DD, YYYY",
     category: "Category",
     content: [
       "First paragraph...",
       "Second paragraph...",
       // Array of strings, one per paragraph
     ]
   }
   ```

3. **`src/pages/Index.tsx`** - Optionally add to `blogPosts` array for homepage preview

### Updating Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --dusty-rose: 344 25% 72%;
  --warm-beige: 33 26% 85%;
  /* etc. */
}
```

### Modifying Typography

Update `tailwind.config.ts`:

```typescript
fontFamily: {
  serif: ['Your Serif Font', 'fallback'],
  sans: ['Your Sans Font', 'fallback'],
}
```

---

## 🤝 Contributing

This is a personal project, but suggestions are welcome! Feel free to:

- Open an issue for bugs or ideas
- Submit a pull request with improvements
- Share feedback on design or content

---

## 📄 License

© 2026 Miss Joo. All rights reserved.

This is a personal blog. Please respect the content and design.

---

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Radix UI** for accessible primitives
- **TailwindCSS** for the utility-first styling system
- **Vite** for the incredible developer experience

---

## 📬 Connect

- **Website**: [missjoo.com](https://missjoo.com)
- **Instagram**: [@missjooo98](https://instagram.com/missjooo98)

---

*Made with 💗 and intention*