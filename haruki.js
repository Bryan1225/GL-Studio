// Initial gem count and luck variables
let gemCount = 1000;
let luckMultiplier = 1; // Default multiplier
let isLuckActive = false; // Track if luck is currently active
let luckType = ""; // Store which type of luck is active
let luckTimer; // Timer for the luck effect
let countdownTimer; // Countdown for the active luck
let countdownDisplay; // Display for the countdown

// Units for summoning
const units = [
    { name: "Tokito Muichiro", rarity: "Mythic", chance: 0.01 },
    { name: "Tomioka Giyu", rarity: "Mythic", chance: 0.01 },
    { name: "Iguro Obanai", rarity: "Mythic", chance: 0.01 }
];

const superLuckyMultiplier = 1.25;
const ultraLuckyMultiplier = 1.375;
const luckDuration = 60 * 60 * 1000; // 1 hour in milliseconds

const summonResult = document.getElementById("summon-result");
const gemCountDisplay = document.getElementById("gem-count"); // Display for gem count
const noticeBanner = document.getElementById("notice-banner"); // Notice banner element
const luckDisplay = document.getElementById("luck-display"); // Display for luck percentage
const confirmationBanner = document.getElementById("confirmation-banner"); // Confirmation banner element
const countdownElement = document.getElementById("countdown"); // Countdown timer display

// Function to show notice messages
function showNotice(message) {
    noticeBanner.textContent = message;
    noticeBanner.classList.add('visible'); // Make it visible
    setTimeout(() => {
        noticeBanner.classList.remove('visible'); // Hide it after 3 seconds
        noticeBanner.textContent = ""; // Clear message
    }, 3000); // Duration to show the banner
}

// Function to show confirmation banner
function showConfirmation(type) {
    confirmationBanner.classList.add('visible'); // Make it visible
    countdownDisplay = type; // Store the type for confirmation

    // Add event listeners for confirmation buttons
    document.getElementById("confirm-button").onclick = () => {
        activateLuck(countdownDisplay); // Activate luck if confirmed
        confirmationBanner.classList.remove('visible'); // Hide the confirmation
    };
    
    document.getElementById("cancel-button").onclick = () => {
        confirmationBanner.classList.remove('visible'); // Hide the confirmation
    };
}

// Function to update luck display
function updateLuckDisplay() {
    luckDisplay.textContent = `Current Luck: ${((luckMultiplier - 1) * 100).toFixed(0)}%`; // Show current luck percentage
}

// Function to perform summon
function summonUnit() {
    let totalChance = 0;
    let randomRoll = Math.random();
    let selectedUnit;

    // Loop through units to select based on chance
    for (let unit of units) {
        totalChance += unit.chance * luckMultiplier;
        if (randomRoll <= totalChance) {
            selectedUnit = unit;
            break;
        }
    }

    if (selectedUnit) {
        return selectedUnit; // Return the whole object instead of a string
    } else {
        return null; // No unit summoned
    }
}

// Function to trigger the summoning animation and display the result
function triggerSummon(cost, summonCount) {
    if (gemCount >= cost) {
        gemCount -= cost;
        gemCountDisplay.textContent = gemCount;

        // Add the animation class for summoning
        summonResult.classList.add('summoning-animation');
        summonResult.textContent = "Summoning...";

        setTimeout(function () {
            // After 1 second, remove the animation and show the result
            summonResult.classList.remove('summoning-animation');

            summonResult.innerHTML = ""; // Clear previous results
            let gotRareUnit = false;

            for (let i = 0; i < summonCount; i++) {
                let unit = summonUnit();
                if (unit) {
                    const resultLine = document.createElement("div"); // Create a new div for each result
                    resultLine.textContent = `You got: ${unit.name} (${unit.rarity})`;
                    summonResult.appendChild(resultLine); // Append the new div to the result display

                    // Check if a rare unit was summoned, e.g., "Mythic"
                    if (unit.rarity === "Mythic") {
                        gotRareUnit = true; // Flag to apply rainbow glow
                    }
                } else {
                    const noResultLine = document.createElement("div"); // Create a new div for no results
                    noResultLine.textContent = "No rare units. Try again!";
                    summonResult.appendChild(noResultLine);
                }
            }

            // Only apply the rainbow glow effect if a rare unit was summoned
            if (gotRareUnit) {
                summonResult.classList.add('rainbow-glow'); // Add rainbow glow effect
            } else {
                summonResult.classList.remove('rainbow-glow'); // Ensure it's removed if no rare unit
            }

            // Remove the result animation after 1 second (but keep rainbow-glow if rare)
            setTimeout(function () {
                summonResult.classList.remove('result-animation');
            }, 1000);

        }, 1000); // 1 second delay for animation
    } else {
        showNotice("Not enough gems!"); // Show notice if not enough gems
    }
}

