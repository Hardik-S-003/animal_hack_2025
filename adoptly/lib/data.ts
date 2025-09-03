// In-memory data store for demo purposes

export interface Pet {
  id: number;
  name: string;
  age: number;
  tags: string[];
  story: string;
  photo: string;
}

export interface Story {
  id: number;
  author: string;
  content: string;
  photo?: string;
  timestamp: string;
}

export interface QuizAnswer {
  livingSpace: string;
  activityLevel: string;
  experience: string;
  timeAvailable: string;
  hasKids: boolean;
}

// Mock pet data
export let pets: Pet[] = [
  {
    id: 1,
    name: "Buddy",
    age: 3,
    tags: ["friendly", "kid-friendly", "high-energy", "trained"],
    story: "Buddy is a golden retriever mix who loves playing fetch and swimming. He was rescued from a busy street and has been waiting for a loving family. He's great with children and other dogs!",
    photo: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Luna",
    age: 2,
    tags: ["calm", "apartment-friendly", "low-maintenance", "cuddly"],
    story: "Luna is a gentle cat who loves quiet afternoons by the window. She's perfect for apartment living and enjoys gentle pets and cozy naps. She came to us when her elderly owner could no longer care for her.",
    photo: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Max",
    age: 5,
    tags: ["loyal", "protective", "experienced-owner", "large"],
    story: "Max is a German Shepherd mix with a heart of gold. He needs an experienced owner who can provide him with structure and exercise. He's incredibly loyal and would make an excellent companion for the right family.",
    photo: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Mia",
    age: 1,
    tags: ["playful", "small", "kid-friendly", "energetic"],
    story: "Mia is a young beagle puppy full of energy and curiosity. She loves exploring new places and meeting new people. She's still learning basic commands but is very eager to please and learn.",
    photo: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    name: "Oliver",
    age: 4,
    tags: ["independent", "quiet", "apartment-friendly", "senior-friendly"],
    story: "Oliver is a distinguished orange tabby who prefers the quieter things in life. He's content with his own company but enjoys gentle affection from his humans. Perfect for someone looking for a calm companion.",
    photo: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=400&fit=crop"
  },
  {
    id: 6,
    name: "Bella",
    age: 2,
    tags: ["social", "friendly", "medium-energy", "trained"],
    story: "Bella is a mixed breed with the sweetest temperament. She gets along with everyone she meets - dogs, cats, and humans alike. She knows basic commands and walks well on a leash.",
    photo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop"
  }
];

// Mock adoption stories
export let stories: Story[] = [
  {
    id: 1,
    author: "Sarah M.",
    content: "It's been 6 months since we adopted Charlie from the shelter, and he's brought so much joy to our family! He's learned so many tricks and loves his daily walks in the park. Thank you for helping us find our perfect companion! 🐕❤️",
    photo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
    timestamp: "2024-08-15"
  },
  {
    id: 2,
    author: "Adoptly Shelter",
    content: "Meet our newest arrivals! These three adorable kittens are looking for their forever homes. They're playful, healthy, and ready to bring love to your family. Come visit us this weekend! 🐱",
    photo: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop",
    timestamp: "2024-08-20"
  },
  {
    id: 3,
    author: "Mike & Jenny R.",
    content: "One year update: Luna has settled in beautifully! She's become the queen of our apartment and loves watching birds from her favorite window perch. Best decision we ever made!",
    photo: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400&h=300&fit=crop",
    timestamp: "2024-08-25"
  },
  {
    id: 4,
    author: "Adoptly Shelter",
    content: "Success story alert! 🎉 All five puppies from the Johnson litter have found loving homes! Thank you to everyone who shared their stories and helped spread the word. This is what community looks like!",
    timestamp: "2024-08-28"
  },
  {
    id: 5,
    author: "Emma T.",
    content: "Rocky has been with us for 3 months now and he's thriving! From a scared rescue to a confident, happy dog who loves his daily adventures. The patience and love from the shelter staff made all the difference.",
    photo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    timestamp: "2024-08-30"
  }
];

// Quiz matching logic
export function matchPets(answers: QuizAnswer): Pet[] {
  const scored = pets.map(pet => {
    let score = 0;
    
    // Living space matching
    if (answers.livingSpace === 'apartment' && pet.tags.includes('apartment-friendly')) score += 3;
    if (answers.livingSpace === 'house-small' && !pet.tags.includes('large')) score += 2;
    if (answers.livingSpace === 'house-large') score += 1;
    
    // Activity level matching
    if (answers.activityLevel === 'low' && pet.tags.includes('calm')) score += 3;
    if (answers.activityLevel === 'low' && pet.tags.includes('low-maintenance')) score += 2;
    if (answers.activityLevel === 'medium' && pet.tags.includes('medium-energy')) score += 3;
    if (answers.activityLevel === 'high' && pet.tags.includes('high-energy')) score += 3;
    if (answers.activityLevel === 'high' && pet.tags.includes('energetic')) score += 2;
    
    // Experience matching
    if (answers.experience === 'first-time' && pet.tags.includes('trained')) score += 2;
    if (answers.experience === 'first-time' && !pet.tags.includes('experienced-owner')) score += 1;
    if (answers.experience === 'experienced' && pet.tags.includes('experienced-owner')) score += 3;
    
    // Time available matching
    if (answers.timeAvailable === 'limited' && pet.tags.includes('independent')) score += 2;
    if (answers.timeAvailable === 'moderate' && pet.tags.includes('medium-energy')) score += 1;
    if (answers.timeAvailable === 'lots' && pet.tags.includes('high-energy')) score += 2;
    
    // Kids matching
    if (answers.hasKids && pet.tags.includes('kid-friendly')) score += 3;
    if (!answers.hasKids && pet.tags.includes('quiet')) score += 1;
    
    return { ...pet, matchScore: score };
  });
  
  return scored
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3)
    .map(({ matchScore, ...pet }) => pet);
}