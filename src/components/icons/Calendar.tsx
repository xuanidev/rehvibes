import { SVGProps } from "react";

export const Calendar = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 20V9H5V20H19ZM16 2H18V4H19C19.5304 4 20.0391 4.21071 20.4142 4.58579C20.7893 4.96086 21 5.46957 21 6V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C3.89 22 3 21.1 3 20V6C3 4.89 3.89 4 5 4H6V2H8V4H16V2ZM7 11H9V13H7V11ZM15 11H17V13H15V11ZM11 15H13V17H11V15ZM15 15H17V17H15V15Z"
      fill={props.fill}
    />
  </svg>
);

export default Calendar;
