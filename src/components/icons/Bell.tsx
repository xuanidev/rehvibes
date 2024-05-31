import { SVGProps } from "react";

export const Bell = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
  <path d="M21.7202 19.457V20.457H3.72021V19.457L5.72021 17.457V11.457C5.72021 8.35703 7.75021 5.62703 10.7202 4.74703C10.7202 4.64703 10.7202 4.55703 10.7202 4.45703C10.7202 3.9266 10.9309 3.41789 11.306 3.04282C11.6811 2.66774 12.1898 2.45703 12.7202 2.45703C13.2506 2.45703 13.7594 2.66774 14.1344 3.04282C14.5095 3.41789 14.7202 3.9266 14.7202 4.45703C14.7202 4.55703 14.7202 4.64703 14.7202 4.74703C17.6902 5.62703 19.7202 8.35703 19.7202 11.457V17.457L21.7202 19.457ZM14.7202 21.457C14.7202 21.9875 14.5095 22.4962 14.1344 22.8712C13.7594 23.2463 13.2506 23.457 12.7202 23.457C12.1898 23.457 11.6811 23.2463 11.306 22.8712C10.9309 22.4962 10.7202 21.9875 10.7202 21.457" 
  fill={props.fill}/>
</svg>
)

export default Bell; 