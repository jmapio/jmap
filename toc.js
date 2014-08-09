( function ( document, window ) {

"use strict";

// Teeny-tiny scroll animation lib
var scrollTo = ( function ( window ) {
    var requestAnimationFrame = window.requestAnimationFrame;
    if ( !requestAnimationFrame ) {
        return function ( scrollTop ) {
            window.scrollTo( 0, scrollTop );
        };
    }
    var easeInOut = function ( t ) {
        return t < 0.5 ?
            8 * t * t * t * t :
            1 - 8 * (--t) * t * t * t;
    };
    var endTime = 0;
    var startValue = 0;
    var endValue = 0;
    var deltaValue = 0;
    var DURATION = 500;
    var drawFrame = function ( frameStartTime ) {
        if ( !endTime ) {
            endTime = frameStartTime + DURATION;
        }
        if ( frameStartTime >= endTime ) {
            window.scrollTo( 0, endValue );
            endTime = 0;
            return;
        }
        requestAnimationFrame( drawFrame );
        var animationTime = 1 - ( ( endTime - frameStartTime ) / DURATION );
        window.scrollTo( 0,
            startValue + easeInOut( animationTime ) * deltaValue );
    };
    return function ( scrollTop ) {
        startValue = window.pageYOffset;
        endValue = scrollTop;
        deltaValue = endValue - startValue;
        if ( !endTime ) {
            requestAnimationFrame( drawFrame );
        } else {
            endTime = 0;
        }
    };
}( window ) );

// 1. Build TOC
var headings = document.querySelectorAll( 'h2, h3' ),
    toc = document.querySelector( '.toc' ),
    frag = document.createDocumentFragment(),
    index = {},
    tocItems = [],
    i, l,
    heading, text, url,
    li, a, span,
    item;
for ( i = 0, l = headings.length; i < l; i += 1 ) {
    heading = headings[i];
    text = heading.textContent;
    url = '#' + text.replace( /\s+/g, '-' ).toLowerCase();

    while ( index[ url ] ) {
        url += '*';
    }

    li = document.createElement( 'li' );
    li.className = 'toc-item toc-' + heading.nodeName.toLowerCase();
    a = document.createElement( 'a' );
    a.className = 'toc-link';
    a.href = url;
    span = document.createElement( 'span' );
    span.textContent = text;

    item = {
        heading: heading,
        li: li,
        top: 1 << 30
    };
    index[ url ] = item;
    tocItems.push( item );

    a.appendChild( span );
    li.appendChild( a );
    frag.appendChild( li );
}
toc.appendChild( frag );

// 2. Cache positions, recalculate on potential change
var recalculatePositions = function () {
    for ( var i = 0, l = tocItems.length, item; i < l; i += 1 ) {
        item = tocItems[i];
        item.top = item.heading.offsetTop - 55;
    }
};
window.addEventListener( 'load', recalculatePositions, false );
window.addEventListener( 'resize', recalculatePositions, false );

// 3. Make the links work
toc.addEventListener( 'click', function ( event ) {
    var target = event.target,
        item;
    while ( target && target.nodeName !== 'A' ) {
        target = target.parentNode;
    }
    if ( target ) {
        item = index[ target.getAttribute( 'href' ) ];
    }
    if ( item ) {
        scrollTo( item.top );
    }
});
window.addEventListener( 'hashchange', function () {
    var item = index[ location.hash ];
    if ( item ) {
        scrollTo( item.top );
    }
}, false );

// 4. Highlight current section in TOC
var active = null;
var tocSelected = document.querySelector( '.toc-selected' );
window.addEventListener( 'scroll', function () {
    var currentTop = window.pageYOffset;
    var newActive = tocItems[0];
    for ( i = 1; i < l; i += 1 ) {
        if ( tocItems[i].top > currentTop ) {
            break;
        }
        newActive = tocItems[i];
    }
    if ( newActive !== active ) {
        active = newActive;
        tocSelected.style.top = newActive.li.offsetTop + 'px';
        tocSelected.style.height = newActive.li.offsetHeight + 'px';
    }
}, false );

}( document, window ) );
