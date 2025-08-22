
document.getElementById('year').textContent = new Date().getFullYear();



//let currentTheme = 'light';

// Décommenter la ligne suivante pour prendre automatiquement le thème de l'utilisateur
// currentTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

//document.documentElement.setAttribute("data-currentTheme", currentTheme);



renderMathInElement(document.body, {
            // Options de configuration de KaTeX
            delimeters: [
                { left: "\\(", right: "\\)", display: false },
            ]
        });
		
		renderMathInElement(document.body, {
            delimeters: [
                { left: "$$", right: "$$", display: true },  // Mode bloc
            ],
            // Appliquer la classe personnalisée à chaque élément KaTeX en mode bloc
            mathElementClass: "katex-block"
        });



const toggleBtn = document.getElementById('darkToggle');
toggleBtn.addEventListener('click',changeTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', changeTheme);


function changeTheme() {
	const isDark = currentTheme == 'dark';
	currentTheme = (currentTheme === 'light') ? 'dark' : 'light';
	document.documentElement.setAttribute("data-currentTheme", currentTheme);

	const currentTextEl = toggleBtn.querySelector('.toggle-text');
	const newText = isDark ? 'Mode sombre' : 'Mode clair';

	const tempSpan = document.createElement('span');
	tempSpan.className = 'toggle-text slide-in-left';
	tempSpan.textContent = newText;

	// Smooth width transition
	toggleBtn.style.width = toggleBtn.offsetWidth + 'px';

	// Slide out old text
	currentTextEl.classList.add('slide-out-right');

	setTimeout(() => {
	document.body.classList.toggle('dark');

	toggleBtn.replaceChild(tempSpan, currentTextEl);

	requestAnimationFrame(() => {
		tempSpan.classList.add('slide-in-left-active');
	});

	// Remove fixed width after animation
	setTimeout(() => {
	toggleBtn.style.width = '';
	}, 30);
	}, 30);
}



// Expandable project cards
document.querySelectorAll('.toggle-details').forEach(link => {
	link.addEventListener('keydown', function(event) { if (event.key === 'Enter') { f.bind(this)(); } });
	link.addEventListener('click', f);
	
	function f() {
		const details = document.getElementById(this.getAttribute('data-target'));
		const height = details.scrollHeight;

		if (details.classList.contains('open')) {
			// Closing animation
			let animDuration = Math.min(Math.max(0.6,height*0.4/500),1.7);
			details.style.transition = `max-height ${animDuration}s ease, opacity 0.4s ease, margin-top 0.7s ease`;
			details.style.maxHeight = '0px';
			this.textContent = 'Voir plus';
		}
		else {
			// Opening animation
			let animDuration = Math.max(0.6,height*0.5/500);
			details.style.transition = `max-height ${animDuration}s ease, opacity 0.4s ease, margin-top 0.7s ease`;
			details.style.maxHeight = height + "px";
			this.textContent = 'Voir moins';
		}

		details.classList.toggle('open');
	};
});


// Gestion des boutons pour mettre en pause les animations
document.querySelectorAll('.stop-animation').forEach(link => {
	link.addEventListener('keydown', function(event) { if (event.key === 'Enter') { f.bind(this)(); } });
	link.addEventListener('click', f);
						  
	function f() {
		animationName = this.getAttribute('anim-variable');
		animations[animationName] ? animationsStop[animationName]() : animationsResume[animationName]();
		animations[animationName] = !animations[animationName];
		this.textContent = animations[animationName] ? "Arrêter l'animation" : "Reprendre l'animation";
	};
});








// ------------ Animation jeu de Nim modulaire


const nimCircles = [];
let currentCircle = 0;

let animations = {"nimAnimation" : true};
const animationsStop = {"nimAnimation" : nimClear};
const animationsResume = {"nimAnimation" : playNimAnimation};


for (let i = 0; i < 10; i++) {
    nimCircles.push(document.getElementById(`circle-${i}`));
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function nimPlay(i) {
	nimCircles[i].classList.toggle('nim-played');
}

function nimClear() {
	for (let i = 0; i < 10; i++) {
		nimCircles[i].classList.remove('nim-played');
	}
}

// Plays animation

const nimMoves = [0,2,5,7,9,1,3,6,8]

async function playNimAnimation() {
	
	// Nim game G({2,3},10)
	await wait(1000);
	for (let e of nimMoves) {
		
		if (!animations["nimAnimation"]) return;
		nimPlay(e);
		await wait(2000);
		
	}
	if (!animations["nimAnimation"]) return;
	nimClear();
	await wait(3000);

	if (!animations["nimAnimation"]) return;
	playNimAnimation();
}

playNimAnimation();





// Abort Animation