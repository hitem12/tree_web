var myScroll;

function loaded () {
	myScroll = new IScroll('#list', { 
		mouseWheel: true, 
		scrollbars: true,
		interactiveScrollbars: true,
		shrinkScrollbars: 'scale',
		fadeScrollbars: false,
		scrollbars: 'custom' 
		
		});
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
	capture: false,
	passive: false
} : false);
