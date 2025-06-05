"""
Test module for mouse pointer functionality.

This module tests the extract_mouse_coords_from_action function and add_mouse_pointer_to_screenshot
function from the observation module, ensuring they work correctly with various action formats
and can be validated programmatically without requiring visual inspection.
"""

import numpy as np
import pytest
from PIL import Image, ImageDraw

from browsergym.core.observation import (
    add_mouse_pointer_to_screenshot,
    extract_mouse_coords_from_action,
)


class TestMouseCoordinateExtraction:
    """Test cases for extract_mouse_coords_from_action function."""

    def test_string_action_mouse_click(self):
        """Test coordinate extraction from string-based mouse_click action."""
        action = "mouse_click(100, 200)"
        coords = extract_mouse_coords_from_action(action)
        assert coords == (100, 200), f"Expected (100, 200), got {coords}"

    def test_string_action_mouse_dblclick(self):
        """Test coordinate extraction from string-based mouse_dblclick action."""
        action = "mouse_dblclick(x=150, y=250)"
        coords = extract_mouse_coords_from_action(action)
        assert coords == (150, 250), f"Expected (150, 250), got {coords}"

    def test_string_action_mouse_move(self):
        """Test coordinate extraction from string-based mouse_move action."""
        action = "mouse_move(300, 400)"
        coords = extract_mouse_coords_from_action(action)
        assert coords == (300, 400), f"Expected (300, 400), got {coords}"

    def test_string_action_mouse_down(self):
        """Test coordinate extraction from string-based mouse_down action."""
        action = "mouse_down(x=75, y=125)"
        coords = extract_mouse_coords_from_action(action)
        assert coords == (75, 125), f"Expected (75, 125), got {coords}"

    def test_string_action_mouse_up(self):
        """Test coordinate extraction from string-based mouse_up action."""
        action = "mouse_up(50, 100)"
        coords = extract_mouse_coords_from_action(action)
        assert coords == (50, 100), f"Expected (50, 100), got {coords}"

    def test_string_action_with_spaces(self):
        """Test coordinate extraction with spaces in string action."""
        action = "mouse_click( 200 , 300 )"
        coords = extract_mouse_coords_from_action(action)
        assert coords == (200, 300), f"Expected (200, 300), got {coords}"

    def test_string_action_with_float(self):
        """Test coordinate extraction with float values in string action."""
        action = "mouse_click(150.5, 250.7)"
        coords = extract_mouse_coords_from_action(action)
        assert coords == (150, 250), f"Expected (150, 250), got {coords}"

    def test_string_action_invalid_format(self):
        """Test handling of invalid string action format."""
        action = "invalid_action(100, 200)"
        coords = extract_mouse_coords_from_action(action)
        assert coords is None, f"Expected None, got {coords}"

    def test_string_action_malformed_coords(self):
        """Test handling of malformed coordinates in string action."""
        action = "mouse_click(invalid, coords)"
        coords = extract_mouse_coords_from_action(action)
        assert coords is None, f"Expected None, got {coords}"

    def test_empty_action(self):
        """Test handling of empty action."""
        coords = extract_mouse_coords_from_action("")
        assert coords is None, f"Expected None, got {coords}"

    def test_none_action(self):
        """Test handling of None action."""
        coords = extract_mouse_coords_from_action(None)
        assert coords is None, f"Expected None, got {coords}"

    def test_non_string_action(self):
        """Test handling of action that is not a string."""
        coords = extract_mouse_coords_from_action(123)
        assert coords is None, f"Expected None, got {coords}"


