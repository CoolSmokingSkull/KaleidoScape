if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/KaleidoScape/sw.js', { scope: '/KaleidoScape/' })})}