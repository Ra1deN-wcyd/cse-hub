import React from 'react';

const platforms = [
  {
    name: 'Codeforces',
    logo: 'https://sta.codeforces.com/s/27477/images/codeforces-logo-with-telegram.png',
    link: 'https://codeforces.com/',
  },
  {
    name: 'AtCoder',
    logo: 'https://img.atcoder.jp/assets/top/img/logo_text_2.png',
    link: 'https://atcoder.jp/',
  },
  {
    name: 'CodeChef',
    logo: 'https://s3.amazonaws.com/codechef_shared/sites/all/themes/abessive/cc-logo.png',
    link: 'https://www.codechef.com/',
  },
  {
    name: 'LeetCode',
    logo: 'https://leetcode.com/static/images/LeetCode_logo.png',
    link: 'https://leetcode.com/',
  },
  {
    name: 'HackerRank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png',
    link: 'https://www.hackerrank.com/',
  },
  {
    name: 'HackerEarth',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/HackerEarth_logo.png',
    link: 'https://www.hackerearth.com/',
  },
  {
    name: 'TopCoder',
    logo: 'https://www.topcoder.com/wp-content/uploads/2021/02/topcoder-logo-1-300x47.png',
    link: 'https://www.topcoder.com/',
  },
  {
    name: 'CS Academy',
    logo: 'https://csacademy.com/static/logo/logo_csacademy_black.png',
    link: 'https://csacademy.com/',
  },
  {
    name: 'SPOJ',
    logo: 'https://www.spoj.com/gfx/2017e/spoj255x60.png',
    link: 'https://www.spoj.com/',
  },
  {
    name: 'UVa Online Judge',
    logo: 'https://onlinejudge.org/images/oj-logo3.png',
    link: 'https://onlinejudge.org/',
  },
];

const Cp = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '2rem',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(240, 147, 251, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(79, 172, 254, 0.2) 0%, transparent 50%)
          `,
          animation: 'float 20s ease-in-out infinite'
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{
            textAlign: 'center',
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          💻 Top Competitive Programming Platforms
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            padding: '2rem'
          }}
        >
          {platforms.map((platform, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-10px)';
                e.target.style.boxShadow = '0 15px 40px 0 rgba(31, 38, 135, 0.5)';
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <a
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block'
                }}
              >
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    margin: '0 auto 1.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    style={{
                      maxWidth: '100px',
                      maxHeight: '80px',
                      objectFit: 'contain',
                      filter: 'brightness(1.2) contrast(1.1)'
                    }}
                  />
                </div>
                <p
                  style={{
                    color: '#fff',
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    margin: 0,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {platform.name}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Cp;