class TestMousePointerVisualization:
    """Test cases for add_mouse_pointer_to_screenshot function."""

    def setup_method(self):
        """Set up test environment."""
        # Create a test screenshot
        self.test_screenshot = Image.new("RGB", (800, 600), color="white")

    def teardown_method(self):
        """Clean up test environment."""
        pass

    def _create_test_screenshot(self, width=800, height=600, color="white"):
        """Helper method to create test screenshots."""
        return Image.new("RGB", (width, height), color=color)

    def _has_pointer_at_coords(self, image, x, y, tolerance=25):
        """
        Check if there's a pointer-like structure at the given coordinates.

        Args:
            image: PIL Image or numpy array to check
            x, y: Expected pointer coordinates
            tolerance: Pixel tolerance for pointer detection

        Returns:
            bool: True if pointer is detected at coordinates
        """
        # Convert to numpy array if needed
        if isinstance(image, Image.Image):
            img_array = np.array(image)
        else:
            img_array = image

        # Define the region around the expected pointer location
        x_min = max(0, x - tolerance)
        x_max = min(img_array.shape[1], x + tolerance)
        y_min = max(0, y - tolerance)
        y_max = min(img_array.shape[0], y + tolerance)

        # Extract the region
        region = img_array[y_min:y_max, x_min:x_max]

        # Check for dark pixels (pointer should be dark on white background)
        # We look for pixels that are significantly darker than white
        dark_threshold = 200  # RGB values below this are considered "dark"
        dark_pixels = np.sum(np.all(region < dark_threshold, axis=2))

        # If we find enough dark pixels, assume a pointer is present
        return dark_pixels > 10  # Adjust threshold as needed

    def test_add_pointer_to_pil_image(self):
        """Test adding pointer to PIL Image."""
        action = "mouse_click(400, 300)"
        result = add_mouse_pointer_to_screenshot(self.test_screenshot, action)

        # Result should be a numpy array
        assert isinstance(result, np.ndarray), f"Expected numpy array, got {type(result)}"
        assert result.shape == (600, 800, 3), f"Expected shape (600, 800, 3), got {result.shape}"

        # Check if pointer is present at expected coordinates
        assert self._has_pointer_at_coords(
            result, 400, 300
        ), "Pointer not found at expected coordinates"

    def test_add_pointer_to_numpy_array(self):
        """Test adding pointer to numpy array screenshot."""
        screenshot_array = np.array(self.test_screenshot)
        action = "mouse_click(200, 150)"
        result = add_mouse_pointer_to_screenshot(screenshot_array, action)

        # Result should be a numpy array
        assert isinstance(result, np.ndarray), f"Expected numpy array, got {type(result)}"
        assert (
            result.shape == screenshot_array.shape
        ), f"Shape mismatch: expected {screenshot_array.shape}, got {result.shape}"

        # Check if pointer is present at expected coordinates
        assert self._has_pointer_at_coords(
            result, 200, 150
        ), "Pointer not found at expected coordinates"

    def test_pointer_disabled(self):
        """Test that no pointer is added when action has no coordinates."""
        # Test with an action that doesn't contain mouse coordinates
        action = "key_press(Enter)"
        result = add_mouse_pointer_to_screenshot(self.test_screenshot, action)

        # Result should be identical to original (as PIL Image)
        assert isinstance(result, Image.Image), f"Expected PIL Image, got {type(result)}"
        assert np.array_equal(
            np.array(result), np.array(self.test_screenshot)
        ), "Screenshot was modified when no coordinates present"

    def test_no_pointer_for_invalid_action(self):
        """Test that no pointer is added for actions without coordinates."""
        action = "invalid_action(some_param)"
        result = add_mouse_pointer_to_screenshot(self.test_screenshot, action)

        # Result should be identical to original (as PIL Image)
        assert isinstance(result, Image.Image), f"Expected PIL Image, got {type(result)}"
        assert np.array_equal(
            np.array(result), np.array(self.test_screenshot)
        ), "Screenshot was modified for invalid action"

    def test_no_pointer_for_empty_action(self):
        """Test that no pointer is added for empty action."""
        result = add_mouse_pointer_to_screenshot(self.test_screenshot, "")

        # Result should be identical to original (as PIL Image)
        assert isinstance(result, Image.Image), f"Expected PIL Image, got {type(result)}"
        assert np.array_equal(
            np.array(result), np.array(self.test_screenshot)
        ), "Screenshot was modified for empty action"

    def test_no_pointer_for_none_action(self):
        """Test that no pointer is added for None action."""
        result = add_mouse_pointer_to_screenshot(self.test_screenshot, None)

        # Result should be identical to original (as PIL Image)
        assert isinstance(result, Image.Image), f"Expected PIL Image, got {type(result)}"
        assert np.array_equal(
            np.array(result), np.array(self.test_screenshot)
        ), "Screenshot was modified for None action"

    def test_pointer_boundary_conditions(self):
        """Test pointer addition at screenshot boundaries."""
        # Test at corners and edges
        test_coords = [
            (0, 0),  # Top-left corner
            (799, 0),  # Top-right corner
            (0, 599),  # Bottom-left corner
            (799, 599),  # Bottom-right corner
            (400, 0),  # Top edge
            (400, 599),  # Bottom edge
            (0, 300),  # Left edge
            (799, 300),  # Right edge
        ]

        for x, y in test_coords:
            action = f"mouse_click({x}, {y})"
            result = add_mouse_pointer_to_screenshot(self.test_screenshot, action)

            # Should not crash and should return valid result
            assert isinstance(result, np.ndarray), f"Failed at coordinates ({x}, {y})"
            assert result.shape == (600, 800, 3), f"Shape mismatch at coordinates ({x}, {y})"

    def test_pointer_consistency(self):
        """Test that pointer addition is deterministic."""
        action = "mouse_click(300, 250)"

        result1 = add_mouse_pointer_to_screenshot(self.test_screenshot, action)
        result2 = add_mouse_pointer_to_screenshot(self.test_screenshot, action)

        # Results should be identical
        assert np.array_equal(result1, result2), "Pointer addition is not deterministic"

    def test_different_screenshot_sizes(self):
        """Test pointer addition with different screenshot sizes."""
        sizes = [(400, 300), (1200, 800), (100, 100), (1920, 1080)]

        for width, height in sizes:
            screenshot = self._create_test_screenshot(width, height)
            # Place pointer in center
            x, y = width // 2, height // 2
            action = f"mouse_click({x}, {y})"

            result = add_mouse_pointer_to_screenshot(screenshot, action)

            assert isinstance(result, np.ndarray), f"Failed for size {width}x{height}"
            assert result.shape == (height, width, 3), f"Shape mismatch for size {width}x{height}"
            assert self._has_pointer_at_coords(
                result, x, y
            ), f"Pointer not found for size {width}x{height}"


