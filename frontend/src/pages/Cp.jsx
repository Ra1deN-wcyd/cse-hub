import React from 'react';
import './Cp.css';

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
    <div className="cp-container">
      <h1>Top Competitive Programming Platforms</h1>
      <div className="platforms">
        {platforms.map((platform, idx) => (
          <div className="platform-card" key={idx}>
            <a href={platform.link} target="_blank" rel="noopener noreferrer">
              <img src={platform.logo} alt={platform.name} className="platform-logo" />
            </a>
            <p>{platform.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cp;
