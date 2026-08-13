# Stones That Go For Miles 🪨

An interactive educational web application that teaches kids (ages 8-18) about how everyday items are made through a 4-stage AI agent system.

## Features

### 4-Stage AI Agent System

1. **Agent 1 - Recommendations** 🎯
   - Provides age-appropriate topic recommendations
   - Tailored for 4 age groups: 8-10, 11-13, 14-16, 17-18
   - Topics range from basic items (pencils, bread) to advanced concepts (AI, quantum computing)

2. **Agent 2 - Outline Creator** 📋
   - Creates a structured outline for the selected topic
   - Organizes content with clear sections
   - Age-appropriate depth and complexity

3. **Agent 3 - Content Writer** ✍️
   - Writes a full, engaging educational article
   - Uses storytelling techniques
   - Includes interesting facts and examples
   - Maintains appropriate language for the age group

4. **Agent 4 - Polish Editor** ✨
   - Polishes the written content
   - Fixes spelling and grammar
   - Improves flow and readability
   - Enhances vocabulary and transitions

## How It Works

1. **Select Age Group** - Choose your age group
2. **Get Recommendations** - Receive AI-suggested topics to learn about
3. **Choose a Topic** - Select what you want to learn about
4. **Review Outline** - See the content structure before full writing
5. **Read Article** - Get the complete educational article
6. **Final Polish** - Receive the perfected, polished version
7. **Download** - Save the article as a text file

## Technology Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Dynamic interaction and API communication
- **Vibe Proxy API** - AI-powered content generation

## API Integration

The app uses the Vibe Proxy API for AI content generation:

```
Endpoint: https://vibe-proxy-gqv4.onrender.com/v1/chat/completions
Model: class-chat-model
Authorization: Bearer sk-vibe-summer-2026
```

## File Structure

```
/
├── index.html      # Main HTML structure
├── style.css       # Complete styling
├── script.js       # JavaScript logic and API integration
└── README.md       # This file
```

## How to Run

### Option 1: Local File System
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start exploring!

### Option 2: Local Web Server
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if installed)
npx http-server
```

Then navigate to `http://localhost:8000` (or the port shown)

### Option 3: GitHub Pages
1. Push repository to GitHub
2. Enable GitHub Pages in repository settings
3. Access via the provided GitHub Pages URL

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Breakdown

### Responsive Design
- Fully responsive layout for all screen sizes
- Mobile-friendly interface
- Touch-optimized buttons and inputs

### User Experience
- Smooth animations and transitions
- Loading states with spinner animation
- Clear visual feedback for interactions
- Color-coded sections for easy navigation
- Scrollable content areas for long articles

### Accessibility
- Semantic HTML structure
- Clear labels and descriptions
- High contrast colors
- Keyboard navigable

### Age-Appropriate Topics

#### 8-10 Years Old
- How are pencils made?
- How is paper manufactured?
- How are crayons created?
- How is bread baked?
- How are shoes made?

#### 11-13 Years Old
- How are smartphones manufactured?
- How is chocolate made from beans?
- How are computers built?
- How is electricity generated?
- How are video games created?

#### 14-16 Years Old
- How are electric vehicles designed and built?
- How is artificial intelligence developed?
- How are renewable energy systems created?
- How are medicines developed and tested?
- How are aircraft engineered?

#### 17-18 Years Old
- How does quantum computing work?
- How are vaccines developed using biotechnology?
- How are neural networks trained?
- How is renewable energy infrastructure built?
- How are advanced prosthetics engineered?

## Customization

### Adding New Topics
Edit the `topicsByAge` object in `script.js`:

```javascript
const topicsByAge = {
    '8-10': [
        'Your new topic here?',
        // ... more topics
    ],
    // ... other age groups
};
```

### Changing Colors
Update the CSS variables in `style.css`:

```css
:root {
    --primary-color: #6366f1;  /* Change this */
    --secondary-color: #8b5cf6; /* And this */
    /* ... etc */
}
```

### Modifying Prompts
Edit the prompts in the `generateOutline()`, `generateWriting()`, and `generatePolish()` functions in `script.js` to customize the AI behavior.

## Troubleshooting

### API Connection Issues
- Verify internet connection
- Check browser console for error messages (F12)
- Ensure the API endpoint is accessible
- Verify the API key is correct

### Content Not Loading
- Wait for the loading spinner to complete
- Check browser console for errors
- Try refreshing the page
- Try a different topic

### Download Not Working
- Check browser download settings
- Ensure pop-ups are not blocked
- Try a different browser

## Future Enhancements

- [ ] Save favorite topics
- [ ] User accounts and history
- [ ] Quiz functionality
- [ ] PDF export option
- [ ] Text-to-speech feature
- [ ] Dark mode
- [ ] Multiple language support
- [ ] Difficulty level customization
- [ ] Comment and feedback system

## License

MIT License - Feel free to use and modify!

## About

Created to make learning about everyday items fun, interactive, and educational for ages 8-18. Discover the amazing milestones behind the things you use every day!

---

**Stones That Go For Miles** - Because every everyday item has an amazing story! 🪨✨
