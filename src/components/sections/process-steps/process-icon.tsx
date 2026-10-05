import Image from "next/image";

// Original Figma SVG layers retain their native dimensions inside a 64px slot.
const icons = [
  [
    {
      "name": "imgFrame",
      "left": 0,
      "top": 0,
      "width": 64.0,
      "height": 64.0
    }
  ],
  [
    {
      "name": "imgCapa1",
      "left": 0,
      "top": 0,
      "width": 64.0,
      "height": 64.0
    }
  ],
  [
    {
      "name": "imgGroup",
      "left": 27.94,
      "top": 27.02,
      "width": 28.2502,
      "height": 32.0236
    },
    {
      "name": "imgGroup1",
      "left": 0,
      "top": 0.01,
      "width": 64.0,
      "height": 40.3961
    },
    {
      "name": "imgGroup2",
      "left": 34.09,
      "top": 82.91,
      "width": 20.3761,
      "height": 1.64487
    },
    {
      "name": "imgGroup3",
      "left": 34.09,
      "top": 91.34,
      "width": 20.3761,
      "height": 5.53575
    }
  ],
  [
    {
      "name": "imgGroup4",
      "left": 43.38,
      "top": 5,
      "width": 8.46725,
      "height": 6.39975
    },
    {
      "name": "imgGroup5",
      "left": 14.3,
      "top": 1.13,
      "width": 16.0649,
      "height": 8.87663
    },
    {
      "name": "imgGroup6",
      "left": 60.6,
      "top": 1.13,
      "width": 16.0651,
      "height": 8.87687
    },
    {
      "name": "imgGroup7",
      "left": 0,
      "top": 25,
      "width": 64.0,
      "height": 32.0001
    },
    {
      "name": "imgGroup8",
      "left": 60.6,
      "top": 85,
      "width": 16.0658,
      "height": 8.87725
    },
    {
      "name": "imgGroup9",
      "left": 43.38,
      "top": 85,
      "width": 8.46762,
      "height": 6.40025
    },
    {
      "name": "imgGroup10",
      "left": 14.3,
      "top": 85,
      "width": 16.0658,
      "height": 8.877
    }
  ],
  [
    {
      "name": "imgCapa2",
      "left": 0,
      "top": 0,
      "width": 64.0,
      "height": 64.0
    }
  ],
  [
    {
      "name": "imgGroup11",
      "left": 0.07,
      "top": 0,
      "width": 63.9065,
      "height": 64.0
    }
  ]
] as const;

export function ProcessIcon({ index }: { index: number }) {
  return <div className="relative size-16 shrink-0" aria-hidden="true">
    {icons[index]?.map(layer => <Image key={layer.name} src={`/icons/process/${layer.name}.svg`} alt="" width={layer.width} height={layer.height} className="absolute max-w-none" style={{ left: `${layer.left}%`, top: `${layer.top}%` }} />)}
  </div>;
}
