"use strict";

const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results");
const loader = document.getElementById("loader");

searchInput.addEventListener("input", handleInput);

function handleInput() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    showLoader();
    fetchResults(searchTerm);
  } else {
    resultsContainer.innerHTML = "";
  }
}

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

async function fetchResults(term) {
  const encodedTerm = encodeURIComponent(term);
  const url = `https://itunes.apple.com/search?term=${encodedTerm}&entity=song`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data.results);
  } catch (error) {
    resultsContainer.innerHTML = "<p>Error fetching data</p>";
  } finally {
    hideLoader();
  }
}

function displayResults(results) {
  resultsContainer.innerHTML = results.length
    ? results
        .map(
          (result) =>
            `<div class="result-item"><strong>${result.trackName}</strong> by ${result.artistName}</div>`
        )
        .join("")
    : "<p>No results found</p>";
}
