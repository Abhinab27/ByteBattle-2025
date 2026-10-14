import { Mail } from 'lucide-react'
import React from 'react'
import SplineBackground from './ui/SplineBackground'
import { InfiniteSlider } from './ui/infinite-slider'
import { FlipWords } from './ui/flip-words'
import { ProgressiveBlur } from './ui/progressive-blur'
import ArrowDown from './ui/arrow-down'

function Hero() {

  const words = ["<CODE/>", "<COMPETE/>", "<CONQUER/>"];

  return(
    <main className='overflow-x-hidden'>
      <section className="h-[calc(100vh-80px)] mt-25 flex items-center justify-center px-4">
        <div className="w-full max-w-[95vw] xl:max-w-[92vw] 2xl:max-w-[88vw] mx-auto">
          {/* Glass Effect Container */}
          <div className="relative backdrop-blur-lg bg-black/30 border border-red-500/30 rounded-3xl shadow-2xl shadow-red-500/10 p-8 md:p-12 lg:p-16">
            
            {/* Top Left Pin */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg transform rotate-12">
              <div className="absolute inset-1 bg-gradient-to-br from-red-400 to-red-600 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {/* Top Right Pin */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-bl from-red-600 to-red-800 rounded-full shadow-lg transform -rotate-12">
              <div className="absolute inset-1 bg-gradient-to-bl from-red-500 to-red-700 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {/* Bottom Left Pin */}
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-tr from-red-700 to-red-900 rounded-full shadow-lg transform -rotate-12">
              <div className="absolute inset-1 bg-gradient-to-tr from-red-600 to-red-800 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {/* Bottom Right Pin */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-tl from-red-500 to-red-700 rounded-full shadow-lg transform rotate-12">
              <div className="absolute inset-1 bg-gradient-to-tl from-red-400 to-red-600 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {/* Pin Shadow Effects*/}
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-500/30 rounded-full blur-sm"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600/30 rounded-full blur-sm"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-red-700/30 rounded-full blur-sm"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500/30 rounded-full blur-sm"></div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative">
                
                {/* Separator*/}
                <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="flex flex-col items-center space-y-8">
                    {/*vertical line*/}
                    <div className="w-px h-40 bg-gradient-to-b from-transparent via-red-400/40 to-transparent"></div>
                    
                    {/* Center */}
                    <div className="relative">
                      {/* Subtle outer glow - Red */}
                      <div className="absolute -inset-3 bg-red-500/10 rounded-full blur-xl"></div>
                      
                      {/* Main hexagon container */}
                      <div className="relative w-12 h-12 transform rotate-45">
                        {/* Hexagon shape using border */}
                        <div className="w-full h-full border border-red-400/50 bg-black/60 backdrop-blur-sm shadow-lg shadow-red-500/20">
                          {/* Inner rotating element */}
                          <div className="absolute inset-1 border border-red-500/40 animate-spin [animation-duration:8s]"></div>
                          
                          {/* Center dot */}
                          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-500 transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                        
                        {/* Corner indicators */}
                        <div className="absolute -top-0.5 left-1/2 w-1 h-1 bg-red-300/70 transform -translate-x-1/2"></div>
                        <div className="absolute -bottom-0.5 left-1/2 w-1 h-1 bg-red-300/70 transform -translate-x-1/2"></div>
                        <div className="absolute top-1/2 -left-0.5 w-1 h-1 bg-red-300/70 transform -translate-y-1/2"></div>
                        <div className="absolute top-1/2 -right-0.5 w-1 h-1 bg-red-300/70 transform -translate-y-1/2"></div>
                      </div>
                      
                      {/* Grid  */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-6 left-1/2 w-4 h-px bg-red-400/30 transform -translate-x-1/2"></div>
                        <div className="absolute -bottom-6 left-1/2 w-4 h-px bg-red-400/30 transform -translate-x-1/2"></div>
                        <div className="absolute top-1/2 -left-6 h-4 w-px bg-red-400/30 transform -translate-y-1/2"></div>
                        <div className="absolute top-1/2 -right-6 h-4 w-px bg-red-400/30 transform -translate-y-1/2"></div>
                      </div>
                    </div>
                    
                    {/* Bottom vertical line */}
                    <div className="w-px h-40 bg-gradient-to-b from-transparent via-red-400/40 to-transparent"></div>
                  </div>
                </div>
                
                {/* Left Side Text */}
                <div className="space-y-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-red-100 leading-tight">
                    Welcome To 
                    <br/> 
                    BYTE BATTLE
                    <br/>
                    <span className="text-white ml-40">X</span>
                    <br/>
                    <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                      NIT SILCHAR
                    </span>
                  </h1>
                  
                  {/* Description */}
                  <div className="space-y-4">
                    <div className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-white to-red-200 tracking-wide">
                      <FlipWords words={words} className="text-white font-bold" />
                    </div>
                    
                    <p className="text-base md:text-lg text-gray-300/90 max-w-lg leading-relaxed font-medium">
                      Join the ultimate 48-hour coding marathon where{" "}
                      <span className="text-red-400 font-semibold">innovation meets excellence</span>{" "}
                      and ideas transform into reality.
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500/20 to-red-700/20 border border-red-400/40 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-300 font-medium">48H Challenge</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-black/40 to-red-900/30 border border-red-500/30 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-200 font-medium">₹1L+ Prizes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side 3D model */}
                <div className="relative h-80 md:h-96 lg:h-[500px] w-full overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none select-none">
                    <SplineBackground/>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Infinite Slider */}
        <section className="py-16 md:py-24">
          <div className="relative max-w-6xl mx-auto px-6">
            {/* Tech Container */}
            <div className="relative bg-gradient-to-br from-black/80 via-red-900/10 to-black/80 border-2 border-red-500/40 rounded-2xl shadow-2xl overflow-hidden">
              
              {/* Animated Corner Lights */}
              <div className="absolute top-0 left-0 w-4 h-4 bg-red-500 opacity-70 animate-ping" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-0 right-0 w-4 h-4 bg-red-400 opacity-70 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-red-600 opacity-70 animate-ping" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 opacity-70 animate-ping" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Tech Border Effects */}
              <div className="absolute inset-0 border-2 border-red-500/20 rounded-2xl"></div>
              <div className="absolute inset-1 border border-red-400/30 rounded-xl"></div>
              
              {/* Circuit Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-16 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
                <div className="absolute top-4 right-4 w-16 h-px bg-gradient-to-l from-red-500/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 w-16 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
                <div className="absolute bottom-4 right-4 w-16 h-px bg-gradient-to-l from-red-500/50 to-transparent"></div>
                <div className="absolute top-4 left-4 h-16 w-px bg-gradient-to-b from-red-500/50 to-transparent"></div>
                <div className="absolute top-4 right-4 h-16 w-px bg-gradient-to-b from-red-500/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 h-16 w-px bg-gradient-to-t from-red-500/50 to-transparent"></div>
                <div className="absolute bottom-4 right-4 h-16 w-px bg-gradient-to-t from-red-500/50 to-transparent"></div>
              </div>

              {/* Side Tech Indicators */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <div className="flex flex-col space-y-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </div>
              
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                <div className="flex flex-col space-y-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                </div>
              </div>

              <div className="relative z-10 p-8 md:p-12">
                <div className="text-center space-y-6">
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-red-100">
                    Powered by{" "}
                    <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                      Innovation
                    </span>
                  </h3>

                  {/* Slider Container */}
                  <div className="relative overflow-hidden py-8">
                    <InfiniteSlider speedOnHover={30} speed={50} gap={120}>
                      <div className="flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent whitespace-nowrap">
                          NIT SILCHAR
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent whitespace-nowrap">
                          X
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent whitespace-nowrap">
                          BYTE BATTLE
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent whitespace-nowrap">
                          2026
                        </span>
                      </div>
                      <div className="flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent whitespace-nowrap">
                          HACKATHON
                        </span>
                      </div>
                    </InfiniteSlider>

                    {/* Enhanced Progressive Blur Overlays */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black via-black/60 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black via-black/60 to-transparent pointer-events-none"></div>
                    
                    <ProgressiveBlur
                      className="pointer-events-none absolute left-0 top-0 h-full w-24"
                      direction="left"
                      blurIntensity={3}
                    />
                    <ProgressiveBlur
                      className="pointer-events-none absolute right-0 top-0 h-full w-24"
                      direction="right"
                      blurIntensity={3}
                    />
                  </div>
                </div>
              </div>

              {/* Subtle Hexagon Tech Pattern */}
              <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(255,0,0,0.15)_2px,transparent_2px),radial-gradient(circle_at_75%_75%,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:60px_60px,40px_40px]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}
        <section id="about" className="relative py-24 px-6 md:px-12 overflow-hidden">
          
          <div className="relative z-10 max-w-6xl mx-auto">
            {/* Glass Effect Container with Corner Pin Effects */}
            <div className="relative backdrop-blur-lg bg-black/30 border border-red-500/30 rounded-3xl shadow-2xl shadow-red-500/10 p-8 md:p-12 lg:p-16">
              
              {/* Corner Pin Effects */}
              {/* Top Left Pin */}
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg transform rotate-12">
                <div className="absolute inset-1 bg-gradient-to-br from-red-400 to-red-600 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Top Right Pin */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-bl from-red-600 to-red-800 rounded-full shadow-lg transform -rotate-12">
                <div className="absolute inset-1 bg-gradient-to-bl from-red-500 to-red-700 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Bottom Left Pin */}
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-tr from-red-700 to-red-900 rounded-full shadow-lg transform -rotate-12">
                <div className="absolute inset-1 bg-gradient-to-tr from-red-600 to-red-800 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Bottom Right Pin */}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-tl from-red-500 to-red-700 rounded-full shadow-lg transform rotate-12">
                <div className="absolute inset-1 bg-gradient-to-tl from-red-400 to-red-600 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/90 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Pin Shadow Effects */}
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-500/30 rounded-full blur-sm"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600/30 rounded-full blur-sm"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-red-700/30 rounded-full blur-sm"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500/30 rounded-full blur-sm"></div>

              <div className="text-center space-y-10">
                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-extrabold text-red-100">
                  About{" "}
                  <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    Byte Battle X NIT Silchar
                  </span>
                </h2>

                {/* Divider Line */}
                <div className="mx-auto w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>

                {/* Description */}
                <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                  Byte Battle X NIT Silchar is more than just a hackathon — it's a <span className="text-red-400 font-semibold">48-hour coding battlefield</span> 
                  where passionate developers, designers, and innovators unite to push the limits of creativity and technology. 
                  From solving real-world challenges to showcasing cutting-edge ideas, this is where <span className="text-white font-semibold">innovation meets impact.</span>
                </p>

                {/* 3 Feature Cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="relative p-6 rounded-2xl border border-red-500/20 bg-black/40 backdrop-blur-md hover:border-red-500/50 transition-all duration-300">
                    <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                    <h3 className="text-xl font-semibold text-white mb-3">Innovation & Impact</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Build products that solve real-world problems, using modern technologies and creative ideas that make a difference.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="relative p-6 rounded-2xl border border-red-500/20 bg-black/40 backdrop-blur-md hover:border-red-500/50 transition-all duration-300">
                    <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                    <h3 className="text-xl font-semibold text-white mb-3">Collaborate & Compete</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Join 500+ hackers, form teams, collaborate, and compete in a high-energy environment filled with mentorship and creativity.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="relative p-6 rounded-2xl border border-red-500/20 bg-black/40 backdrop-blur-md hover:border-red-500/50 transition-all duration-300">
                    <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                    <h3 className="text-xl font-semibold text-white mb-3">Learn & Grow</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Participate in workshops, network with industry experts, and gain hands-on experience that boosts your technical skills and confidence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subtle Decorative Tech Grid */}
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] rounded-3xl"></div>
              
              {/* Know More Button */}
              <div className="mt-12 flex justify-center">
                <a 
                  href="/about" 
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500/20 to-red-700/20 border-2 border-red-500/40 rounded-xl backdrop-blur-md transition-all duration-300 hover:from-red-500/30 hover:to-red-700/30 hover:border-red-400/60 hover:scale-105 hover:shadow-xl hover:shadow-red-500/20"
                >
                  {/* Button Text */}
                  <span className="text-lg font-semibold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent group-hover:from-red-100 group-hover:to-white transition-all duration-300">
                    Know More
                  </span>
                  
                  {/* Animated Arrow */}
                  <div className="relative overflow-hidden">
                    <svg 
                      className="w-5 h-5 text-red-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-red-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 to-red-700/0 group-hover:from-red-500/10 group-hover:to-red-700/10 transition-all duration-300"></div>
                  
                  {/* Tech Border Animation */}
                  <div className="absolute inset-0 rounded-xl border border-red-500/20 group-hover:border-red-400/40 transition-all duration-300"></div>
                  
                  {/* Corner Tech Indicators */}
                  <div className="absolute top-1 right-1 w-1 h-1 bg-red-500/60 rounded-full group-hover:bg-red-400 group-hover:animate-pulse transition-all duration-300"></div>
                  <div className="absolute bottom-1 left-1 w-1 h-1 bg-red-500/60 rounded-full group-hover:bg-red-400 group-hover:animate-pulse transition-all duration-300" style={{ animationDelay: '0.1s' }}></div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="relative max-w-6xl mx-auto px-6">
            {/* FAQ Container with Unique Design */}
            <div className="relative bg-gradient-to-br from-red-950/20 via-black/40 to-red-900/20 border border-red-500/30 rounded-3xl shadow-2xl shadow-red-500/10 overflow-hidden">
              
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                {/* Floating Tech Elements */}
                <div className="absolute top-8 left-8 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-12 right-12 w-1 h-1 bg-red-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-16 left-16 w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-8 right-8 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1.5s' }}></div>
                
                {/* Tech Lines */}
                <div className="absolute top-0 left-1/4 w-px h-20 bg-gradient-to-b from-red-500/40 to-transparent"></div>
                <div className="absolute top-0 right-1/4 w-px h-16 bg-gradient-to-b from-red-400/30 to-transparent"></div>
                <div className="absolute bottom-0 left-1/3 w-px h-24 bg-gradient-to-t from-red-600/40 to-transparent"></div>
                <div className="absolute bottom-0 right-1/3 w-px h-18 bg-gradient-to-t from-red-500/30 to-transparent"></div>
              </div>

              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                {/* Title Section */}
                <div className="text-center space-y-6 mb-12">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-red-100">
                    Frequently Asked{" "}
                    <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                      Questions
                    </span>
                  </h2>
                  
                  {/* Tech Divider */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-8 h-px bg-gradient-to-r from-transparent to-red-500"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-16 h-px bg-red-500/60"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-8 h-px bg-gradient-to-l from-transparent to-red-500"></div>
                  </div>
                  
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Got questions about Byte Battle X NIT Silchar? We've got answers! Check out our most frequently asked questions below.
                  </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-6 max-w-4xl mx-auto">
                  {/* FAQ Item 1 */}
                  <div className="group">
                    <details className="relative bg-black/30 border border-red-500/20 rounded-2xl backdrop-blur-sm hover:border-red-500/40 transition-all duration-300 overflow-hidden">
                      <summary className="cursor-pointer p-6 flex items-center justify-between text-white hover:text-red-200 transition-colors duration-300">
                        <h3 className="text-lg md:text-xl font-semibold pr-4">
                          When and where is Byte Battle X NIT Silchar taking place?
                        </h3>
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-red-400 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        
                        {/* Tech Indicator */}
                        <div className="absolute top-4 right-4 w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-60"></div>
                      </summary>
                      <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                        <div className="border-t border-red-500/20 pt-4">
                          Byte Battle X NIT Silchar will kick off with Round 1 in <span className="text-red-400 font-semibold">Dec 2025</span>, Round 2 in <span className="text-red-400 font-semibold">Jan 2026</span>, and the 48-hour offline Grand Finale in <span className="text-red-400 font-semibold">Feb 2026</span> at the NIT Silchar campus.
                        </div>
                      </div>
                    </details>
                  </div>

                  {/* FAQ Item 2 */}
                  <div className="group">
                    <details className="relative bg-black/30 border border-red-500/20 rounded-2xl backdrop-blur-sm hover:border-red-500/40 transition-all duration-300 overflow-hidden">
                      <summary className="cursor-pointer p-6 flex items-center justify-between text-white hover:text-red-200 transition-colors duration-300">
                        <h3 className="text-lg md:text-xl font-semibold pr-4">
                          Who can participate in the hackathon?
                        </h3>
                        <div className="flex-shrink-0">
                          <ArrowDown />
                        </div>
                        
                        {/* Tech Indicator */}
                        <div className="absolute top-4 right-4 w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-60"></div>
                      </summary>
                      <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                        <div className="border-t border-red-500/20 pt-4">
                          The hackathon is open to <span className="text-red-400 font-semibold">all college students, developers, and tech enthusiasts</span>. Whether you're a beginner or an experienced programmer, you're welcome to participate. Teams can have 2-3 members.
                        </div>
                      </div>
                    </details>
                  </div>

                  {/* FAQ Item 3 */}
                  <div className="group">
                    <details className="relative bg-black/30 border border-red-500/20 rounded-2xl backdrop-blur-sm hover:border-red-500/40 transition-all duration-300 overflow-hidden">
                      <summary className="cursor-pointer p-6 flex items-center justify-between text-white hover:text-red-200 transition-colors duration-300">
                        <h3 className="text-lg md:text-xl font-semibold pr-4">
                          What prizes can participants win?
                        </h3>
                        <div className="flex-shrink-0">
                          <ArrowDown />
                        </div>
                        
                        {/* Tech Indicator */}
                        <div className="absolute top-4 right-4 w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-60"></div>
                      </summary>
                      <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                        <div className="border-t border-red-500/20 pt-4">
                          We have an exciting prize pool of <span className="text-red-400 font-semibold">₹1L+ in total prizes</span>! This includes cash prizes for top teams, special category awards, and exciting goodies. Winners also get mentorship opportunities and internship offers.
                        </div>
                      </div>
                    </details>
                  </div>

                  {/* FAQ Item 4 */}
                  <div className="group">
                    <details className="relative bg-black/30 border border-red-500/20 rounded-2xl backdrop-blur-sm hover:border-red-500/40 transition-all duration-300 overflow-hidden">
                      <summary className="cursor-pointer p-6 flex items-center justify-between text-white hover:text-red-200 transition-colors duration-300">
                        <h3 className="text-lg md:text-xl font-semibold pr-4">
                          Do I need to have a team before registering?
                        </h3>
                        <div className="flex-shrink-0">
                          <ArrowDown />
                        </div>
                        
                        {/* Tech Indicator */}
                        <div className="absolute top-4 right-4 w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-60"></div>
                      </summary>
                      <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                        <div className="border-t border-red-500/20 pt-4">
                          Not at all! You can register as an individual and we'll help you find teammates during the team formation session. Alternatively, you can register with your existing team. <span className="text-red-400 font-semibold">Teams should have 2-3 members.</span>
                        </div>
                      </div>
                    </details>
                  </div>

                  {/* FAQ Item 5 */}
                  <div className="group">
                    <details className="relative bg-black/30 border border-red-500/20 rounded-2xl backdrop-blur-sm hover:border-red-500/40 transition-all duration-300 overflow-hidden">
                      <summary className="cursor-pointer p-6 flex items-center justify-between text-white hover:text-red-200 transition-colors duration-300">
                        <h3 className="text-lg md:text-xl font-semibold pr-4">
                          What should I bring to the hackathon?
                        </h3>
                        <div className="flex-shrink-0">
                         <ArrowDown />
                        </div>
                        
                        {/* Tech Indicator */}
                        <div className="absolute top-4 right-4 w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-60"></div>
                      </summary>
                      <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                        <div className="border-t border-red-500/20 pt-4">
                          Bring your <span className="text-red-400 font-semibold">laptop, chargers, and a creative mindset!</span> We'll provide WiFi, meals, snacks, and workspace. Don't forget to bring a valid ID for registration and any hardware components if your project requires them.
                        </div>
                      </div>
                    </details>
                  </div>

                  {/* FAQ Item 6 */}
                  <div className="group">
                    <details className="relative bg-black/30 border border-red-500/20 rounded-2xl backdrop-blur-sm hover:border-red-500/40 transition-all duration-300 overflow-hidden">
                      <summary className="cursor-pointer p-6 flex items-center justify-between text-white hover:text-red-200 transition-colors duration-300">
                        <h3 className="text-lg md:text-xl font-semibold pr-4">
                          Are there any themes or problem statements?
                        </h3>
                        <div className="flex-shrink-0">
                          <ArrowDown />
                        </div>
                        
                        {/* Tech Indicator */}
                        <div className="absolute top-4 right-4 w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-60"></div>
                      </summary>
                      <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                        <div className="border-t border-red-500/20 pt-4">
                          Yes! We'll announce specific themes and problem statements during the opening ceremony. These typically include <span className="text-red-400 font-semibold">Web Development, Mobile Apps, AI/ML, Blockchain, IoT, and Social Impact</span> categories to guide your innovation.
                        </div>
                      </div>
                    </details>
                  </div>
                </div>

                {/* Still Have Questions */}
                <div className="mt-16 text-center">
                  <div className="relative inline-block">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-red-700/20 rounded-xl blur"></div>
                    <div className="relative bg-black/60 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold text-white mb-3">Still have questions?</h3>
                      <p className="text-gray-300 mb-4">
                        Reach out to our organizing team for more information.
                      </p>
                      <a 
                        href="/contact" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/20 to-red-700/20 border border-red-500/40 rounded-lg text-red-200 hover:text-white hover:border-red-400/60 transition-all duration-300 hover:scale-105"
                      >
                        <Mail />
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,0,0,0.1)_0deg,transparent_60deg,rgba(255,0,0,0.1)_120deg,transparent_180deg,rgba(255,0,0,0.1)_240deg,transparent_300deg,rgba(255,0,0,0.1)_360deg)] bg-[size:200px_200px]"></div>
              </div>
            </div>
          </div>
        </section>


      </main>
  );
}

export default Hero;