class TestIntegration:
    """Integration tests for both functions working together."""

    def setup_method(self):
        """Set up test environment."""
        pass

    def teardown_method(self):
        """Clean up test environment."""
        pass

    def test_coordinate_extraction_and_visualization_consistency(self):
        """Test that extracted coordinates match visualization location."""
        test_actions = [
            "mouse_click(100, 200)",
            "mouse_click(300, 400)",
            "mouse_dblclick(x=150, y=250)",
            "mouse_move(500, 100)",
        ]

        screenshot = Image.new("RGB", (800, 600), color="white")

        for action in test_actions:
            # Extract coordinates
            coords = extract_mouse_coords_from_action(action)
            assert coords is not None, f"Failed to extract coordinates from {action}"

            # Add pointer
            result = add_mouse_pointer_to_screenshot(screenshot, action)

            # Verify pointer is at extracted coordinates
            x, y = coords
            assert self._has_pointer_at_coords(
                result, x, y
            ), f"Pointer not found at extracted coordinates {coords} for action {action}"

    def _has_pointer_at_coords(self, image, x, y, tolerance=25):
        """Helper method to check if pointer exists at coordinates."""
        if isinstance(image, Image.Image):
            img_array = np.array(image)
        else:
            img_array = image

        x_min = max(0, x - tolerance)
        x_max = min(img_array.shape[1], x + tolerance)
        y_min = max(0, y - tolerance)
        y_max = min(img_array.shape[0], y + tolerance)

        region = img_array[y_min:y_max, x_min:x_max]
        dark_pixels = np.sum(np.all(region < 200, axis=2))
        return dark_pixels > 10

    def test_regression_with_actual_dropdown_actions(self):
        """Test compatibility with actual dropdown test actions from the codebase."""
        # These are based on actual actions found in the dropdown tests
        dropdown_actions = [
            "mouse_click(463, 318)",
            "mouse_click(463, 352)",
            "mouse_click(400, 300)",
            "mouse_move(x=500, y=200)",
        ]

        screenshot = Image.new("RGB", (1000, 700), color="white")

        for action in dropdown_actions:
            coords = extract_mouse_coords_from_action(action)
            if coords:  # Should extract coordinates for all these actions
                result = add_mouse_pointer_to_screenshot(screenshot, action)
                x, y = coords
                assert self._has_pointer_at_coords(
                    result, x, y
                ), f"Regression test failed for action: {action}"


if __name__ == "__main__":
    # Run tests directly
    pytest.main([__file__, "-v"])
