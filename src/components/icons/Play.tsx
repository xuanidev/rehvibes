import { SVGProps } from 'react';

export const Play = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 19 19" {...props} xmlns="http://www.w3.org/2000/svg">
    <path
      fill="url(#gradient)"
      d="M16.6592 0.407227H2.65918C1.54918 0.407227 0.65918 1.29723 0.65918 2.40723V16.4072C0.65918 17.5072 1.55918 18.4072 2.65918 18.4072H16.6592C17.7592 18.4072 18.6592 17.5072 18.6592 16.4072V2.40723C18.6592 1.29723 17.7592 0.407227 16.6592 0.407227ZM7.65918 13.4072V5.40723L12.6592 9.40723"
    />
    <linearGradient id="gradient">
      <stop offset="0%" stopColor="#ffa238" />
      <stop offset="100%" stopColor="#ff662d" />
    </linearGradient>
  </svg>
);

export default Play;
