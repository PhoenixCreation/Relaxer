import * as React from "react";
import Svg, { Circle, Ellipse, Path, Rect, Line } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */

function PrivacyProtectionSvg(props) {
  const color = props.color ? props.color : "##ff8233";
  return (
    <Svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width={921.67}
      height={831.295}
      viewBox="0 0 921.67 831.295"
      {...props}
    >
      <Circle cx={436.469} cy={576.556} r={216.462} fill="#f2f2f2" />
      <Circle cx={320} cy={520} r={35} fill={color} />
      <Path d="M 285 520 l 35 50 l 35 -50Z" fill={color} y={8} />
      <Circle cx={320} cy={520} r={13} fill="#f2f2f2" />
      <Line
        x1={280}
        y1={480}
        x2={360}
        y2={570}
        strokeWidth={10}
        stroke="#3f3d56"
        opacity={0.7}
      />
      <Rect
        x={530}
        y={580}
        width={100}
        height={100}
        rx={20}
        ry={10}
        fill={color}
      />
      <Circle cx={580} cy={580} r={30} strokeWidth={10} stroke={color} />
      <Circle cx={580} cy={615} r={18} fill="#f2f2f2" />
      <Rect
        x={572.5}
        y={612}
        width={15}
        height={50}
        rx={20}
        ry={20}
        fill="#f2f2f2"
      />
      <Ellipse
        cx={405.89}
        cy={803.234}
        rx={205.412}
        ry={28.061}
        fill="#3f3d56"
      />
      <Ellipse
        cx={550.935}
        cy={262.308}
        rx={14.54}
        ry={7.058}
        transform="rotate(-18.58 376.348 670.517)"
        fill="#3f3d56"
      />
      <Path
        d="M382.295 260.126l76.275-34.754s129.222-48.843 239.765 70.385c0 0-49.542-31.803-87.094 10.207 0 0-70.662-19.117-129.96 51.124 0 0-92.748 14.045-131.376 63.265 0 0-43.064-6.622-60.204 47.97a1.637 1.637 0 01-2.71.675 1.627 1.627 0 01-.46-.859c-1.609-8.437-20.549-120.986 95.764-208.013z"
        fill={color}
      />
      <Path
        d="M382.295 260.126l76.275-34.754s129.222-48.843 239.765 70.385c0 0-49.542-31.803-87.094 10.207 0 0-70.662-19.117-129.96 51.124 0 0-92.748 14.045-131.376 63.265 0 0-43.064-6.622-60.204 47.97a1.637 1.637 0 01-2.71.675 1.627 1.627 0 01-.46-.859c-1.609-8.437-20.549-120.986 95.764-208.013z"
        opacity={0.2}
      />
      <Path
        fill="#2f2e41"
        d="M405.524 404.125l31.761 5.294 10.587-50.289-25.585-10.587-16.763 55.582z"
      />
      <Circle cx={449.196} cy={366.629} r={27.35} fill="#a0616a" />
      <Path
        d="M437.285 382.069s2.647 33.525-17.645 36.172 17.645 62.64 27.35 61.758 27.35-65.287 27.35-65.287-22.939-15.88-14.998-29.997zM403.318 504.261s3.53 25.586 14.116 25.586-7.058-29.115-7.058-29.115zM557.713 529.847s26.468 22.056 22.939 29.114-26.468-7.94-28.232-25.585zM398.025 614.543l-16.763 62.64-18.528 75.875h17.646s6.175-23.821 17.645-36.173c0 0 11.47-19.41 11.47-32.643l27.35-64.405zM470.37 618.073l5.293 59.11s-.882 42.35 0 52.054 0 23.82 0 23.82h15.881s14.998-52.052 10.587-80.284l6.176-66.17z"
        fill="#a0616a"
      />
      <Path
        d="M449.196 455.737s-23.77-18.837-17.62-45.15c0 0-23.846 1.037-33.551 10.742s2.647 42.349 2.647 42.349 21.174 35.29 17.645 51.17-41.466 99.696-29.115 104.989 87.344 23.821 125.28-7.058c0 0 9.706-87.343-29.114-115.576v-22.056s7.058-6.176 3.53-22.057c0 0 14.998-27.35 6.175-32.643s-29.089-13.051-29.089-13.051 1.74 39.519-16.788 48.341z"
        fill="#2f2e41"
      />
      <Path
        d="M403.318 421.33s-11.47-1.765-22.938 14.998-41.466 43.23-27.35 56.464 52.053 22.056 52.053 22.056l8.822-15.88-37.937-18.528 31.762-23.82zM490.662 421.33s12.351 0 17.645 14.998 36.172 66.169 36.172 66.169l17.646 27.35-12.352 14.116-34.408-38.82-32.644-53.817zM383.909 751.293h-24.704l-5.293 43.231s-14.116 22.939 7.058 20.292 14.116-26.468 14.116-26.468l5.294-8.822 1.764 18.527 1.765-.882v-20.292s9.704-8.823 0-25.586zM495.955 751.293l-22.938-1.764-4.412 49.406s-2.646 18.528 13.234 15.88 10.587-17.644 10.587-17.644v-27.35zM429.345 338.838s-12.853 4.284-13.506 21.204a30.011 30.011 0 00.892 8.035c.724 3.067 1.19 9.667-4.42 18.29a181.064 181.064 0 00-10.276 17.678l-.04.08 14.116 1.765 3.002-23.399a116.515 116.515 0 019.252-32.848l.098-.218s6.175 11.47 18.527 11.47l-4.411-4.412s19.41 7.94 26.467 7.94c0 0 5.294 3.53 0 8.823s-15.88 17.645-9.704 27.35.882 12.352.882 12.352l9.705-5.294 4.411-2.647v3.53l22.939-2.647s6.175-.883-7.058-15.881c0 0-3.495-5.824-1.966-10.848a25.339 25.339 0 00.963-11.85c-2.965-16.54-14.597-49.422-59.873-28.473z"
        fill="#2f2e41"
      />
      <Path
        d="M567.308 557.397c8.73-8.878-.94-27.263-1.695-28.661l-99.702-203.594a2.596 2.596 0 00-4.663 2.284L561 531.12l.028.051c.1.182 9.726 18.466 1.152 23.705-9.234 5.645-20.002-3.5-20.11-3.594a2.596 2.596 0 10-3.393 3.929c.557.48 13.78 11.695 26.211 4.094a12.575 12.575 0 002.42-1.908z"
        fill="#3f3d56"
      />
      <Path
        d="M375.163 245.528l73.873-33.66s125.154-47.306 232.217 68.17c0 0-47.982-30.802-84.352 9.885 0 0-68.437-18.515-125.87 49.514 0 0-89.827 13.603-127.239 61.274 0 0-43.007-6.614-59.06 48.954l-2.221-2.184s-24.455-114.333 92.652-201.953z"
        fill={color}
      />
      <Path
        d="M375.527 245.319s-36.172 121.751-31.761 155.277M413.757 227.943s45.585 102.955 57.054 111.777M448.755 211.793s117.34 70.58 148.219 78.52M272.342 798.546c-.212-.346-5.212-8.695-6.945-26.03-1.59-15.904-.568-42.712 13.335-80.106 26.339-70.841-6.07-128-6.4-128.57l1.598-.927c.084.144 8.447 14.717 13.387 37.923a165.447 165.447 0 01-6.852 92.218c-26.294 70.72-6.746 104.2-6.546 104.53z"
        fill="#3f3d56"
      />
      <Circle cx={262.043} cy={547.669} r={12.012} fill="#3f3d56" />
      <Circle cx={299.926} cy={592.02} r={12.012} fill="#3f3d56" />
      <Circle cx={274.055} cy={621.587} r={12.012} fill={color} />
      <Circle cx={305.469} cy={646.534} r={12.012} fill={color} />
      <Circle cx={264.815} cy={685.34} r={12.012} fill="#3f3d56" />
      <Path
        d="M279.598 798.988s-12.011-29.567 24.023-51.742zM264.826 798.452s-5.467-31.442-47.777-31.173zM191.762 0l42.279 23.132-81.918 54.254-39.187-25.851L191.762 0zM90.089 73.493L0 131.572l41.837 24.865 90.055-60.119-41.803-22.825z"
        fill="#3f3d56"
      />
      <Path
        d="M106.67 44.667a35.508 35.508 0 00-19.113 24.204 10.494 10.494 0 003.442 10.498l26.044 21.995a12.072 12.072 0 0013.651 1.317c10.59-5.872 27.594-18.199 20.001-33.81a10.792 10.792 0 00-3.76-4.27L117.91 45.408a11.33 11.33 0 00-11.239-.74z"
        fill="#d0cde1"
      />
      <Ellipse
        cx={301.389}
        cy={130.984}
        rx={42.841}
        ry={29.094}
        transform="rotate(-53.33 197.604 252.367)"
        fill="#3f3d56"
      />
      <Path
        d="M148.963 130.507c5.28 3.934 17.84-3.822 29.13-17.579q1.5-1.824 2.965-3.789 1.073-1.443 2.069-2.885c10.468-15.126 14.606-29.962 9.199-33.988-5.447-4.057-18.625 4.312-30.178 18.871q-.968 1.224-1.917 2.497a98.897 98.897 0 00-6.057 9.14c-7.446 12.78-9.866 24.264-5.211 27.733z"
        opacity={0.2}
      />
      <Path
        d="M154.174 102.773l23.918 10.155 17.113 7.265 2.531-3.416-14.61-10.523-20.978-15.117q-.968 1.224-1.917 2.497a98.897 98.897 0 00-6.057 9.14z"
        fill="#d0cde1"
      />
      <Circle cx={199.844} cy={120.82} r={5.199} fill="#d0cde1" />
      <Path
        d="M201.37 175.74a2.482 2.482 0 011.176-.6c28.002-5.786 45.622-21.91 53.865-49.29a2.491 2.491 0 014.771 1.436c-8.696 28.887-28.085 46.628-57.628 52.733a2.491 2.491 0 01-2.184-4.28zM194.478 154.062a2.477 2.477 0 011.176-.6c20.997-4.338 34.208-16.427 40.388-36.956a2.491 2.491 0 014.771 1.436c-6.663 22.131-21.516 35.723-44.15 40.4a2.491 2.491 0 01-2.185-4.28zM211.552 197.937a2.477 2.477 0 011.176-.6c27.945-5.774 58.504-33.736 66.73-61.06a2.491 2.491 0 014.77 1.436c-8.689 28.865-40.97 58.404-70.492 64.503a2.491 2.491 0 01-2.184-4.279z"
        fill={color}
      />
      <Path
        fill="#3f3d56"
        d="M729.909 0L687.63 23.132l81.917 54.254 39.187-25.851L729.909 0zM831.582 73.493l90.088 58.079-41.837 24.865-90.054-60.119 41.803-22.825z"
      />
      <Path
        d="M815 44.667a35.508 35.508 0 0119.113 24.204 10.494 10.494 0 01-3.441 10.498l-26.045 21.995a12.072 12.072 0 01-13.65 1.317c-10.59-5.872-27.595-18.199-20.002-33.81a10.792 10.792 0 013.76-4.27l29.026-19.194a11.33 11.33 0 0111.24-.74z"
        fill="#d0cde1"
      />
      <Ellipse
        cx={898.611}
        cy={130.984}
        rx={29.094}
        ry={42.841}
        transform="rotate(-36.67 777.198 323.777)"
        fill="#3f3d56"
      />
      <Path
        d="M772.708 130.507c-5.28 3.934-17.84-3.822-29.13-17.579q-1.5-1.824-2.965-3.789-1.074-1.443-2.07-2.885c-10.467-15.126-14.605-29.962-9.198-33.988 5.446-4.057 18.625 4.312 30.178 18.871q.967 1.224 1.916 2.497a98.897 98.897 0 016.058 9.14c7.446 12.78 9.866 24.264 5.21 27.733z"
        opacity={0.2}
      />
      <Path
        d="M767.497 102.773l-23.919 10.155-17.113 7.265-2.53-3.416 14.609-10.523 20.979-15.117q.967 1.224 1.916 2.497a98.897 98.897 0 016.058 9.14z"
        fill="#d0cde1"
      />
      <Circle cx={721.826} cy={120.82} r={5.199} fill="#d0cde1" />
      <Path
        d="M720.3 175.74a2.482 2.482 0 00-1.175-.6c-28.003-5.786-45.623-21.91-53.866-49.29a2.491 2.491 0 00-4.77 1.436c8.696 28.887 28.084 46.628 57.628 52.733a2.491 2.491 0 002.184-4.28zM727.192 154.062a2.477 2.477 0 00-1.176-.6c-20.996-4.338-34.207-16.427-40.388-36.956a2.491 2.491 0 00-4.77 1.436c6.662 22.131 21.516 35.723 44.15 40.4a2.491 2.491 0 002.184-4.28zM710.119 197.937a2.477 2.477 0 00-1.177-.6c-27.945-5.774-58.504-33.736-66.73-61.06a2.491 2.491 0 00-4.77 1.436c8.69 28.865 40.971 58.404 70.493 64.503a2.491 2.491 0 002.184-4.279z"
        fill={color}
      />
    </Svg>
  );
}

export default PrivacyProtectionSvg;
