import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Code, Palette, Brain, Zap, Award } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  progress: number;
  maxLevel: number;
  category: 'technical' | 'creative' | 'soft';
  icon: React.ReactNode;
  description: string;
  achievements: string[];
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  requirement: number;
}

const SkillProgressDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [animatedProgress, setAnimatedProgress] = useState<{ [key: string]: number }>({});

  const skills: Skill[] = [
    {
      id: 'react',
      name: 'React Development',
      progress: 85,
      maxLevel: 100,
      category: 'technical',
      icon: <Code className="w-6 h-6" />,
      description: 'Building modern web applications with React, hooks, and state management',
      achievements: ['Component Master', 'Hook Specialist', 'State Wizard']
    },
    {
      id: 'design',
      name: 'UI/UX Design',
      progress: 72,
      maxLevel: 100,
      category: 'creative',
      icon: <Palette className="w-6 h-6" />,
      description: 'Creating beautiful and intuitive user interfaces with modern design principles',
      achievements: ['Design Thinking', 'Color Theory Expert']
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      progress: 78,
      maxLevel: 100,
      category: 'technical',
      icon: <Target className="w-6 h-6" />,
      description: 'Type-safe JavaScript development with advanced TypeScript patterns',
      achievements: ['Type Safety Advocate', 'Generic Master']
    },
    {
      id: 'problem-solving',
      name: 'Problem Solving',
      progress: 90,
      maxLevel: 100,
      category: 'soft',
      icon: <Brain className="w-6 h-6" />,
      description: 'Analytical thinking and creative solution finding for complex challenges',
      achievements: ['Logic Master', 'Creative Thinker', 'Solution Architect']
    },
    {
      id: 'performance',
      name: 'Performance Optimization',
      progress: 65,
      maxLevel: 100,
      category: 'technical',
      icon: <Zap className="w-6 h-6" />,
      description: 'Optimizing applications for speed, efficiency, and user experience',
      achievements: ['Speed Demon', 'Optimization Expert']
    },
    {
      id: 'leadership',
      name: 'Team Leadership',
      progress: 82,
      maxLevel: 100,
      category: 'soft',
      icon: <Star className="w-6 h-6" />,
      description: 'Leading teams, mentoring developers, and driving project success',
      achievements: ['Team Builder', 'Mentor', 'Project Leader']
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 'first-steps',
      name: 'First Steps',
      description: 'Complete your first skill milestone',
      icon: <Award className="w-5 h-5" />,
      unlocked: true,
      requirement: 50
    },
    {
      id: 'skill-master',
      name: 'Skill Master',
      description: 'Reach 80% in any skill',
      icon: <Trophy className="w-5 h-5" />,
      unlocked: true,
      requirement: 80
    },
    {
      id: 'well-rounded',
      name: 'Well Rounded',
      description: 'Reach 70% in all skill categories',
      icon: <Star className="w-5 h-5" />,
      unlocked: false,
      requirement: 70
    }
  ];

  const categories = [
    { id: 'all', name: 'All Skills', count: skills.length },
    { id: 'technical', name: 'Technical', count: skills.filter(s => s.category === 'technical').length },
    { id: 'creative', name: 'Creative', count: skills.filter(s => s.category === 'creative').length },
    { id: 'soft', name: 'Soft Skills', count: skills.filter(s => s.category === 'soft').length }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getSkillLevel = (progress: number): string => {
    if (progress >= 90) return 'Expert';
    if (progress >= 75) return 'Advanced';
    if (progress >= 50) return 'Intermediate';
    if (progress >= 25) return 'Beginner';
    return 'Novice';
  };

  const getLevelColor = (progress: number): string => {
    if (progress >= 90) return 'text-yellow-400';
    if (progress >= 75) return 'text-blue-400';
    if (progress >= 50) return 'text-green-400';
    if (progress >= 25) return 'text-orange-400';
    return 'text-gray-400';
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    
    skills.forEach((skill, index) => {
      const timer = setTimeout(() => {
        setAnimatedProgress(prev => ({
          ...prev,
          [skill.id]: skill.progress
        }));
      }, index * 200);
      timers.push(timer);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skill Progress Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your development journey with interactive progress visualization and achievement unlocks
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm border ${
                selectedCategory === category.id
                  ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20 hover:border-white/30'
              }`}
            >
              <span className="font-medium">{category.name}</span>
              <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.id}
              className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                    {skill.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                    <span className={`text-sm font-medium ${getLevelColor(skill.progress)}`}>
                      {getSkillLevel(skill.progress)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {animatedProgress[skill.id] || 0}%
                  </div>
                  <div className="text-xs text-gray-400">/ {skill.maxLevel}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${animatedProgress[skill.id] || 0}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {skill.description}
              </p>

              {/* Achievements */}
              <div className="flex flex-wrap gap-2">
                {skill.achievements.map((achievement, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-xs text-yellow-300 backdrop-blur-sm"
                  >
                    {achievement}
                  </span>
                ))}
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <Trophy className="w-8 h-8 mr-3 text-yellow-400" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50 shadow-lg shadow-yellow-500/20'
                    : 'bg-gray-800/50 border-gray-600/50'
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-lg mr-3 ${
                    achievement.unlocked ? 'bg-yellow-500/30 text-yellow-300' : 'bg-gray-600/30 text-gray-400'
                  }`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`font-semibold ${
                    achievement.unlocked ? 'text-yellow-300' : 'text-gray-400'
                  }`}>
                    {achievement.name}
                  </h3>
                </div>
                <p className={`text-sm ${
                  achievement.unlocked ? 'text-yellow-200' : 'text-gray-500'
                }`}>
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <div className="mt-3 flex items-center text-xs text-yellow-400">
                    <Star className="w-4 h-4 mr-1" />
                    Unlocked!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {Math.round(skills.reduce((acc, skill) => acc + skill.progress, 0) / skills.length)}%
            </div>
            <div className="text-gray-300">Average Progress</div>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {skills.filter(skill => skill.progress >= 80).length}
            </div>
            <div className="text-gray-300">Expert Skills</div>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {achievements.filter(a => a.unlocked).length}
            </div>
            <div className="text-gray-300">Achievements</div>
          </div>
          <div className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {skills.length}
            </div>
            <div className="text-gray-300">Total Skills</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillProgressDashboard;