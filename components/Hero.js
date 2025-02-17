// Removed unused imports 'Image', 'TestimonialsAvatars', and 'config'

const Hero = () => {
  return (
<section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20 mt-16">

      
      <div className="relative mx-auto max-w-7xl flex flex-col items-center justify-center gap-6">
  <a href="/pricing">
    <span className="text-white py-1 pl-2 pr-3 rounded-xl bg-green-600 text-sm font-bold flex flex-row gap-2 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 inline">
        <path d="M4.5 2A2.5 2.5 0 0 0 2 4.5v3.879a2.5 2.5 0 0 0 .732 1.767l7.5 7.5a2.5 2.5 0 0 0 3.536 0l3.878-3.878a2.5 2.5 0 0 0 0-3.536l-7.5-7.5A2.5 2.5 0 0 0 8.38 2H4.5ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path>
      </svg>
      50% Limited Time Discount
    </span>
  </a>
  <h1 className="text-slate-800 dark:text-black text-5xl leading-[3.5rem] lg:text-6xl lg:leading-tight xl:text-[5rem] xl:leading-[5.6rem] font-bold mx-auto max-w-4xl text-center">
    Streamline Your Tasks Effortlessly with FlowlyTasker
  </h1>
  <p className="font-medium text-lg text-slate-500 dark:text-slate-300 leading-relaxed mx-auto max-w-md text-center">
    Empower your productivity with task automation, seamless integrations, and a user-friendly interface.
  </p>
  <div className="flex flex-row flex-wrap items-center justify-center gap-3 mt-3">
    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-white h-10 px-4 text-base">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
  <path d="M5 12h14m-7-7l7 7-7 7"></path>
</svg>
      Try for Free
    </button>
    <a href="/auth/signin">
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white shadow hover:bg-green-500 h-10 px-4 text-base">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"></path>
</svg>
        Get Started
      </button>
    </a>
  </div>
</div>

    </section>
  );
};

export default Hero;
