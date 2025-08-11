import { forwardRef } from "react";

interface DemoIframeProps {
    src: string;
    title: string;
    mode: "proxy" | "iframe" | "default";
    onLoad?: () => void;
    key?: string;
}

export const DemoIframe = forwardRef<HTMLIFrameElement, DemoIframeProps>(
    ({ src, title, mode, onLoad }, ref) => {
        const sandbox = mode === "iframe"
            ? "allow-scripts allow-forms allow-popups allow-modals allow-same-origin allow-presentation allow-downloads"
            : "allow-scripts allow-forms allow-popups allow-modals allow-same-origin";

        return (
            <iframe
                ref={ref}
                src={src}
                title={title}
                className="absolute inset-0 w-full h-full border-0"
                sandbox={sandbox}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-testid="demo-iframe"
                onLoad={onLoad}
            />
        );
    }
);

DemoIframe.displayName = "DemoIframe";
