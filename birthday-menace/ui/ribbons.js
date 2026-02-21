// ui/ribbons.js
/**
 * RibbonFactory: Generates high-end silky SVG ribbons dynamically
 */
export const RibbonFactory = {
    // Generate a silky SVG string based on side and text
    create(side = 'left', text = "") {
        const isLeft = side === 'left';
        
        // High-end swallowtail path logic
        const path = isLeft 
            ? "M0,0 L240,0 L220,40 L240,80 L0,80 Z" 
            : "M20,0 L260,0 L260,80 L20,80 L40,40 Z";

        return `
            <svg viewBox="0 0 260 80" class="ribbon-svg ${side}">
                <defs>
                    <linearGradient id="silkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#FF85A1;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#FFD1DC;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#D81B60;stop-opacity:1" />
                    </linearGradient>
                    <filter id="ribbonShadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.2"/>
                    </filter>
                </defs>
                <path d="${path}" fill="url(#silkGrad)" filter="url(#ribbonShadow)"/>
                <text x="${isLeft ? '48%' : '52%'}" y="55%" 
                      dominant-baseline="middle" text-anchor="middle" 
                      fill="white" font-family="'Quicksand', sans-serif" 
                      font-weight="700" font-size="20">
                    ${text}
                </text>
            </svg>
        `;
    }
};