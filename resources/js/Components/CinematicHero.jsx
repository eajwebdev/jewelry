import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const SCRUB_VIDEO_SOURCE = '/luxury-model-scroll.mp4';
const ORIGINAL_VIDEO_SOURCE = '/luxury-model.mp4';
const OPENING_FRAME_SECONDS = 0.35;

const scenes = [
    {
        number: '00',
        label: 'SR Crown Jewls',
        title: <>More Than<br /><em>Jewelry</em></>,
        body: 'Jewelry created for the moments you never want to forget.',
        align: 'right',
        window: [0, 0.19],
    },
    {
        number: '01',
        label: 'Necklaces',
        title: <>Elegance<br /><em>in Every Detail</em></>,
        body: 'Designed to become part of your story.',
        align: 'left',
        window: [0.18, 0.41],
    },
    {
        number: '02',
        label: 'Signature',
        title: <>A Symbol<br /><em>of Forever</em></>,
        body: 'Discover the ring that holds every promise in light.',
        align: 'left',
        window: [0.40, 0.63],
        link: { label: 'Discover the ring', href: '#signature' },
    },
    {
        number: '03',
        label: 'The Signature Collection',
        title: <>The Signature<br /><em>Collection</em></>,
        align: 'minimal',
        window: [0.62, 0.81],
        link: { label: 'Explore', href: '#signature', icon: 'down' },
    },
    {
        number: '04',
        label: 'Final Portrait',
        title: <>Timeless Beauty.<br /><em>Forever Yours.</em></>,
        body: 'Celebrate the moments that deserve to last forever.',
        align: 'left',
        window: [0.80, 1],
        actions: true,
    },
];

