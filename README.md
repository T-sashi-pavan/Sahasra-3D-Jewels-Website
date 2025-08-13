# Crystal Jewels - 3D Luxury Jewelry Website

A stunning, responsive luxury jewelry website featuring 3D interactive ring models, elegant animations, and a premium e-commerce experience with cart functionality and WhatsApp integration.

## 🚀 **Live Deployments**

🌟 **Primary Site (Netlify)**: [https://sahasra-jewelers.netlify.app/](https://sahasra-jewelers.netlify.app/)

⚡ **Alternative Site (Vercel)**: [https://sahasra-3-d-jewels-website.vercel.app/](https://sahasra-3-d-jewels-website.vercel.app/)

> Both deployments feature the complete e-commerce experience with cart carousel, WhatsApp checkout integration (+91 7330775225), and 3D jewelry visualization.

### 📊 **Deployment Status**
| Platform | Status | URL | Features |
|----------|---------|-----|----------|
| 🌟 Netlify | ✅ Live | [sahasra-jewelers.netlify.app](https://sahasra-jewelers.netlify.app/) | Primary deployment, CDN optimized |
| ⚡ Vercel | ✅ Live | [sahasra-3-d-jewels-website.vercel.app](https://sahasra-3-d-jewels-website.vercel.app/) | Alternative deployment, Edge functions |

## ✨ Features

### 🎨 Design & UI
- **Luxury Loading Experience**: Elegant wave-animated golden letters with premium aesthetics
- **Responsive Design**: Seamless experience across all devices (mobile, tablet, desktop)
- **Interactive 3D Models**: High-quality WebGI-powered ring visualization
- **Premium Color Palette**: Soft pink backgrounds with luxury gold accents
- **Typography**: Playfair Display and Poppins fonts for elegant readability

### 🛒 E-commerce Functionality
- **Product Catalog**: Browse luxury jewelry collections
- **Interactive Cart**: Add, remove, and manage items
- **Secure Checkout**: Streamlined purchasing experience
- **Real-time Notifications**: User feedback for all actions

### 🌐 Network Independence
- **Offline Support**: Works without internet connection after initial load
- **Local Assets**: All CSS, fonts, and JavaScript hosted locally
- **CDN-Free**: No external dependencies for core functionality
- **Progressive Enhancement**: Graceful fallbacks for all features

### 🔧 Technical Features
- **WebGI 3D Rendering**: Advanced 3D model display and interaction
- **TypeScript**: Type-safe development with modern JavaScript features
- **Sass/SCSS**: Modular and maintainable styling
- **Local Font Management**: Custom font loading with system fallbacks
- **Error Handling**: Robust error recovery and user feedback

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser with WebGL support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/T-sashi-pavan/Sahasra-3D-Jewels-Website.git
   cd Crystal-Jewels
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up local assets** (for network independence)
   ```bash
   # Follow the network independence setup guide
   # See NETWORK-INDEPENDENCE-SETUP.md for detailed instructions
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   Navigate to `http://localhost:1234` (or the port shown in terminal)

### Build for Production

```bash
# Build optimized version
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Crystal-Jewels/
├── assets/                  # Static assets
│   ├── css/                # Local CSS files
│   │   └── tailwind-local.css
│   ├── fonts/              # Local font files
│   │   └── fonts-local.css
│   ├── js/                 # Local JavaScript
│   │   └── network-independence.js
│   ├── images/             # Image assets
│   ├── sounds/             # Audio files
│   └── *.glb               # 3D model files
├── src/                    # Source code
│   ├── index.ts           # Main TypeScript entry
│   ├── jewelry-website.ts # 3D and e-commerce logic
│   ├── styles.scss        # Main styles
│   └── _variables.scss    # Style variables
├── index.html             # Main HTML file
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🎯 Key Technologies

- **Frontend**: HTML5, TypeScript, Sass/SCSS
- **3D Graphics**: WebGI, WebGL
- **Styling**: Tailwind CSS (local), Custom CSS animations
- **Fonts**: Playfair Display, Poppins (locally hosted)
- **Build Tool**: Parcel bundler
- **Version Control**: Git

## 🔧 Development

### Running in Development Mode
```bash
npm start
```
This starts a development server with hot reloading.

### Building for Production
```bash
npm run build
```
Creates an optimized build in the `dist/` directory.

### Linting and Formatting
```bash
npm run lint
npm run format
```

## 🌐 Network Independence

This website is designed to work offline after the initial load. All assets are hosted locally:

- ✅ CSS frameworks (Tailwind)
- ✅ Fonts (Playfair Display, Poppins)
- ✅ JavaScript libraries
- ✅ 3D models and images
- ✅ Audio files

See `NETWORK-INDEPENDENCE-SETUP.md` for detailed setup instructions.

## 🎨 Customization

### Colors
The color palette can be customized in `src/_variables.scss`:
- Primary: Soft pink (#fdf2f8)
- Accent: Luxury gold (#d4af37)
- Text: Dark gray (#1f2937)

### 3D Models
Replace the `.glb` files in the `assets/` directory with your own 3D models.

### Fonts
Update font files in `assets/fonts/` and modify `fonts-local.css` accordingly.

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

### Other Platforms
The built files in `dist/` can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🔍 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers with WebGL support

## 🐛 Troubleshooting

### 3D Models Not Loading
- Ensure `.glb` files are in the `assets/` directory
- Check browser console for WebGL errors
- Verify WebGL support: visit `webglreport.com`

### Fonts Not Loading
- Check `assets/fonts/` directory for font files
- Verify `fonts-local.css` is properly linked
- Browser will fall back to system fonts if needed

### Build Errors
- Clear cache: `rm -rf .cache .parcel-cache`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- WebGI for 3D rendering capabilities
- Tailwind CSS for utility-first styling
- Google Fonts for typography
- Netlify & Vercel for hosting

## 📞 Contact & Links

**Primary Website**: [https://sahasra-jewelers.netlify.app/](https://sahasra-jewelers.netlify.app/)

**Alternative Website**: [https://sahasra-3-d-jewels-website.vercel.app/](https://sahasra-3-d-jewels-website.vercel.app/)

**WhatsApp Business**: +91 7330775225

**Repository**: [https://github.com/T-sashi-pavan/Sahasra-3D-Jewels-Website](https://github.com/T-sashi-pavan/Sahasra-3D-Jewels-Website)

---

Made with ❤️ for luxury jewelry enthusiasts
