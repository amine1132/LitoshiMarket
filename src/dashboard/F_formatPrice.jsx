function formatPrice(price) {
    // Check if the price is greater than 1
    if (price > 1) {
      return price.toFixed(2); // Display price to 4 decimal places
    } else {
      return price.toFixed(4); // Return the original price unchanged
    }
  }

export default formatPrice;