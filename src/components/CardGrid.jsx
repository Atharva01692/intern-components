import { useEffect } from 'react';
import './CardGrid.css';

const CardGrid = () => {
  const cardData = [
    {
      icon: '🚀',
      title: 'Innovation Hub',
      description: 'Explore cutting-edge technologies and breakthrough innovations that shape the future of digital experiences.',
      tag: 'Technology'
    },
    {
      icon: '🎨',
      title: 'Creative Studio',
      description: 'Unleash your creativity with powerful design tools and inspiration from the global creative community.',
      tag: 'Design'
    },
    {
      icon: '📊',
      title: 'Analytics Pro',
      description: 'Transform raw data into actionable insights with advanced analytics and visualization tools.',
      tag: 'Data'
    },
    {
      icon: '🌟',
      title: 'Premium Features',
      description: 'Access exclusive premium features designed to enhance your productivity and workflow efficiency.',
      tag: 'Premium'
    },
    {
      icon: '🔒',
      title: 'Security Shield',
      description: 'Enterprise-grade security solutions to protect your data and maintain complete privacy control.',
      tag: 'Security'
    },
    {
      icon: '⚡',
      title: 'Performance Boost',
      description: 'Optimize your applications with lightning-fast performance and seamless user experiences.',
      tag: 'Performance'
    },
    {
      icon: '🌍',
      title: 'Global Network',
      description: 'Connect with users worldwide through our robust global infrastructure and content delivery.',
      tag: 'Network'
    },
    {
      icon: '🎯',
      title: 'Goal Tracker',
      description: 'Set, track, and achieve your objectives with intelligent goal management and progress insights.',
      tag: 'Productivity'
    },
    {
      icon: '💡',
      title: 'Smart Solutions',
      description: 'AI-powered recommendations and automated workflows to streamline your daily operations.',
      tag: 'AI'
    }
  ];

  useEffect(() => {
    const initializeGrid = () => {
      const cards = document.querySelectorAll('.card');
      
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          
          card.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });

        card.addEventListener('click', () => {
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.transform = '';
          }, 150);
        });
      });
    };

    initializeGrid();

    const handleScroll = () => {
      const cards = document.querySelectorAll('.card');
      const scrolled = window.pageYOffset;
      
      cards.forEach((card, index) => {
        const rate = scrolled * -0.1 * (index % 3 + 1);
        card.style.transform = `translateY(${rate}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="title">Interactive Card Grid</h1>
      <div className="grid" id="cardGrid">
        {cardData.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-icon">{card.icon}</div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
            <div className="card-footer">
              <span className="card-tag">{card.tag}</span>
              <span className="card-arrow">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;