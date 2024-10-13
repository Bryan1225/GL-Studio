let gems = 1000;
let luck = 0;
let codesRedeemed = new Set(); // To track redeemed codes
let luckActivated = false;
let luckTimer = null;
let luckDuration = 3600; // Duration of luck in seconds (1 hour)

// Function to show notifications
function showNotification(message, type = 'notification') {
    const notification = document.getElementById(type);
    notification.innerText = message;
    notification.classList.add('show');
    notification.style.animation = 'fadeIn 0.5s';

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s';
        setTimeout(() => {
            notification.classList.remove('show');
        }, 500); // Match the duration of the fade out
    }, 3000);
}

// Function to update the gem count on the page
function updateGemCount() {
    document.getElementById('gemCount').innerText = `Your Gems: ${gems}`;
}

// Functions to summon
document.getElementById('summon1Button').addEventListener('click', () => {
    if (gems >= 500) {
        gems -= 500;
        showSummoning(); // Start summoning animation
        setTimeout(() => {
            showNotification("You summoned 1 character!", 'notification');
            updateGemCount();
        }, 2000); // Wait for 2 seconds to show the summoning message
    } else {
        showNotification("Not enough gems!", 'notification');
    }
});

document.getElementById('summon10Button').addEventListener('click', () => {
    if (gems >= 4800) {
        gems -= 4800;
        showSummoning(); // Start summoning animation
        setTimeout(() => {
            showNotification("You summoned 10 characters!", 'notification');
            updateGemCount();
        }, 2000); // Wait for 2 seconds to show the summoning message
    } else {
        showNotification("Not enough gems!", 'notification');
    }
});

// Function to show the summoning message
function showSummoning() {
    const summonNotification = document.getElementById('summonNotification');
    summonNotification.innerText = "Summoning...";
    summonNotification.classList.add('show');
    summonNotification.style.animation = 'fadeIn 0.5s';

    // Hide after 2 seconds
    setTimeout(() => {
        summonNotification.style.animation = 'fadeOut 0.5s';
        setTimeout(() => {
            summonNotification.classList.remove('show');
        }, 500); // Match the duration of the fade out
    }, 2000);
}

// Function to show summon result modal
// Function to show summon result modal with animation
function showSummonResult(message) {
    const summonResultModal = document.getElementById('summonResultModal');
    document.getElementById('summonResultText').innerText = message;
    
    // Show the modal with animation
    summonResultModal.style.display = 'block';
    setTimeout(() => {
        summonResultModal.classList.add('show');
    }, 10); // Delay the animation slightly for smooth transition

    // Automatically close the modal after 10 seconds
    setTimeout(() => {
        closeSummonResult();
    }, 10000);
}

// Function to close summon result modal
function closeSummonResult() {
    const summonResultModal = document.getElementById('summonResultModal');
    summonResultModal.classList.remove('show');
    setTimeout(() => {
        summonResultModal.style.display = 'none'; // Hide the modal after animation
    }, 400); // Wait for the animation to complete before hiding
}

// Close summon result modal
document.getElementById('closeSummonResult').addEventListener('click', () => {
    document.getElementById('summonResultModal').style.display = 'none';
});

// Functions to summon
document.getElementById('summon1Button').addEventListener('click', () => {
    if (gems >= 500) {
        gems -= 500;
        showSummoning(); // Start summoning animation
        setTimeout(() => {
            showSummonResult("You summoned 1 character!"); // Show summon result
            updateGemCount();
        }, 2000); // Wait for 2 seconds to show the summoning message
    } else {
        showNotification("Not enough gems!", 'notification');
    }
});

document.getElementById('summon10Button').addEventListener('click', () => {
    if (gems >= 4800) {
        gems -= 4800;
        showSummoning(); // Start summoning animation
        setTimeout(() => {
            showSummonResult("You summoned 10 characters!"); // Show summon result
            updateGemCount();
        }, 2000); // Wait for 2 seconds to show the summoning message
    } else {
        showNotification("Not enough gems!", 'notification');
    }
});

// Function to show luck confirmation modal
function showLuckConfirmation() {
    document.getElementById('luckConfirmationModal').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block'; // Show overlay
}

// Close the modal
document.getElementById('closeLuckConfirmation').addEventListener('click', () => {
    document.getElementById('luckConfirmationModal').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none'; // Hide overlay
});