export default function CinematicHero() {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const videoRef = useRef(null);
    const progressRef = useRef(null);
    const hintRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);
    const [videoFailed, setVideoFailed] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return undefined;
        let blobUrl = '';
        let creatingSeekableSource = false;
        let preparationFinished = false;
        let originalFallbackAttempted = false;
        let disposed = false;

        const finishPreparation = () => {
            if (preparationFinished || !Number.isFinite(video.duration) || video.duration <= 0 || video.readyState < 2) return;
            preparationFinished = true;
            video.pause();
            video.currentTime = Math.min(OPENING_FRAME_SECONDS, video.duration * 0.05);
            setVideoReady(true);
        };

        const markReady = async () => {
            if (!Number.isFinite(video.duration) || video.duration <= 0 || video.readyState < 2) return;

            const seekableEnd = video.seekable.length
                ? video.seekable.end(video.seekable.length - 1)
                : 0;
            const isBlobSource = video.currentSrc.startsWith('blob:');

            if (seekableEnd <= 0.01 && !isBlobSource && !creatingSeekableSource) {
                creatingSeekableSource = true;
                try {
                    const response = await fetch(video.currentSrc || SCRUB_VIDEO_SOURCE);
                    if (!response.ok) throw new Error(`Film request failed with ${response.status}`);
                    const filmBlob = await response.blob();
                    if (disposed) return;
                    blobUrl = URL.createObjectURL(filmBlob);
                    video.src = blobUrl;
                    video.load();
                    return;
                } catch {
                    creatingSeekableSource = false;
                }
            }

            finishPreparation();
        };

        const markFailed = () => {
            const usingOriginal = video.currentSrc.endsWith(ORIGINAL_VIDEO_SOURCE);
            if (!usingOriginal && !originalFallbackAttempted) {
                originalFallbackAttempted = true;
                creatingSeekableSource = false;
                video.src = ORIGINAL_VIDEO_SOURCE;
                video.load();
                return;
            }
            setVideoFailed(true);
        };

        video.addEventListener('loadeddata', markReady);
        video.addEventListener('canplay', markReady);
        video.addEventListener('error', markFailed);
        markReady();

        return () => {
            disposed = true;
            video.removeEventListener('loadeddata', markReady);
            video.removeEventListener('canplay', markReady);
            video.removeEventListener('error', markFailed);
            if (blobUrl) URL.revokeObjectURL(blobUrl);
        };
    }, []);

    useEffect(() => {
        if (!videoReady) return undefined;

        const section = sectionRef.current;
        const video = videoRef.current;
        const progressBar = progressRef.current;
        const hint = hintRef.current;
        const copyBlocks = gsap.utils.toArray('.cinema-copy', section);
        let seekFrame = 0;
        let requestedProgress = 0;
        let smoothSeek;

        const seekToProgress = (progress) => {
            requestedProgress = Math.min(1, Math.max(0, progress));
            if (seekFrame) return;

            seekFrame = window.requestAnimationFrame(() => {
                seekFrame = 0;
                if (!Number.isFinite(video.duration) || video.duration <= 0) return;

                const finalFrameOffset = Math.min(0.02, 1 / 48);
                const openingFrame = Math.min(OPENING_FRAME_SECONDS, video.duration * 0.05);
                const scrubDuration = Math.max(0, video.duration - openingFrame - finalFrameOffset);
                const requestedTime = requestedProgress === 1
                    ? Math.max(0, video.duration - finalFrameOffset)
                    : openingFrame + requestedProgress * scrubDuration;
                const bufferedEnd = video.seekable.length
                    ? video.seekable.end(video.seekable.length - 1)
                    : video.duration;
                const seekableEnd = bufferedEnd > 0.01 ? bufferedEnd : video.duration;
                const targetTime = Math.min(requestedTime, seekableEnd);

                if (Math.abs(video.currentTime - targetTime) >= 1 / 96) {
                    try {
                        smoothSeek(targetTime);
                    } catch {
                        // Seeking is retried on the next ScrollTrigger update.
                    }
                }
            });
        };

        const context = gsap.context(() => {
            // A short seek glide makes discrete mouse-wheel steps read as film
            // motion while still settling on the exact scroll-mapped frame.
            smoothSeek = gsap.quickTo(video, 'currentTime', {
                duration: 0.38,
                ease: 'power1.out',
            });

            const copyTimeline = gsap.timeline({ paused: true, defaults: { overwrite: 'auto' } });
            copyTimeline.to({}, { duration: 1 });

            copyBlocks.forEach((copy, index) => {
                const [start, end] = scenes[index].window;
                const revealDuration = index === 0 ? 0.025 : 0.035;
                const fadeOutDuration = 0.035;
                const lines = copy.querySelectorAll('.cinema-copy__reveal');

                copyTimeline.set(copy, { autoAlpha: 1 }, start);
                if (index === 0) {
                    copyTimeline.set(lines, { autoAlpha: 1, yPercent: 0 }, 0);
                } else {
                    copyTimeline.fromTo(
                        lines,
                        { autoAlpha: 0, yPercent: 55 },
                        { autoAlpha: 1, yPercent: 0, duration: revealDuration, stagger: 0.006, ease: 'power2.out' },
                        start,
                    );
                }

                if (index < copyBlocks.length - 1) {
                    copyTimeline.to(
                        copy,
                        { autoAlpha: 0, y: -18, duration: fadeOutDuration, ease: 'power2.in' },
                        Math.max(start, end - fadeOutDuration),
                    );
                }
            });

            const trigger = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => `+=${window.innerHeight * 5}`,
                pin: section,
                pinSpacing: true,
                scrub: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                animation: copyTimeline,
                onUpdate: (self) => {
                    seekToProgress(self.progress);
                    gsap.set(progressBar, { scaleX: self.progress });
                    gsap.set(hint, { autoAlpha: Math.max(0, 1 - self.progress * 8) });
                    gsap.set(video, { scale: 1 + self.progress * 0.035 });
                },
                onRefresh: (self) => seekToProgress(self.progress),
            });

            seekToProgress(trigger.progress);
        }, section);

        return () => {
            if (seekFrame) window.cancelAnimationFrame(seekFrame);
            context.revert();
        };
    }, [videoReady]);

    return (
        <section
            ref={sectionRef}
            className={`cinema-scroll ${videoReady ? 'is-ready' : ''} ${videoFailed ? 'has-error' : ''}`}
            id="home"
            aria-label="SR Crown Jewls campaign film"
        >
            <div ref={stageRef} className="cinema-stage">
                <video
                    ref={videoRef}
                    className="cinema-video"
                    src={SCRUB_VIDEO_SOURCE}
                    poster="/assets/film-entrance.jpg"
                    muted
                    playsInline
                    preload="auto"
                    aria-label="SR Crown Jewls campaign featuring a necklace and oval halo ring"
                />
                <div className="cinema-poster" aria-hidden="true" />
                <div className="cinema-vignette" />
                <div className="cinema-grain" />

                {!videoReady && (
                    <div className="cinema-loader" role="status" aria-live="polite">
                        <span className="cinema-loader__mark" />
                        <span>{videoFailed ? 'Film unavailable' : 'Preparing the film'}</span>
                    </div>
                )}

                {scenes.map((scene, index) => (
                    <div
                        key={scene.number}
                        className={`cinema-copy cinema-copy--${scene.align} cinema-copy--scene-${index + 1}`}
                        data-scene={index}
                    >
                        <div className="cinema-copy__meta cinema-copy__reveal">
                            <span>{scene.number}</span>
                            <i />
                            <span>{scene.label}</span>
                        </div>
                        <h1 className="cinema-copy__reveal">{scene.title}</h1>
                        {scene.body && <p className="cinema-copy__reveal">{scene.body}</p>}
                        {scene.link && (
                            <a className="cinema-text-link cinema-copy__reveal" href={scene.link.href}>
                                {scene.link.label}
                                {scene.link.icon === 'down' ? <ArrowDown size={15} /> : <ArrowRight size={15} />}
                            </a>
                        )}
                        {scene.actions && (
                            <div className="cinema-actions cinema-copy__reveal">
                                <a href="#shop" className="button button--gold">Shop Collection</a>
                                <a href="#consultation" className="button button--ghost">Book a Private Consultation</a>
                            </div>
                        )}
                    </div>
                ))}

                <div className="cinema-progress" aria-hidden="true"><span ref={progressRef} /></div>
                <div ref={hintRef} className="cinema-scroll-hint" aria-hidden="true"><span>Scroll to discover</span><i /></div>
            </div>
        </section>
    );
}