// Function to activate luck
function activateLuck(type) {
    if (isLuckActive) {
        showNotice("Luck cannot be stacked!"); // Alert if luck is already active
        return; // Prevent further activation
    }

    isLuckActive = true; // Set luck as active
    luckType = type; // Store the type of luck activated

    // Set the appropriate luck multiplier
    luckMultiplier = type === "super" ? superLuckyMultiplier : ultraLuckyMultiplier;
    updateLuckDisplay(); // Update luck display

    // Set a timer for luck duration
    luckTimer = setTimeout(() => {
        isLuckActive = false; // Reset active status
        luckMultiplier = 1; // Reset multiplier
        updateLuckDisplay(); // Update display back to default
        showNotice(`${type === "super" ? "Super Lucky" : "Ultra Lucky"} has expired!`); // Show expiration notice
        countdownElement.textContent = ""; // Clear countdown display
    }, luckDuration);

    // Start the countdown timer
    startCountdownTimer();

    showNotice(`${type === "super" ? "Super Lucky (+25%)" : "Ultra Lucky (+37.5%)"} activated!`); // Notify user of activation
}

// Function to start the countdown timer
function startCountdownTimer() {
    let remainingTime = luckDuration; // Start from the full duration
    countdownElement.textContent = formatTime(remainingTime); // Display initial time

    countdownTimer = setInterval(() => {
        remainingTime -= 1000; // Decrement by 1 second (1000 milliseconds)
        countdownElement.textContent = formatTime(remainingTime); // Update the countdown display

        if (remainingTime <= 0) {
            clearInterval(countdownTimer); // Stop the countdown
        }
    }, 1000); // Update every second
}

// Function to format time for display
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Event listeners for summon buttons
document.getElementById("summon-one").addEventListener("click", function () {
    triggerSummon(500, 1); // Summon 1x
});

document.getElementById("summon-ten").addEventListener("click", function () {
    triggerSummon(4800, 10); // Summon 10x
});

// Event listeners for luck bonus buttons
document.getElementById("super-lucky").addEventListener("click", function () {
    showConfirmation("super"); // Show confirmation for super luck
});

document.getElementById("ultra-lucky").addEventListener("click", function () {
    showConfirmation("ultra"); // Show confirmation for ultra luck
});

// Event listeners for buying gems
document.getElementById("buy-100-gems").addEventListener("click", function () {
    gemCount += 100; // Add 100 gems
    gemCountDisplay.textContent = gemCount;
    showNotice("You bought 100 Gems!"); // Show notice for gem purchase
});

document.getElementById("buy-500-gems").addEventListener("click", function () {
    gemCount += 500; // Add 500 gems
    gemCountDisplay.textContent = gemCount;
    showNotice("You bought 500 Gems!"); // Show notice for gem purchase
});

document.getElementById("buy-1000-gems").addEventListener("click", function () {
    gemCount += 1000; // Add 1000 gems
    gemCountDisplay.textContent = gemCount;
    showNotice("You bought 1000 Gems!"); // Show notice for gem purchase
});

document.getElementById("buy-5000-gems").addEventListener("click", function () {
    gemCount += 5000; // Add 5000 gems
    gemCountDisplay.textContent = gemCount;
    showNotice("You bought 5000 Gems!"); // Show notice for gem purchase
});

document.getElementById("buy-10000-gems").addEventListener("click", function () {
    gemCount += 10000; // Add 10000 gems
    gemCountDisplay.textContent = gemCount;
    showNotice("You bought 10000 Gems!"); // Show notice for gem purchase
});

// Add elements for confirmation banner in HTML
const confirmationBannerHTML = `
    <div id="confirmation-banner" class="hidden">
        <p>Are you sure you want to activate this luck?</p>
        <button id="confirm-button">Confirm</button>
        <button id="cancel-button">Cancel</button>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', confirmationBannerHTML);

// Add element for countdown display in HTML
const countdownHTML = `
    <div id="countdown" class="hidden"></div>
`;
document.body.insertAdjacentHTML('beforeend', countdownHTML);