// Optional: Close modal on overlay click
document.getElementById('modalOverlay').addEventListener('click', () => {
    document.getElementById('luckConfirmationModal').style.display = 'none';
    document.getElementById('modalOverlay').style.display = 'none'; // Hide overlay
});

// Close luck confirmation modal
document.getElementById('closeLuckConfirmation').addEventListener('click', () => {
    document.getElementById('luckConfirmationModal').style.display = 'none';
});

document.getElementById('cancelLuckButton').addEventListener('click', () => {
    document.getElementById('luckConfirmationModal').style.display = 'none';
});

// Confirm luck activation
document.getElementById('confirmLuckButton').addEventListener('click', () => {
    if (!luckActivated) {
        luckActivated = true; // Set luck as activated
        luck += 25; // Activate super lucky
        document.getElementById('luckCount').innerText = `Current Luck: ${luck}%`;
        showNotification("Luck activated! (25%)");
        document.getElementById('luckConfirmationModal').style.display = 'none';
        
        // Start countdown timer for 1 hour
        startLuckTimer();
    } else {
        showNotification("Luck was already activated.");
    }
});

// Function to update the luck timer display
function updateLuckTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('luckTimer').innerText = `Luck Timer: ${minutes}m ${remainingSeconds}s`;
}

// Function to start the luck countdown timer
function startLuckTimer() {
    luckTimer = setInterval(() => {
        luckDuration--;
        updateLuckTimerDisplay(luckDuration);

        if (luckDuration <= 0) {
            clearInterval(luckTimer);
            luckActivated = false; // Allow luck activation again after 1 hour
            showNotification("Luck activation period has ended. You can activate luck again.");
            document.getElementById('luckTimer').innerText = "Luck Timer: Not Activated";
        }
    }, 1000); // Update every second
}

// Add event listeners for activating luck buttons
document.getElementById('superLuckyButton').addEventListener('click', () => {
    if (!luckActivated) {
        showLuckConfirmation();
    } else {
        showNotification("Lucky Passes was already activated.");
    }
});

// Reset the luck count and timer when necessary
document.getElementById('ultraLuckyButton').addEventListener('click', () => {
    if (!luckActivated) {
        showLuckConfirmation();
    } else {
        showNotification("Lucky Passes was already activated.");
    }
});



// Functions to buy gems
document.getElementById('buy100Button').addEventListener('click', () => {
    gems += 100;
    updateGemCount();
    showNotification("You bought 100 gems!");
});

document.getElementById('buy500Button').addEventListener('click', () => {
    gems += 500;
    updateGemCount();
    showNotification("You bought 500 gems!");
});

document.getElementById('buy1000Button').addEventListener('click', () => {
    gems += 1000;
    updateGemCount();
    showNotification("You bought 1000 gems!");
});

document.getElementById('buy5000Button').addEventListener('click', () => {
    gems += 5000;
    updateGemCount();
    showNotification("You bought 5000 gems!");
});

// Code redemption functionality
document.getElementById('codeButton').addEventListener('click', () => {
    document.getElementById('codeModal').style.display = 'block';
});

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('codeModal').style.display = 'none';
});

// Code redemption logic
document.getElementById('redeemButton').addEventListener('click', () => {
    const codeInput = document.getElementById('redeemCode').value.trim();
    let rewardGems = 0;

    if (codeInput === 'VIP888' && !codesRedeemed.has('VIP888')) {
        rewardGems = 100;
        codesRedeemed.add('VIP888');
        showNotification('You redeemed 100 gems!');
    } else if (codeInput === 'VIP999' && !codesRedeemed.has('VIP999')) {
        rewardGems = 200;
        codesRedeemed.add('VIP999');
        showNotification('You redeemed 200 gems!');
    } else if (codeInput === 'VIP000' && !codesRedeemed.has('VIP000')) {
        rewardGems = 1000;
        codesRedeemed.add('VIP000');
        showNotification('You redeemed 1000 gems!');
    } else {
        showNotification('Code already redeemed or invalid!');
    }

    gems += rewardGems;
    updateGemCount();
    document.getElementById('redeemCode').value = ''; // Clear the input field
});

// Modal functionality
window.onclick = function(event) {
    if (event.target == document.getElementById('codeModal')) {
        document.getElementById('codeModal').style.display = 'none';
    }
}

// Initial update of gems on page load
updateGemCount();
