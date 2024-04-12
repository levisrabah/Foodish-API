const toggleButton = document.getElementById('theme-button');
const likeButton = document.getElementById('like-section');
const likeCount = document.getElementById('like-count');
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const commentSection = document.getElementById('comment-section');
const foodCategorySelect = document.getElementById('foodCategory');
const foodImage = document.getElementById('foodImage');

// Existing functionality for comments and like button

commentForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const commentText = commentInput.value.trim(); // Get the comment text and trim whitespace

  // Basic validation (optional)
  if (commentText === '') {
    alert('Sorry, This section cannot go blank!');
    return;
  }

  // Send comment data to server (replace with actual logic)
  console.log('Sending comment:', commentText); // Replace with actual function to send data

  // Clear the comment input for the next comment
  commentInput.value = '';
});

let liked = false; // Track like state

likeButton.addEventListener('click', () => {
  liked = !liked; // Toggle like state on click
  likeButton.classList.toggle('liked'); // Add/remove 'liked' class

  // Update like count text
  if (liked) {
    likeCount.textContent = `${parseInt(likeCount.textContent) + 1} Likes`;
  } else {
    likeCount.textContent = `${parseInt(likeCount.textContent) - 1} Likes`;
  }
});

function toggleTheme() {
  const currentTheme = document.body.dataset.theme;
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  // Update button text based on the new theme
  toggleButton.textContent = newTheme === 'dark' ? 'Change to light theme' : 'Change to light theme';

  // Update data-theme attribute on HTML to switch theme in CSS
  document.body.dataset.theme = newTheme;

  // Optionally, store the theme preference in local storage
  localStorage.setItem('theme', newTheme);
}

// Check for user preference on page load (optional)
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  document.body.dataset.theme = storedTheme;
}

// Attach click event listener to the button
toggleButton.addEventListener('click', toggleTheme);

// Functionality for Food Category dropdown with error handling

foodCategorySelect.addEventListener('change', () => {
  const selectedCategory = foodCategorySelect.value;

  if (selectedCategory) {
    // Construct the Foodish API URL (assuming it provides category-based images)
    const apiUrl = `https://foodish-api.com/api/images/${selectedCategory}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching image: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        foodImage.src = data.image;
      })
      .catch(error => {
        console.error('Error fetching image:', error);
        // Handle errors gracefully, like displaying an error message to the user
        foodImage.src = ''; // Clear the image if an error occurs
        displayErrorMessage(error.message); // Call function to display error message
      });
  } else {
    // Clear image if no category is selected
    foodImage.src = '';
  }
});

