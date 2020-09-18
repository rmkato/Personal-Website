var waypoint = new Waypoint({
	element: document.getElementById('links'),
	handler: function(direction) {
		if (direction === 'down') {
			document.getElementById("pagelinks").style.display = "inline";
			if (window.innerWidth <= 750) {
				document.getElementById("navbar").style.minHeight = "100px";
			}
		} else {
			document.getElementById("pagelinks").style.display = "none";
			if (window.innerWidth <= 750) {
				document.getElementById("navbar").style.minHeight = "62px";
			}
		}
	}
});