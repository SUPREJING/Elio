// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeBtn = document.getElementById('closeBtn');
    const storyContent = document.getElementById('storyContent');
    
    // Get love letter elements
    const letterEnvelope = document.getElementById('letterEnvelope');
    const questionModal = document.getElementById('questionModal');
    const unlockedMessage = document.getElementById('unlockedMessage');
    const messageContent = document.getElementById('messageContent');
    
    // Get all photo items
    const photoItems = document.querySelectorAll('.photo-item');
    
    // Click sound effect
    const clickSound = new Audio('audio/click.mp3');
    clickSound.volume = 0.3; // Set volume to 30%
    
    function playClickSound() {
        clickSound.currentTime = 0; // Reset audio to start
        clickSound.play().catch(error => {
            console.log('Click sound failed to play:', error);
        });
    }
    
    // Love letter unlock system
    let currentQuestion = 0;
    let unlockedParts = 0;
    
    const questions = [
        "Are you happy today?",
        "Did you miss me today?",
        "Do you still love me today?"
    ];
    
    const messageParts = [
        `<h3 class="message-subtitle">Birthday Message 🎂✨</h3>`,
        `<p>Happy Birthday, my love! 💕</p>`,
        `<p>On this special day, I hope you feel surrounded by happiness, love, and everything beautiful that life has to offer. May this new year bring you more joy, strength, and countless reasons to smile. You deserve all the warmth in the world, and I wish for your dreams to come true one by one.</p>`,
        `<p>I never imagined I would be in a long-distance relationship like this, but with you, everything feels different—it feels worth it. My feelings for you keep growing deeper every single day. I find myself missing you all the time, imagining our future, picturing the life we could build together.</p>`,
        `<p>Even though we're apart right now, you're always close to me—in my heart, in my thoughts, in every quiet moment. Sometimes the longing is gentle, sometimes it's overwhelming, but always, it reminds me how much you mean to me.</p>`,
        `<p>You are kind, thoughtful, strong, and beautiful inside and out. I'm so grateful for you and for the love we share. I truly believe that whatever you want to do, you'll succeed, because that's who you are.</p>`,
        `<p>So on your birthday, I just want you to know: <strong>I love you, I miss you, and I can't wait for the day we'll celebrate not just birthdays together, but all of life's moments side by side.</strong></p>`,
        `<p class="message-ending">Happy Birthday again, my love. 🎂💕</p>`
    ];
    
    // Click envelope to start questions
    letterEnvelope.addEventListener('click', function() {
        playClickSound();
        showQuestion();
    });
    
    // Show question function
    function showQuestion() {
        console.log(`Showing question ${currentQuestion + 1}: ${questions[currentQuestion]}`);
        
        if (currentQuestion < questions.length) {
            document.getElementById('questionTitle').textContent = `Question ${currentQuestion + 1}`;
            document.getElementById('questionText').textContent = questions[currentQuestion];
            document.getElementById('whySection').style.display = 'none';
            questionModal.style.display = 'block';
            
            // Reset text color to white
            document.getElementById('questionText').style.color = "white";
        } else {
            // All questions answered, show full message
            console.log('All questions answered, showing full message');
            showFullMessage();
        }
    }
    
    // Answer question function
    window.answerQuestion = function(answer) {
        playClickSound();
        
        if (answer === 'yes') {
            // Correct answer - unlock next part
            unlockedParts++;
            
            // Show success message briefly
            const questionText = document.getElementById('questionText');
            questionText.textContent = "Perfect! 💕";
            questionText.style.color = "#4CAF50";
            
            setTimeout(() => {
                questionModal.style.display = 'none';
                currentQuestion++; // Move to next question
                showQuestion(); // Show next question or complete
            }, 1500);
            
        } else {
            // Wrong answer - show why section
            document.getElementById('whySection').style.display = 'block';
            document.getElementById('whyInput').focus();
        }
    };
    
    // Submit why function
    window.submitWhy = function() {
        playClickSound();
        
        const whyInput = document.getElementById('whyInput');
        const whyText = whyInput.value.trim();
        
        if (whyText) {
            // Show cute response
            const questionText = document.getElementById('questionText');
            questionText.textContent = "Aww, I understand... 🥺 But please say yes next time! 💕";
            questionText.style.color = "#ff9800";
            
            // Hide why section
            document.getElementById('whySection').style.display = 'none';
            whyInput.value = '';
            
            // Show question again after delay
            setTimeout(() => {
                questionText.textContent = questions[currentQuestion];
                questionText.style.color = "white";
            }, 3000);
        }
    };
    
    // Show full message function
    function showFullMessage() {
        questionModal.style.display = 'none';
        letterEnvelope.style.display = 'none';
        unlockedMessage.style.display = 'block';
        
        // Clear previous content first
        messageContent.innerHTML = '';
        
        // Animate message parts appearing
        messageParts.forEach((part, index) => {
            setTimeout(() => {
                messageContent.innerHTML += part;
            }, index * 800);
        });
    }
    
    // Add click event to each photo
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            playClickSound();
            
            // Get corresponding video path and story
            const videoPath = this.getAttribute('data-video');
            const story = this.getAttribute('data-story');
            
            // Set video source
            modalVideo.src = videoPath;
            
            // Set story content
            storyContent.innerHTML = story;
            
            // Show modal
            videoModal.style.display = 'block';
            
            // Reset story animation
            storyContent.style.animation = 'none';
            storyContent.offsetHeight; // Trigger reflow
            storyContent.style.animation = 'slideInStory 1.5s ease-out 0.5s forwards';
            
            // Play video
            modalVideo.play().catch(function(error) {
                console.log("Video play failed:", error);
            });
        });
    });
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        playClickSound();
        closeModal();
    });
    
    // Close modal when clicking outside
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            playClickSound();
            closeModal();
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            playClickSound();
            closeModal();
        }
    });
    
    // Close modal function
    function closeModal() {
        videoModal.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modalVideo.src = '';
        storyContent.innerHTML = '';
    }
    
    // Add romantic interaction effects
    photoItems.forEach((item, index) => {
        // Add delay animation for each photo
        item.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add welcome message after page loads
    setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.innerHTML = 'Welcome to Annie\'s Birthday Page! 🎉';
        welcomeMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff6b6b, #feca57);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 1001;
            animation: slideInRight 0.8s ease-out;
        `;
        
        document.body.appendChild(welcomeMessage);
        
        // Remove welcome message after 3 seconds
        setTimeout(() => {
            welcomeMessage.style.animation = 'slideOutRight 0.8s ease-out';
            setTimeout(() => {
                if (welcomeMessage.parentNode) {
                    welcomeMessage.parentNode.removeChild(welcomeMessage);
                }
            }, 800);
        }, 3000);
    }, 1000);
    
    // Load photos immediately
    loadPhotos();
    
    // Function to load photos
    function loadPhotos() {
        photoItems.forEach((item, index) => {
            const photoNumber = index + 1;
            
            // Try different image formats and extensions
            const possiblePaths = [
                `image/${photoNumber}.png`,
                `image/${photoNumber}.jpg`,
                `image/${photoNumber}.jpeg`,
                `image/${photoNumber}.webp`
            ];
            
            // Try to load image with different formats
            tryLoadImage(possiblePaths, item, photoNumber);
        });
    }
    
    // Function to try loading image with different paths
    function tryLoadImage(paths, item, photoNumber) {
        if (paths.length === 0) {
            console.log(`Could not load image ${photoNumber} with any format`);
            return;
        }
        
        const currentPath = paths[0];
        const img = new Image();
        
        img.onload = function() {
            // Replace placeholder with actual image
            const placeholder = item.querySelector('.photo-placeholder');
            if (placeholder) {
                placeholder.innerHTML = `<img src="${currentPath}" alt="Beautiful Memory ${photoNumber}" style="width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 15px;">`;
                console.log(`Image ${photoNumber} loaded successfully from ${currentPath}`);
            }
        };
        
        img.onerror = function() {
            // Try next format
            console.log(`Failed to load ${currentPath}, trying next format...`);
            tryLoadImage(paths.slice(1), item, photoNumber);
        };
        
        img.src = currentPath;
    }
});

// Add additional CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Music Player System
class MusicPlayer {
    constructor() {
        this.playlist = [
            { name: 'Background', file: 'audio/background.mp3' },
            { name: 'Me', file: 'audio/me.mp3' },
            { name: 'Happy Birthday', file: 'audio/happybirthday.mp3' }
        ];
        
        this.currentIndex = 0;
        this.audio = new Audio();
        this.isPlaying = false;
        this.isPaused = false;
        this.userInteracted = false;
        
        // Click sound effect for music player
        this.clickSound = new Audio('audio/click.mp3');
        this.clickSound.volume = 0.3;
        
        this.audio.addEventListener('ended', () => {
            this.playNext();
        });
        
        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
            // Try next song if current fails
            setTimeout(() => this.playNext(), 1000);
        });
        
        this.init();
    }
    
    playClickSound() {
        this.clickSound.currentTime = 0;
        this.clickSound.play().catch(error => {
            console.log('Click sound failed to play:', error);
        });
    }
    
    init() {
        // Add event listeners
        const musicPlayer = document.getElementById('musicPlayer');
        const musicIcon = document.getElementById('musicIcon');
        
        // Single click to pause/play
        musicIcon.addEventListener('click', (e) => {
            e.preventDefault();
            this.playClickSound();
            this.userInteracted = true;
            this.togglePlayPause();
        });
        
        // Double click to next song
        musicIcon.addEventListener('dblclick', (e) => {
            e.preventDefault();
            this.playClickSound();
            this.userInteracted = true;
            this.playNext();
        });
        
        // Add click event to the whole page to detect user interaction
        document.addEventListener('click', () => {
            this.userInteracted = true;
            if (!this.isPlaying && !this.isPaused) {
                this.loadAndPlay(0);
            }
        });
        
        // Try to start playing after a short delay (for autoplay)
        setTimeout(() => {
            if (this.userInteracted) {
                this.loadAndPlay(0);
            }
        }, 1000);
    }
    
    loadAndPlay(index) {
        this.currentIndex = index;
        const song = this.playlist[index];
        
        console.log(`Loading song: ${song.name} from ${song.file}`);
        
        this.audio.src = song.file;
        this.audio.load();
        
        // Update current song display
        document.getElementById('currentSong').textContent = song.name;
        
        // Only try to play if user has interacted
        if (this.userInteracted) {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.isPaused = false;
                this.updatePlayerState();
                console.log(`Successfully playing: ${song.name}`);
            }).catch(error => {
                console.error(`Failed to play ${song.name}:`, error);
                // Try next song if current fails
                setTimeout(() => this.playNext(), 1000);
            });
        } else {
            console.log('Waiting for user interaction before playing audio');
        }
    }
    
    togglePlayPause() {
        if (this.isPlaying && !this.isPaused) {
            // Pause
            this.audio.pause();
            this.isPaused = true;
        } else {
            // Play
            this.audio.play().then(() => {
                this.isPaused = false;
                this.updatePlayerState();
            }).catch(error => {
                console.error('Failed to resume playback:', error);
            });
        }
        this.updatePlayerState();
    }
    
    playNext() {
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        this.loadAndPlay(this.currentIndex);
    }
    
    updatePlayerState() {
        const musicPlayer = document.getElementById('musicPlayer');
        const musicIcon = document.getElementById('musicIcon');
        const audioStatus = document.getElementById('audioStatus');
        const statusText = audioStatus.querySelector('.status-text');
        
        if (this.isPlaying && !this.isPaused) {
            musicPlayer.classList.add('playing');
            musicPlayer.classList.remove('paused');
            musicIcon.textContent = '🎵';
            statusText.textContent = `Playing: ${this.playlist[this.currentIndex].name}`;
        } else if (this.isPaused) {
            musicPlayer.classList.add('paused');
            musicPlayer.classList.remove('playing');
            musicIcon.textContent = '⏸️';
            statusText.textContent = `Paused: ${this.playlist[this.currentIndex].name}`;
        } else {
            musicPlayer.classList.remove('playing', 'paused');
            musicIcon.textContent = '🎵';
            if (this.userInteracted) {
                statusText.textContent = 'Click to start music';
            } else {
                statusText.textContent = 'Click anywhere to start music';
            }
        }
    }
}

// Initialize music player when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize music player
    window.musicPlayer = new MusicPlayer();
    
    // Initialize Starry Wish System
    initializeStarryWish();
    
    // Initialize Mobile Shake Detection
    initializeShakeDetection();
});

// Starry Wish System
function initializeStarryWish() {
    const starryContainer = document.getElementById('starryContainer');
    const wishCounter = document.getElementById('wishCount');
    let wishCount = 0;
    
    // Wish messages for different wishes
    const wishMessages = [
        "May our love be forever sweet 💕",
        "May all your dreams come true ✨",
        "May we reunite soon 🌍",
        "May every day be filled with joy 😊",
        "May our future be even brighter 🌈",
        "May your smile always shine 🌟",
        "May our love last forever 💑",
        "May all your birthday wishes come true 🎂",
        "May we love each other eternally 💖",
        "May your life be full of surprises 🎁"
    ];
    
    // Create star function
    function createStar(x, y) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        
        // Random star properties
        const size = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        const duration = Math.random() * 3 + 6;
        
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDelay = delay + 's';
        star.style.animationDuration = duration + 's';
        
        // Add wish message tooltip
        const wishMessage = wishMessages[Math.floor(Math.random() * wishMessages.length)];
        star.title = wishMessage;
        
        // Add to container
        starryContainer.appendChild(star);
        
        // Remove star after animation
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, (duration + delay) * 1000);
        
        return star;
    }
    
    // Handle click events
    document.addEventListener('click', function(e) {
        // Don't create stars on interactive elements
        if (e.target.closest('.music-player') || 
            e.target.closest('.audio-status') || 
            e.target.closest('.wish-counter') ||
            e.target.closest('.question-modal') ||
            e.target.closest('.video-modal') ||
            e.target.closest('.letter-envelope')) {
            return;
        }
        
        // Create star at click position
        const star = createStar(e.clientX, e.clientY);
        
        // Increment wish counter
        wishCount++;
        wishCounter.textContent = wishCount;
        
        // Add special effects for milestone wishes
        if (wishCount % 10 === 0) {
            // Create multiple stars for milestone
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createStar(
                        e.clientX + (Math.random() - 0.5) * 100,
                        e.clientY + (Math.random() - 0.5) * 100
                    );
                }, i * 200);
            }
            
            // Show milestone message
            showMilestoneMessage(wishCount);
        }
        
        // Add click sound effect
        if (window.musicPlayer && window.musicPlayer.clickSound) {
            window.musicPlayer.clickSound.currentTime = 0;
            window.musicPlayer.clickSound.play().catch(() => {});
        }
    });
    
    // Show milestone message
    function showMilestoneMessage(count) {
        const milestoneDiv = document.createElement('div');
        milestoneDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff6b6b, #feca57);
            color: white;
            padding: 20px 30px;
            border-radius: 20px;
            font-size: 1.2rem;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: milestonePop 0.5s ease-out;
        `;
        
        milestoneDiv.innerHTML = `🎉 ${count}th Wish! 🎉<br><small>Keep wishing!</small>`;
        
        document.body.appendChild(milestoneDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (milestoneDiv.parentNode) {
                milestoneDiv.parentNode.removeChild(milestoneDiv);
            }
        }, 3000);
    }
    
    // Add milestone animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes milestonePop {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.1);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Mobile Shake Detection System
