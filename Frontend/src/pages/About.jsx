import Navbar2 from "../components/Navbar2";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar2 />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative py-24 bg-gradient-to-b from-green-900/20 to-black text-center px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Revolutionizing the <span className="text-green-500">Audio Landscape</span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
              PodWave isn't just a platform. It's a global movement redefining how stories, knowledge, and entertainment are consumed in the digital age.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-y border-gray-800 bg-gray-900/50 py-12">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-white mb-2">5M+</h3>
              <p className="text-gray-500 font-medium">Monthly Listeners</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-500 mb-2">150K</h3>
              <p className="text-gray-500 font-medium">Active Creators</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-white mb-2">1.2B</h3>
              <p className="text-gray-500 font-medium">Hours Streamed</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-500 mb-2">120+</h3>
              <p className="text-gray-500 font-medium">Countries Reached</p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Genesis Story</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Founded in a cramped dorm room by a group of passionate audiophiles and frustrated creators, PodWave was born out of a simple necessity: the podcasting industry was broken, heavily fragmented, and completely ignored deep video integration.
              </p>
              <p>
                We spent countless nights engineering a seamless infrastructure capable of handling hyper-speed media delivery. What started as an underground coding project rapidly scaled into an enterprise-grade ecosystem. By 2025, we had secured massive funding rounds from top Silicon Valley venture capitalists.
              </p>
              <p>
                Today, PodWave stands at the absolute pinnacle of streaming technology, wielding advanced recommendation algorithms and empowering thousands of independent creators to build multi-million dollar empires directly from their bedrooms.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4">
               <img src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400" alt="Studio" className="rounded-2xl opacity-80 hover:opacity-100 transition duration-300 shadow-xl border border-gray-800" />
               <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=400" alt="Mic" className="rounded-2xl opacity-80 hover:opacity-100 transition duration-300 shadow-xl border border-gray-800" />
             </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="bg-gray-900 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">The PodWave Philosophy</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-black p-8 rounded-2xl border border-gray-800 hover:border-green-500/50 transition duration-300 shadow-2xl">
                <div className="text-green-500 text-3xl mb-4">🎙️</div>
                <h3 className="text-xl font-bold mb-3">Creator Supremacy</h3>
                <p className="text-gray-400 leading-relaxed">
                  We take exactly 0% of creator tips. We believe the people making the art deserve the lion's share of the revenue. Our dashboard analytics provide military-grade precision on listener demographics.
                </p>
              </div>

              <div className="bg-black p-8 rounded-2xl border border-gray-800 hover:border-green-500/50 transition duration-300 shadow-2xl">
                <div className="text-green-500 text-3xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-3">Blistering Speed</h3>
                <p className="text-gray-400 leading-relaxed">
                  Utilizing a distributed network of quantum-linked edge servers, audio buffering is a relic of the past. If you click play, it plays. Period. Over 99.999% uptime guaranteed globally.
                </p>
              </div>

              <div className="bg-black p-8 rounded-2xl border border-gray-800 hover:border-green-500/50 transition duration-300 shadow-2xl">
                <div className="text-green-500 text-3xl mb-4">🌍</div>
                <h3 className="text-xl font-bold mb-3">Global Community</h3>
                <p className="text-gray-400 leading-relaxed">
                  With interactive timeline comments and a thriving userbase, we've broken the final barrier. Connect seamlessly with brilliant minds from Tokyo, Toronto, and everywhere in between.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Awards */}
        <div className="py-20 text-center px-6">
           <h2 className="text-xl font-bold text-gray-600 mb-10 uppercase tracking-widest text-sm">Recognized By Tech Industry Leaders</h2>
           <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16 opacity-40 grayscale hover:grayscale-0 transition duration-500">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">TechCrunch</span>
              <span className="text-2xl font-bold text-white tracking-tight">Forbes <span className="text-lg font-medium text-gray-300">30u30</span></span>
              <span className="text-2xl font-black font-serif text-white uppercase tracking-tighter">Wired</span>
              <span className="text-xl font-bold text-white border-2 border-white px-2 py-1">WEBBY 2025</span>
           </div>
        </div>

      </div>
    </div>
  );
};

export default About;
