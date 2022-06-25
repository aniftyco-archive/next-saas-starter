import { FunctionComponent } from 'react';

export const HelloWorld: FunctionComponent = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h2 className="p-3 my-8 text-lg font-bold text-white bg-purple-700 rounded-lg md:text-2xl">
      Hi! Welcome to your first Next.js &amp; Tailwind CSS site.
    </h2>
  </div>
);
