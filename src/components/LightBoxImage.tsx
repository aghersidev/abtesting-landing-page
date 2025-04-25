import useUmami from '../hooks/useUmami';

interface LightBoxImageProps {
    id: string;
    src: string;
    alt: string;
}

export default function LightBoxImage({ id, src, alt }: LightBoxImageProps) {
    const { trackEvent } = useUmami();

    return (
        <>
            <div className="pixel-border">
                <a
                    href={`#${id}`}
                    onClick={() => trackEvent('image_interaction', { type: 'open_lightbox', location: id })}
                >
                    <img src={src} alt={alt} className="w-full h-full object-cover" />
                </a>
            </div>

            <div id={id} className="lightbox">
                <a
                    href="#"
                    className="close-overlay"
                    onClick={() => trackEvent('image_interaction', { type: 'close_lightbox', location: id })}
                ></a>
                <div className="lightbox-content">
                    <img src={src} alt={alt} />
                    <a
                        href="#"
                        className="close"
                        onClick={() => trackEvent('image_interaction', { type: 'close_lightbox', location: id })}
                    >
                        &times;
                    </a>
                </div>
            </div>
        </>
    );
}