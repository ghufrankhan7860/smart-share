"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { videoGridConfig } from "@/config/videos";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoGrid() {
    const { categories, videos, header } = videoGridConfig;
    const [activeTab, setActiveTab] = useState("All");
    const filteredVideos = activeTab === "All" ? videos : videos.filter(v => v.category === activeTab);

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">{header.title}</h2>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-semibold transition-all border",
                                    activeTab === cat
                                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {filteredVideos.map((video) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                key={video.id}
                            >
                                {video.type === "youtube" ? (
                                    <YouTubeCard video={video} />
                                ) : (
                                    <VideoCard video={video} />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}

function VideoCard({ video }: { video: any }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isPlaying) {
            videoRef.current?.play();
        } else {
            videoRef.current?.pause();
            if (videoRef.current) videoRef.current.currentTime = 0;
        }
    }, [isPlaying]);

    return (
        <div
            className="relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all hover:-translate-y-1 bg-white dark:bg-slate-900"
            onMouseEnter={() => setIsPlaying(true)}
            onMouseLeave={() => setIsPlaying(false)}
        >
            {/* Placeholder for Video */}
            <div className={`absolute inset-0 ${video.thumbnail} dark:opacity-80 flex items-center justify-center`}>
                {!isPlaying && <Play className="w-12 h-12 text-white opacity-80" fill="currentColor" />}
            </div>

            {/* Actual Video */}
            <video
                ref={videoRef}
                src={video.src}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                loop
                muted
                playsInline
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/50"></div>
                    <span className="text-white text-sm font-semibold shadow-black drop-shadow-md">{video.creator}</span>
                </div>

                <div>
                    <p className="text-white text-sm font-medium mb-2 drop-shadow-md">{video.desc}</p>
                    <div className="flex items-center gap-4 text-white/90 text-xs">
                        <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {video.views}
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {videoGridConfig.labels.like}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function YouTubeCard({ video }: { video: any }) {
    const [isPlaying, setIsPlaying] = useState(false);

    // Construct the embed URL with parameters for autoplay and mute
    const embedUrl = isPlaying
        ? `${video.src}${video.src.includes('?') ? '&' : '?'}autoplay=1&mute=1&controls=0&modestbranding=1&loop=1`
        : video.src;

    return (
        <div
            className="relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all hover:-translate-y-1 bg-white dark:bg-slate-900"
            onMouseEnter={() => setIsPlaying(true)}
            onMouseLeave={() => setIsPlaying(false)}
        >
            {/* Thumbnail / Placeholder */}
            <div className={`absolute inset-0 ${video.thumbnail} dark:opacity-80 flex items-center justify-center transition-opacity duration-300 z-10 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <Play className="w-12 h-12 text-white opacity-80" fill="currentColor" />
            </div>

            {/* YouTube Iframe */}
            {isPlaying && (
                <iframe
                    src={embedUrl}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.desc}
                />
            )}
        </div>
    );
}
