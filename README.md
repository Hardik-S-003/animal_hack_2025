# 🐾 Adoptly - Pet Adoption Platform

A modern, responsive pet adoption platform built with Next.js that connects loving families with pets in need. Adoptly features a smart matching system, community feed, and comprehensive pet care cost calculator.

![Adoptly Banner](https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&h=400&fit=crop)

## ✨ Features

### 🏠 **Core Features**
- **Pet Browsing**: Browse available pets with detailed profiles, photos, and stories
- **Smart Matching Quiz**: Lifestyle-based questionnaire that matches users with compatible pets
- **Community Feed**: Share adoption stories, pet updates, and connect with the community
- **Authentication System**: Secure login/signup with user profiles
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 📱 **User Interface**
- **Modern Menu System**: Organized navigation with dropdown menus
- **Interactive Components**: Modal dialogs for authentication and post creation
- **Gradient Design**: Beautiful purple-to-pink gradient themes throughout
- **Glass-morphism Effects**: Modern frosted glass design elements

### 💰 **Pet Care Cost Calculator**
- **Monthly Cost Estimates**: Food, veterinary care, supplies, and grooming costs in Indian Rupees (₹)
- **One-time Setup Costs**: Adoption fees, initial supplies, spay/neuter, and microchipping
- **Financial Planning Tips**: Emergency fund recommendations and pet insurance guidance

### 🧠 **Smart Matching System**
- **Lifestyle Assessment**: Living space, activity level, experience, and time availability
- **Family Considerations**: Kid-friendly pet recommendations
- **Compatibility Scoring**: AI-powered matching algorithm
- **Personalized Results**: Ranked pet recommendations based on user preferences

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Custom Properties
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Form Handling**: Native React form handling
- **Image Optimization**: Next.js Image component
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## 📁 Project Structure

```
adoptly/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx          # Home page
│   ├── api/              # API routes
│   │   ├── match/        # Pet matching algorithm
│   │   ├── pets/         # Pet data endpoints
│   │   └── stories/      # Community stories
│   ├── feed/             # Community feed page
│   ├── pets/             # Pet browsing page
│   └── quiz/             # Pet matching quiz
├── components/           # Reusable components
│   ├── AuthModal.tsx     # Authentication modal
│   ├── CreatePostModal.tsx # Post creation modal
│   ├── Navigation.tsx    # Main navigation component
│   └── ui/              # UI component library
├── lib/                 # Utility functions
│   ├── data.ts          # Mock data and API helpers
│   └── utils.ts         # Utility functions (cn helper)
└── public/             # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hardik-S-003/animal_hack_2025.git
   cd animal_hack_2025/adoptly
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Pages & Features

### 🏡 **Home Page**
- Hero section with call-to-action buttons
- Statistics showcase (500+ adoptions, 50+ shelter partners)
- Direct links to pet browsing and matching quiz

### 🐕 **Pet Browsing (/pets)**
- Grid layout of available pets
- Pet cards with photos, names, ages, and tags
- Interactive buttons for showing interest
- Authentication required for pet interactions
- Filter and search capabilities

### 🧠 **Pet Matching Quiz (/quiz)**
- 5-question lifestyle assessment
- Progress tracking
- Radio button selection with descriptions
- Comprehensive results with:
  - Top 3 pet matches with compatibility scores
  - Detailed cost breakdown in Indian Rupees
  - Financial planning recommendations
- Retake quiz functionality

### 📰 **Community Feed (/feed)**
- User-generated content sharing
- Photo upload functionality
- Story creation modal
- Interactive post actions (like, comment, share)
- Real-time feed updates
- Authentication required for posting

## 🔐 Authentication System

### Features
- **Modal-based Authentication**: Clean, non-intrusive login/signup
- **Dual Mode Forms**: Switch between login and signup seamlessly
- **Form Validation**: Client-side validation with error handling
- **Session Management**: Persistent login state
- **Protected Actions**: Authentication required for posting and pet interactions

### User Flow
1. User clicks on protected action (post creation, pet interest)
2. Authentication modal appears if not logged in
3. User can register or login
4. Upon success, original action proceeds automatically

## 💸 Cost Calculator Features

### Monthly Expenses (in ₹)
- **Food**: ₹2,500 - ₹6,500
- **Veterinary Care**: ₹4,000 - ₹12,000  
- **Supplies & Toys**: ₹1,500 - ₹4,000
- **Grooming**: ₹2,500 - ₹8,000

### One-time Setup Costs (in ₹)
- **Adoption Fee**: ₹4,000 - ₹25,000
- **Initial Supplies**: ₹8,000 - ₹16,000
- **Spay/Neuter**: ₹16,000 - ₹40,000
- **Microchip**: ₹2,000 - ₹4,000

### Financial Recommendations
- Emergency fund: ₹80,000 - ₹1,60,000
- Pet insurance considerations
- Monthly budgeting tips

## 🎨 Design System

### Color Palette
- **Primary**: Purple to Pink gradients (`from-purple-600 to-pink-600`)
- **Secondary**: Blue to Indigo background gradients
- **Accent**: Orange for highlights and CTAs
- **Neutral**: Gray scale for text and borders

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, gradient text effects
- **Body**: Regular weight, optimized line height
- **UI Elements**: Medium weight for buttons and labels

### Components
- **Cards**: Backdrop blur effects with transparency
- **Buttons**: Gradient backgrounds with hover effects
- **Modals**: Centered with backdrop blur
- **Forms**: Clean inputs with focus states

## 🎯 API Endpoints

### Pets (`/api/pets`)
- `GET`: Returns list of available pets with photos and details
- Includes pet information, stories, and adoption status

### Stories (`/api/stories`)
- `GET`: Returns community feed of adoption stories
- `POST`: Creates new story posts with optional photo upload

### Match (`/api/match`)
- `POST`: Processes quiz responses and returns compatible pets
- Includes affordability assessment and recommendations

## 📊 Key Improvements Made

### 🔄 **Recent Updates**
1. **Fixed Styling Issues**: Added PostCSS configuration for proper Tailwind CSS compilation
2. **Enhanced Navigation**: Implemented dropdown menu structure for better organization
3. **Photo Upload**: Working photo upload functionality in community feed
4. **Quiz Functionality**: Fixed next button issues and added proper question navigation
5. **Authentication Flow**: Modal-based authentication for protected actions
6. **Currency Localization**: Changed cost calculator from USD to Indian Rupees (₹)
7. **Responsive Design**: Improved mobile and desktop experiences

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Unsplash** for beautiful pet photography
- **Lucide** for clean, consistent icons
- **Tailwind CSS** for rapid UI development
- **Radix UI** for accessible component primitives
- **Next.js** team for the amazing framework

## Thank You