function initializeShakeDetection() {
    const shakeContainer = document.getElementById('shakeContainer');
    const shakeInstructions = document.getElementById('shakeInstructions');
    let lastUpdate = 0;
    let lastX = 0, lastY = 0, lastZ = 0;
    let shakeCount = 0;
    let isShaking = false;
    
    // Check if device supports motion sensors
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function(event) {
            const current = event.accelerationIncludingGravity;
            if (!current) return;
            
            const curTime = new Date().getTime();
            if ((curTime - lastUpdate) > 100) {
                const diffTime = curTime - lastUpdate;
                lastUpdate = curTime;
                
                const speed = Math.abs(current.x + current.y + current.z - lastX - lastY - lastZ) / diffTime * 10000;
                
                if (speed > 800 && !isShaking) {
                    isShaking = true;
                    shakeCount++;
                    triggerShakeEffect();
                    
                    // Prevent multiple triggers
                    setTimeout(() => {
                        isShaking = false;
                    }, 2000);
                }
                
                lastX = current.x;
                lastY = current.y;
                lastZ = current.z;
            }
        });
    }
    
    // Fallback for devices without motion sensors
    let shakeStartTime = 0;
    let shakeCount2 = 0;
    
    document.addEventListener('touchstart', function() {
        shakeStartTime = new Date().getTime();
    });
    
    document.addEventListener('touchend', function() {
        const shakeEndTime = new Date().getTime();
        const shakeDuration = shakeEndTime - shakeStartTime;
        
        if (shakeDuration < 200) {
            shakeCount2++;
            if (shakeCount2 >= 3) {
                triggerShakeEffect();
                shakeCount2 = 0;
            }
        }
    });
    
    // Show shake instructions only on mobile devices
    function showShakeInstructions() {
        // Check if it's a mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile && shakeInstructions) {
            shakeInstructions.style.display = 'block';
            
            // Hide instructions after 8 seconds
            setTimeout(() => {
                if (shakeInstructions) {
                    shakeInstructions.style.display = 'none';
                }
            }, 8000);
        } else if (shakeInstructions) {
            // Hide instructions on desktop
            shakeInstructions.style.display = 'none';
        }
    }
    
    // Show instructions after a delay
    setTimeout(showShakeInstructions, 4000);
    
    // Trigger shake effects
    function triggerShakeEffect() {
        // Play shake sound if available
        if (window.musicPlayer && window.musicPlayer.clickSound) {
            window.musicPlayer.clickSound.currentTime = 0;
            window.musicPlayer.clickSound.play().catch(() => {});
        }
        
        // Create birthday cake effect
        createBirthdayCake();
        
        // Create confetti rain
        createConfettiRain();
        
        // Create fireworks
        createFireworks();
        
        // Show shake celebration message
        showShakeMessage();
    }
    
    // Create birthday cake effect
    function createBirthdayCake() {
        const cake = document.createElement('div');
        cake.className = 'birthday-cake';
        cake.innerHTML = '🎂';
        cake.style.left = Math.random() * (window.innerWidth - 100) + 'px';
        cake.style.top = Math.random() * (window.innerHeight - 100) + 'px';
        
        shakeContainer.appendChild(cake);
        
        // Remove cake after animation
        setTimeout(() => {
            if (cake.parentNode) {
                cake.parentNode.removeChild(cake);
            }
        }, 3000);
    }
    
    // Create confetti rain
    function createConfettiRain() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                
                shakeContainer.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 50);
        }
    }
    
    // Create fireworks
    function createFireworks() {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = Math.random() * window.innerWidth + 'px';
                firework.style.top = Math.random() * (window.innerHeight / 2) + 'px';
                
                shakeContainer.appendChild(firework);
                
                // Remove firework after animation
                setTimeout(() => {
                    if (firework.parentNode) {
                        firework.parentNode.removeChild(firework);
                    }
                }, 2000);
            }, i * 300);
        }
    }
    
    // Show shake celebration message
    function showShakeMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff6b6b, #feca57);
            color: white;
            padding: 20px 30px;
            border-radius: 20px;
            font-size: 1.2rem;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: milestonePop 0.5s ease-out;
        `;
        
        messageDiv.innerHTML = `🎉 Shake Magic! 🎉<br><small>Birthday celebration activated!</small>`;
        
        document.body.appendChild(messageDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 3000);
    }
    
    // Add keyboard shortcut for desktop testing
    document.addEventListener('keydown', function(e) {
        if (e.key === 's' || e.key === 'S') {
            triggerShakeEffect();
        }
    });
}
